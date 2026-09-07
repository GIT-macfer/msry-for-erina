/* ============================================================
   FOR ERI — 1ST MONTHSARY SURPRISE
   Cinematic intro -> star heart -> Earth -> playful question
   -> interactive flower garden -> final letter
   ============================================================ */

const CONFIG = {
  midMilestoneMin: 8,
  midMilestoneMax: 12,
  finalMilestone: 15,
  milestoneMessage: 'Look how beautiful it became. ❤️',
  finalMessage: `Happy 1st Monthsary, Eri! ❤️

I know you accidentally discovered the flowers before I could surprise you.

So... I had to make the universe a little bigger. 🤭

I may not always be able to give you the biggest or most expensive things, but I hope you know that everything I give you comes with a lot of thought, effort, and love.

Every flower you planted here represents another little memory I hope we get to make together.

And among all the stars, all the planets, and all the people in this huge world...

I'm really happy that somehow, I found you.

Thank you for being my favorite person, my favorite notification, my favorite kausap, and one of the best things that happened to me.

Happy first monthsary, baby. ❤️

Here's to more months, more memories, more kulit, more lambing, more adventures, and hopefully many more trips around the sun together.

I love youu, Erina. ❤️

— Marc`,
  flowerPalettes: {
    rose:      { colors: ['#b3273f', '#8c1f34', '#d84a63'], petals: 10, glow: 'rgba(179,39,63,0.5)' },
    daisy:     { colors: ['#f6ead9', '#ffffff', '#f2dcc4'], petals: 12, glow: 'rgba(246,234,217,0.55)', center: '#e8c073' },
    tulip:     { colors: ['#f2a6b0', '#e0607a', '#c94f6d'], petals: 5, glow: 'rgba(242,166,176,0.5)' },
    sunflower: { colors: ['#e8c073', '#e0a83f', '#f0cd80'], petals: 14, glow: 'rgba(232,192,115,0.55)', center: '#5c3a21' },
    peony:     { colors: ['#f2a6b0', '#f6ead9', '#d84a63'], petals: 16, glow: 'rgba(242,166,176,0.5)' }
  }
};

const AFFIRMATIONS = [
  'You are so loved', 'You are enough', 'You are beautiful, inside and out',
  'You make my world brighter', 'Proud mucho yo contigo',
  'Ikaw akong paboritong tawo', 'Your smile is my favorite view',
  'You deserve every good thing', 'I love you endlessly', 'Mahal na mahal kita',
  'Importante kaayo ka para nako', 'Precious kaayo ka para nako',
  'Valid ang imong feelings', 'You light up every room'
];

const FLOWER_TYPES = Object.keys(CONFIG.flowerPalettes);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- DOM ---------- */
const cosmicIntro = document.getElementById('cosmic-intro');
const cosmicStars = document.getElementById('cosmic-stars');
const openingPanel = document.getElementById('intro-opening');
const heartScene = document.getElementById('heart-scene');
const earthScene = document.getElementById('earth-scene');
const questionScene = document.getElementById('question-scene');
const beginJourneyBtn = document.getElementById('begin-journey-btn');
const heartConstellation = document.getElementById('heart-constellation');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const answerZone = document.getElementById('answer-zone');
const questionTease = document.getElementById('question-tease');

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
const bubbleLayer = document.getElementById('bubble-layer');

/* ---------- helpers ---------- */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ============================================================
   CINEMATIC INTRO
   ============================================================ */

function createCosmicStars() {
  if (!cosmicStars) return;
  const count = window.innerWidth < 600 ? 110 : 190;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.className = 'cosmic-star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--cs', randomFloat(1, 3.2).toFixed(2) + 'px');
    star.style.setProperty('--co', randomFloat(0.35, 0.95).toFixed(2));
    star.style.setProperty('--cd', randomFloat(1.8, 4.5).toFixed(2) + 's');
    frag.appendChild(star);
  }
  cosmicStars.appendChild(frag);
}

function createHeartConstellation() {
  if (!heartConstellation) return;
  heartConstellation.innerHTML = '';
  const count = window.innerWidth < 600 ? 105 : 145;

  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.className = 'heart-star';

    const t = Math.random() * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const depth = randomFloat(0.72, 1.03);

    star.style.left = (50 + x * 2.55 * depth) + '%';
    star.style.top = (50 - y * 2.5 * depth) + '%';
    star.style.setProperty('--hs', randomFloat(2, 5).toFixed(1) + 'px');
    star.style.setProperty('--hd', randomFloat(0, 1.8).toFixed(2) + 's');
    heartConstellation.appendChild(star);
  }
}

