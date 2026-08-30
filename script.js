/* ============================================================================
   EASY CUSTOMIZATION
   ----------------------------------------------------------------------------
   - CONFIG.finalMessage      -> the letter revealed in the final scene
   - CONFIG.milestoneMessage  -> the little toast shown mid-way through
   - CONFIG.midMilestone / CONFIG.finalMilestone -> how many flowers trigger each
   - CONFIG.flowerPalettes    -> colors used for each flower type
   ============================================================================ */
const CONFIG = {
  midMilestoneMin: 8,
  midMilestoneMax: 12,
  finalMilestone: 15,

  milestoneMessage: 'Look how beautiful it became. ❤️',

  finalMessage:
`Happy 1st Monthsary, Eri! ❤️

I may not be able to take you out for dinner,
but I wanted to make something special for you instead.

Every flower blooms a little brighter because you’re here.
And every little bloom reminds me that having you in my life is something truly beautiful.

I hope this little garden makes you smile,
because you deserve all the beautiful things in the world.

I love youu, Erina. ❤️

— Arc`,

  // Each flower "type" gets a small palette to randomize from, plus a petal count.
  flowerPalettes: {
    rose:      { colors: ['#b3273f', '#8c1f34', '#d84a63'], petals: 10, glow: 'rgba(179,39,63,0.5)' },
    daisy:     { colors: ['#f6ead9', '#ffffff', '#f2dcc4'], petals: 12, glow: 'rgba(246,234,217,0.55)', center: '#e8c073' },
    tulip:     { colors: ['#f2a6b0', '#e0607a', '#c94f6d'], petals: 5,  glow: 'rgba(242,166,176,0.5)' },
    sunflower: { colors: ['#e8c073', '#e0a83f', '#f0cd80'], petals: 14, glow: 'rgba(232,192,115,0.55)', center: '#5c3a21' },
    peony:     { colors: ['#f2a6b0', '#f6ead9', '#d84a63'], petals: 16, glow: 'rgba(242,166,176,0.5)' },
  },
};

const FLOWER_TYPES = Object.keys(CONFIG.flowerPalettes);

// Words of affirmation / reassurance / love that float up as soft bubbles
// throughout the whole session. Edit freely — add, remove, or translate.
const AFFIRMATIONS = [
  'You are so loved',
  'You are enough',
  'You are beautiful, inside and out',
  'You are safe here',
  'Fuerte ka mucho',
  'Proud mucho yo contigo',
  'You make my world brighter',
  'Ikaw akong paboritong tawo',
  'Your smile is my favorite view',
  'You deserve every good thing',
  'Bien querido ka conmigo',
  'I love you endlessly',
  'You are worthy of love',
  'Maayo kaayo imong gibuhat',
  'Mahal na mahal kita',
  'Ikaw akong puluy-anan',
  'Importante kaayo ka para nako',
  'Precious kaayo ka para nako',
  'Valid ang imong feelings',
  'You light up every room',
];

/* ----------------------------------------------------------------------- */

const garden = document.getElementById('garden');
const flowerLayer = document.getElementById('flower-layer');
const instruction = document.getElementById('instruction');
const counterNum = document.getElementById('counter-num');
const milestoneToast = document.getElementById('milestone-toast');
const finalScene = document.getElementById('final-scene');
const letterText = document.getElementById('letter-text');
const plantMoreBtn = document.getElementById('plant-more-btn');
const musicBtn = document.getElementById('music-btn');
const musicIcon = document.getElementById('music-icon');
const bgMusic = document.getElementById('bg-music');
const skyEl = document.getElementById('sky');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let flowerCount = 0;
let midMilestoneTarget = randomInt(CONFIG.midMilestoneMin, CONFIG.midMilestoneMax);
let midMilestoneShown = false;
let finalSceneTriggered = false;
const plantedFlowers = []; // keep refs so we can gather them for the bouquet

/* ============================================================================
   BACKGROUND: stars + fireflies
   ============================================================================ */
