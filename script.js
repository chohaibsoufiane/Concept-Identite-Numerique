// Interactive 3D Presentation Slide Controller with Verified Electron Window Controls

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Bulletproof Electron Window Controls ──
  const btnMin = document.getElementById('electron-min');
  const btnMax = document.getElementById('electron-max');
  const btnClose = document.getElementById('electron-close');

  if (window.electronAPI) {
    if (btnMin) btnMin.addEventListener('click', (e) => { e.stopPropagation(); window.electronAPI.minimize(); });
    if (btnMax) btnMax.addEventListener('click', (e) => { e.stopPropagation(); window.electronAPI.maximize(); });
    if (btnClose) btnClose.addEventListener('click', (e) => { e.stopPropagation(); window.electronAPI.close(); });
  }

  // ── 2. Slides Management & State ──
  const slides = Array.from(document.querySelectorAll('.presentation-slide'));
  const currentNumEl = document.getElementById('current-slide-num');
  const totalNumEl = document.getElementById('total-slides-num');
  const dotsContainer = document.getElementById('nav-dots-container');
  const prevBtn = document.getElementById('nav-prev-btn');
  const nextBtn = document.getElementById('nav-next-btn');

  let activeIndex = 0;
  const totalSlides = slides.length;
  if (totalNumEl) totalNumEl.textContent = String(totalSlides).padStart(2, '0');

  // Build navigation dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `nav-dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => switchSlide(idx));
    dotsContainer.appendChild(dot);
  });

  function switchSlide(targetIndex) {
    if (targetIndex < 0 || targetIndex >= totalSlides || targetIndex === activeIndex) return;

    const currentSlide = slides[activeIndex];
    const targetSlide = slides[targetIndex];

    currentSlide.classList.remove('active');
    currentSlide.classList.add('outgoing-left');
    setTimeout(() => currentSlide.classList.remove('outgoing-left'), 500);

    targetSlide.classList.add('active');
    activeIndex = targetIndex;

    // Update numbers and dots
    if (currentNumEl) currentNumEl.textContent = String(activeIndex + 1).padStart(2, '0');
    const allDots = dotsContainer.querySelectorAll('.nav-dot');
    allDots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));

    // Notify corresponding 3D scene
    onSlideActivated(activeIndex);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => switchSlide(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => switchSlide(activeIndex + 1));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      switchSlide(activeIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      switchSlide(activeIndex - 1);
    } else if (e.key === 'F11' && window.electronAPI) {
      window.electronAPI.toggleFullScreen();
    }
  });

  // ── 3. Three.js 3D Scenes for Each Slide ──
  const scenes3D = [];

  function create3DScene(canvasId, setupFn) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 16);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x06b6d4, 2.5);
    dirLight.position.set(10, 15, 12);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 2, 40);
    pointLight.position.set(-10, -10, 10);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    const customUpdate = setupFn(group, scene, camera);

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
    }

    return { renderer, scene, camera, group, customUpdate, resize };
  }

  // Slide 0: Cover Holographic Sphere
  scenes3D[0] = create3DScene('canvas-slide-0', (group) => {
    const coreGeo = new THREE.IcosahedronGeometry(4.2, 2);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, wireframe: true });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const glowGeo = new THREE.SphereGeometry(3.2, 32, 32);
    const glowMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.2, metalness: 0.8 });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    group.add(glow);

    return () => {
      core.rotation.y += 0.006;
      core.rotation.x += 0.003;
      glow.rotation.y -= 0.004;
    };
  });

  // Slide 1: Iceberg Visible Tip (Above Water)
  scenes3D[1] = create3DScene('canvas-slide-1', (group, scene, camera) => {
    camera.position.set(0, 1, 14);

    const tipGeo = new THREE.ConeGeometry(3.5, 7.5, 7);
    const tipMat = new THREE.MeshStandardMaterial({ color: 0xdbeafe, roughness: 0.2, metalness: 0.1, flatShading: true });
    const tip = new THREE.Mesh(tipGeo, tipMat);
    tip.position.y = 1.5;
    group.add(tip);

    const waterGeo = new THREE.PlaneGeometry(24, 24);
    const waterMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.45, side: THREE.DoubleSide });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = Math.PI / 2;
    water.position.y = -2.25;
    group.add(water);

    return () => {
      tip.rotation.y += 0.005;
    };
  });

  // Slide 2: Iceberg Deep Base (Underwater)
  scenes3D[2] = create3DScene('canvas-slide-2', (group, scene, camera) => {
    camera.position.set(0, -2, 16);

    const baseGeo = new THREE.CylinderGeometry(4, 9, 13, 8);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, metalness: 0.3, flatShading: true });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -2;
    group.add(base);

    const waterGeo = new THREE.PlaneGeometry(28, 28);
    const waterMat = new THREE.MeshBasicMaterial({ color: 0x0369a1, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = Math.PI / 2;
    water.position.y = 4.5;
    group.add(water);

    return () => {
      base.rotation.y += 0.005;
    };
  });

  // Slide 3: Trace Generation (Avatar & Flying Particle Stream)
  scenes3D[3] = create3DScene('canvas-slide-3', (group) => {
    const headGeo = new THREE.SphereGeometry(1.8, 32, 32);
    const headMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.6, roughness: 0.2 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.8;
    group.add(head);

    const bodyGeo = new THREE.CylinderGeometry(1.2, 2.6, 3.8, 32);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = -1.6;
    group.add(body);

    // Flowing data particles
    const count = 160;
    const partGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = Math.random() * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const partMat = new THREE.PointsMaterial({ color: 0x06b6d4, size: 0.35, transparent: true, opacity: 0.9 });
    const points = new THREE.Points(partGeo, partMat);
    group.add(points);

    // Passive grid lines below
    const gridHelper = new THREE.GridHelper(16, 16, 0xef4444, 0x3b82f6);
    gridHelper.position.y = -3.8;
    group.add(gridHelper);

    return () => {
      const arr = points.geometry.attributes.position.array;
      for (let i = 1; i < arr.length; i += 3) {
        arr[i] += 0.04;
        if (arr[i] > 8) arr[i] = 0;
      }
      points.geometry.attributes.position.needsUpdate = true;
      group.rotation.y += 0.004;
    };
  });

  // Slide 4: E-Reputation Mirror
  scenes3D[4] = create3DScene('canvas-slide-4', (group) => {
    const cardGroup = new THREE.Group();

    // Face A (Bright clean side)
    const faceAGeo = new THREE.BoxGeometry(7, 10, 0.2);
    const faceAMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.4, roughness: 0.3 });
    const faceA = new THREE.Mesh(faceAGeo, faceAMat);
    faceA.position.z = 0.1;
    cardGroup.add(faceA);

    // Face B (Shadow Profile crimson side)
    const faceBGeo = new THREE.BoxGeometry(7, 10, 0.2);
    const faceBMat = new THREE.MeshStandardMaterial({ color: 0x881337, metalness: 0.3, roughness: 0.4 });
    const faceB = new THREE.Mesh(faceBGeo, faceBMat);
    faceB.position.z = -0.1;
    faceB.rotation.y = Math.PI;
    cardGroup.add(faceB);

    group.add(cardGroup);

    return () => {
      cardGroup.rotation.y += 0.012;
    };
  });

  // Slide 5: The Security Breach (Fractured Padlock)
  scenes3D[5] = create3DScene('canvas-slide-5', (group) => {
    const lockGroup = new THREE.Group();

    const ringGeo = new THREE.TorusGeometry(2.4, 0.45, 16, 32, Math.PI);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 2.2;
    lockGroup.add(ring);

    // Two split halves
    const halfGeo = new THREE.BoxGeometry(2.6, 4.4, 1.4);
    const halfMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.5, roughness: 0.2 });

    const left = new THREE.Mesh(halfGeo, halfMat);
    left.position.set(-1.8, -0.6, 0);
    lockGroup.add(left);

    const right = new THREE.Mesh(halfGeo, halfMat);
    right.position.set(1.8, -0.6, 0);
    lockGroup.add(right);

    group.add(lockGroup);

    return () => {
      lockGroup.rotation.y += 0.006;
    };
  });

  // Slide 6: Industrial Data Conveyor & Shield Dome
  scenes3D[6] = create3DScene('canvas-slide-6', (group) => {
    const beltGeo = new THREE.BoxGeometry(14, 0.4, 4);
    const beltMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });
    const belt = new THREE.Mesh(beltGeo, beltMat);
    belt.position.y = -2;
    group.add(belt);

    // Data gold coins
    for (let i = 0; i < 4; i++) {
      const coinGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.35, 32);
      const coinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });
      const coin = new THREE.Mesh(coinGeo, coinMat);
      coin.position.set(-4.5 + i * 3, -0.8, 0);
      group.add(coin);
    }

    // Protection Shield Dome
    const domeGeo = new THREE.SphereGeometry(6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.35, wireframe: true });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = -2;
    group.add(dome);

    return () => {
      dome.rotation.y += 0.005;
      group.rotation.y += 0.003;
    };
  });

  // Slide 7: Control Panel & 2FA Smartphone
  scenes3D[7] = create3DScene('canvas-slide-7', (group) => {
    const phoneGeo = new THREE.BoxGeometry(4.8, 9.4, 0.45);
    const phoneMat = new THREE.MeshStandardMaterial({ color: 0x1e1e2f, roughness: 0.2, metalness: 0.8 });
    const phone = new THREE.Mesh(phoneGeo, phoneMat);
    group.add(phone);

    const screenGeo = new THREE.BoxGeometry(4.3, 8.8, 0.05);
    const screenMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.2 });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = 0.24;
    group.add(screen);

    const shieldGeo = new THREE.RingGeometry(3.6, 4.8, 32);
    const shieldMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide });
    const shield = new THREE.Mesh(shieldGeo, shieldMat);
    shield.position.z = 0.35;
    group.add(shield);

    return () => {
      shield.rotation.z += 0.01;
      group.rotation.y += 0.006;
    };
  });

  // ── 4. Main 3D Render Loop ──
  function onSlideActivated(idx) {
    if (scenes3D[idx]) {
      scenes3D[idx].resize();
    }
  }

  function renderLoop() {
    requestAnimationFrame(renderLoop);
    const currentScene = scenes3D[activeIndex];
    if (currentScene && currentScene.renderer) {
      if (currentScene.customUpdate) currentScene.customUpdate();
      currentScene.renderer.render(currentScene.scene, currentScene.camera);
    }
  }

  // Handle Window Resize for all Canvases
  window.addEventListener('resize', () => {
    scenes3D.forEach(s => {
      if (s && s.resize) s.resize();
    });
  });

  // Initial resize and start loop
  setTimeout(() => {
    scenes3D.forEach(s => {
      if (s && s.resize) s.resize();
    });
  }, 100);

  renderLoop();
});