function setPanel(panel) {
  [openingPanel, heartScene, earthScene, questionScene].forEach(p => {
    if (!p) return;
    const active = p === panel;
    p.classList.toggle('active', active);
    p.setAttribute('aria-hidden', String(!active));
  });
}

function startMusic() {
  if (!bgMusic) return;
  bgMusic.volume = 0.5;
  bgMusic.play().then(() => {
    musicBtn?.classList.add('playing');
    musicBtn?.setAttribute('aria-pressed', 'true');
    if (musicIcon) musicIcon.textContent = '♫';
  }).catch(() => {
    // Browsers can still block audio, or music/music.mp3 may be missing.
  });
}

let journeyStarted = false;
async function startJourney() {
  if (journeyStarted) return;
  journeyStarted = true;
  beginJourneyBtn.disabled = true;
  startMusic();

  cosmicIntro.classList.add('travelling');
  openingPanel.classList.add('panel-exit');
  await wait(prefersReducedMotion ? 50 : 900);

  setPanel(heartScene);
  await wait(prefersReducedMotion ? 80 : 5200);

  heartScene.classList.add('panel-exit');
  await wait(prefersReducedMotion ? 50 : 800);
  setPanel(earthScene);
  await wait(prefersReducedMotion ? 80 : 5200);

  earthScene.classList.add('panel-exit');
  await wait(prefersReducedMotion ? 50 : 800);
  setPanel(questionScene);
}

// Expose the journey globally so the HTML button can call it directly as a reliable fallback.
window.startJourney = startJourney;

beginJourneyBtn?.addEventListener('click', startJourney);

/* ---------- playful YES / NO ---------- */
let noAttempts = 0;
let yesScale = 1;
let takeoverActive = false;
const teases = [
  'Ay? Sure ka? 🤨',
  'Oops. Tumakas siya HAHAHA',
  'Nice try, baby 😌',
  'Hindi yata gumagana yung No 🤔',
  'Parang YES talaga ang tamang sagot 😭❤️',
  'Grabe gusto mo talaga habulin? HAHAHA',
  'Okay baby, pinipilit mo ako 😭',
  'WALA KA NANG CHOICE HAHAHAHA ❤️'
];

function dodgeNo() {
  if (takeoverActive || !noBtn || !answerZone) return;
  noAttempts++;

  const zoneRect = answerZone.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const maxLeft = Math.max(60, zoneRect.width - btnRect.width / 2 - 10);
  const maxTop = Math.max(55, zoneRect.height - btnRect.height / 2 - 10);

  noBtn.style.left = randomFloat(12, 88) + '%';
  noBtn.style.top = randomFloat(18, 84) + '%';
  noBtn.style.setProperty('--no-rot', randomInt(-18, 18) + 'deg');
  noBtn.classList.add('dodging');

  yesScale = Math.min(2.35, yesScale + 0.2);
  yesBtn.style.setProperty('--yes-scale', yesScale.toFixed(2));
  questionTease.textContent = teases[Math.min(noAttempts - 1, teases.length - 1)];

  if (noAttempts >= 8) activateYesTakeover();
}

function activateYesTakeover() {
  if (takeoverActive) return;
  takeoverActive = true;
  questionTease.textContent = 'WALA KA NANG CHOICE HAHAHAHAHA 😭❤️';
  noBtn.style.opacity = '0';
  noBtn.style.pointerEvents = 'none';
  yesBtn.classList.add('takeover');
  yesBtn.textContent = 'YES ❤️ HAHAHAHA';
}

noBtn?.addEventListener('mouseenter', dodgeNo);
noBtn?.addEventListener('pointerdown', e => {
  e.preventDefault();
  dodgeNo();
});
noBtn?.addEventListener('click', e => {
  e.preventDefault();
  dodgeNo();
});

questionScene?.addEventListener('pointermove', e => {
  if (takeoverActive || !questionScene.classList.contains('active')) return;
  const r = noBtn.getBoundingClientRect();
  const dx = e.clientX - (r.left + r.width / 2);
  const dy = e.clientY - (r.top + r.height / 2);
  if (Math.hypot(dx, dy) < 75) dodgeNo();
});

