// Russell Bolger: small progressive enhancements. The page is complete without JS.
(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');
  window.__rbReady = true;

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

  // ---------- name decode: one short pass on load, sets the terminal tone ----------
  const scramble = document.querySelector('[data-scramble]');
  if (scramble && !reduce) {
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
  }

  // ---------- count-up for the numbers strip ----------
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
