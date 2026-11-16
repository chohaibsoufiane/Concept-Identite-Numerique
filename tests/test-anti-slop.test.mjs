import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();

test('Anti-Slop 1: Zero Diffuse Box-Shadows in active project HTML/CSS/JS', () => {
  const filesToScan = [
    'index.html',
    'style.css',
    'script.js',
    'main.js',
    'preload.js'
  ];

  const violations = [];

  for (const relPath of filesToScan) {
    const fullPath = path.join(ROOT_DIR, relPath);
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line, idx) => {
      // Find any box-shadow that is NOT 'box-shadow: none;'
      const match = line.match(/box-shadow\s*:\s*([^;]+);?/i);
      if (match) {
        const val = match[1].trim();
        if (val !== 'none') {
          violations.push({
            file: relPath,
            line: idx + 1,
            value: val,
            raw: line.trim()
          });
        }
      }
    });
  }

  assert.deepEqual(violations, [], `Forbidden non-none box-shadows detected: ${JSON.stringify(violations, null, 2)}`);
});

test('Anti-Slop 2: Zero Rounded Corners on Presentation Cards', () => {
  const htmlPath = path.join(ROOT_DIR, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Find all cards in index.html (sommaire-card or inline styled cards)
  const cardMatches = [...html.matchAll(/<div[^>]*class=["'][^"']*card[^"']*["'][^>]*style=["']([^"']*)["']/gi)];
  for (const [idx, m] of cardMatches.entries()) {
    const style = m[1];
    if (style.includes('border-radius')) {
      const radiusMatch = style.match(/border-radius\s*:\s*([^;]+);?/i);
      if (radiusMatch) {
        const rVal = radiusMatch[1].trim();
        assert.equal(rVal, '0', `Card ${idx} has non-zero border-radius: ${rVal}`);
      }
    }
  }

  // Also verify CSS definitions for cards have border-radius: 0
  const cssPath = path.join(ROOT_DIR, 'style.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  const cardClasses = ['.sommaire-card', '.step-card', '.material-card', '.plate-card'];
  for (const cls of cardClasses) {
    const regex = new RegExp(`\\${cls}\\s*\\{[^}]*\\}`, 'g');
    const matches = css.match(regex) || [];
    for (const rule of matches) {
      if (rule.includes('border-radius')) {
        const radiusMatch = rule.match(/border-radius\s*:\s*([^;]+);?/i);
        if (radiusMatch) {
          const rVal = radiusMatch[1].trim();
          assert.equal(rVal, '0', `${cls} definition has non-zero border-radius: ${rVal}`);
        }
      }
    }
  }
});

test('Anti-Slop 3: Hover States Have Zero Diffuse Shadows and Zero Floating Card Transforms', () => {
  const cssPath = path.join(ROOT_DIR, 'style.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Verify .sommaire-card:hover has no box-shadow and no translateY
  const sommaireHoverRegex = /\.sommaire-card:hover\s*\{([^}]+)\}/i;
  const match = css.match(sommaireHoverRegex);
  assert.ok(match, 'Expected .sommaire-card:hover rule to exist');

  const hoverContent = match[1];
  assert.equal(
    hoverContent.includes('box-shadow'),
    false,
    `.sommaire-card:hover must NOT contain box-shadow: ${hoverContent}`
  );
  assert.equal(
    hoverContent.includes('translateY'),
    false,
    `.sommaire-card:hover must NOT contain floating translateY transform: ${hoverContent}`
  );
});