function initSky() {
  const starsWrap = document.getElementById('stars');
  const starCount = window.innerWidth < 600 ? 60 : 110;
  const frag = document.createDocumentFragment();

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 70 + '%'; // keep stars mostly in upper sky
    star.style.setProperty('--s', (Math.random() * 1.8 + 1).toFixed(2) + 'px');
    star.style.setProperty('--o', (Math.random() * 0.5 + 0.35).toFixed(2));
    star.style.setProperty('--dur', (Math.random() * 3 + 2.5).toFixed(2) + 's');
    star.style.setProperty('--delay', (Math.random() * 4).toFixed(2) + 's');
    frag.appendChild(star);
  }
  starsWrap.appendChild(frag);

  if (!prefersReducedMotion) {
    const fireWrap = document.getElementById('fireflies');
    const fireCount = window.innerWidth < 600 ? 5 : 9;
    for (let i = 0; i < fireCount; i++) {
      const f = document.createElement('div');
      f.className = 'firefly';
      f.style.left = Math.random() * 100 + '%';
      f.style.top = 40 + Math.random() * 55 + '%';
      f.style.setProperty('--dur', (Math.random() * 6 + 9) + 's');
      f.style.setProperty('--delay', (Math.random() * 6) + 's');
      f.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
      f.style.setProperty('--dy', (Math.random() * -80 - 20) + 'px');
      f.style.setProperty('--dx2', (Math.random() * 80 - 40) + 'px');
      f.style.setProperty('--dy2', (Math.random() * -160 - 60) + 'px');
      fireWrap.appendChild(f);
    }
  }
}

/* ============================================================================
   FLOWER SVG GENERATION
   Builds a small inline SVG "bloom" for a given type, sized ~46-70px.
   Petals are placed with slight per-petal jitter so no two flowers,
   even of the same type, look perfectly identical.
   ============================================================================ */
function buildBloomSVG(type, size, colorSet) {
  const palette = CONFIG.flowerPalettes[type];
  const cx = size / 2;
  const cy = size / 2;
  const petalCount = palette.petals + randomInt(-2, 2);
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

  const petalGroup = document.createElementNS(svgNS, 'g');

  for (let i = 0; i < petalCount; i++) {
    const angle = (360 / petalCount) * i + randomFloat(-6, 6);
    const petalColor = colorSet[i % colorSet.length];
    const petal = document.createElementNS(svgNS, 'ellipse');

    let rx, ry, dist;
    if (type === 'rose' || type === 'peony') {
      // layered, rounder petals for a fuller bloom
      rx = size * 0.20 * randomFloat(0.85, 1.15);
      ry = size * 0.28 * randomFloat(0.9, 1.15);
      dist = size * 0.13 * (1 + (i % 3) * 0.32);
    } else if (type === 'tulip') {
      rx = size * 0.17;
      ry = size * 0.36;
      dist = size * 0.06;
    } else if (type === 'sunflower') {
      rx = size * 0.115;
      ry = size * 0.32;
      dist = size * 0.15;
    } else { // daisy
      rx = size * 0.10;
      ry = size * 0.33;
      dist = size * 0.13;
    }

    const rad = (angle * Math.PI) / 180;
    const px = cx + Math.cos(rad) * dist;
    const py = cy + Math.sin(rad) * dist;

    petal.setAttribute('cx', px);
    petal.setAttribute('cy', py);
    petal.setAttribute('rx', rx);
    petal.setAttribute('ry', ry);
    petal.setAttribute('fill', petalColor);
    petal.setAttribute('opacity', (0.9 + Math.random() * 0.1).toFixed(2));
    petal.setAttribute('transform', `rotate(${angle} ${px} ${py})`);
    petalGroup.appendChild(petal);
  }

  svg.appendChild(petalGroup);

  // Center
  const center = document.createElementNS(svgNS, 'circle');
  center.setAttribute('cx', cx);
  center.setAttribute('cy', cy);
  center.setAttribute('r', size * (type === 'sunflower' ? 0.16 : 0.09));
  center.setAttribute('fill', palette.center || '#e8c073');
  svg.appendChild(center);

  return svg;
}

