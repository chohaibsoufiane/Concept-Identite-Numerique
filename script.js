/**
 * @file script.js
 * @project Production des Formes Imprimantes — Les Plaques Offset
 * @module Procédés d'Impression Offset
 *
 * @team
 *   - Mohammed Badaoui
 *   - Abdelhafide Elhouate
 *   - Amine Amal
 *   - Chohaib Soufiane
 *   - Rayane El Makhloufi
 *   - Mhaitate Aymen
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log(
        '%c Production des Formes Imprimantes %c Les Plaques Offset \n' +
        'Équipe: Mohammed Badaoui, Abdelhafide Elhouate, Amine Amal, Chohaib Soufiane, Rayane El Makhloufi, Mhaitate Aymen',
        'background: #E32619; color: #fff; font-weight: 700; padding: 3px 6px; border-radius: 0;',
        'background: #111; color: #00A8FF; font-weight: 700; padding: 3px 6px; border-radius: 0;'
    );

    const container = document.querySelector('.presentation-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const counterTrack = document.getElementById('counterTrack');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let isTransitioning = false;
    const transitionDuration = 200; // Matches --t-long CSS duration

    // Check if we are in admin edit mode
    const isAdminMode = window.location.hash === '#admin' || window.location.search.includes('admin');

    function initCinematicSystem() {
        // Advanced Text Splitting Setup - ONLY run if NOT in admin mode
        if (!isAdminMode) {
            // Function to split text nodes into animated word wrappers while preserving internal HTML (spans, colors, brs)
            function processNode(node, counter) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent;
                    if (!text) return document.createDocumentFragment();
                    
                    const fragment = document.createDocumentFragment();
                    const tokens = text.split(/(\s+)/);
                    tokens.forEach(token => {
                        if (!token) return;
                        if (/^\s+$/.test(token)) {
                            fragment.appendChild(document.createTextNode(token));
                        } else {
                            const wrapper = document.createElement('span');
                            wrapper.className = 'word-wrapper';
                            const inner = document.createElement('span');
                            inner.className = 'word';
                            inner.style.setProperty('--word-idx', counter.count++);
                            inner.textContent = token;
                            wrapper.appendChild(inner);
                            fragment.appendChild(wrapper);
                        }
                    });
                    return fragment;
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.tagName.toLowerCase() === 'br') {
                        return node.cloneNode(true);
                    }
                    const clone = node.cloneNode(false);
                    Array.from(node.childNodes).forEach(child => {
                        const res = processNode(child, counter);
                        if (res) clone.appendChild(res);
                    });
                    return clone;
                }
                return node.cloneNode(true);
            }

            document.querySelectorAll('.huge-title, .slide-title, .subtitle').forEach(el => {
                const counter = { count: 0 };
                const fragment = document.createDocumentFragment();
                Array.from(el.childNodes).forEach(child => {
                    const res = processNode(child, counter);
                    if (res) fragment.appendChild(res);
                });
                el.innerHTML = '';
                el.appendChild(fragment);
                el.classList.add('anim-title-container');
            });
        } // End !isAdminMode check

        // Layer delay staging
        slides.forEach(slide => {
            const groups = [
                slide.querySelectorAll('.presenter-tag, .slide-tag'),
                slide.querySelectorAll('.anim-title-container'),
                slide.querySelectorAll('.bullet-list li, .list-item, .meta-block, .col-title, .comp-title, .sommaire-card, .chem-formula-box, .chem-dual-item, .timeline-step, .plate-desc, .kinetic-rise'),
                slide.querySelectorAll('.slide-visual, .slide-focus-visual, .visual-cell-1, .visual-cell-2, .plate-img-box, .senefelder-container')
            ];

            let baseDelay = 0.2; // Offset to let scene movement breathe
            let sequenceTime = 0;

            groups.forEach((group, index) => {
                let itemOffset = 0;
                group.forEach(el => {
                    // Assign class behaviors for generic elements
                    if (index === 3) {
                        el.classList.add('anim-visual');
                    } else if (index === 2 || index === 0) {
                        el.classList.add('anim-fade-up');
                    }

                    // Assign CSS variables
                    el.style.setProperty('--base-delay', `${baseDelay + sequenceTime + itemOffset}s`);
                    itemOffset += 0.05; // rapid staccato
                });

                // Allow overlapping timings (don't wait for prev group to finish)
                sequenceTime += 0.15;
            });
        });

        // Initial paint setup
        container.setAttribute('data-direction', 'next');
        slides[currentSlide].classList.add('active');
        void container.offsetWidth; // Force reflow
        updateProgress();
    }

    initCinematicSystem();

    if (isAdminMode) {
        initAdminSystem();
    }

    function initAdminSystem() {
        // Define all elements that should be editable
        const editableTargets = '.press-title, .huge-title, .slide-title, .subtitle, .meta-label, .meta-value, .bullet-list li, .list-item p, .quad-item p, .visual-placeholder, .slider-text, .col-title';

        document.querySelectorAll(editableTargets).forEach(el => {
            el.setAttribute('contenteditable', 'true');
            // Give a visual hint that it's editable
            el.style.outline = '2px dashed rgba(227, 38, 25, 0.5)';
            el.style.outlineOffset = '4px';
            el.style.transition = 'outline 0.2s';

            el.addEventListener('focus', () => el.style.outline = '2px solid rgba(227, 38, 25, 1)');
            el.addEventListener('blur', () => el.style.outline = '2px dashed rgba(227, 38, 25, 0.5)');
        });

        // Sync the 4-layer Cover Title so the user only edits the top white one, and the color plates automatically mirror it
        const mainTitle = document.querySelector('.press-title.screen-white');
        const colorPlates = document.querySelectorAll('.press-title:not(.screen-white)');
        if (mainTitle) {
            colorPlates.forEach(plate => {
                plate.removeAttribute('contenteditable');
                plate.style.outline = 'none'; // hide outline on underlying plates
            });
            mainTitle.addEventListener('input', () => {
                colorPlates.forEach(plate => plate.innerHTML = mainTitle.innerHTML);
            });
        }

        // Inject floating Admin Toolbar
        const toolbar = document.createElement('div');
        toolbar.id = 'adminModeToolbar';
        toolbar.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: var(--color-dark); color: white; padding: 15px 25px; border-radius: 0; z-index: 99999; font-family: var(--font-main); border: 2px solid white; display: flex; align-items: center; gap: 20px;">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 900; letter-spacing: 2px; color: var(--color-accent); font-size: 1.2rem;">MODE ADMIN ACTIF</span>
                    <input type="text" id="adminDocTitle" value="${document.title}" title="Titre de l'onglet" style="margin-top: 5px; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 4px 8px; border-radius: 3px; font-size: 0.8rem; width: 100%;">
                </div>
                <button id="saveAdminChangesBtn" style="background: var(--color-accent); color: white; border: none; padding: 10px 20px; font-weight: 900; cursor: pointer; border-radius: 4px; text-transform: uppercase;">1. Écraser le fichier</button>
            </div>
        `;
        document.body.appendChild(toolbar);

        // Save logic
        document.getElementById('saveAdminChangesBtn').addEventListener('click', async () => {
            const htmlClone = document.documentElement.cloneNode(true);

            // Sync the document title
            const newTitle = document.getElementById('adminDocTitle').value;
            htmlClone.querySelector('title').textContent = newTitle;

            // Remove the admin toolbar from the clone so it doesn't get saved permanently
            const cloneToolbar = htmlClone.querySelector('#adminModeToolbar');
            if (cloneToolbar) cloneToolbar.remove();

            // Clear all structural editor traces
            htmlClone.querySelectorAll('[contenteditable]').forEach(el => {
                el.removeAttribute('contenteditable');
                el.style.outline = '';
                el.style.outlineOffset = '';
                el.style.transition = '';
                if (el.getAttribute('style') === '') el.removeAttribute('style');
            });
            // Clear plate overrides
            htmlClone.querySelectorAll('.press-title:not(.screen-white)').forEach(el => {
                el.style.outline = '';
                if (el.getAttribute('style') === '') el.removeAttribute('style');
            });

            // Prevent saving temporary animation classes that might lock elements
            htmlClone.querySelectorAll('.slide').forEach((s, idx) => {
                s.classList.remove('active', 'outgoing', 'incoming');
                if (idx === 0) s.classList.add('active'); // Reset slide 1 as default active
            });
            htmlClone.querySelector('.presentation-container').setAttribute('data-slide', '1');
            htmlClone.querySelector('.presentation-container').setAttribute('data-direction', 'next');
            const cloneCounter = htmlClone.querySelector('#counterTrack');
            if (cloneCounter) cloneCounter.style.transform = 'translateY(0)';

            // Build html string
            const htmlContent = '<!DOCTYPE html>\\n' + htmlClone.outerHTML;

            // Direct Save to File System API (Modern, overwrites directly)
            if (window.showSaveFilePicker) {
                try {
                    const handle = await window.showSaveFilePicker({
                        suggestedName: 'index.html',
                        types: [{ description: 'Fichier HTML', accept: { 'text/html': ['.html'] } }],
                    });
                    const writable = await handle.createWritable();
                    await writable.write(htmlContent);
                    await writable.close();
                    alert('✅ Modifications enregistrées DIRECTEMENT sur votre fichier principal !\\n\\nVous pouvez recharger la page sans #admin pour voir le résultat.');
                    return; // exit if success
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error('File System API Error:', err);
                    } else {
                        return; // User cancelled
                    }
                }
            }

            // Fallback: Trigger standard invisible file download
            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'index.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            alert("✅ Fichier exporté virtuellement !\\n\\nLe navigateur ne permettant pas l'écrasement direct sous Safari/Ancien Chrome, veuillez remplacer votre ancien HTML avec le fichier qui vient d'être téléchargé.");
        });
    }

    // ==========================================================================
    // INTERACTIVE TIMELINE (AMINE AMAL — SLIDE 04)
    // ==========================================================================
    let historyStep = 0;
    const historyTotalSteps = 4;

    function updateHistoryLineUI(step, animatePop = true) {
        historyStep = Math.max(0, Math.min(step, historyTotalSteps - 1));

        const slide04 = document.getElementById('slide-04');
        if (!slide04) return;

        // 1. Dynamic Rail Fill Progress (Station 1: 0% -> Station 4: 100%)
        const fillBar = document.getElementById('timelineRailFill');
        if (fillBar) {
            const percent = (historyStep / (historyTotalSteps - 1)) * 100;
            fillBar.style.width = `${percent}%`;
        }

        // 2. Future Dots (Three Points appearing at Aluminum Part)
        const futureDots = document.getElementById('timelineFutureDots');
        if (futureDots) {
            if (historyStep === historyTotalSteps - 1) {
                futureDots.classList.add('is-active');
            } else {
                futureDots.classList.remove('is-active');
            }
        }

        // 3. Update Floating Plate Pods (Alternating Up/Down)
        const pods = slide04.querySelectorAll('.floating-plate-pod');
        pods.forEach((pod) => {
            const idx = parseInt(pod.getAttribute('data-step'), 10);
            pod.classList.remove('is-active', 'is-passed', 'is-future', 'pop-in');
            if (idx === historyStep) {
                pod.classList.add('is-active');
                if (animatePop) {
                    pod.classList.add('pop-in');
                }
            } else if (idx < historyStep) {
                pod.classList.add('is-passed');
            } else {
                pod.classList.add('is-future');
            }
        });

        // 4. Update Station Meta Pods (Years & Subtitles)
        const metaPods = slide04.querySelectorAll('.station-meta-pod');
        metaPods.forEach((meta) => {
            const idx = parseInt(meta.getAttribute('data-step'), 10);
            meta.classList.remove('is-active', 'is-passed', 'is-future');
            if (idx === historyStep) {
                meta.classList.add('is-active');
            } else if (idx < historyStep) {
                meta.classList.add('is-passed');
            } else {
                meta.classList.add('is-future');
            }
        });

        // 5. Update Station Bubbles on Rail
        const stations = slide04.querySelectorAll('.timeline-station');
        stations.forEach((station, idx) => {
            station.classList.remove('is-active', 'is-passed', 'is-future');
            if (idx === historyStep) {
                station.classList.add('is-active');
            } else if (idx < historyStep) {
                station.classList.add('is-passed');
            } else {
                station.classList.add('is-future');
            }
        });

        // 6. Header Step Badge
        const badge = document.getElementById('timelineStepBadge');
        if (badge) {
            badge.textContent = `0${historyStep + 1} / 04`;
        }
    }

    function timelineNext() {
        if (historyStep < historyTotalSteps - 1) {
            updateHistoryLineUI(historyStep + 1, true);
            return true; // handled in timeline
        }
        return false; // at end of timeline, advance to next slide
    }

    function timelinePrev() {
        if (historyStep > 0) {
            updateHistoryLineUI(historyStep - 1, false);
            return true; // handled in timeline
        }
        return false; // at start of timeline, go back to previous slide
    }

    // Direct Click Listeners for History Line (Pods, Stations & Meta Labels)
    // ==========================================================================
    // SOMMAIRE STEPPED REVEAL (SLIDE 02 : 01-03 THEN 04-06 ON NEXT)
    // ==========================================================================
    let sommaireStep = 0;

    function updateSommaireUI(step) {
        sommaireStep = step === 1 ? 1 : 0;
        const slide02 = document.getElementById('slide-02');
        if (!slide02) return;
        if (sommaireStep === 1) {
            slide02.classList.add('step-2');
        } else {
            slide02.classList.remove('step-2');
        }
    }

    function sommaireNext() {
        if (sommaireStep < 1) {
            updateSommaireUI(1);
            return true;
        }
        return false;
    }

    function sommairePrev() {
        if (sommaireStep > 0) {
            updateSommaireUI(0);
            return true;
        }
        return false;
    }

    const slide02El = document.getElementById('slide-02');
    if (slide02El) {
        slide02El.addEventListener('click', () => {
            if (sommaireStep === 0) updateSommaireUI(1);
        });
    }

    // ==========================================================================
    // CLOSING SLIDE (SLIDE 20 : MERCI -> DES QUESTIONS ? N'HÉSITEZ PAS !)
    // ==========================================================================
    let closingStep = 0;
    let closingTimer = null;

    function updateClosingUI(step) {
        if (closingTimer) {
            clearTimeout(closingTimer);
            closingTimer = null;
        }
        closingStep = step === 1 ? 1 : 0;
        const slide20 = document.getElementById('slide-20');
        if (!slide20) return;
        if (closingStep === 1) {
            slide20.classList.add('step-questions');
        } else {
            slide20.classList.remove('step-questions');
        }
    }

    function closingNext() {
        if (closingStep < 1) {
            updateClosingUI(1);
            return true;
        }
        return false;
    }

    function closingPrev() {
        if (closingStep > 0) {
            updateClosingUI(0);
            return true;
        }
        return false;
    }

    const slide20El = document.getElementById('slide-20');
    if (slide20El) {
        slide20El.addEventListener('click', () => {
            if (closingStep === 0) updateClosingUI(1);
        });
    }


    const slide04El = document.getElementById('slide-04');
    if (slide04El) {
        slide04El.querySelectorAll('.floating-plate-pod, .timeline-station, .station-meta-pod').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                const step = parseInt(el.getAttribute('data-step'), 10);
                if (!isNaN(step)) updateHistoryLineUI(step, true);
            });
        });
    }

    
    // ==========================================================================
    // PLATE REVEAL (SLIDE 06)
    // ==========================================================================
    let platesStep = 0;
    const platesTotalSteps = 3;

    function updatePlatesUI(step) {
        platesStep = Math.max(0, Math.min(step, platesTotalSteps - 1));
        const slide06 = document.getElementById('slide-06');
        if (!slide06) return;
        const cols = slide06.querySelectorAll('.s6-plate-col');
        cols.forEach((col, idx) => {
            if (idx <= platesStep) {
                col.style.opacity = '1';
                col.style.transform = 'translateY(0)';
            } else {
                col.style.opacity = '0';
                col.style.transform = 'translateY(40px)';
            }
        });
    }

    function platesNext() {
        if (platesStep < platesTotalSteps - 1) {
            updatePlatesUI(platesStep + 1);
            return true;
        }
        return false;
    }

    function platesPrev() {
        if (platesStep > 0) {
            updatePlatesUI(platesStep - 1);
            return true;
        }
        return false;
    }

    
    function goToSlide(index, direction = 'next') {
        if (typeof index !== 'number' || !Number.isInteger(index)) return;
        if (index < 0 || index >= totalSlides) return;
        if (index === currentSlide) return;

        // Clean any unfinished outgoing states immediately so user can transition without delay
        slides.forEach(s => s.classList.remove('outgoing'));

        isTransitioning = true;

        container.setAttribute('data-direction', direction);
        void container.offsetWidth; // Flush CSS cache to commit direction BEFORE transitions trigger

        const current = slides[currentSlide];
        const next = slides[index];

                // Reset Plates state when entering Slide 06
        if (next && next.id === 'slide-06') {
            platesStep = 0;
            updatePlatesUI(0);
        }

        // Reset or initialize Closing slide state when entering Slide 20
        if (next && next.id === 'slide-20') {
            updateClosingUI(0);
            closingTimer = setTimeout(() => {
                updateClosingUI(1);
            }, 3200);
        } else if (closingTimer) {
            clearTimeout(closingTimer);
            closingTimer = null;
        }

        // Reset or initialize Sommaire state when entering Slide 02
        if (next && next.id === 'slide-02') {
            if (direction === 'next') {
                updateSommaireUI(0);
            } else if (direction === 'prev') {
                updateSommaireUI(1);
            }
        }

        // Reset or initialize sub-step state on destination slide
        if (next && (next.id === 'slide-04' || next.dataset.hasSubsteps === 'true')) {
            if (direction === 'next') {
                updateHistoryLineUI(0, true);
            } else if (direction === 'prev') {
                updateHistoryLineUI(historyTotalSteps - 1, false);
            }
        }

        // Wipe phantom states
        slides.forEach(s => {
            if (s !== current && s !== next) {
                s.classList.remove('active', 'outgoing', 'incoming');
            }
        });

        // The cinematic transition sequence
        current.classList.remove('active');
        current.classList.add('outgoing');

        next.classList.remove('outgoing');
        next.classList.add('active');

        // Pause any video when leaving, reset when entering without autoplaying
        current.querySelectorAll('video').forEach(v => {
            v.pause();
            v.dataset.hasStarted = 'false';
            try { if (v.readyState >= 1) v.currentTime = 0; } catch (e) {}
        });
        next.querySelectorAll('video').forEach(v => {
            v.pause();
            v.dataset.hasStarted = 'false';
            try { if (v.readyState >= 1) v.currentTime = 0; } catch (e) {}
        });

        currentSlide = index;
        updateProgress();

        // Release lock and clean classes
        setTimeout(() => {
            current.classList.remove('outgoing');
            isTransitioning = false;
        }, transitionDuration);
    }

    function updateProgress() {
        container.setAttribute('data-slide', currentSlide + 1);
        if (counterTrack) {
            // Translate track upward by 3.5rem per slide index
            counterTrack.style.transform = `translateY(-${currentSlide * 3.5}rem)`;
        }
    }

    function nextSlide() {
        const activeSlide = slides[currentSlide];

        // 1. First Next click on a video slide starts playback; second Next click skips to next slide
        const slideVideo = activeSlide ? activeSlide.querySelector('video') : null;
        if (slideVideo && slideVideo.dataset.hasStarted !== 'true' && slideVideo.paused && !slideVideo.ended && !slideVideo.error && slideVideo.currentTime === 0) {
            slideVideo.dataset.hasStarted = 'true';
            slideVideo.play().catch(e => console.log('Playback prevented', e));
            return;
        }

        // 1a. Closing slide stepped reveal (Slide 20: Merci -> Questions)
        if (activeSlide && activeSlide.id === 'slide-20') {
            const handled = closingNext();
            if (handled) return;
        }

        // 1b. Sommaire stepped reveal (Slide 02: 01-03 then 04-06 on Next)
        if (activeSlide && activeSlide.id === 'slide-02') {
            const handled = sommaireNext();
            if (handled) return;
        }

        // 2. Plates stepped reveal
        if (activeSlide && activeSlide.id === 'slide-06') {
            const handled = platesNext();
            if (handled) return;
        }

        // 3. Timeline stepped reveal
        if (activeSlide && (activeSlide.id === 'slide-04' || activeSlide.dataset.hasSubsteps === 'true')) {
            const handled = timelineNext();
            if (handled) return;
        }

        // 4. Advance to next slide
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1, 'next');
        }
    }

    function prevSlide() {
        const activeSlide = slides[currentSlide];

        // 1. If video is currently playing, intercept Back to pause it only (do not change slide)
        const slideVideo = activeSlide ? activeSlide.querySelector('video') : null;
        if (slideVideo && !slideVideo.paused && !slideVideo.ended) {
            slideVideo.pause();
            return;
        }

        // 1a. Closing slide stepped reveal (Slide 20: Questions -> Merci)
        if (activeSlide && activeSlide.id === 'slide-20') {
            const handled = closingPrev();
            if (handled) return;
        }

        // 1b. Sommaire stepped reveal (Slide 02: 01-03 then 04-06 on Next)
        if (activeSlide && activeSlide.id === 'slide-02') {
            const handled = sommairePrev();
            if (handled) return;
        }

        // 2. Plates stepped reveal
        if (activeSlide && activeSlide.id === 'slide-06') {
            const handled = platesPrev();
            if (handled) return;
        }

        // 3. Timeline stepped reveal
        if (activeSlide && (activeSlide.id === 'slide-04' || activeSlide.dataset.hasSubsteps === 'true')) {
            const handled = timelinePrev();
            if (handled) return;
        }

        // 4. Return to previous slide
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1, 'prev');
        }
    }

    // Bindings
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            prevSlide();
        } else if (e.key === 'F11') {
            e.preventDefault();
            if (window.electronAPI) {
                window.electronAPI.toggleFullScreen();
            }
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    }, { passive: true });

    // === CINEMATIC VIDEO SYSTEM ===
    const videoContainers = document.querySelectorAll('.video-container');
    const backdrop = document.getElementById('videoBackdrop');
    const closeBtn = document.getElementById('videoCloseBtn');
    let activeClone = null;
    let originalVideoNode = null;

    videoContainers.forEach(container => {
        container.addEventListener('click', () => {
            if (activeClone) return;

            // 1. Get exact position of the clicked container
            const rect = container.getBoundingClientRect();
            originalVideoNode = container;

            // hide original so it feels like it detached
            container.style.opacity = '0';

            // 2. Create the clone wrapper
            activeClone = document.createElement('div');
            activeClone.className = 'video-clone';

            // Clone the video tag specifically (excluding the play overlay)
            const vid = container.querySelector('video').cloneNode(true);
            vid.controls = true; // allow user controls in fullscreen
            // autoplay it if we want, or just wait for controls
            vid.play().catch(e => console.log('Autoplay prevented', e));
            activeClone.appendChild(vid);

            // 3. Set clone to original rect (FIRST)
            activeClone.style.top = `${rect.top}px`;
            activeClone.style.left = `${rect.left}px`;
            activeClone.style.width = `${rect.width}px`;
            activeClone.style.height = `${rect.height}px`;

            document.body.appendChild(activeClone);

            // 4. Force reflow to register the starting position
            void activeClone.offsetWidth;

            // 5. Expand to FULLSCREEN (LAST/PLAY)
            activeClone.style.top = '0px';
            activeClone.style.left = '0px';
            activeClone.style.width = '100vw';
            activeClone.style.height = '100vh';

            // 6. Show global backdrop & close button
            backdrop.classList.add('active');
            closeBtn.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', closeVideo);
    backdrop.addEventListener('click', closeVideo);

    function closeVideo() {
        if (!activeClone || !originalVideoNode) return;

        // 1. Get the original container's current rect in case window resized
        const rect = originalVideoNode.getBoundingClientRect();

        // 2. Animate clone back to original position
        activeClone.style.top = `${rect.top}px`;
        activeClone.style.left = `${rect.left}px`;
        activeClone.style.width = `${rect.width}px`;
        activeClone.style.height = `${rect.height}px`;

        // Hide globals
        backdrop.classList.remove('active');
        closeBtn.classList.remove('active');

        // Stop the video
        const vid = activeClone.querySelector('video');
        if (vid) vid.pause();

        // 3. Wait for transition, then cleanup
        setTimeout(() => {
            if (activeClone && activeClone.parentNode) {
                activeClone.parentNode.removeChild(activeClone);
            }
            activeClone = null;
            originalVideoNode.style.opacity = ''; // restore original
            originalVideoNode = null;
        }, transitionDuration); // matches 1400ms --t-long
    }

    // === IDLE MOUSE NAVIGATION SYSTEM ===
    let mouseIdleTimeout;
    const navContainer = document.querySelector('.presentation-nav');

    function wakeUpNav() {
        if (!navContainer) return;
        navContainer.classList.add('nav-visible');

        clearTimeout(mouseIdleTimeout);
        mouseIdleTimeout = setTimeout(() => {
            navContainer.classList.remove('nav-visible');
        }, 2500); // 2.5 seconds of inactivity hides the UI
    }

    document.addEventListener('mousemove', wakeUpNav);
    document.addEventListener('touchstart', wakeUpNav, { passive: true });

    // Wake up on first load
    wakeUpNav();

    // === ELECTRON WINDOW CONTROL EVENTS ===
    const minBtn = document.getElementById('electron-min');
    const maxBtn = document.getElementById('electron-max');
    const closeBtnWin = document.getElementById('electron-close');

    if (window.electronAPI) {
        if (minBtn) minBtn.addEventListener('click', () => window.electronAPI.minimize());
        if (maxBtn) maxBtn.addEventListener('click', () => window.electronAPI.maximize());
        if (closeBtnWin) closeBtnWin.addEventListener('click', () => window.electronAPI.close());
    } else {
        const controls = document.querySelector('.electron-window-controls');
        if (controls) controls.style.display = 'none';
    }
});


// === SLIDE 14 : LENS PROJECTION LINES (tangents from origin marker to zoom circle) ===
(function updateLensLines() {
    const svg = document.getElementById('lens-lines');
    const origin = document.getElementById('lens-origin');
    const bubble = document.getElementById('lens-bubble');
    const a = document.getElementById('lens-line-a');
    const b = document.getElementById('lens-line-b');
    if (svg && origin && bubble && a && b) {
        const box = svg.getBoundingClientRect();
        if (box.width > 0) {
            const scale = svg.clientWidth / box.width || 1;
            const o = origin.getBoundingClientRect();
            const c = bubble.getBoundingClientRect();
            const px = (o.left + o.width / 2 - box.left) * scale;
            const py = (o.top + o.height / 2 - box.top) * scale;
            const cx = (c.left + c.width / 2 - box.left) * scale;
            const cy = (c.top + c.height / 2 - box.top) * scale;
            const r = (c.width / 2) * scale;
            const dx = px - cx, dy = py - cy;
            const d = Math.hypot(dx, dy);
            if (d > r) {
                const phi = Math.atan2(dy, dx);
                const beta = Math.acos(r / d);
                [[a, phi + beta], [b, phi - beta]].forEach(([line, ang]) => {
                    line.setAttribute('x1', px);
                    line.setAttribute('y1', py);
                    line.setAttribute('x2', cx + r * Math.cos(ang));
                    line.setAttribute('y2', cy + r * Math.sin(ang));
                });
            }
        }
    }
    requestAnimationFrame(updateLensLines);
})();