function makeHeartBurst() {
  const burst = document.createElement('div');
  burst.className = 'yes-burst';
  document.body.appendChild(burst);

  for (let i = 0; i < 42; i++) {
    const item = document.createElement('span');
    item.textContent = Math.random() < 0.72 ? '❤️' : '✨';
    item.style.left = randomInt(2, 98) + 'vw';
    item.style.setProperty('--burst-delay', randomFloat(0, 1.3).toFixed(2) + 's');
    item.style.setProperty('--burst-size', randomFloat(0.8, 2.1).toFixed(2) + 'rem');
    burst.appendChild(item);
  }
  setTimeout(() => burst.remove(), 4300);
}

async function acceptYes() {
  if (yesBtn.disabled) return;
  yesBtn.disabled = true;
  yesBtn.textContent = 'I KNEW IT ❤️';
  yesBtn.classList.add('accepted');
  makeHeartBurst();

  await wait(prefersReducedMotion ? 100 : 1800);
  cosmicIntro.classList.add('finished');
  garden.classList.remove('garden-locked');
  garden.classList.add('garden-unlocked');
  instruction.textContent = '✿ Now plant our little garden ✿';
  startAffirmationBubbles();
}

yesBtn?.addEventListener('click', acceptYes);

/* ============================================================
   GARDEN BACKGROUND
   ============================================================ */
function initSky() {
  const starsWrap = document.getElementById('stars');
  if (!starsWrap) return;
  const starCount = window.innerWidth < 600 ? 60 : 110;
  const frag = document.createDocumentFragment();

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 70 + '%';
    star.style.setProperty('--s', randomFloat(1, 2.8).toFixed(2) + 'px');
    star.style.setProperty('--o', randomFloat(0.35, 0.85).toFixed(2));
    star.style.setProperty('--dur', randomFloat(2.5, 5.5).toFixed(2) + 's');
    star.style.setProperty('--delay', randomFloat(0, 4).toFixed(2) + 's');
    frag.appendChild(star);
  }
  starsWrap.appendChild(frag);

  if (!prefersReducedMotion) {
    const fireWrap = document.getElementById('fireflies');
    if (!fireWrap) return;
    const fireCount = window.innerWidth < 600 ? 5 : 9;
    for (let i = 0; i < fireCount; i++) {
      const f = document.createElement('div');
      f.className = 'firefly';
      f.style.left = Math.random() * 100 + '%';
      f.style.top = 40 + Math.random() * 55 + '%';
      f.style.setProperty('--dur', randomFloat(9, 15) + 's');
      f.style.setProperty('--delay', randomFloat(0, 6) + 's');
      f.style.setProperty('--dx', randomInt(-40, 40) + 'px');
      f.style.setProperty('--dy', randomInt(-100, -20) + 'px');
      f.style.setProperty('--dx2', randomInt(-40, 40) + 'px');
      f.style.setProperty('--dy2', randomInt(-160, -60) + 'px');
      fireWrap.appendChild(f);
    }
  }
}

/* ============================================================
   FLOWERS
   ============================================================ */
