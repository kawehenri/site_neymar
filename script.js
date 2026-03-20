/* ===========================================
   NEYMAR JR — O REI DO DRIBLE
   Main Script
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     NAVBAR — scroll + mobile toggle
  ------------------------------------------ */
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ------------------------------------------
     SCROLL REVEAL — Intersection Observer
  ------------------------------------------ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    revealObserver.observe(el);
  });

  /* ------------------------------------------
     STATS COUNTER ANIMATION
  ------------------------------------------ */
  function animateCounter(el, target, suffix, duration) {
    const start = performance.now();

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-item').forEach((item, i) => {
          const target = parseInt(item.dataset.count, 10);
          const suffix = item.dataset.suffix || '';
          const numEl  = item.querySelector('.stat-number');

          setTimeout(() => animateCounter(numEl, target, suffix, 1800), i * 180);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) statsObserver.observe(statsSection);

  /* ------------------------------------------
     BACK TO TOP BUTTON
  ------------------------------------------ */
  const topoBtn = document.getElementById('topo');

  window.addEventListener('scroll', () => {
    topoBtn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  topoBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ------------------------------------------
     ACTIVE NAV LINK — highlight on scroll
  ------------------------------------------ */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ------------------------------------------
     CAREER CARDS — keyboard accessibility
  ------------------------------------------ */
  document.querySelectorAll('.career-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const link = card.querySelector('.career-btn');
        if (link) link.click();
      }
    });
  });

});
