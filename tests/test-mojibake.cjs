const fs = require('fs');
const path = require('path');

const targetExtensions = ['.html', '.css', '.js', '.mjs', '.cjs', '.json', '.svg', '.md'];

const mojibakePatterns = [
  { name: 'Double UTF-8 Latin-1 (Ã followed by latin char)', regex: /Ã[\x80-\xBF\w]/ },
  { name: 'Double UTF-8 Punctuation (â followed by €/ etc)', regex: /â[\x80-\xBF]{2}/ },
  { name: 'Double UTF-8 Quotes/Symbols (Â followed by symbol)', regex: /Â[\xA0-\xFF]/ },
  { name: 'Unicode Replacement Character (U+FFFD)', regex: /\uFFFD/ },
  { name: 'Specific French Mojibake: Ã©', regex: /Ã©/ },
  { name: 'Specific French Mojibake: Ã¨', regex: /Ã¨/ },
  { name: 'Specific French Mojibake: Ã ', regex: /Ã / },
  { name: 'Specific French Mojibake: Ã§', regex: /Ã§/ },
  { name: 'Specific French Mojibake: â€™', regex: /â€™/ },
  { name: 'Specific French Mojibake: â€œ', regex: /â€œ/ },
  { name: 'Specific French Mojibake: â€”', regex: /â€”/ }
];

function scanFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let findings = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.agents') continue;
      findings = findings.concat(scanFiles(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (targetExtensions.includes(ext)) {
        const buf = fs.readFileSync(fullPath);
        const text = buf.toString('utf8');
        const lines = text.split(/\r?\n/);
        lines.forEach((line, idx) => {
          mojibakePatterns.forEach(pat => {
            const m = line.match(pat.regex);
            if (m) {
              findings.push({
                file: path.relative(process.cwd(), fullPath),
                line: idx + 1,
                rule: pat.name,
                match: m[0],
                snippet: line.trim().slice(0, 100)
              });
            }
          });
        });
      }
    }
  }
  return findings;
}

const results = scanFiles(process.cwd());
console.log('TOTAL MOJIBAKE MATCHES FOUND:', results.length);
results.forEach(r => console.log(JSON.stringify(r)));