let flowerCount = 0;
let midMilestoneTarget = randomInt(CONFIG.midMilestoneMin, CONFIG.midMilestoneMax);
let midMilestoneShown = false;
let finalSceneTriggered = false;
const plantedFlowers = [];

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
  const group = document.createElementNS(svgNS, 'g');

  for (let i = 0; i < petalCount; i++) {
    const angle = (360 / petalCount) * i + randomFloat(-6, 6);
    const petal = document.createElementNS(svgNS, 'ellipse');
    let rx, ry, dist;

    if (type === 'rose' || type === 'peony') {
      rx = size * 0.20 * randomFloat(0.85, 1.15);
      ry = size * 0.28 * randomFloat(0.9, 1.15);
      dist = size * 0.13 * (1 + (i % 3) * 0.32);
    } else if (type === 'tulip') {
      rx = size * 0.17; ry = size * 0.36; dist = size * 0.06;
    } else if (type === 'sunflower') {
      rx = size * 0.115; ry = size * 0.32; dist = size * 0.15;
    } else {
      rx = size * 0.10; ry = size * 0.33; dist = size * 0.13;
    }

    const rad = angle * Math.PI / 180;
    const px = cx + Math.cos(rad) * dist;
    const py = cy + Math.sin(rad) * dist;
    petal.setAttribute('cx', px);
    petal.setAttribute('cy', py);
    petal.setAttribute('rx', rx);
    petal.setAttribute('ry', ry);
    petal.setAttribute('fill', colorSet[i % colorSet.length]);
    petal.setAttribute('opacity', randomFloat(0.9, 1).toFixed(2));
    petal.setAttribute('transform', `rotate(${angle} ${px} ${py})`);
    group.appendChild(petal);
  }

  svg.appendChild(group);
  const center = document.createElementNS(svgNS, 'circle');
  center.setAttribute('cx', cx);
  center.setAttribute('cy', cy);
  center.setAttribute('r', size * (type === 'sunflower' ? 0.16 : 0.09));
  center.setAttribute('fill', palette.center || '#e8c073');
  svg.appendChild(center);
  return svg;
}

function plantFlower(x, y) {
  if (finalSceneTriggered) return;
  spawnRipple(x, y);

  const type = FLOWER_TYPES[randomInt(0, FLOWER_TYPES.length - 1)];
  const palette = CONFIG.flowerPalettes[type];
  const stemHeight = randomInt(90, 150);
  const bloomSize = randomInt(96, 150);
  const growDur = randomFloat(1.0, 1.4);
  const bloomDur = randomFloat(1.1, 1.5);

  const flowerEl = document.createElement('div');
  flowerEl.className = 'flower';
  flowerEl.style.left = x + 'px';
  flowerEl.style.transform = `rotate(${randomFloat(-6, 6)}deg)`;

  const stem = document.createElement('div');
  stem.className = 'stem';
  stem.style.height = stemHeight + 'px';
  stem.style.setProperty('--grow-dur', growDur + 's');
  flowerEl.appendChild(stem);

  const leafCount = randomInt(1, 2);
  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    const side = i % 2 === 0 ? 1 : -1;
    const lw = randomInt(14, 20);
    leaf.style.setProperty('--lw', lw + 'px');
    leaf.style.setProperty('--lh', randomInt(8, 12) + 'px');
    leaf.style.bottom = stemHeight * randomFloat(0.3, 0.6) + 'px';
    leaf.style.left = `calc(50% + ${side * (lw * 0.7)}px)`;
    leaf.style.setProperty('--lrot', side * randomFloat(25, 45) + 'deg');
    leaf.style.setProperty('--leaf-delay', (growDur * 0.5 + i * 0.15) + 's');
    flowerEl.appendChild(leaf);
  }

  const bloom = document.createElement('div');
  bloom.className = 'bloom';
  bloom.style.bottom = stemHeight - 4 + 'px';
  bloom.style.setProperty('--brot', randomFloat(-10, 10) + 'deg');
  bloom.style.setProperty('--bloom-dur', bloomDur + 's');
  bloom.style.setProperty('--bloom-delay', growDur + 's');
  bloom.style.setProperty('--glow-color', palette.glow);
  bloom.appendChild(buildBloomSVG(type, bloomSize, palette.colors));
  flowerEl.appendChild(bloom);

  flowerLayer.appendChild(flowerEl);
  plantedFlowers.push({ el: flowerEl, stemHeight, x });

  setTimeout(() => {
    if (!prefersReducedMotion) {
      flowerEl.classList.add('swaying');
      flowerEl.style.setProperty('--sway-dur', randomFloat(3.6, 5.4) + 's');
      flowerEl.style.setProperty('--sway-delay', randomFloat(0, 1.5) + 's');
    }
    spawnBloomParticles(x, y - stemHeight, palette.colors[0]);
  }, (growDur + bloomDur) * 1000);

  registerFlowerPlanted();
}

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

