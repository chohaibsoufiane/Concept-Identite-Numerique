/**
 * =============================================================================
 * Adversarial M1 Challenger Test Suite: "Les Plaques Offset"
 * =============================================================================
 * Execution: `node --test tests/adversarial-m1.test.mjs`
 * =============================================================================
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT_DIR = process.cwd();

// -----------------------------------------------------------------------------
// 1. Adversarial Meta-Labels & Hidden Instructor Notes Scan
// -----------------------------------------------------------------------------
test('Adversarial 1: Zero Meta-Labels Workspace Deep Scan', () => {
  const activeFiles = [
    'index.html',
    'style.css',
    'script.js',
    'main.js',
    'preload.js',
    'assets/schematic_reaction_pierre.svg',
    'assets/schematic_principe_planographique.svg'
  ];

  const metaPatterns = [
    { name: 'Personne <N>', regex: /Personne\s*\d+/i },
    { name: 'Personne standalone', regex: /\bPersonne\b/i },
    { name: 'Page <N>', regex: /\bPage\s*\d+\b/i },
    { name: 'Mme Batioui', regex: /Batioui/i },
    { name: 'INFO208', regex: /INFO\s*208/i },
    { name: 'Slide pour', regex: /Slide\s+pour/i },
    { name: 'Partie de Personne', regex: /Partie\s*\d*\s*pour/i }
  ];

  const violations = [];

  for (const relPath of activeFiles) {
    const fullPath = path.join(ROOT_DIR, relPath);
    assert.ok(fs.existsSync(fullPath), `Required active file ${relPath} must exist`);
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, idx) => {
      for (const p of metaPatterns) {
        const m = line.match(p.regex);
        if (m) {
          violations.push({ file: relPath, line: idx + 1, rule: p.name, text: line.trim() });
        }
      }
    });
  }

  assert.deepEqual(violations, [], `Found forbidden meta-label violations: ${JSON.stringify(violations)}`);
});

// -----------------------------------------------------------------------------
// 2. SVG XML Well-Formedness & Entity Validity
// -----------------------------------------------------------------------------
test('Adversarial 2: SVG XML Well-Formedness and Undefined Entity Absence', () => {
  const svgFiles = [
    'assets/schematic_reaction_pierre.svg',
    'assets/schematic_principe_planographique.svg'
  ];

  const xmlPredefined = new Set(['&lt;', '&gt;', '&amp;', '&apos;', '&quot;']);

  for (const relPath of svgFiles) {
    const fullPath = path.join(ROOT_DIR, relPath);
    assert.ok(fs.existsSync(fullPath), `SVG file ${relPath} must exist`);
    const content = fs.readFileSync(fullPath, 'utf8');

    // Check for non-standard XML entities like &bull;
    const allEntities = [...content.matchAll(/&[a-zA-Z0-9#]+;/g)].map(m => m[0]);
    const illegalEntities = allEntities.filter(e => !xmlPredefined.has(e) && !e.startsWith('&#'));

    assert.equal(
      illegalEntities.length,
      0,
      `SVG file ${relPath} contains illegal XML entities: ${illegalEntities.join(', ')}. Use numeric character references (e.g. &#8226;) or UTF-8 characters instead.`
    );
  }
});

// -----------------------------------------------------------------------------
// 3. Image Fallback Contract & Structural Resilience
// -----------------------------------------------------------------------------
test('Adversarial 3: Image Fallback Contract & Layout Stability', () => {
  const htmlPath = path.join(ROOT_DIR, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  const imgBoxes = [...html.matchAll(/<div class="plate-img-box">([\s\S]*?)<\/div>/gi)];
  assert.ok(imgBoxes.length >= 3, `Expected at least 3 plate-img-box instances, found ${imgBoxes.length}`);

  for (const [idx, box] of imgBoxes.entries()) {
    const inner = box[1];
    assert.match(inner, /<img\b[^>]*\bonerror=["'][^"']*["']/i, `Box ${idx} must have img with onerror handler`);
    assert.match(inner, /<div class="plate-fallback">/i, `Box ${idx} must contain .plate-fallback`);
    assert.match(inner, /<span[^>]*>[^<]+<\/span>/i, `Box ${idx} fallback must have glyph span`);
    assert.match(inner, /<strong[^>]*>[^<]+<\/strong>/i, `Box ${idx} fallback must have strong title`);
    assert.match(inner, /<small[^>]*>assets\/[^<]+<\/small>/i, `Box ${idx} fallback must have small path reference`);
  }
});

// -----------------------------------------------------------------------------
// 4. Adversarial Mojibake & Double UTF-8 Encoding Verification
// -----------------------------------------------------------------------------
test('Adversarial 4: Zero Mojibake / Double UTF-8 Sequences Across Workspace', () => {
  const files = [
    'index.html',
    'style.css',
    'script.js',
    'main.js',
    'preload.js',
    'assets/schematic_reaction_pierre.svg',
    'assets/schematic_principe_planographique.svg'
  ];

  const mojibakeRegex = /(?:Ã©|Ã¨|Ã |Ã´|Ã¹|Ã®|Ã§|â€™|â€œ|â€|ï¿½)/;

  for (const relPath of files) {
    const fullPath = path.join(ROOT_DIR, relPath);
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, idx) => {
      const match = line.match(mojibakeRegex);
      assert.equal(
        match,
        null,
        `Mojibake sequence found in ${relPath}:${idx + 1} -> ${line.trim()}`
      );
    });
  }
});
