import { siteContent } from './content/site-content.js?v=20260923-27';
import { renderSite } from './js/components.js?v=20260923-27';
import { chipCamera } from './js/chip-config.js?v=20260923-22';

renderSite(siteContent);

(() => {
  const canvas = document.querySelector('#chip-canvas');
  const ctx = canvas.getContext('2d');
  const chapters = [...document.querySelectorAll('.chapter')];
  const progressLabel = document.querySelector('.progress-label');
  const progressNumber = document.querySelector('.progress-number');
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = innerWidth;
  let height = innerHeight;
  let dpr = Math.min(devicePixelRatio || 1, 2);
  let scrollProgress = 0;
  let journeyPosition = 0;
  let currentStage = 0;
  let pointerX = width * .5;
  let pointerY = height * .5;
  let targetX = pointerX;
  let targetY = pointerY;
  let cameraX = -760;
  let cameraY = 10;
  let cameraZoom = .62;
  let frame = 0;

  // A representative edge-AI inference accelerator data path. The storage
  // hierarchy and compute flow follow the common DMA → SRAM → MAC array →
  // accumulator → vector/activation → output-buffer organization.
  const stages = siteContent.journey.map((stage, index) => ({ ...stage, ...chipCamera[index] }));

  const route = stages.map(({ x, y }) => ({ x, y }));
  const palette = {
    ink: [23, 24, 19],
    sage: [137, 147, 123],
    clay: [129, 81, 61],
    paper: [238, 233, 222]
  };

  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
  const mix = (a, b, amount) => a + (b - a) * amount;
  const smooth = (amount) => amount * amount * (3 - 2 * amount);

  function resize() {
    width = innerWidth;
    height = innerHeight;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function updateScroll() {
    const max = Math.max(1, document.documentElement.scrollHeight - height);
    scrollProgress = scrollY / max;
    root.style.setProperty('--progress', scrollProgress.toFixed(4));

    const focus = scrollY + height * .48;
    let stageIndex = 0;
    let stageFraction = 0;
    chapters.forEach((chapter, index) => {
      const nextTop = chapters[index + 1]?.offsetTop ?? document.documentElement.scrollHeight;
      if (focus >= chapter.offsetTop && focus < nextTop) {
        stageIndex = index;
        stageFraction = clamp((focus - chapter.offsetTop) / Math.max(1, nextTop - chapter.offsetTop));
      }
    });

    currentStage = Math.min(stageIndex, stages.length - 1);
    journeyPosition = currentStage + stageFraction;
    const stage = stages[currentStage];
    if (progressLabel) progressLabel.textContent = stage?.name ?? '';
    if (progressNumber) progressNumber.textContent = String(currentStage).padStart(2, '0');
    document.body.classList.toggle('in-output', currentStage === stages.length - 1);
  }

  function line(x1, y1, x2, y2, alpha = .2, color = palette.ink, lineWidth = 1) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `rgba(${color.join(',')},${alpha})`;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  function arrow(x1, y1, x2, y2, alpha = .35, color = palette.ink) {
    line(x1, y1, x2, y2, alpha, color, 1.4);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 7 * Math.cos(angle - .55), y2 - 7 * Math.sin(angle - .55));
    ctx.lineTo(x2 - 7 * Math.cos(angle + .55), y2 - 7 * Math.sin(angle + .55));
    ctx.closePath();
    ctx.fillStyle = `rgba(${color.join(',')},${alpha})`;
    ctx.fill();
  }

  function node(x, y, radius = 3, color = palette.clay, alpha = .85) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color.join(',')},${alpha})`;
    ctx.fill();
  }

  function roundedRect(x, y, w, h, radius, alpha = .2, fill = null) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    ctx.strokeStyle = `rgba(${palette.ink.join(',')},${alpha})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  function label(text, x, y, alpha = .58, size = 10, align = 'left') {
    ctx.save();
    ctx.font = `500 ${size}px "DM Mono", monospace`;
    ctx.textAlign = align;
    ctx.fillStyle = `rgba(${palette.ink.join(',')},${alpha})`;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function drawHostPort(x, direction) {
    roundedRect(x - 65, -75, 130, 150, 16, .3, 'rgba(245,241,232,.86)');
    for (let i = 0; i < 5; i++) {
      const y = -42 + i * 21;
      line(x - 38, y, x + 38, y, .18);
      node(x + (direction > 0 ? -22 : 22), y, 2.6, i % 2 ? palette.sage : palette.clay, .75);
    }
    label(direction > 0 ? 'HOST INPUT' : 'HOST RESULT', x, -95, .7, 10, 'center');
    label(direction > 0 ? '“WHO IS AKSHAT?”' : 'PROFILE READY', x, 103, .62, 8, 'center');
  }

  function drawDMA(x, caption) {
    roundedRect(x - 72, -95, 144, 190, 14, .3, 'rgba(245,241,232,.9)');
    for (let lane = 0; lane < 4; lane++) {
      const y = -53 + lane * 35;
      arrow(x - 42, y, x + 42, y, .34, lane % 2 ? palette.sage : palette.ink);
    }
    label(caption, x, -116, .72, 10, 'center');
    label('TRANSFER ENGINE', x, 119, .42, 8, 'center');
  }

  function drawGlobalBuffer() {
    roundedRect(-430, -160, 230, 320, 18, .34, 'rgba(245,241,232,.92)');
    label('GLOBAL BUFFER · SRAM', -315, -184, .76, 11, 'center');
    const bankNames = ['ACTIVATIONS', 'WEIGHTS'];
    bankNames.forEach((bank, bankIndex) => {
      const top = -125 + bankIndex * 142;
      label(bank, -405, top, .55, 8);
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 7; col++) {
          ctx.fillStyle = `rgba(${bankIndex ? palette.sage.join(',') : palette.clay.join(',')},${(row + col) % 3 === 0 ? .2 : .08})`;
          ctx.fillRect(-405 + col * 28, top + 14 + row * 22, 20, 13);
        }
      }
    });
  }

  function drawSystolicArray(time) {
    const left = -115;
    const top = -170;
    const cell = 45;
    const count = 7;
    roundedRect(left - 28, top - 28, count * cell + 56, count * cell + 56, 18, .36, 'rgba(245,241,232,.9)');
    label('SYSTOLIC MAC ARRAY', left + count * cell / 2, top - 47, .78, 11, 'center');

    // Advance one anti-diagonal at a time so the compute wave visibly moves
    // from the array's top-left processing element to its bottom-right.
    const waveDiagonal = reducedMotion ? -1 : Math.floor(time * .003) % (count * 2 - 1);

    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        const x = left + col * cell;
        const y = top + row * cell;
        const wave = row + col === waveDiagonal;
        roundedRect(x, y, 34, 34, 5, wave ? .48 : .16, wave ? 'rgba(129,81,61,.18)' : 'rgba(238,233,222,.75)');
        label('×+', x + 17, y + 22, wave ? .9 : .36, 9, 'center');
      }
    }

    // Activations move left → right; weights move top → bottom. Each PE
    // multiplies the two operands and forwards a running partial sum.
    const travel = reducedMotion ? .45 : (time * .00024) % 1;
    const activationRailX = left - 52;
    const weightRailY = top - 72;
    line(activationRailX, top + 17, activationRailX, top + (count - 1) * cell + 17, .25, palette.clay, 1.4);
    line(left + 17, weightRailY, left + (count - 1) * cell + 17, weightRailY, .25, palette.sage, 1.4);
    for (let row = 0; row < count; row++) {
      const y = top + row * cell + 17;
      arrow(activationRailX, y, left - 8, y, .34, palette.clay);
      node(left - 3 + travel * (count * cell - 34), y, 3.4, palette.clay, .9);
    }
    for (let col = 0; col < count; col++) {
      const x = left + col * cell + 17;
      arrow(x, weightRailY, x, top - 8, .34, palette.sage);
      node(x, top - 3 + travel * (count * cell - 34), 3.4, palette.sage, .9);
    }
    label('A / ACTIVATIONS →', left, top + count * cell + 42, .65, 8);
  }

  function drawAccumulators() {
    roundedRect(245, -145, 165, 290, 16, .34, 'rgba(245,241,232,.92)');
    label('ACCUMULATORS', 327, -168, .75, 10, 'center');
    for (let i = 0; i < 7; i++) {
      const y = -112 + i * 34;
      roundedRect(270, y, 115, 23, 4, .18, i % 2 ? 'rgba(137,147,123,.09)' : null);
      label('Σ PSUM', 327, y + 16, .48, 8, 'center');
    }
  }

  function drawVectorUnit() {
    roundedRect(455, -112, 150, 224, 16, .34, 'rgba(245,241,232,.92)');
    label('VECTOR OPS', 530, -135, .75, 10, 'center');
    ['BIAS', 'NORMALIZE'].forEach((operation, index) => {
      const y = -72 + index * 86;
      roundedRect(477, y, 106, 52, 7, .2);
      label(operation, 530, y + 31, .58, 8, 'center');
      if (index === 0) arrow(530, y + 53, 530, y + 81, .3, palette.ink);
    });
  }

  function drawActivationUnit() {
    roundedRect(640, -112, 140, 224, 16, .36, 'rgba(245,241,232,.94)');
    label('NON-LINEAR', 710, -135, .76, 10, 'center');
    label('ACTIVATION', 710, -121, .55, 8, 'center');
    ctx.beginPath();
    ctx.moveTo(662, 72);
    ctx.lineTo(694, 72);
    ctx.bezierCurveTo(704, 72, 704, -58, 718, -58);
    ctx.lineTo(758, -58);
    ctx.strokeStyle = `rgba(${palette.clay.join(',')},.62)`;
    ctx.lineWidth = 2.4;
    ctx.stroke();
    line(662, 0, 758, 0, .16);
    line(710, -82, 710, 82, .16);
    label('GELU / ReLU', 710, 95, .55, 8, 'center');
  }

  function drawOutputBuffer() {
    roundedRect(815, -132, 150, 264, 16, .34, 'rgba(245,241,232,.92)');
    label('OUTPUT BUFFER', 890, -155, .75, 10, 'center');
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 4; col++) {
        ctx.fillStyle = `rgba(${palette.sage.join(',')},${(row + col) % 3 === 0 ? .22 : .08})`;
        ctx.fillRect(839 + col * 26, -102 + row * 26, 18, 16);
      }
    }
  }

  function drawFabric() {
    // Separate paths carry activations and weights from SRAM to the array;
    // activations feed a left-hand rail while weights feed a top rail.
    // The two operand paths remain visually and physically distinct.
    arrow(-198, -65, -167, -65, .46, palette.clay);
    label('ACTIVATION BUS', -196, -80, .6, 7);
    line(-315, -160, -315, -242, .4, palette.sage, 1.4);
    arrow(-315, -242, 17, -242, .4, palette.sage);
    label('WEIGHT BUS', -298, -253, .6, 7);
    // Completed values move through post-processing toward egress.
    arrow(225, 0, 243, 0, .42, palette.ink);
    arrow(412, 0, 453, 0, .42, palette.ink);
    arrow(607, 0, 638, 0, .42, palette.ink);
    arrow(782, 0, 813, 0, .42, palette.ink);
    arrow(967, 0, 1002, 0, .42, palette.ink);
  }

  function drawJourneyPacket() {
    const segmentIndex = Math.min(Math.floor(journeyPosition), route.length - 2);
    const segmentT = journeyPosition >= route.length - 1 ? 1 : smooth(journeyPosition - segmentIndex);
    const start = route[segmentIndex];
    const end = route[Math.min(segmentIndex + 1, route.length - 1)];
    const packetX = mix(start.x, end.x, segmentT);
    const packetY = mix(start.y, end.y, segmentT);
    node(packetX, packetY, 5.5, palette.clay, .98);
    node(packetX, packetY, 18, palette.clay, .12);
    const storyLabel = currentStage < 2 ? 'QUERY' : currentStage < 4 ? 'CONTEXT' : currentStage < 5 ? 'PSUM' : currentStage < 7 ? 'ACTIVATION' : 'RESPONSE';
    label(storyLabel, packetX + 14, packetY - 13, .72, 8);
  }

  function drawWorld(time) {
    roundedRect(-660, -245, 1775, 490, 28, .28, 'rgba(238,233,222,.2)');
    label('AI INFERENCE ACCELERATOR · LOGICAL DATA PATH', -635, -272, .66, 11);
    label('DATA MOVES LEFT → RIGHT', 1005, 274, .52, 9, 'right');

    drawHostPort(-770, 1);
    drawDMA(-575, 'INGRESS DMA');
    drawGlobalBuffer();
    drawSystolicArray(time);
    drawAccumulators();
    drawVectorUnit();
    drawActivationUnit();
    drawOutputBuffer();
    drawDMA(1040, 'EGRESS DMA');
    drawHostPort(1230, -1);
    drawFabric();
    drawJourneyPacket();
  }

  function drawChip(time) {
    ctx.clearRect(0, 0, width, height);
    const baseIndex = Math.min(Math.floor(journeyPosition), stages.length - 1);
    const nextIndex = Math.min(baseIndex + 1, stages.length - 1);
    const localT = smooth(clamp(journeyPosition - baseIndex));
    const targetCameraX = mix(stages[baseIndex].x, stages[nextIndex].x, localT);
    const targetCameraY = mix(stages[baseIndex].y, stages[nextIndex].y, localT);
    const responsiveZoom = width < 700 ? .74 : width < 1100 ? .88 : 1;
    const targetZoom = mix(stages[baseIndex].zoom, stages[nextIndex].zoom, localT) * responsiveZoom;
    const ease = reducedMotion ? 1 : .07;
    cameraX += (targetCameraX - cameraX) * ease;
    cameraY += (targetCameraY - cameraY) * ease;
    cameraZoom += (targetZoom - cameraZoom) * ease;

    const parallaxX = reducedMotion ? 0 : (pointerX - width / 2) * .008;
    const parallaxY = reducedMotion ? 0 : (pointerY - height / 2) * .008;
    ctx.save();
    ctx.translate(width / 2 + parallaxX, height / 2 + parallaxY);
    ctx.scale(cameraZoom, cameraZoom);
    ctx.translate(-cameraX, -cameraY);
    drawWorld(time);
    ctx.restore();
  }

  function animate(time) {
    pointerX += (targetX - pointerX) * .06;
    pointerY += (targetY - pointerY) * .06;
    drawChip(time);
    frame = requestAnimationFrame(animate);
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: .13, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

  addEventListener('resize', resize, { passive: true });
  addEventListener('scroll', updateScroll, { passive: true });
  addEventListener('pointermove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    const cursor = document.querySelector('.cursor-dot');
    if (cursor) cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%,-50%)`;
  }, { passive: true });

  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('mouseenter', () => document.body.classList.add('link-hover'));
    link.addEventListener('mouseleave', () => document.body.classList.remove('link-hover'));
  });

  resize();
  updateScroll();
  frame = requestAnimationFrame(animate);
  addEventListener('pagehide', () => cancelAnimationFrame(frame));
})();