function registerFlowerPlanted() {
  flowerCount++;
  counterNum.textContent = flowerCount;
  if (flowerCount === 1) instruction.classList.add('hidden');

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

function triggerFinalScene() {
  const cx = window.innerWidth / 2;
  const cyFromBottom = window.innerHeight * 0.42;
  const scale = Math.min(window.innerWidth, window.innerHeight) / 32;

  plantedFlowers.forEach((f, i) => {
    const t = (i / plantedFlowers.length) * Math.PI * 2;
    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const targetX = cx + hx * scale - f.x;
    const targetY = cyFromBottom + hy * scale;
    f.el.classList.remove('swaying');
    f.el.style.transition = `transform ${randomFloat(2, 2.6)}s cubic-bezier(0.65,0,0.35,1)`;
    f.el.style.transform = `translate(${targetX}px, ${-targetY}px) scale(${randomFloat(0.26, 0.36)}) rotate(0deg)`;
  });

  skyEl.style.filter = 'brightness(0.5) saturate(0.85)';
  setTimeout(() => {
    finalScene.classList.remove('hidden');
    finalScene.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => finalScene.classList.add('show'));
    typeLetter(CONFIG.finalMessage);
  }, 1450);
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
  const speed = 22;
  function step() {
    if (i <= fullText.length) {
      letterText.textContent = fullText.slice(0, i++);
      setTimeout(step, speed);
    } else {
      letterText.classList.remove('typing');
    }
  }
  setTimeout(step, 400);
}

plantMoreBtn?.addEventListener('click', () => {
  finalScene.classList.remove('show');
  finalScene.setAttribute('aria-hidden', 'true');
  setTimeout(() => finalScene.classList.add('hidden'), 900);
  skyEl.style.filter = '';
  plantedFlowers.length = 0;
  flowerLayer.innerHTML = '';
  flowerCount = 0;
  counterNum.textContent = '0';
  midMilestoneTarget = randomInt(CONFIG.midMilestoneMin, CONFIG.midMilestoneMax);
  midMilestoneShown = false;
  finalSceneTriggered = false;
  instruction.classList.remove('hidden');
  instruction.textContent = '✿ Click anywhere to plant another garden ✿';
});

function handlePlantEvent(clientX, clientY, targetEl) {
  if (targetEl.closest('#music-btn, #final-scene, #counter')) return;
  plantFlower(clientX, clientY);
}

garden?.addEventListener('click', e => {
  if (!garden.classList.contains('garden-unlocked')) return;
  handlePlantEvent(e.clientX, e.clientY, e.target);
});

/* ============================================================
   MUSIC
   ============================================================ */
musicBtn?.addEventListener('click', e => {
  e.stopPropagation();
  if (!bgMusic) return;

  if (bgMusic.paused) {
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
      musicBtn.classList.add('playing');
      musicBtn.setAttribute('aria-pressed', 'true');
      musicBtn.setAttribute('aria-label', 'Pause background music');
      musicIcon.textContent = '♫';
    }).catch(() => {});
  } else {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
    musicBtn.setAttribute('aria-pressed', 'false');
    musicBtn.setAttribute('aria-label', 'Play background music');
    musicIcon.textContent = '♪';
  }
});

/* ============================================================
   AFFIRMATION BUBBLES
   ============================================================ */
let affirmationLoopStarted = false;
function spawnAffirmationBubble() {
  if (!bubbleLayer || !garden.classList.contains('garden-unlocked')) return;
  const bubble = document.createElement('div');
  bubble.className = 'aff-bubble';
  bubble.textContent = AFFIRMATIONS[randomInt(0, AFFIRMATIONS.length - 1)];
  bubble.style.left = randomInt(4, 92) + 'vw';
  bubble.style.setProperty('--bsize', randomFloat(0.85, 1.15).toFixed(2) + 'rem');
  bubble.style.setProperty('--bdur', randomFloat(12, 18).toFixed(1) + 's');
  bubble.style.setProperty('--bdx', randomInt(-60, 60) + 'px');
  bubbleLayer.appendChild(bubble);
  setTimeout(() => bubble.remove(), 19000);
}

function startAffirmationBubbles() {
  if (affirmationLoopStarted) return;
  affirmationLoopStarted = true;
  function loop() {
    spawnAffirmationBubble();
    setTimeout(loop, randomInt(2600, 5200));
  }
  loop();
}

/* ---------- init ---------- */
createCosmicStars();
createHeartConstellation();
initSky();

console.log('%cHi Eri ❤️', 'font-size:24px;color:#f2a6b0;font-weight:bold');
console.log('%cMarc really did code this whole thing for you HAHAHA.', 'font-size:14px;color:#e8c073');
