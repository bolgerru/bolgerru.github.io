// Russell Bolger: small progressive enhancements. The page is complete without JS.
(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');
  window.__rbReady = true;
  window.__rbBoot = true; // tells the <head> failsafe this script can run the boot overlay

  // ---------- theme toggle (the chart's Day and Night palettes, choice remembered) ----------
  const toggle = document.querySelector('.theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const paintToggle = () => {
    const dark = root.dataset.theme === 'dark';
    if (toggle) {
      toggle.textContent = dark ? 'Day' : 'Night';
      toggle.setAttribute('aria-label', dark ? 'Switch to day theme' : 'Switch to night theme');
    }
    if (themeColor) themeColor.setAttribute('content', dark ? '#091316' : '#eef0e3');
  };
  paintToggle();
  toggle && toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    paintToggle();
  });

  // ---------- boot: the course is plotted mark by mark, then a wipe up ----------
  // The overlay is switched on before first paint by the inline script in <head>
  // (html.boot-on), so the page never flashes underneath. The drawing itself is
  // CSS. Any click, key, scroll or tap skips it. Reduced-motion users never see it.
  const runBoot = () => new Promise((resolve) => {
    const boot = document.querySelector('.boot');
    if (!boot || reduce || !root.classList.contains('boot-on')) {
      root.classList.remove('boot-on');
      return resolve();
    }
    const skipEvents = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      skipEvents.forEach((e) => window.removeEventListener(e, finish, true));
      root.classList.add('boot-leaving');   // overlay wipes up, hero arrives
      resolve();
      setTimeout(() => root.classList.remove('boot-on', 'boot-leaving'), 700);
    };
    skipEvents.forEach((e) => window.addEventListener(e, finish, { capture: true, passive: true }));
    setTimeout(finish, 2000);
  });

  // ---------- name decode: one short pass of depth figures resolving to the name ----------
  const decodeName = () => {
    const scramble = document.querySelector('[data-scramble]');
    if (!scramble || reduce) return;
    const target = scramble.textContent;
    const glyphs = '0123456789';
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
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.classList.add('done');
        btn.textContent = 'Copied';
        if (live) live.textContent = 'Email address copied';
      } catch (e) {
        btn.textContent = 'Press Ctrl+C';
      }
      setTimeout(() => {
        btn.classList.remove('done');
        btn.textContent = 'Copy';
      }, 2000);
    });
  });

  // ---------- footer year ----------
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
