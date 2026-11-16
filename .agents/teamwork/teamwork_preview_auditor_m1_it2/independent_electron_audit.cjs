const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('no-sandbox');

app.whenReady().then(async () => {
    const win = new BrowserWindow({
        width: 1440,
        height: 900,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    const indexPath = path.resolve(__dirname, '../../../index.html');
    console.log(`[AUDIT] Loading: ${indexPath}`);

    const consoleLogs = [];
    win.webContents.on('console-message', (event, level, message) => {
        consoleLogs.push({ level, message });
    });

    await win.loadFile(indexPath);

    // Wait a brief moment for images to decode and render
    await new Promise(r => setTimeout(r, 1200));

    const auditResults = await win.webContents.executeJavaScript(`
        (() => {
            const results = {};

            // 1. Image audit
            const imgs = Array.from(document.querySelectorAll('img')).map(img => {
                const box = img.closest('.plate-img-box');
                const fallback = box ? box.querySelector('.plate-fallback') : null;
                const fallbackDisplay = fallback ? window.getComputedStyle(fallback).display : 'no-fallback';
                const imgDisplay = window.getComputedStyle(img).display;

                return {
                    src: img.getAttribute('src'),
                    complete: img.complete,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                    imgDisplay: imgDisplay,
                    fallbackDisplay: fallbackDisplay
                };
            });
            results.images = imgs;

            // 2. Sommaire card hover computed styles
            const sommaireCard = document.querySelector('.sommaire-card');
            if (sommaireCard) {
                const normalStyle = window.getComputedStyle(sommaireCard);
                results.sommaireNormal = {
                    boxShadow: normalStyle.boxShadow,
                    transform: normalStyle.transform
                };
            }

            // 3. Slide 05 Aluminium Card inline style
            const alumCard = document.querySelector('#slide-05 [style*="border: 3px solid var(--color-accent)"]') ||
                             document.querySelector('#slide-05 [style*="border: 3px solid #E32619"]') ||
                             document.querySelector('#slide-05 .split-grid > div:nth-child(3)') ||
                             document.querySelector('#slide-05 [style*="Aluminium"]');
            results.alumCardFound = !!alumCard;
            if (alumCard) {
                results.alumCardStyle = {
                    boxShadow: window.getComputedStyle(alumCard).boxShadow,
                    inlineStyle: alumCard.getAttribute('style')
                };
            }

            // 4. Check for any diffuse box-shadow in all elements of active slides
            const slides = Array.from(document.querySelectorAll('.slide'));
            const elementsWithShadow = [];
            slides.forEach((slide, sIdx) => {
                const allEls = [slide, ...slide.querySelectorAll('*')];
                allEls.forEach(el => {
                    const bs = window.getComputedStyle(el).boxShadow;
                    if (bs && bs !== 'none') {
                        // Check if it's diffuse (has blur radius > 0)
                        // A diffuse shadow in computed style looks like: rgb(...) Xpx Ypx Blurpx Spreadpx
                        elementsWithShadow.push({
                            slideId: slide.id,
                            tagName: el.tagName,
                            className: el.className,
                            boxShadow: bs
                        });
                    }
                });
            });
            results.elementsWithShadow = elementsWithShadow;

            // 5. Check slide count and counter
            const slideElements = document.querySelectorAll('.slide');
            const counterTrack = document.getElementById('counterTrack');
            const counterTotal = document.querySelector('.counter-total');
            results.slideCount = slideElements.length;
            results.counterSteps = counterTrack ? counterTrack.querySelectorAll('.counter-step').length : 0;
            results.counterTotalText = counterTotal ? counterTotal.textContent.trim() : '';

            // 6. Navigation sanity in Electron
            results.currentSlideActive = document.querySelectorAll('.slide.active').length;
            results.firstSlideId = document.querySelector('.slide.active') ? document.querySelector('.slide.active').id : null;

            return results;
        })()
    `);

    console.log('[AUDIT RESULTS]:\n' + JSON.stringify(auditResults, null, 2));

    let pass = true;

    // Check images
    auditResults.images.forEach(img => {
        if (!img.complete || img.naturalWidth <= 0) {
            console.error(`[AUDIT FAIL] Image failed to decode: ${img.src} (naturalWidth: ${img.naturalWidth})`);
            pass = false;
        }
        if (img.fallbackDisplay !== 'none') {
            console.error(`[AUDIT FAIL] Fallback is visible for image: ${img.src}`);
            pass = false;
        }
    });

    // Check diffuse shadows
    if (auditResults.elementsWithShadow.length > 0) {
        console.error(`[AUDIT FAIL] Diffuse box-shadow found on elements:`, auditResults.elementsWithShadow);
        pass = false;
    }

    // Check slide count
    if (auditResults.slideCount !== 6) {
        console.error(`[AUDIT FAIL] Unexpected slide count: ${auditResults.slideCount}`);
        pass = false;
    }

    console.log(`[AUDIT OVERALL]: ${pass ? 'PASSED_CLEAN' : 'FAILED_VIOLATION'}`);
    app.exit(pass ? 0 : 1);
});
