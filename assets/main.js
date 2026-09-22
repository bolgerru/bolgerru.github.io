// Russell Bolger: small progressive enhancements. The page is complete without JS.
(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');
  window.__rbReady = true;
  window.__rbBoot = true; // tells the <head> failsafe this script can run the boot overlay

  // ---------- theme toggle (dark by default, choice remembered) ----------
  const toggle = document.querySelector('.theme-toggle');
  const icon = toggle && toggle.querySelector('i');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const paintToggle = () => {
    const dark = root.dataset.theme !== 'light';
    if (icon) icon.className = dark ? 'ph ph-sun' : 'ph ph-moon';
    if (toggle) toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    if (themeColor) themeColor.setAttribute('content', dark ? '#0b0c0e' : '#f4f5f6');
  };
  paintToggle();
  toggle && toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    paintToggle();
  });

  // ---------- boot sequence: a short terminal start-up, then a wipe up ----------
  // The overlay is switched on before first paint by the inline script in <head>
  // (html.boot-on), so the page never flashes underneath. Any click, key, scroll
  // or tap skips it. Reduced-motion users never see it.
  const runBoot = () => new Promise((resolve) => {
    const boot = document.querySelector('.boot');
    if (!boot || reduce || !root.classList.contains('boot-on')) {
      root.classList.remove('boot-on');
      return resolve();
    }
    const log = boot.querySelector('.boot-log');
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const skipEvents = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      skipEvents.forEach((e) => window.removeEventListener(e, finish, true));
      root.classList.add('boot-leaving');   // overlay wipes up, hero starts rising
      resolve();
      setTimeout(() => root.classList.remove('boot-on', 'boot-leaving'), 700);
    };
    skipEvents.forEach((e) => window.addEventListener(e, finish, { capture: true, passive: true }));

    const prompt = 'russell@trinity:~$ ./boot --portfolio';
    const steps = [
      ['loading raceflow', '19 regattas'],
      ['scoring races', '1,550'],
      ['briefing instructors', '24'],
      ['checking protest room', 'empty'],
      ['trimming sails', 'done'],
    ];
    const leader = (label) => `${label} ${'.'.repeat(Math.max(3, 26 - label.length - 1))} `;
    const el = (cls, text) => { const s = document.createElement('span'); s.className = cls; s.textContent = text; return s; };

    log.textContent = '';
    const promptEl = el('b-prompt', '');
    const cursor = el('caret', '');
    log.append(promptEl, cursor);

    // Paced to be read: ~0.9s typing, a beat, one line every 360ms (each ticks
    // to [ ok ] after 220ms), then a pause on "ready." before the wipe. ~4.2s.
    const TYPE = 24, PAUSE = 300, LINE = 360, TICK = 220, HOLD = 800;
    let t = 250;
    for (let i = 1; i <= prompt.length; i++) later(() => { promptEl.textContent = prompt.slice(0, i); }, (t += TYPE));
    t += PAUSE;
    steps.forEach(([label, value]) => {
      later(() => {
        const tag = el('b-tag', '[ .. ] ');
        const line = document.createElement('span');
        line.append('\n', tag, leader(label), el('b-val', value));
        log.insertBefore(line, cursor);
        later(() => { tag.textContent = '[ ok ] '; tag.classList.add('ok'); }, TICK);
      }, t);
      t += LINE;
    });
    later(() => log.insertBefore(el('b-ready', '\nready.'), cursor), (t += 150));
    later(finish, t + HOLD);
    setTimeout(finish, 9000); // hard cap, whatever happens
  });

  // ---------- name decode: one short pass, sets the terminal tone ----------
  const decodeName = () => {
    const scramble = document.querySelector('[data-scramble]');
    if (!scramble || reduce) return;
    const target = scramble.textContent;
    const glyphs = '!<>-_/[]{}=+*^?#01';
    scramble.setAttribute('aria-label', target);
    let frame = 0;
    const total = 26;
    const tick = () => {
      const settled = Math.floor((frame / total) * target.length);
      let out = '';
      for (let i = 0; i < target.length; i++) {
        const ch = target[i];
        out += i < settled || ch === ' ' ? ch : glyphs[(Math.random() * glyphs.length) | 0];
      }
      scramble.textContent = out;
      if (frame++ < total) requestAnimationFrame(tick);
      else scramble.textContent = target;
    };
    requestAnimationFrame(tick);
  };

  // ---------- count-up for the numbers ----------
  const fmt = new Intl.NumberFormat('en-IE');
  const countUp = (el) => {
    const end = parseInt(el.dataset.count, 10);
    if (!end || reduce) return;
    const dur = 1100;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = fmt.format(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = '0';
    requestAnimationFrame(step);
  };

  // ---------- reveal on scroll (IntersectionObserver, no scroll listeners) ----------
  const startReveals = () => {
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduce) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
          el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 5) * 60}ms`;
          el.classList.add('in');
          el.querySelectorAll('[data-count]').forEach(countUp);
          io.unobserve(el);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('in'));
    }
  };

  // Hero, name decode and reveals all start as the boot overlay leaves, so
  // nothing animates unseen behind it.
  runBoot().then(() => {
    decodeName();
    startReveals();
  });

  // ---------- copy email ----------
  const live = document.getElementById('live');
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    const label = btn.querySelector('span');
    const glyph = btn.querySelector('i');
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.classList.add('done');
        label.textContent = 'Copied';
        glyph.className = 'ph ph-check';
        if (live) live.textContent = 'Email address copied';
      } catch (e) {
        label.textContent = 'Press Ctrl+C';
      }
      setTimeout(() => {
        btn.classList.remove('done');
        label.textContent = 'Copy';
        glyph.className = 'ph ph-copy';
      }, 2000);
    });
  });

  // ---------- footer year ----------
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