/* ============================================================================
   PLANT A FLOWER at (x, y) relative to the garden
   ============================================================================ */
function plantFlower(x, y) {
  if (finalSceneTriggered) return;

  spawnRipple(x, y);

  const type = FLOWER_TYPES[randomInt(0, FLOWER_TYPES.length - 1)];
  const palette = CONFIG.flowerPalettes[type];

  const stemHeight = randomInt(90, 150);
  const bloomSize = randomInt(96, 150); // big, clearly-visible blooms like the reference
  const tilt = randomFloat(-6, 6);
  const bloomRotate = randomFloat(-10, 10);
  const growDur = randomFloat(1.0, 1.4);   // slower stem growth, easier to watch
  const bloomDur = randomFloat(1.1, 1.5);  // slower, gentler bloom reveal
  const bloomDelay = growDur;              // bloom only starts once the stem has fully grown
  const swayDur = randomFloat(3.6, 5.4);
  const swayDelay = randomFloat(0, 1.5);

  const flowerEl = document.createElement('div');
  flowerEl.className = 'flower';
  flowerEl.style.left = x + 'px';
  flowerEl.style.setProperty('--tilt', tilt + 'deg');
  flowerEl.style.transform = `rotate(${tilt}deg)`;

  // Stem
  const stem = document.createElement('div');
  stem.className = 'stem';
  stem.style.height = stemHeight + 'px';
  stem.style.setProperty('--grow-dur', growDur + 's');
  flowerEl.appendChild(stem);

  // Leaves (1-2, placed along the stem)
  const leafCount = randomInt(1, 2);
  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    const side = i % 2 === 0 ? 1 : -1;
    const leafY = stemHeight * randomFloat(0.3, 0.6);
    const lw = randomInt(14, 20);
    const lh = randomInt(8, 12);
    leaf.style.setProperty('--lw', lw + 'px');
    leaf.style.setProperty('--lh', lh + 'px');
    leaf.style.bottom = leafY + 'px';
    leaf.style.left = `calc(50% + ${side * (lw * 0.7)}px)`;
    const lrot = side * randomFloat(25, 45);
    leaf.style.setProperty('--lrot', lrot + 'deg');
    leaf.style.setProperty('--leaf-delay', (growDur * 0.5 + i * 0.15) + 's');
    flowerEl.appendChild(leaf);
  }

  // Bloom (SVG)
  const bloomWrap = document.createElement('div');
  bloomWrap.className = 'bloom';
  bloomWrap.style.bottom = stemHeight - 4 + 'px';
  bloomWrap.style.setProperty('--brot', bloomRotate + 'deg');
  bloomWrap.style.setProperty('--bloom-dur', bloomDur + 's');
  bloomWrap.style.setProperty('--bloom-delay', bloomDelay + 's');
  bloomWrap.style.setProperty('--glow-color', palette.glow);
  const svg = buildBloomSVG(type, bloomSize, palette.colors);
  bloomWrap.appendChild(svg);
  flowerEl.appendChild(bloomWrap);

  flowerLayer.appendChild(flowerEl);
  plantedFlowers.push({ el: flowerEl, bloomWrap, stemHeight, x });

  // Start swaying + spawn glow particles once the bloom finishes
  const totalDelay = (bloomDelay + bloomDur) * 1000;
  setTimeout(() => {
    if (!prefersReducedMotion) {
      flowerEl.classList.add('swaying');
      flowerEl.style.setProperty('--sway-dur', swayDur + 's');
      flowerEl.style.setProperty('--sway-delay', swayDelay + 's');
    }
    spawnBloomParticles(x, y - stemHeight, palette.colors[0]);
  }, totalDelay);

  registerFlowerPlanted();
}

/* ============================================================================
   VISUAL EFFECTS: ripple + particle burst
   ============================================================================ */
function spawnRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.className = 'plant-ripple';
  ripple.style.left = x + 'px';
  ripple.style.bottom = (window.innerHeight - y) + 'px';
  garden.appendChild(ripple);
  setTimeout(() => ripple.remove(), 750);
}

function spawnBloomParticles(x, yFromBottom, color) {
  if (prefersReducedMotion) return;
  const count = randomInt(5, 8);
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'bloom-particle';
    p.style.left = x + randomInt(-6, 6) + 'px';
    p.style.bottom = yFromBottom + randomInt(-6, 6) + 'px';
    p.style.background = color;
    p.style.setProperty('--px', randomInt(-30, 30) + 'px');
    p.style.setProperty('--py', randomInt(-30, 10) + 'px');
    garden.appendChild(p);
    setTimeout(() => p.remove(), 950);
  }
}

/* ============================================================================
   PROGRESSION: counter + milestones
   ============================================================================ */
function registerFlowerPlanted() {
  flowerCount++;
  counterNum.textContent = flowerCount;

  if (flowerCount === 1) {
    instruction.classList.add('hidden');
  }

  if (!midMilestoneShown && flowerCount === midMilestoneTarget) {
    midMilestoneShown = true;
    showMilestoneToast(CONFIG.milestoneMessage);
  }

  if (!finalSceneTriggered && flowerCount >= CONFIG.finalMilestone) {
    finalSceneTriggered = true;
    setTimeout(triggerFinalScene, 500);
  }
}

function showMilestoneToast(text) {
  milestoneToast.textContent = text;
  milestoneToast.classList.remove('hidden');
  requestAnimationFrame(() => milestoneToast.classList.add('show'));
  setTimeout(() => {
    milestoneToast.classList.remove('show');
    setTimeout(() => milestoneToast.classList.add('hidden'), 1500);
  }, 3200);
}

/* ============================================================================
   FINAL SCENE: gather flowers into a heart, dim sky, reveal letter
   ============================================================================ */
function triggerFinalScene() {
  const cx = window.innerWidth / 2;
  const cyFromBottom = window.innerHeight * 0.42;
  const scale = Math.min(window.innerWidth, window.innerHeight) / 32;

  // Move every planted flower toward a heart-shaped arrangement
  plantedFlowers.forEach((f, i) => {
    const t = (i / plantedFlowers.length) * Math.PI * 2;
    // classic parametric heart curve
    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

    const targetX = cx + hx * scale - f.x; // relative offset from current left
    const targetYFromBottom = cyFromBottom + hy * scale;
    const targetY = -(targetYFromBottom - f.stemHeight); // vertical shift for the bloom's resting point

    f.el.style.transition = `transform ${2 + Math.random() * 0.6}s cubic-bezier(0.65,0,0.35,1)`;
    f.el.style.transform = `translate(${targetX}px, ${-(targetYFromBottom - 0)}px) scale(${randomFloat(0.26, 0.36)}) rotate(0deg)`;
    f.el.classList.remove('swaying');
  });

  // Dim the sky
  skyEl.style.filter = 'brightness(0.55) saturate(0.85)';

  // Reveal final scene container + bouquet glow
  setTimeout(() => {
    finalScene.classList.remove('hidden');
    requestAnimationFrame(() => finalScene.classList.add('show'));
    typeLetter(CONFIG.finalMessage);
  }, 1400);
}

function typeLetter(fullText) {
  letterText.textContent = '';
  letterText.classList.add('typing');

  if (prefersReducedMotion) {
    letterText.textContent = fullText;
    letterText.classList.remove('typing');
    return;
  }

  let i = 0;
  const speed = 22; // ms per character
  function step() {
    if (i <= fullText.length) {
      letterText.textContent = fullText.slice(0, i);
      i++;
      setTimeout(step, speed);
    } else {
      letterText.classList.remove('typing');
    }
  }
  setTimeout(step, 500);
}

