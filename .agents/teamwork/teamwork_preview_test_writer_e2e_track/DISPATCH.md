# Dispatch: E2E Testing Track

You are the E2E Test Writer for "Les Plaques Offset" presentation.
Read ORIGINAL_REQUEST.md at:
c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\ORIGINAL_REQUEST.md
Read PROJECT.md at:
c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\orchestrator\PROJECT.md
Read TEST_INFRA.md at:
c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\orchestrator\TEST_INFRA.md

Workspace root:
c:\Users\lufylon\Documents\antigravity\silly-euclid

Your objective:
Design and implement a comprehensive, standalone, opaque-box automated test suite covering all 4 tiers:
- Tier 1: Feature Coverage (verify presence and content invariants of Title, TOC, 6 course parts, Clôture slide, required technical terminology).
- Tier 2: Boundary & Corner Cases (strict zero meta-labels check forbidding "Personne \d" and "Page \d\d" across all text and comments, image fallback container structure with onerror and .plate-fallback, navigation boundary clamps).
- Tier 3: Pairwise Combinations (keyboard navigation bindings, odometer counter invariants, window title check in main.js).
- Tier 4: Real-World Scenarios (complete 22-slide walkthrough simulation ensuring active class, transition states).

Requirements:
1. Write the test runner and tests in `tests/e2e-presentation.test.mjs` (or multiple test files under `tests/`). Use Node.js built-in `node:test` and `node:assert` or lightweight DOM/parser tests that run via `node --test tests/e2e-presentation.test.mjs` quickly and reliably without external network dependencies.
2. Ensure tests can be executed with a simple command: `node --test tests/e2e-presentation.test.mjs` or `npm test`.
3. When the test suite is implemented and verified, publish `TEST_READY.md` at the project root (`c:\Users\lufylon\Documents\antigravity\silly-euclid\TEST_READY.md`) following the format in `TEST_INFRA.md`.
4. Document commands and test coverage in your handoff report.
5. Deliver handoff.md in your working directory and notify the orchestrator.


## 2026-10-23T08:46:45Z
You are the E2E Test Writer for 'Les Plaques Offset'.
Your working directory is: c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_test_writer_e2e_track
Read your DISPATCH.md at c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\teamwork_preview_test_writer_e2e_track\DISPATCH.md,
ORIGINAL_REQUEST.md at c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\ORIGINAL_REQUEST.md,
PROJECT.md at c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\orchestrator\PROJECT.md,
and TEST_INFRA.md at c:\Users\lufylon\Documents\antigravity\silly-euclid\.agents\teamwork\orchestrator\TEST_INFRA.md.

Build the 4-tier automated test suite in tests/e2e-presentation.test.mjs using node:test and node:assert.
When complete, publish TEST_READY.md at project root.
Write handoff.md in your working directory and notify me (conversation ID ef092575-fdfa-43c8-adf3-ee84ceec1245).
