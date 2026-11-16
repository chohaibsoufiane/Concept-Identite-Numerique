# E2E Test Infra: Les Plaques Offset

## Test Philosophy
- Opaque-box, requirement-driven. Derived from `ORIGINAL_REQUEST.md` and `PROJECT.md § Feature Inventory`.
- Independent of presentation implementation quirks; tests interact through the public DOM, window events, keyboard events, CSS computed tokens, and content invariants.
- Pass/Fail semantics: Exit code 0 on complete pass, non-zero with diagnostic logs on failure.

## Feature Inventory Coverage Matrix
| Feature Area | Features Covered | Tier 1 (Count) | Tier 2 (Count) | Tier 3 (Pairwise) | Tier 4 (Scenario) |
|--------------|------------------|----------------|----------------|-------------------|-------------------|
| Front Page & Navigation | F1, F2, F3, F24 | 5 tests | 5 tests | ✓ | ✓ |
| Part 1 : Origine & Principe | F4, F5, F6, F7 | 5 tests | 5 tests | ✓ | ✓ |
| Part 2 : Supports Conventionnels | F8, F9, F10 | 5 tests | 5 tests | ✓ | ✓ |
| Part 3 : Traitement & Grainage | F11, F12, F13 | 5 tests | 5 tests | ✓ | ✓ |
| Part 4 : Électrolyse & Anodisation | F14, F15, F16 | 5 tests | 5 tests | ✓ | ✓ |
| Part 5 : Couches Photosensibles | F17, F18, F19 | 5 tests | 5 tests | ✓ | ✓ |
| Part 6 : Positives, Négatives & 9 Critères | F20, F21, F22, F23 | 5 tests | 5 tests | ✓ | ✓ |
| Style Tokens & Brutalist Integrity | F25, F26 | 5 tests | 5 tests | ✓ | ✓ |

## Test Architecture
- Test runner: `node --test tests/e2e-presentation.test.mjs` or headless automated runner.
- Test tiers:
  - **Tier 1 - Feature Coverage**: Verifies existence and semantic content of every slide (Title, TOC, Parts 1-6, Clôture), correct slide IDs, required technical vocabulary (Senefelder, calcaire, bauxite, anodisation, Al2O3, diazoïque, photopolymère, 9 critères).
  - **Tier 2 - Boundary & Corner**: Zero meta-labels (regular expression search forbidding "Personne \d", "Page \d\d"), image fallback handling (all `.plate-img-box` have onerror and `.plate-fallback`), slide index boundaries (clamp at 0 and max index).
  - **Tier 3 - Pairwise Combinations**: Keyboard navigation (ArrowRight, ArrowLeft, Space), odometer counter sync (`#counterTrack` transform matches active slide index), window title sync (`main.js` matches presentation topic).
  - **Tier 4 - Real-World Scenarios**: Full walkthrough scenario from Slide 1 to Slide 22, verifying transition state and active class consistency.

## Output Signal
- Publishes `TEST_READY.md` when the test runner and tests are complete.