/* Reset back to the garden so the user can keep planting */
plantMoreBtn.addEventListener('click', () => {
  finalScene.classList.remove('show');
  setTimeout(() => finalScene.classList.add('hidden'), 1200);

  skyEl.style.filter = '';

  // Clear old flowers and restore each element's transform for a fresh start
  plantedFlowers.length = 0;
  flowerLayer.innerHTML = '';

  flowerCount = 0;
  counterNum.textContent = '0';
  midMilestoneTarget = randomInt(CONFIG.midMilestoneMin, CONFIG.midMilestoneMax);
  midMilestoneShown = false;
  finalSceneTriggered = false;

  instruction.classList.remove('hidden');
});

/* ============================================================================
   INPUT HANDLING (click + touch, avoiding double-fire and UI taps)
   ============================================================================ */
function handlePlantEvent(clientX, clientY, targetEl) {
  // Ignore taps on UI chrome (music button, letter card, etc.)
  if (targetEl.closest('#music-btn, #final-scene, #counter')) return;
  plantFlower(clientX, clientY);
}

garden.addEventListener('click', (e) => {
  handlePlantEvent(e.clientX, e.clientY, e.target);
});

// Touch handled via click on most mobile browsers already; this guards
// devices where a fast tap doesn't reliably synthesize a click.
let touchHandled = false;
garden.addEventListener('touchend', (e) => {
  if (e.changedTouches.length === 0) return;
  const t = e.changedTouches[0];
  touchHandled = true;
  handlePlantEvent(t.clientX, t.clientY, e.target);
  setTimeout(() => { touchHandled = false; }, 400);
}, { passive: true });

/* ============================================================================
   MUSIC TOGGLE (never autoplays)
   ============================================================================ */
musicBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.volume = 0.55;
    bgMusic.play().catch(() => {
      // File missing or blocked — fail silently, the button just won't animate.
    });
    musicBtn.classList.add('playing');
    musicBtn.setAttribute('aria-pressed', 'true');
    musicBtn.setAttribute('aria-label', 'Pause background music');
    musicIcon.textContent = '♫';
  } else {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
    musicBtn.setAttribute('aria-pressed', 'false');
    musicBtn.setAttribute('aria-label', 'Play background music');
    musicIcon.textContent = '♪';
  }
});

/* ============================================================================
   AFFIRMATION BUBBLES
   Spawns a soft floating word/phrase at a random spot on a random interval,
   continuously for the whole session (from page open until it's closed).
   Purely decorative — pointer-events: none is set in CSS so it never
   blocks planting.
   ============================================================================ */
const bubbleLayer = document.getElementById('bubble-layer');

function spawnAffirmationBubble() {
  const bubble = document.createElement('div');
  bubble.className = 'aff-bubble';
  bubble.textContent = AFFIRMATIONS[randomInt(0, AFFIRMATIONS.length - 1)];

  const startX = randomInt(4, 92); // vw
  bubble.style.left = startX + 'vw';
  bubble.style.setProperty('--bsize', randomFloat(0.85, 1.15).toFixed(2) + 'rem');

  if (prefersReducedMotion) {
    // Static, gently fading in place rather than drifting up the screen.
    bubble.style.setProperty('--bstatic-y', randomInt(10, 70) + 'vh');
    bubble.style.setProperty('--bdur', randomFloat(5, 7).toFixed(1) + 's');
  } else {
    bubble.style.setProperty('--bdur', randomFloat(12, 18).toFixed(1) + 's');
    bubble.style.setProperty('--bdx', randomInt(-60, 60) + 'px');
  }

  bubbleLayer.appendChild(bubble);
  const lifespan = prefersReducedMotion ? 7000 : 19000;
  setTimeout(() => bubble.remove(), lifespan);
}

function startAffirmationBubbles() {
  // Gentle, irregular cadence so bubbles never feel mechanical.
  function loop() {
    spawnAffirmationBubble();
    const nextIn = randomInt(2600, 5200);
    setTimeout(loop, nextIn);
  }
  loop();
}

/* ============================================================================
   UTILITIES
   ============================================================================ */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/* ============================================================================
   INIT
   ============================================================================ */
initSky();
startAffirmationBubbles();
