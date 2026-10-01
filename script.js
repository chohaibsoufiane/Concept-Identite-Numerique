// Antigravity DOM Physics & Interactive 3D Modules Controller

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Window Controls (IPC Bridge from jubilant-umbrella pattern) ──
  const btnMin = document.getElementById('electron-min');
  const btnMax = document.getElementById('electron-max');
  const btnClose = document.getElementById('electron-close');

  if (window.electronAPI) {
    btnMin?.addEventListener('click', () => window.electronAPI.minimize());
    btnMax?.addEventListener('click', () => window.electronAPI.maximize());
    btnClose?.addEventListener('click', () => window.electronAPI.close());
  }

  // ── 2. 2D Antigravity DOM Physics Engine ──
  const viewport = document.getElementById('viewport');
  const nodes = Array.from(document.querySelectorAll('.ag-node'));
  let isPhysicsRunning = true;

  class PhysicsNode {
    constructor(element) {
      this.el = element;
      this.width = 220;
      this.height = 130;
      
      const vWidth = viewport.clientWidth;
      const vHeight = viewport.clientHeight;
      this.x = Math.random() * (vWidth - this.width - 80) + 40;
      this.y = Math.random() * (vHeight - this.height - 80) + 40;
      
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.rot = (Math.random() - 0.5) * 10;
      this.vRot = (Math.random() - 0.5) * 0.15;
    }

    update(width, height) {
      if (!isPhysicsRunning) return;

      this.x += this.vx;
      this.y += this.vy;
      this.rot += this.vRot;

      // Bounce on boundary walls
      if (this.x <= 15) {
        this.x = 15;
        this.vx *= -1;
      } else if (this.x + this.width >= width - 15) {
        this.x = width - 15 - this.width;
        this.vx *= -1;
      }

      if (this.y <= 15) {
        this.y = 15;
        this.vy *= -1;
      } else if (this.y + this.height >= height - 15) {
        this.y = height - 15 - this.height;
        this.vy *= -1;
      }

      this.render();
    }

    render() {
      this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px) rotate(${this.rot}deg)`;
    }
  }

  const physicsBodies = nodes.map(n => new PhysicsNode(n));

  function physicsLoop() {
    if (isPhysicsRunning) {
      const vWidth = viewport.clientWidth;
      const vHeight = viewport.clientHeight;

      // Inter-node collisions (AABB simple push)
      for (let i = 0; i < physicsBodies.length; i++) {
        for (let j = i + 1; j < physicsBodies.length; j++) {
          const b1 = physicsBodies[i];
          const b2 = physicsBodies[j];
          const dx = (b1.x + b1.width / 2) - (b2.x + b2.width / 2);
          const dy = (b1.y + b1.height / 2) - (b2.y + b2.height / 2);
          const dist = Math.hypot(dx, dy);
          const minDist = 180;

          if (dist < minDist && dist > 0) {
            const overlap = (minDist - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;
            b1.x += nx * overlap * 0.2;
            b1.y += ny * overlap * 0.2;
            b2.x -= nx * overlap * 0.2;
            b2.y -= ny * overlap * 0.2;

            b1.vx += nx * 0.1;
            b1.vy += ny * 0.1;
            b2.vx -= nx * 0.1;
            b2.vy -= ny * 0.1;
          }
        }
      }

      physicsBodies.forEach(b => b.update(vWidth, vHeight));
    }
    requestAnimationFrame(physicsLoop);
  }
  requestAnimationFrame(physicsLoop);

  // ── 3. Three.js Presentation Canvas Setup ──
  const canvasContainer = document.getElementById('canvas-container');
  let scene, camera, renderer, animationFrameId;
  let currentGroup = null;

  function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 20);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0x06b6d4, 2.5);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 3, 50);
    pointLight.position.set(-15, -10, 10);
    scene.add(pointLight);

    window.addEventListener('resize', onResize);
  }

  function onResize() {
    if (!renderer || !camera) return;
    camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  }

  initThree();

  // ── 4. Node Presentation Content Definitions ──
  const presentationData = [
    // 0: Iceberg
    {
      title: "1. L'Iceberg de l'Identité Numérique",
      badge: "01",
      steps: [
        {
          tag: "Étape 1 sur 4 : Vue Globale",
          heading: "L'Iceberg vu de loin",
          desc: "L'identité numérique est comme un iceberg géant coupé par la ligne de flottaison : ce que l'on montre n'est qu'une infime fraction de la réalité.",
          tags: ["Vue globale", "Ligne de flottaison", "Partie visible vs cachée"],
          cam: { x: 0, y: 0, z: 22 },
          action: () => {}
        },
        {
          tag: "Étape 2 sur 4 : Le Sommet",
          heading: "Identité Déclarative (Hors de l'eau)",
          desc: "Ce que vous choisissez consciemment de publier : noms, pseudos, photos de profil, biographies et statuts publics.",
          tags: ["Profils publics", "Réseaux sociaux", "Nom et Prénom", "Biographie"],
          cam: { x: 0, y: 6.5, z: 12 },
          action: () => {}
        },
        {
          tag: "Étape 3 sur 4 : La Surface",
          heading: "Identité Agissante (Au ras de l'eau)",
          desc: "Ce que vous faites en ligne au quotidien : vos requêtes, clics, achats et géolocalisations générés par vos interactions.",
          tags: ["Historique de recherche", "Achats en ligne", "Mentions J'aime", "Coordonnées GPS"],
          cam: { x: 0, y: 0.5, z: 13 },
          action: () => {}
        },
        {
          tag: "Étape 4 sur 4 : Les Profondeurs",
          heading: "Identité Calculée (Sous-marine)",
          desc: "La base invisible et massive : algorithmes prédictifs, scoring comportemental et profilage commercial permanent.",
          tags: ["Profilage algorithmique", "E-réputation", "Cookies traceurs", "Catégorisation sociale"],
          cam: { x: 0, y: -7.5, z: 14 },
          action: () => {}
        }
      ],
      setup3D: (group) => {
        // Tip (above water)
        const tipGeo = new THREE.ConeGeometry(3.5, 7, 7);
        const tipMat = new THREE.MeshStandardMaterial({ color: 0xdbeafe, roughness: 0.2, metalness: 0.1, flatShading: true });
        const tip = new THREE.Mesh(tipGeo, tipMat);
        tip.position.y = 3.5;
        group.add(tip);

        // Water plane
        const waterGeo = new THREE.PlaneGeometry(24, 24);
        const waterMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
        const water = new THREE.Mesh(waterGeo, waterMat);
        water.rotation.x = Math.PI / 2;
        group.add(water);

        // Deep Base (under water)
        const baseGeo = new THREE.CylinderGeometry(3.8, 8, 12, 8);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7, metalness: 0.2, flatShading: true });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = -6;
        group.add(base);
      }
    },

    // 1: Traces
    {
      title: "2. La Génération des Traces",
      badge: "02",
      steps: [
        {
          tag: "Étape 1 sur 3 : L'Utilisateur",
          heading: "L'Avatar au centre du Web",
          desc: "Chaque internaute navigue au cœur d'un écosystème numérique interconnecté qui enregistre la moindre pulsation d'activité.",
          tags: ["Identité source", "Activité utilisateur", "Navigation"],
          cam: { x: 0, y: 0, z: 18 },
          action: () => {}
        },
        {
          tag: "Étape 2 sur 3 : Traces Actives",
          heading: "Traces Actives (Volontaires)",
          desc: "Des particules lumineuses jaillissent : tout ce que vous envoyez délibérément vers le cloud.",
          tags: ["Photos & Vidéos", "Commentaires & Posts", "Likes & Partages", "Avis en ligne"],
          cam: { x: 0, y: 2, z: 16 },
          action: () => {
            if (currentGroup && currentGroup.userData.activeParticles) {
              currentGroup.userData.activeParticles.visible = true;
            }
          }
        },
        {
          tag: "Étape 3 sur 3 : Traces Passives",
          heading: "Traces Passives (Invisibles)",
          desc: "L'ombre invisible et la toile de données sous l'avatar : métadonnées et télémétrie enregistrées sans action délibérée.",
          tags: ["Adresse IP & FAI", "Empreinte appareil (Fingerprint)", "Temps de connexion", "Historique de navigation"],
          cam: { x: 0, y: -2, z: 17 },
          action: () => {
            if (currentGroup && currentGroup.userData.passiveNet) {
              currentGroup.userData.passiveNet.visible = true;
            }
          }
        }
      ],
      setup3D: (group) => {
        // Avatar representation (Clean modern head & body)
        const headGeo = new THREE.SphereGeometry(1.8, 32, 32);
        const headMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.5 });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 1.2;
        group.add(head);

        const bodyGeo = new THREE.CylinderGeometry(1.2, 2.5, 3.5, 32);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = -2;
        group.add(body);

        // Active particles (flying upwards)
        const partGeo = new THREE.BufferGeometry();
        const partCount = 120;
        const partPos = new Float32Array(partCount * 3);
        for (let i = 0; i < partCount; i++) {
          partPos[i * 3] = (Math.random() - 0.5) * 8;
          partPos[i * 3 + 1] = Math.random() * 8 + 1;
          partPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
        partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
        const partMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.35, transparent: true, opacity: 0.85 });
        const particles = new THREE.Points(partGeo, partMat);
        particles.visible = false;
        group.add(particles);
        group.userData.activeParticles = particles;

        // Passive Web Lines (Spidernet / Wireframe grid below)
        const gridHelper = new THREE.GridHelper(16, 24, 0xef4444, 0x3b82f6);
        gridHelper.position.y = -4.5;
        gridHelper.visible = false;
        group.add(gridHelper);
        group.userData.passiveNet = gridHelper;
      }
    },

    // 2: Miroir
    {
      title: "3. Le Miroir de l'E-Réputation",
      badge: "03",
      steps: [
        {
          tag: "Étape 1 sur 3 : Face A",
          heading: "Ce que vous pensez que le recruteur voit",
          desc: "Face A : Le profil parfait, poli, sans aspérités. Le CV soigné, la photo professionnelle et les compétences mises en avant.",
          tags: ["Profil LinkedIn soigné", "CV irréprochable", "Image maîtrisée"],
          cam: { x: 0, y: 0, z: 14 },
          action: () => {
            if (currentGroup && currentGroup.userData.mirror) {
              currentGroup.userData.mirror.rotation.y = 0;
            }
            document.getElementById('laser-bar').style.display = 'none';
          }
        },
        {
          tag: "Étape 2 sur 3 : Face B",
          heading: "Le Shadow Profile (Ce qui existe vraiment)",
          desc: "Rotation à 180° : Découverte des archives oubliées, posts de jeunesse, avis compromettants et mentions croisées.",
          tags: ["Vieux commentaires forums", "Photos taguées oubliées", "Recherches indexées", "Résultats Google"],
          cam: { x: 0, y: 0, z: 14 },
          action: () => {
            if (currentGroup && currentGroup.userData.mirror) {
              currentGroup.userData.mirror.rotation.y = Math.PI;
            }
            document.getElementById('laser-bar').style.display = 'none';
          }
        },
        {
          tag: "Étape 3 sur 3 : Scan & Diagnostic",
          heading: "Analyse Laser & Score d'E-Réputation",
          desc: "Le faisceau d'audit balaye votre présence. Les algorithmes synthétisent votre profil d'employabilité et de crédibilité.",
          tags: ["Scan algorithmique", "Score de confiance", "Indexation numérique"],
          cam: { x: 0, y: 0, z: 14 },
          action: () => {
            const laser = document.getElementById('laser-bar');
            laser.style.display = 'block';
            laser.animate([
              { top: '0%' },
              { top: '100%' },
              { top: '0%' }
            ], {
              duration: 2200,
              iterations: Infinity
            });
          }
        }
      ],
      setup3D: (group) => {
        const mirrorCard = new THREE.Group();

        // Face A (Clean blue/white card)
        const faceAGeo = new THREE.BoxGeometry(7, 10, 0.2);
        const faceAMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3, metalness: 0.4 });
        const faceA = new THREE.Mesh(faceAGeo, faceAMat);
        faceA.position.z = 0.1;
        mirrorCard.add(faceA);

        // Face B (Chaotic dark/crimson card)
        const faceBGeo = new THREE.BoxGeometry(7, 10, 0.2);
        const faceBMat = new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.7, metalness: 0.1 });
        const faceB = new THREE.Mesh(faceBGeo, faceBMat);
        faceB.position.z = -0.1;
        faceB.rotation.y = Math.PI;
        mirrorCard.add(faceB);

        group.add(mirrorCard);
        group.userData.mirror = mirrorCard;
      }
    },

    // 3: Faille
    {
      title: "4. La Faille & Cybersécurité",
      badge: "04",
      steps: [
        {
          tag: "Étape 1 sur 3 : Données Protégées",
          heading: "Le Coffre-Fort Numérique",
          desc: "Un cadenas fermé protège vos identifiants et données sensibles. Tout semble sécurisé.",
          tags: ["Chiffrement", "Données sécurisées", "Confidentialité"],
          cam: { x: 0, y: 0, z: 16 },
          action: () => {
            const gf = document.getElementById('glitch-flash');
            gf.classList.remove('active');
            if (currentGroup && currentGroup.userData.padlock) {
              currentGroup.userData.padlock.position.x = 0;
              currentGroup.userData.lockLeft.position.x = -1.2;
              currentGroup.userData.lockRight.position.x = 1.2;
            }
          }
        },
        {
          tag: "Étape 2 sur 3 : L'Attaque",
          heading: "Ingénierie Sociale & Phishing",
          desc: "Simulation d'hameçonnage : un faux email ou portail trompeur incite l'utilisateur à livrer ses accès.",
          tags: ["Phishing", "Fausse page d'authentification", "Piège comportemental"],
          cam: { x: 0, y: 0, z: 15 },
          action: () => {}
        },
        {
          tag: "Étape 3 sur 3 : La Rupture",
          heading: "Cadenas Brisé & Fuite Massive",
          desc: "Le cadenas se fissure violemment ! Les données s'échappent en flux rouge d'alerte maximale.",
          tags: ["Usurpation d'identité", "Fuite de mots de passe", "Compromission de comptes"],
          cam: { x: 0, y: 0, z: 16 },
          action: () => {
            const gf = document.getElementById('glitch-flash');
            gf.classList.add('active');
            setTimeout(() => gf.classList.remove('active'), 250);
            if (currentGroup && currentGroup.userData.lockLeft) {
              currentGroup.userData.lockLeft.position.x = -3.2;
              currentGroup.userData.lockRight.position.x = 3.2;
            }
          }
        }
      ],
      setup3D: (group) => {
        const padlock = new THREE.Group();

        // Shackle
        const ringGeo = new THREE.TorusGeometry(2, 0.4, 16, 32, Math.PI);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.y = 1.6;
        padlock.add(ring);

        // Body split in two halves
        const halfGeo = new THREE.BoxGeometry(2.4, 4, 1.2);
        const leftMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.4, roughness: 0.3 });
        const rightMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.4, roughness: 0.3 });

        const lockLeft = new THREE.Mesh(halfGeo, leftMat);
        lockLeft.position.set(-1.2, -0.6, 0);
        padlock.add(lockLeft);

        const lockRight = new THREE.Mesh(halfGeo, rightMat);
        lockRight.position.set(1.2, -0.6, 0);
        padlock.add(lockRight);

        group.add(padlock);
        group.userData.padlock = padlock;
        group.userData.lockLeft = lockLeft;
        group.userData.lockRight = lockRight;
      }
    },

    // 4: Machine à données
    {
      title: "5. La Machine à Données",
      badge: "05",
      steps: [
        {
          tag: "Étape 1 sur 3 : Collecte",
          heading: "Le Tapis Roulant Industriel",
          desc: "Les données des utilisateurs tombent à flux continu sur les chaînes de traitement des courtiers en données (Data Brokers).",
          tags: ["Collecte massive", "Données brutes", "Télémétrie"],
          cam: { x: 0, y: 3, z: 18 },
          action: () => {}
        },
        {
          tag: "Étape 2 sur 3 : Monétisation",
          heading: "Monétisation : Si c'est gratuit, c'est vous le produit",
          desc: "Les données anonymisées ou ciblées sont transformées en or numérique revendu aux enchères publicitaires en temps réel.",
          tags: ["Monétisation", "Enchères publicitaires RTB", "Capitalisme de surveillance"],
          cam: { x: 0, y: 3, z: 16 },
          action: () => {
            if (currentGroup && currentGroup.userData.coins) {
              currentGroup.userData.coins.visible = true;
            }
          }
        },
        {
          tag: "Étape 3 sur 3 : Régulation",
          heading: "Bouclier RGPD / CNDP",
          desc: "Le tampon réglementaire s'abat pour stopper les abus. Un dôme de protection juridique encadre les libertés numériques.",
          tags: ["RGPD (Europe)", "CNDP (Maroc)", "Droit à l'oubli", "Consentement explicite"],
          cam: { x: 0, y: 1, z: 17 },
          action: () => {
            if (currentGroup && currentGroup.userData.shieldDome) {
              currentGroup.userData.shieldDome.visible = true;
            }
          }
        }
      ],
      setup3D: (group) => {
        // Conveyor belt
        const beltGeo = new THREE.BoxGeometry(14, 0.4, 4);
        const beltMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
        const belt = new THREE.Mesh(beltGeo, beltMat);
        belt.position.y = -2;
        group.add(belt);

        // Data cubes
        for (let i = 0; i < 4; i++) {
          const cubeGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
          const cubeMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.3 });
          const cube = new THREE.Mesh(cubeGeo, cubeMat);
          cube.position.set(-4.5 + i * 3, -1, 0);
          group.add(cube);
        }

        // Gold coins
        const coinsGroup = new THREE.Group();
        for (let i = 0; i < 4; i++) {
          const coinGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.3, 32);
          const coinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });
          const coin = new THREE.Mesh(coinGeo, coinMat);
          coin.rotation.x = Math.PI / 2;
          coin.position.set(-4.5 + i * 3, 1.2, 0);
          coinsGroup.add(coin);
        }
        coinsGroup.visible = false;
        group.add(coinsGroup);
        group.userData.coins = coinsGroup;

        // Protection Shield Dome
        const domeGeo = new THREE.SphereGeometry(6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.3, wireframe: true });
        const dome = new THREE.Mesh(domeGeo, domeMat);
        dome.position.y = -2;
        dome.visible = false;
        group.add(dome);
        group.userData.shieldDome = dome;
      }
    },

    // 5: Panneau de contrôle
    {
      title: "6. Le Panneau de Contrôle & Hygiène",
      badge: "06",
      steps: [
        {
          tag: "Étape 1 sur 3 : Vulnérabilité",
          heading: "Smartphone Excitant : Tout au Rouge",
          desc: "Paramètres par défaut paranoïaques : localisation continue, micros autorisés, historique partagé.",
          tags: ["Géolocalisation forcée", "Cookies tiers actifs", "Accès micro/caméra non restreint"],
          cam: { x: 0, y: 0, z: 16 },
          action: () => {
            if (currentGroup && currentGroup.userData.shield) {
              currentGroup.userData.shield.visible = false;
            }
          }
        },
        {
          tag: "Étape 2 sur 3 : Remédiation",
          heading: "Bascule vers le Vert & Protection",
          desc: "Reprise de contrôle : désactivation du pistage, gestion stricte des cookies et compartimentage des applications.",
          tags: ["VPN & DNS chiffré", "Refus des cookies publicitaires", "Permission ponctuelle"],
          cam: { x: 0, y: 0, z: 15 },
          action: () => {
            if (currentGroup && currentGroup.userData.shield) {
              currentGroup.userData.shield.visible = true;
            }
          }
        },
        {
          tag: "Étape 3 sur 3 : Hygiène Numérique",
          heading: "Validation 2FA & Check-List",
          desc: "Double facteur activé (2FA), mots de passe uniques via gestionnaire. L'identité numérique est désormais fortifiée.",
          tags: ["Authentification 2FA", "Gestionnaire de clés", "Mises à jour régulières", "Présentation terminée !"],
          cam: { x: 0, y: 0, z: 14 },
          action: () => {}
        }
      ],
      setup3D: (group) => {
        // Modern smartphone mockup
        const phoneGeo = new THREE.BoxGeometry(4.5, 9, 0.4);
        const phoneMat = new THREE.MeshStandardMaterial({ color: 0x1e1e2f, roughness: 0.2, metalness: 0.8 });
        const phone = new THREE.Mesh(phoneGeo, phoneMat);
        group.add(phone);

        const screenGeo = new THREE.BoxGeometry(4.1, 8.4, 0.05);
        const screenMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3 });
        const screen = new THREE.Mesh(screenGeo, screenMat);
        screen.position.z = 0.22;
        group.add(screen);

        // Security Shield surrounding phone
        const shieldGeo = new THREE.RingGeometry(3.5, 4.5, 32);
        const shieldMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide });
        const shield = new THREE.Mesh(shieldGeo, shieldMat);
        shield.position.z = 0.3;
        shield.visible = false;
        group.add(shield);
        group.userData.shield = shield;
      }
    }
  ];

  // ── 5. Modal & Progression Logic ──
  const focusOverlay = document.getElementById('focus-overlay');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');
  const stepTag = document.getElementById('step-tag');
  const stepHeading = document.getElementById('step-heading');
  const stepDesc = document.getElementById('step-desc');
  const stepTags = document.getElementById('step-tags');
  const stepProgress = document.getElementById('step-progress');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  let activeNodeIndex = 0;
  let currentStepIndex = 0;

  function openNode(index) {
    activeNodeIndex = index;
    currentStepIndex = 0;
    isPhysicsRunning = false;

    const data = presentationData[index];
    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;

    // Clear old 3D group
    if (currentGroup) {
      scene.remove(currentGroup);
    }
    currentGroup = new THREE.Group();
    data.setup3D(currentGroup);
    scene.add(currentGroup);

    renderStep();
    focusOverlay.classList.add('active');
  }

  function closeNode() {
    focusOverlay.classList.remove('active');
    document.getElementById('laser-bar').style.display = 'none';
    document.getElementById('glitch-flash').classList.remove('active');
    isPhysicsRunning = true;
  }

  function renderStep() {
    const data = presentationData[activeNodeIndex];
    const step = data.steps[currentStepIndex];

    stepTag.textContent = step.tag;
    stepHeading.textContent = step.heading;
    stepDesc.textContent = step.desc;

    stepTags.innerHTML = '';
    step.tags.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag-item';
      span.textContent = t;
      stepTags.appendChild(span);
    });

    // Update dots
    stepProgress.innerHTML = '';
    data.steps.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `prog-dot ${idx === currentStepIndex ? 'active' : ''}`;
      stepProgress.appendChild(dot);
    });

    // Camera target smooth transition
    targetCamPos.set(step.cam.x, step.cam.y, step.cam.z);

    // Run custom step action
    step.action();
  }

  const targetCamPos = new THREE.Vector3(0, 0, 20);

  // Animation render loop
  function animate() {
    requestAnimationFrame(animate);

    // Smooth camera lerp
    camera.position.lerp(targetCamPos, 0.06);

    // Slow rotation of 3D object for elegance
    if (currentGroup) {
      currentGroup.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
  }
  animate();

  // Attach Event Handlers
  nodes.forEach(n => {
    n.addEventListener('click', () => {
      const idx = parseInt(n.dataset.index, 10);
      openNode(idx);
    });
  });

  modalClose.addEventListener('click', closeNode);

  btnNext.addEventListener('click', () => {
    const total = presentationData[activeNodeIndex].steps.length;
    if (currentStepIndex < total - 1) {
      currentStepIndex++;
      renderStep();
    } else {
      closeNode();
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      renderStep();
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!focusOverlay.classList.contains('active')) return;
    if (e.key === 'ArrowRight' || e.key === ' ') {
      btnNext.click();
    } else if (e.key === 'ArrowLeft') {
      btnPrev.click();
    } else if (e.key === 'Escape') {
      closeNode();
    }
  });
});
