/* ===================================================
   NEYMAR JR — script.js
   =================================================== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- IMG FALLBACK + DECODING ---------- */
(function () {
  document.querySelectorAll('img').forEach((img) => {
    if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    if (!img.hasAttribute('loading') && !img.id.includes('hero')) img.setAttribute('loading', 'lazy');
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = '1';
      img.src = 'imgs';
    });
  });
})();

/* ---------- NAVBAR: scroll + toggle ---------- */
(function () {
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('navToggle');
  const links   = document.getElementById('navLinks');

  // scrolled class
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // hamburger toggle
  if (toggle && links) {
    const setMenuState = (open) => {
      toggle.classList.toggle('open', open);
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => {
      const isOpen = !links.classList.contains('open');
      setMenuState(isOpen);
    });
    // close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        setMenuState(false);
      });
    });

    // close on ESC and click outside
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) setMenuState(false);
    });
    document.addEventListener('click', (e) => {
      const clickInside = links.contains(e.target) || toggle.contains(e.target);
      if (!clickInside && links.classList.contains('open')) setMenuState(false);
    });
  }

  // active link highlight
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  const observerOpts = { rootMargin: '-40% 0px -50% 0px' };
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOpts);
  sections.forEach(s => sectionObserver.observe(s));
})();

/* ---------- HERO BACKGROUND ROTATION ---------- */
(function () {
  const heroImg = document.getElementById('heroImg');
  if (!heroImg) return;

  const bgImages = [
    'imgs/fundo_index1.jpeg',
    'imgs/fundo_index2.jpeg',
    'imgs/fundo_index.jpeg',
  ];
  let current = 0;

  // pre-load all images
  bgImages.forEach(src => { const i = new Image(); i.src = src; });

  if (!prefersReducedMotion) {
    setInterval(() => {
      current = (current + 1) % bgImages.length;
      heroImg.style.opacity = '0';
      setTimeout(() => {
        heroImg.src = bgImages[current];
        heroImg.style.opacity = '1';
      }, 700);
    }, 5000);
  }
})();

/* ---------- STATS COUNTER ---------- */
(function () {
  const statItems = document.querySelectorAll('.stat-item');
  if (!statItems.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const animateStat = (el) => {
    const target  = parseInt(el.dataset.count, 10);
    const suffix  = el.dataset.suffix || '';
    const numEl   = el.querySelector('.stat-number');
    if (!numEl) return;

    const duration = 1600;
    const start    = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const val = Math.floor(easeOut(progress) * target);
      numEl.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else numEl.textContent = target + suffix;
    };
    requestAnimationFrame(tick);
  };

  if (prefersReducedMotion) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statItems.forEach(item => observer.observe(item));
})();

/* ---------- PWA SERVICE WORKER ---------- */
(function () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }
})();

/* ---------- SCROLL REVEAL ---------- */
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings
        const siblings = [...entry.target.parentElement.children]
          .filter(c => c.classList.contains('reveal'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();

/* ---------- BACK TO TOP ---------- */
(function () {
  const btn = document.getElementById('topo');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ---------- Analytics events (no-op se não houver Plausible) ---------- */
(function () {
  const track = (name, props) => {
    if (window.plausible) window.plausible(name, { props });
  };
  // CTAs do hero
  document.querySelectorAll('.hero-ctas a').forEach(a => {
    a.addEventListener('click', () => track('cta_click', { id: a.textContent.trim() }));
  });
  // Botões do artigo CTA no index
  const artigoBtn = document.querySelector('.artigo-cta-btn');
  if (artigoBtn) artigoBtn.addEventListener('click', () => track('cta_artigo', {}));
})(); 