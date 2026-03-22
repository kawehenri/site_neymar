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

/* ---------- ECOSSISTEMA DE MARCAS — Modal & Network ---------- */
(function () {
  const marcasData = {
    'nr-sports': {
      icon: '🏢',
      badge: 'Gestão & Negócios',
      color: '#60a5fa',
      image: 'imgs/nr.jpeg',
      title: 'NR Sports',
      desc: 'Fundada por Neymar Pai, a NR Sports é o coração empresarial de todo o ecossistema Neymar. A empresa controla contratos publicitários, gestão de imagem, parcerias globais e todas as decisões de negócio do atleta.',
      details: [
        'Fundada e liderada pelo pai de Neymar',
        'Gestão de mais de 30 contratos publicitários globais',
        'Hub central conectando todas as marcas NJR',
        'Parceiros estratégicos: Puma, Red Bull e outros'
      ],
      tags: ['Contratos', 'Imagem', 'Negócios', 'Parcerias']
    },
    'puma': {
      icon: '🐆',
      badge: 'Marca Global',
      color: '#00e676',
      image: 'imgs/puma.jpeg',
      title: 'PUMA × Neymar',
      desc: 'Desde 2020, Neymar é o embaixador global da Puma. A parceria resultou em coleções icônicas como NJR Creativity e NJR Copa, unindo performance esportiva com estética urbana e lifestyle.',
      details: [
        'Embaixador global da Puma desde 2020',
        'Coleção NJR Creativity — moda + futebol',
        'Coleção NJR Copa — estilo brasileiro',
        'Parceria que vai muito além das quatro linhas'
      ],
      tags: ['NJR Creativity', 'NJR Copa', 'Lifestyle', 'Moda Esportiva']
    },
    'njr-brand': {
      icon: '👑',
      badge: 'Identidade Pessoal',
      color: '#f0c040',
      image: 'imgs/njr.jpeg',
      title: 'NJR Brand',
      desc: 'O branding pessoal de Neymar Jr. — três letras que representam uma identidade única no futebol mundial. A marca NJR aparece em roupas, chuteiras e coleções exclusivas, carregando a essência do futebol de rua brasileiro.',
      details: [
        'Identidade visual reconhecida mundialmente',
        'Presente em roupas e chuteiras exclusivas',
        'Coleções co-criadas em parceria com a Puma',
        'Representa estilo, criatividade e o futebol de rua'
      ],
      tags: ['Roupas', 'Chuteiras', 'Futebol de Rua', 'Cultura Brasileira']
    },
    'njr-eyewear': {
      icon: '🕶️',
      badge: 'Lifestyle & Moda',
      color: '#c084fc',
      image: 'imgs/oculos.jpeg',
      title: 'NJR Eyewear',
      desc: 'Criada em parceria com a NR Sports, a NJR Eyewear expande o universo de Neymar para além do futebol. A linha une design premium, identidade pessoal do atleta e posicionamento no mercado de luxo e moda global.',
      details: [
        'Design premium com identidade própria',
        'Co-criada com a NR Sports',
        'Posicionamento no mercado de luxo',
        'Expande Neymar ao universo fashion global'
      ],
      tags: ['Moda', 'Luxo', 'Fashion', 'Estilo']
    }
  };

  const modal = document.getElementById('marcasModal');
  if (!modal) return;

  const backdrop = modal.querySelector('.marcas-modal-bd');
  const closeBtn = modal.querySelector('.marcas-modal-x');

  function openModal(id) {
    const d = marcasData[id];
    if (!d) return;

    modal.querySelector('#mModalIcon').textContent = d.icon;

    const badge = modal.querySelector('#mModalBadge');
    badge.textContent = d.badge;
    badge.style.borderColor = d.color;
    badge.style.color = d.color;

    modal.querySelector('#mModalTitle').textContent = d.title;
    modal.querySelector('#mModalDesc').textContent  = d.desc;

    const media = modal.querySelector('#mModalMedia');
    if (media) {
      if (d.image) {
        media.innerHTML = `<img src="${d.image}" alt="${d.title}" decoding="async" loading="lazy">`;
      } else {
        media.innerHTML = '';
      }
    }

    modal.querySelector('#mModalList').innerHTML =
      d.details.map(t => `<li><span aria-hidden="true">✦</span>${t}</li>`).join('');

    modal.querySelector('#mModalTags').innerHTML =
      d.tags.map(t => `<span>${t}</span>`).join('');

    modal.style.setProperty('--modal-accent', d.color);
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('open')));
  }

  function closeModal() {
    modal.classList.remove('open');
    setTimeout(() => {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }, 350);
  }

  // Open via data-modal buttons (event delegation)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-modal]');
    if (btn) openModal(btn.dataset.modal);
  });

  // Close via backdrop / close button
  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click',  closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });

  /* --- Network fade-in on scroll --- */
  const network = document.getElementById('marcasNetwork');
  if (network) {
    if (prefersReducedMotion) {
      network.classList.add('net-visible');
    } else {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            network.classList.add('net-visible');
            obs.unobserve(network);
          }
        });
      }, { threshold: 0.25 });
      obs.observe(network);
    }
  }
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