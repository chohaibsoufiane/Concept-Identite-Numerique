/**
 * =============================================================================
 * Automated E2E Test Suite: "Les Plaques Offset" (Production des Formes Imprimantes)
 * =============================================================================
 * Test Architecture: 4-Tier Standalone Opaque-Box Verification
 * Test Framework: Node.js Built-in `node:test` & `node:assert/strict`
 * Execution: `node --test tests/e2e-presentation.test.mjs`
 * =============================================================================
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();

// Load project source files
const htmlPath = path.join(ROOT_DIR, 'index.html');
const cssPath = path.join(ROOT_DIR, 'style.css');
const jsPath = path.join(ROOT_DIR, 'script.js');
const mainPath = path.join(ROOT_DIR, 'main.js');
const preloadPath = path.join(ROOT_DIR, 'preload.js');

const html = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf8') : '';
const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';
const js = fs.existsSync(jsPath) ? fs.readFileSync(jsPath, 'utf8') : '';
const mainJs = fs.existsSync(mainPath) ? fs.readFileSync(mainPath, 'utf8') : '';
const preloadJs = fs.existsSync(preloadPath) ? fs.readFileSync(preloadPath, 'utf8') : '';

// -----------------------------------------------------------------------------
// Helper Parsers
// -----------------------------------------------------------------------------

function getSlideSections(content) {
  const slideRegex = /<section[^>]*class=["'][^"']*\bslide\b[^"']*["'][^>]*>([\s\S]*?)<\/section>/gi;
  const slides = [];
  let match;
  while ((match = slideRegex.exec(content)) !== null) {
    const fullTag = match[0];
    const innerHtml = match[1];
    const idMatch = fullTag.match(/id=["']([^"']+)["']/i);
    const classMatch = fullTag.match(/class=["']([^"']+)["']/i);
    const id = idMatch ? idMatch[1] : '';
    const classes = classMatch ? classMatch[1].split(/\s+/) : [];
    
    // Strip HTML tags for clean text content inspection
    const textContent = innerHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    
    slides.push({
      id,
      classes,
      isActive: classes.includes('active'),
      rawHtml: fullTag,
      innerHtml,
      textContent
    });
  }
  return slides;
}

function getCounterSteps(content) {
  const stepRegex = /<div[^>]*class=["'][^"']*\bcounter-step\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
  const steps = [];
  let match;
  while ((match = stepRegex.exec(content)) !== null) {
    steps.push(match[1].trim());
  }
  return steps;
}

function getCounterTotal(content) {
  const totalMatch = content.match(/<div[^>]*class=["'][^"']*\bcounter-total\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
  return totalMatch ? totalMatch[1].trim() : '';
}

function getImageBoxes(content) {
  const imgBoxRegex = /<div class="plate-img-box">([\s\S]*?)<\/div>/gi;
  const boxes = [];
  let match;
  while ((match = imgBoxRegex.exec(content)) !== null) {
    const inner = match[1];
    const hasImg = /<img\b[^>]*>/i.test(inner);
    const hasOnError = /onerror=["'][^"']*["']/i.test(inner);
    const hasFallback = /class=["'][^"']*\bplate-fallback\b[^"']*["']/i.test(inner);
    boxes.push({ inner, hasImg, hasOnError, hasFallback });
  }
  return boxes;
}

// =============================================================================
// TIER 1: FEATURE COVERAGE & CONTENT INVARIANTS
// =============================================================================

test('Tier 1: Feature Coverage & Content Invariants', async (t) => {
  const slides = getSlideSections(html);

  // --- Area 1: Front Page & Navigation ---
  await t.test('1.1 Front Cover: Title "LES PLAQUES OFFSET"', () => {
    assert.match(html, /LES\s+PLAQUES\s+OFFSET/i, 'Cover title "LES PLAQUES OFFSET" not found');
  });

  await t.test('1.2 Front Cover: Technical Subtitle & Scope', () => {
    assert.match(html, /Origines?,\s*Supports?,\s*Grainage/i, 'Cover subtitle missing technical topics');
  });

  await t.test('1.3 Front Cover: Module Identification', () => {
    assert.match(html, /Production\s+des\s+Formes\s+Imprimantes/i, 'Module identification missing');
  });

  await t.test('1.4 Table of Contents: Sommaire 6 Axes Technologiques', () => {
    assert.match(html, /Sommaire|Table\s+des\s+Mati[èe]res|6\s+Axes|Piliers\s+Technologiques/i, 'Sommaire slide missing');
  });

  await t.test('1.5 Navigation Controls & Odometer Exist in DOM', () => {
    assert.match(html, /id=["']prevBtn["']/, 'Previous button (#prevBtn) missing');
    assert.match(html, /id=["']nextBtn["']/, 'Next button (#nextBtn) missing');
    assert.match(html, /id=["']slideCounter["']/, 'Brutalist slide counter (#slideCounter) missing');
    assert.match(html, /id=["']counterTrack["']/, 'Counter track (#counterTrack) missing');
  });

  // --- Area 2: Part 1 : Origine & Principe ---
  await t.test('2.1 Part 1: Aloys Senefelder & 1796 Bavarian Limestone', () => {
    assert.match(html, /Senefelder/i, 'Senefelder origin reference missing');
    assert.match(html, /1796/, 'Year 1796 missing from history section');
    assert.match(html, /calcaire|Solnhofen|Bavi[èe]re/i, 'Bavarian limestone origin missing');
  });

  await t.test('2.2 Part 1: Chemical Reaction (Gum Arabic + HNO3 Hydrophilic Salt)', () => {
    assert.match(html, /gomme\s+arabique/i, 'Gomme arabique chemical agent missing');
    assert.match(html, /acide\s+nitrique|HNO3|HNO_3/i, 'Nitric acid chemical agent missing');
    assert.match(html, /hydrophile|sel/i, 'Hydrophilic reaction salt concept missing');
  });

  await t.test('2.3 Part 1: Metallic Evolution (Zinc 1860 & Aluminium 1824 Bauxite)', () => {
    assert.match(html, /zinc/i, 'Zinc historical transition missing');
    assert.match(html, /1860/, 'Zinc introduction year 1860 missing');
    assert.match(html, /aluminium|alu\b/i, 'Aluminium emergence missing');
    assert.match(html, /bauxite/i, 'Bauxite ore origin missing');
  });

  await t.test('2.4 Part 1: Planographic Principle (Flat Surface, No Relief/Depression)', () => {
    assert.match(html, /planographique|surface\s+plane|sans\s+relief/i, 'Planographic flat surface principle missing');
  });

  await t.test('2.5 Part 1: Antagonism (Oleophilic Image vs Hydrophilic Non-Image)', () => {
    assert.match(html, /ol[ée]ophile|lipophile/i, 'Oleophilic printing zone definition missing');
    assert.match(html, /hydrophile|lipophobe/i, 'Hydrophilic non-printing zone definition missing');
    assert.match(html, /r[ée]pulsion|antagonisme/i, 'Water/ink antagonism principle missing');
  });

  // --- Area 3: Part 2 : Supports Conventionnels ---
  await t.test('3.1 Part 2: Monometallic Aluminium Plates', () => {
    assert.match(html, /monom[ée]tallique/i, 'Plaque monométallique missing');
    assert.match(html, /l[ée]g[èe]ret[ée]|ductile|stabilit[ée]/i, 'Aluminium mechanical properties missing');
  });

  await t.test('3.2 Part 2: Polymetallic Endurance (1 to 2 Million Impressions)', () => {
    assert.match(html, /polym[ée]tallique/i, 'Plaques polymétalliques missing');
    assert.match(html, /1\s*[àa]\s*2\s*millions?|longs?\s+tirages?/i, 'Polymetallic run length (1-2M) missing');
  });

  await t.test('3.3 Part 2: Bimetallic Architecture (Chromium / Brass 70-30)', () => {
    assert.match(html, /bim[ée]tallique/i, 'Plaque bimétallique missing');
    assert.match(html, /chrome/i, 'Chromium layer missing');
    assert.match(html, /laiton/i, 'Brass substrate missing');
  });

  await t.test('3.4 Part 2: Trimetallic Architecture (Chromium / Copper / Steel or Aluminium)', () => {
    assert.match(html, /trim[ée]tallique/i, 'Plaque trimétallique missing');
    assert.match(html, /cuivre/i, 'Copper oleophilic layer missing');
    assert.match(html, /acier/i, 'Steel mechanical base missing');
  });

  await t.test('3.5 Part 2: Quadrimetallic Architecture (Cr / Acid Cu / Basic Cu / Steel)', () => {
    assert.match(html, /quadrim[ée]tallique|4\s+m[ée]taux/i, 'Plaque quadrimétallique architecture missing');
    assert.match(html, /cuivre\s+acide/i, 'Acid copper intermediate layer missing');
    assert.match(html, /cuivre\s+basique/i, 'Basic copper adhesion layer missing');
  });

  // --- Area 4: Part 3 : Traitement du Support & Grainage ---
  await t.test('4.1 Part 3: Role of Roughness & 3 Wetting Laws (Minimum Water Principle)', () => {
    assert.match(html, /rugosit[ée]/i, 'Rugosité definition missing');
    assert.match(html, /minimum\s+d['’]eau/i, 'Principle of minimum dampening water missing');
    assert.match(html, /cr[êe]tes?|creux|mouillage/i, 'Wetting profile microcavities missing');
  });

  await t.test('4.2 Part 3: Mechanical Dry Brush Graining', () => {
    assert.match(html, /grainage\s+m[ée]canique/i, 'Mechanical graining missing');
    assert.match(html, /brosses?|brossage/i, 'Brush graining mechanism missing');
  });

  await t.test('4.3 Part 3: Oscillating Brush Motion & 500k Run Limit', () => {
    assert.match(html, /oscillant|oscillation/i, 'Oscillating brush motion missing');
    assert.match(html, /500\s*000/i, 'Mechanical graining 500,000 run ceiling missing');
  });

  await t.test('4.4 Part 3: Chemical Brush Graining (Nylon & Pumice Powder)', () => {
    assert.match(html, /grainage\s+chimique/i, 'Chemical graining missing');
    assert.match(html, /ponce|quartz/i, 'Pumice powder abrasive missing');
    assert.match(html, /nylon/i, 'Nylon brushes missing');
  });

  await t.test('4.5 Part 3: Chemical Graining Characteristics & Medium Runs', () => {
    assert.match(html, /moyens?\s+tirages?|adh[ée]rence/i, 'Chemical graining application profile missing');
  });

  // --- Area 5: Part 4 : Électrolyse, Anodisation & Plaques Chromées ---
  await t.test('5.1 Part 4: Electrochemical Graining in AC Acid Bath', () => {
    assert.match(html, /[ée]lectrograinage|[ée]lectrochimique/i, 'Electrochemical graining missing');
    assert.match(html, /courant\s+alternatif/i, 'Alternating current (AC) parameter missing');
    assert.match(html, /bain\s+acide/i, 'Acid bath parameter missing');
  });

  await t.test('5.2 Part 4: 4.5-10 µm Water Film & 300 lpi Screen Fidelity (>1M Runs)', () => {
    assert.match(html, /4[,.]5|10\s*µm|10\s*microns/i, '4.5-10 micron water film specification missing');
    assert.match(html, /300\s*lpi|300\s*lignes/i, '300 lpi high-screen resolution missing');
  });

  await t.test('5.3 Part 4: Surface Anodization (Al2O3 Corundum Hardness)', () => {
    assert.match(html, /anodisation/i, 'Anodisation process missing');
    assert.match(html, /alumine|Al2O3|Al_2O_3/i, 'Al2O3 protective oxide layer missing');
    assert.match(html, /corindon|durcissement|duret[ée]/i, 'Hardening property missing');
  });

  await t.test('5.4 Part 4: Anti-Oxidation & Anti-Scumming Protection', () => {
    assert.match(html, /graissage|oxydation|usure|abrasion/i, 'Anodization protective features missing');
  });

  await t.test('5.5 Part 4: Chromed Litho Plates (2x Less Water & Rigid Supports)', () => {
    assert.match(html, /plaques?\s+chrom[ée]es?/i, 'Chromed plates section missing');
    assert.match(html, /2\s*x\s*moins\s+d['’]eau|deux\s+fois\s+moins/i, 'Chromium 2x less water retention missing');
    assert.match(html, /m[ée]taux|fer\s+blanc|rigides?/i, 'Rigid metals / tinplate packaging support missing');
  });

  // --- Area 6: Part 5 : Couches Photosensibles ---
  await t.test('6.1 Part 5: Diazo Layers (N2 Diazonium UV Decomposition)', () => {
    assert.match(html, /diazo[ïi]que/i, 'Diazo photosensitive layer missing');
    assert.match(html, /N2|diazonium|azote/i, 'N2 nitrogen molecule reference missing');
  });

  await t.test('6.2 Part 5: Positive Workflow (Exposed Areas Solubilized in Alkaline Developer)', () => {
    assert.match(html, /positif|positive/i, 'Positive workflow missing');
    assert.match(html, /solubilis[ée]|dissou/i, 'Solubilization of exposed diazo areas missing');
    assert.match(html, /r[ée]v[ée]lateur/i, 'Alkaline developer missing');
  });

  await t.test('6.3 Part 5: Photopolymers (Monomer Crosslinking Network)', () => {
    assert.match(html, /photopolym[èe]re/i, 'Photopolymer layer missing');
    assert.match(html, /r[ée]ticulation|r[ée]ticul/i, 'Polymer crosslinking mechanism missing');
    assert.match(html, /monom[èe]re/i, 'Monomer reactive components missing');
  });

  await t.test('6.4 Part 5: Negative Workflow for Web Presses (>1 Million)', () => {
    assert.match(html, /n[ée]gatif|n[ée]gative/i, 'Negative workflow missing');
    assert.match(html, /insoluble|durci/i, 'Insolubilization of exposed photopolymer missing');
    assert.match(html, /rotatives?|presses?/i, 'Web rotary press application missing');
  });

  await t.test('6.5 Part 5: Side-by-Side Photochemical Cycle Comparison', () => {
    assert.match(html, /insolation/i, 'Insolation / exposure stage missing');
    assert.match(html, /d[ée]veloppement/i, 'Development stage missing');
    assert.match(html, /cycle|comparatif|m[ée]canismes?/i, 'Comparative photochemical mechanism missing');
  });

  // --- Area 7: Part 6 : Typologie, 9 Critères & Clôture ---
  await t.test('7.1 Part 6: Positive Plates 80% Commercial Market Share', () => {
    assert.match(html, /80\s*%/i, '80% positive plates market share missing');
    assert.match(html, /labeur|[ée]dition|commercial/i, 'Commercial/commercial print market missing');
  });

  await t.test('7.2 Part 6: Negative Plates for Newspapers & Web Presses', () => {
    assert.match(html, /journaux|presse\s+quotidienne/i, 'Newspaper / daily press application missing');
  });

  await t.test('7.3 Part 6: Complete 9 Selection Criteria Invariant', () => {
    assert.match(html, /9\s+crit[èe]res|9\s+param[èe]tres/i, '9 selection criteria heading missing');
    assert.match(html, /tirage|endurance/i, 'Criterion 1 (Tirage) missing');
    assert.match(html, /support|couche/i, 'Criterion 2 (Nature support/couche) missing');
    assert.match(html, /prix|co[ûu]t/i, 'Criterion 9 (Prix de revient) missing');
  });

  await t.test('7.4 Part 6: Selection Matrix Structure', () => {
    assert.match(html, /matrice|tableau|grille|crit[èe]res/i, 'Decision matrix layout missing');
  });

  await t.test('7.5 Clôture Technique: Industrial Synthesis Slide', () => {
    assert.match(html, /synth[èe]se|cl[ôo]ture|conclusion|bilan/i, 'Final synthesis / closing slide missing');
  });

  // --- Area 8: Style Tokens & Brutalist Integrity ---
  await t.test('8.1 CSS Color Tokens: White, Light, Dark & Accent (#E32619)', () => {
    assert.match(css, /--color-bg:\s*#FFFFFF/i, '--color-bg token missing');
    assert.match(css, /--color-light:\s*#F4F5F6/i, '--color-light token missing');
    assert.match(css, /--color-dark:\s*#0A0A0A/i, '--color-dark token missing');
    assert.match(css, /--color-accent:\s*#E32619/i, '--color-accent token missing');
  });

  await t.test('8.2 CSS Kinetic Tokens: Inter font, kinetic and scene easing', () => {
    assert.match(css, /--font-main:[^;]*'Inter'/i, '--font-main Inter missing');
    assert.match(css, /--ease-kinetic/i, '--ease-kinetic easing missing');
    assert.match(css, /--ease-scene/i, '--ease-scene easing missing');
  });

  await t.test('8.3 Presentation Container and Slide Deck Structure', () => {
    assert.match(html, /class=["'][^"']*\bpresentation-container\b[^"']*["']/, '.presentation-container missing');
    assert.ok(slides.length > 0, 'No slide sections found in index.html');
  });

  await t.test('8.4 Frameless Window Drag Region & Electron Controls', () => {
    assert.match(html, /class=["'][^"']*\btitle-drag-region\b[^"']*["']/, '.title-drag-region missing');
    assert.match(html, /id=["']electron-min["']/, '#electron-min button missing');
    assert.match(html, /id=["']electron-max["']/, '#electron-max button missing');
    assert.match(html, /id=["']electron-close["']/, '#electron-close button missing');
  });

  await t.test('8.5 Swiss Brutalist Layout Classes in style.css', () => {
    assert.match(css, /\.split-grid|\.grid|\.plate-card|\.plate-badge/, 'Brutalist card/grid classes missing in style.css');
  });
});

// =============================================================================
// TIER 2: BOUNDARY & CORNER CASES (INCLUDING ADVERSARIAL STRESS)
// =============================================================================

test('Tier 2: Boundary & Corner Cases', async (t) => {
  await t.test('2.1 Zero Meta-Labels: Strict scan across DOM text nodes', () => {
    const textOnly = html.replace(/<!--[\s\S]*?-->/g, '');
    const metaRegex = /(?:Personne\s*\d+|Slide\s+pour\s+Personne|Page\s*\d+\s*(?:à|a|-)\s*\d+|partie\s*\d+\s*pour\s+personne)/gi;
    const matches = textOnly.match(metaRegex) || [];
    assert.deepEqual(matches, [], `Found prohibited meta-labels in visible text: ${matches.join(', ')}`);
  });

  await t.test('2.2 Zero Meta-Labels: Strict scan across HTML comments & attributes', () => {
    const metaRegex = /(?:Personne\s*\d+|Slide\s+pour\s+Personne|Page\s*\d+\s*(?:à|a|-)\s*\d+|partie\s*\d+\s*pour\s+personne)/gi;
    const matches = html.match(metaRegex) || [];
    assert.deepEqual(matches, [], `Found prohibited meta-labels in HTML comments or markup: ${matches.join(', ')}`);
  });

  await t.test('2.3 Legacy Content Isolation: Zero leftover digital identity elements', () => {
    const legacyTerms = [
      'iceberg.glb',
      'model-viewer',
      'Miroir de l\'E-Réputation',
      'La Faille',
      'La Machine à Données',
      'Identité Agissante',
      'Identité Calculée',
      'Identité Déclarative',
      'dev-copy-cam'
    ];
    const foundLegacy = [];
    legacyTerms.forEach(term => {
      if (html.toLowerCase().includes(term.toLowerCase())) {
        foundLegacy.push(term);
      }
    });
    assert.deepEqual(foundLegacy, [], `Found legacy digital identity remnants in index.html: ${foundLegacy.join(', ')}`);
  });

  await t.test('2.4 Image Fallback Structure: All .plate-img-box feature onerror and .plate-fallback', () => {
    const boxes = getImageBoxes(html);
    assert.ok(boxes.length > 0, 'No .plate-img-box elements found in presentation');
    boxes.forEach((box, idx) => {
      assert.ok(box.hasImg, `Image box #${idx + 1} is missing <img> element`);
      assert.ok(box.hasOnError, `Image box #${idx + 1} is missing onerror fallback trigger`);
      assert.ok(box.hasFallback, `Image box #${idx + 1} is missing .plate-fallback element`);
    });
  });

  await t.test('2.5 Image Fallback Content: All .plate-fallback contain glyph, title, and asset path', () => {
    const fallbackRegex = /<div class="plate-fallback">([\s\S]*?)<\/div>/gi;
    let match;
    let fallbackCount = 0;
    while ((match = fallbackRegex.exec(html)) !== null) {
      fallbackCount++;
      const inner = match[1];
      assert.match(inner, /assets\/[a-z0-9_.-]+/i, `Fallback #${fallbackCount} missing explicit assets/ relative path`);
      assert.match(inner, /<strong>[\s\S]*?<\/strong>/i, `Fallback #${fallbackCount} missing <strong> title`);
    }
    assert.ok(fallbackCount > 0, 'No .plate-fallback elements verified');
  });

  await t.test('2.6 Navigation Lower Boundary Clamp (Index < 0)', () => {
    assert.match(js, /if\s*\(\s*index\s*<\s*0/i, 'goToSlide() missing lower boundary clamp check (index < 0)');
    assert.match(js, /if\s*\(\s*currentSlide\s*>\s*0\s*\)/i, 'prevSlide() missing guard against decrementing below 0');
  });

  await t.test('2.7 Navigation Upper Boundary Clamp (Index >= totalSlides)', () => {
    assert.match(js, /index\s*>=\s*totalSlides/i, 'goToSlide() missing upper boundary clamp check (index >= totalSlides)');
    assert.match(js, /currentSlide\s*<\s*totalSlides\s*-\s*1/i, 'nextSlide() missing guard against incrementing past last slide');
  });

  await t.test('2.8 Navigation Re-entrancy: goToSlide(currentSlide) is a No-Op', () => {
    assert.match(js, /if\s*\(\s*index\s*===\s*currentSlide\s*\)\s*return;/i, 'goToSlide() must return immediately if index === currentSlide');
  });

  await t.test('2.9 Transition Concurrency Guard: isTransitioning check at function entry', () => {
    const goToSlideMatch = js.match(/function\s+goToSlide\s*\([^\)]*\)\s*\{([\s\S]*?)(?:const\s+current|container\.setAttribute)/i);
    assert.ok(goToSlideMatch, 'goToSlide function definition not found in script.js');
    const headerCode = goToSlideMatch[1];
    assert.match(headerCode, /if\s*\(\s*isTransitioning\s*\)\s*return;/i, 'goToSlide() must check `if (isTransitioning) return;` before initiating transition');
  });

  await t.test('2.10 Single Active Slide Invariant initially', () => {
    const slides = getSlideSections(html);
    const activeSlides = slides.filter(s => s.isActive);
    assert.equal(activeSlides.length, 1, `Exactly 1 slide must be active on load, found ${activeSlides.length}`);
    assert.equal(activeSlides[0].id, slides[0].id, `The active slide must be the first slide (${slides[0].id}), but was ${activeSlides[0].id}`);
  });

  // --- Adversarial & Encoding Verification ---
  await t.test('2.11 Adversarial: UTF-8 Encoding & Mojibake Absence', () => {
    // Detect typical double-encoded UTF-8 mojibake patterns
    const mojibakeRegex = /(?:Ã©|Ã¨|Ã |Ã´|Ã¹|Ã®|â€™|â€œ|â€)/;
    const hasMojibake = mojibakeRegex.test(html);
    assert.equal(hasMojibake, false, 'Mojibake corruption detected in index.html (character encoding error)');
  });

  await t.test('2.12 Anti-Slop Integrity: Zero diffuse box-shadows or floating hover transforms', () => {
    // 1. Scan index.html for any inline box-shadow with blur > 0
    const inlineShadowMatches = [...html.matchAll(/box-shadow:\s*([^;"]+)/gi)];
    const diffuseInline = inlineShadowMatches.map(m => m[1].trim()).filter(s => s !== 'none');
    assert.deepEqual(diffuseInline, [], `Found prohibited inline box-shadow in index.html: ${diffuseInline.join(', ')}`);

    // 2. Scan style.css for card hover shadow and translateY floating animations
    assert.doesNotMatch(css, /\.sommaire-card:hover\s*\{[^}]*box-shadow/i, '.sommaire-card:hover must not declare box-shadow');
    assert.doesNotMatch(css, /\.sommaire-card:hover\s*\{[^}]*translateY/i, '.sommaire-card:hover must not float with translateY');
  });
});

// =============================================================================
// TIER 3: PAIRWISE COMBINATIONS & ENGINE SYNCHRONIZATION
// =============================================================================

test('Tier 3: Pairwise Combinations & Engine Synchronization', async (t) => {
  const slides = getSlideSections(html);
  const steps = getCounterSteps(html);
  const totalText = getCounterTotal(html);

  await t.test('3.1 Keyboard Bindings: Forward navigation (ArrowRight, ArrowDown, Space)', () => {
    assert.match(js, /ArrowRight/, 'ArrowRight key binding missing in script.js');
    assert.match(js, /ArrowDown/, 'ArrowDown key binding missing in script.js');
    assert.match(js, /' '|Space/, 'Space key binding missing in script.js');
  });

  await t.test('3.2 Keyboard Bindings: Backward navigation (ArrowLeft, ArrowUp)', () => {
    assert.match(js, /ArrowLeft/, 'ArrowLeft key binding missing in script.js');
    assert.match(js, /ArrowUp/, 'ArrowUp key binding missing in script.js');
  });

  await t.test('3.3 Keyboard Bindings: Fullscreen toggle (F11)', () => {
    assert.match(js, /F11/, 'F11 key binding missing in script.js');
    assert.match(js, /toggleFullScreen/, 'Fullscreen toggle call missing in script.js');
  });

  await t.test('3.4 Button Navigation Listeners: nextBtn and prevBtn click bindings', () => {
    assert.match(js, /nextBtn\.addEventListener\s*\(\s*['"]click['"]\s*,\s*nextSlide\s*\)/, 'nextBtn click listener missing');
    assert.match(js, /prevBtn\.addEventListener\s*\(\s*['"]click['"]\s*,\s*prevSlide\s*\)/, 'prevBtn click listener missing');
  });

  await t.test('3.5 Touch Gesture Bindings: touchstart, touchend and 50px delta swipe', () => {
    assert.match(js, /touchstart/, 'touchstart event listener missing');
    assert.match(js, /touchend/, 'touchend event listener missing');
    assert.match(js, /50/, 'Touch swipe delta threshold (50px) missing');
  });

  await t.test('3.6 Brutalist Odometer Step Count Invariant: counter steps === slide count', () => {
    assert.equal(steps.length, slides.length, `Counter steps (${steps.length}) must strictly equal slide count (${slides.length})`);
  });

  await t.test('3.7 Brutalist Odometer Total Invariant: counter total === / NN', () => {
    const expectedTotal = `/ ${String(slides.length).padStart(2, '0')}`;
    assert.equal(totalText, expectedTotal, `Counter total display "${totalText}" does not match "${expectedTotal}"`);
  });

  await t.test('3.8 Brutalist Odometer Consecutive Numbering: 01, 02, ... NN', () => {
    steps.forEach((step, idx) => {
      const expected = String(idx + 1).padStart(2, '0');
      assert.equal(step, expected, `Counter step #${idx} is "${step}", expected "${expected}"`);
    });
  });

  await t.test('3.9 Brutalist Odometer Vertical Translation Math (-currentSlide * 3.5rem)', () => {
    assert.match(js, /counterTrack\.style\.transform\s*=\s*`translateY\(-\${currentSlide\s*\*\s*3\.5}rem\)`|translateY\(-\s*\+\s*\(currentSlide\s*\*\s*3\.5\)\s*\+\s*['"]rem['"]\)/i, 'Counter translation must be -currentSlide * 3.5rem');
  });

  await t.test('3.10 Electron Window Title Synchronization in main.js', () => {
    assert.match(mainJs, /title:\s*['"]Production des Formes Imprimantes\s*—\s*Les Plaques Offset['"]|title:\s*['"]Les Plaques Offset['"]/i, 'main.js window title must match presentation topic');
  });

  await t.test('3.11 Preload IPC Bridge Contract in preload.js', () => {
    assert.match(preloadJs, /minimize:/, 'preload.js missing minimize bridge');
    assert.match(preloadJs, /maximize:/, 'preload.js missing maximize bridge');
    assert.match(preloadJs, /close:/, 'preload.js missing close bridge');
    assert.match(preloadJs, /toggleFullScreen:/, 'preload.js missing toggleFullScreen bridge');
  });
});

// =============================================================================
// TIER 4: REAL-WORLD SCENARIOS (E2E WALKTHROUGH SIMULATION)
// =============================================================================

test('Tier 4: Real-World Scenarios (E2E Walkthrough Simulation)', async (t) => {
  const slides = getSlideSections(html);
  const totalSlides = slides.length;

  // Deck simulator modeling the exact JS engine specifications
  class PresentationDeckSimulator {
    constructor(slideCount) {
      this.totalSlides = slideCount;
      this.currentSlide = 0;
      this.direction = 'next';
      this.isTransitioning = false;
      this.activeSlideIndex = 0;
      this.outgoingSlideIndex = -1;
      this.counterTransformY = '0rem';
    }

    goToSlide(index, direction = 'next') {
      if (typeof index !== 'number' || isNaN(index) || !isFinite(index)) return false;
      if (this.isTransitioning) return false;
      if (index < 0 || index >= this.totalSlides) return false;
      if (index === this.currentSlide) return false;

      this.isTransitioning = true;
      this.direction = direction;
      this.outgoingSlideIndex = this.currentSlide;
      this.activeSlideIndex = index;
      this.currentSlide = index;
      this.counterTransformY = `-${this.currentSlide * 3.5}rem`;

      this.outgoingSlideIndex = -1;
      this.isTransitioning = false;
      return true;
    }

    nextSlide() {
      if (this.currentSlide < this.totalSlides - 1) {
        return this.goToSlide(this.currentSlide + 1, 'next');
      }
      return false;
    }

    prevSlide() {
      if (this.currentSlide > 0) {
        return this.goToSlide(this.currentSlide - 1, 'prev');
      }
      return false;
    }
  }

  await t.test('4.1 Initial Mount Lifecycle State', () => {
    const deck = new PresentationDeckSimulator(totalSlides);
    assert.equal(deck.currentSlide, 0, 'Initial slide must be index 0');
    assert.equal(deck.activeSlideIndex, 0, 'Active slide must be index 0');
    assert.equal(deck.outgoingSlideIndex, -1, 'No slide should be outgoing on mount');
    assert.equal(deck.counterTransformY, '0rem', 'Counter transform must be 0rem initially');
  });

  await t.test('4.2 Sequential Full Forward Walkthrough (Slide 1 -> Slide N)', () => {
    const deck = new PresentationDeckSimulator(totalSlides);
    for (let step = 1; step < totalSlides; step++) {
      const moved = deck.nextSlide();
      assert.ok(moved, `Failed to navigate forward to slide ${step + 1}`);
      assert.equal(deck.currentSlide, step, `Slide index mismatch at step ${step}`);
      assert.equal(deck.direction, 'next', 'Direction must be "next" during forward walkthrough');
      assert.equal(deck.counterTransformY, `-${step * 3.5}rem`, `Counter transform mismatch at slide ${step + 1}`);
    }
    assert.equal(deck.currentSlide, totalSlides - 1, 'Deck did not reach final slide index');
  });

  await t.test('4.3 Reverse Walkthrough (Slide N -> Slide 1)', () => {
    const deck = new PresentationDeckSimulator(totalSlides);
    deck.goToSlide(totalSlides - 1, 'next');
    assert.equal(deck.currentSlide, totalSlides - 1);

    for (let step = totalSlides - 2; step >= 0; step--) {
      const moved = deck.prevSlide();
      assert.ok(moved, `Failed to navigate backward to slide ${step + 1}`);
      assert.equal(deck.currentSlide, step, `Slide index mismatch at step ${step}`);
      assert.equal(deck.direction, 'prev', 'Direction must be "prev" during reverse walkthrough');
      assert.equal(deck.counterTransformY, `-${step * 3.5}rem`, `Counter transform mismatch at slide ${step + 1}`);
    }
    assert.equal(deck.currentSlide, 0, 'Deck did not return to first slide index');
  });

  await t.test('4.4 Mixed Interaction & Rapid Boundary Hammer Scenario', () => {
    const deck = new PresentationDeckSimulator(totalSlides);

    // Backward at origin -> rejected
    assert.equal(deck.prevSlide(), false, 'prevSlide() at slide 0 must return false');
    assert.equal(deck.currentSlide, 0);

    // Forward steps
    deck.nextSlide();
    deck.nextSlide();
    deck.nextSlide();
    assert.equal(deck.currentSlide, 3);

    // Backward step
    deck.prevSlide();
    assert.equal(deck.currentSlide, 2);

    // Jump to end
    deck.goToSlide(totalSlides - 1, 'next');
    assert.equal(deck.currentSlide, totalSlides - 1);

    // Forward past end -> rejected
    assert.equal(deck.nextSlide(), false, 'nextSlide() at final slide must return false');
    assert.equal(deck.currentSlide, totalSlides - 1);

    // Concurrency lock test: simulate in-flight transition
    deck.isTransitioning = true;
    assert.equal(deck.prevSlide(), false, 'Navigation must be rejected while isTransitioning is true');
    assert.equal(deck.nextSlide(), false, 'Navigation must be rejected while isTransitioning is true');
    assert.equal(deck.goToSlide(0, 'prev'), false, 'goToSlide must be rejected while isTransitioning is true');
    deck.isTransitioning = false;
  });

  await t.test('4.5 Adversarial: Invalid & Extreme Input Rejections in script.js', () => {
    // 1. Direct static contract assertion on script.js
    const goToSlideMatch = js.match(/function\s+goToSlide\s*\([^\)]*\)\s*\{([\s\S]*?)(?:const\s+current|container\.setAttribute)/i);
    assert.ok(goToSlideMatch, 'goToSlide function definition not found in script.js');
    const headerCode = goToSlideMatch[1];
    assert.match(
      headerCode,
      /if\s*\(\s*typeof\s+index\s*!==\s*['"]number['"]\s*\|\|\s*!Number\.isInteger\s*\(\s*index\s*\)\s*\)\s*return;?/i,
      'script.js goToSlide() must sanitize index type (reject non-numeric and non-integer) before initiating transition'
    );

    // 2. State machine simulator verification
    const deck = new PresentationDeckSimulator(totalSlides);
    assert.equal(deck.goToSlide(NaN), false, 'NaN index must be rejected');
    assert.equal(deck.goToSlide(Infinity), false, 'Infinity index must be rejected');
    assert.equal(deck.goToSlide(-Infinity), false, '-Infinity index must be rejected');
    assert.equal(deck.goToSlide("3"), false, 'String index must be rejected');
    assert.equal(deck.goToSlide(null), false, 'Null index must be rejected');
    assert.equal(deck.goToSlide(undefined), false, 'Undefined index must be rejected');
    assert.equal(deck.goToSlide(-99999), false, 'Negative extreme index must be rejected');
    assert.equal(deck.goToSlide(99999), false, 'Positive extreme index must be rejected');
    assert.equal(deck.currentSlide, 0, 'Current slide must remain intact after invalid inputs');
  });

  await t.test('4.6 Transition Class Hygiene Invariant in DOM script', () => {
    assert.match(js, /slides\.forEach\s*\(\s*s\s*=>\s*\{[\s\S]*?s\.classList\.remove\(['"]active['"],\s*['"]outgoing['"],\s*['"]incoming['"]\)/, 'Phantom transition classes must be wiped in goToSlide');
    assert.match(js, /setTimeout\s*\(\s*\(\)\s*=>\s*\{[\s\S]*?current\.classList\.remove\(['"]outgoing['"]\);[\s\S]*?isTransitioning\s*=\s*false;[\s\S]*?\},\s*transitionDuration\s*\)/, 'Transition lock and outgoing class must be cleared after transitionDuration');
  });
});
