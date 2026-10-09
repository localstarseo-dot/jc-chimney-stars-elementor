(() => {
  const toggle = document.querySelector('[data-cs-menu-toggle]');
  const navigation = document.querySelector('[data-cs-navigation]');

  if (!toggle || !navigation) return;

  const closeMenu = ({ restoreFocus = false } = {}) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    navigation.dataset.open = 'false';
    document.body.classList.remove('cs-menu-open');
    navigation.inert = true;

    if (restoreFocus) toggle.focus();
  };

  const openMenu = () => {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    navigation.dataset.open = 'true';
    document.body.classList.add('cs-menu-open');
    navigation.inert = false;
  };

  const syncNavigation = () => {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      closeMenu();
    } else {
      toggle.setAttribute('aria-expanded', 'false');
      navigation.dataset.open = 'false';
      navigation.inert = false;
      document.body.classList.remove('cs-menu-open');
    }
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a') && window.matchMedia('(max-width: 1024px)').matches) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener('resize', syncNavigation);
  syncNavigation();
})();

(() => {
  const serviceForm = document.querySelector('[data-cs-service-form]');
  const serviceStatus = document.querySelector('[data-cs-service-status]');

  if (serviceForm && serviceStatus) {
    serviceForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const select = serviceForm.querySelector('select');

      if (!select.value) {
        serviceStatus.textContent = 'Choose a service to continue the local design preview.';
        select.focus();
        return;
      }

      serviceStatus.innerHTML = `Selected: <strong>${select.value}</strong>. The production Elementor form will continue to customer details and booking.`;
    });
  }

  const previewForm = document.querySelector('[data-cs-preview-form]');
  const previewStatus = document.querySelector('[data-cs-form-status]');

  if (previewForm && previewStatus) {
    previewForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!previewForm.checkValidity()) {
        previewForm.reportValidity();
        return;
      }

      previewStatus.textContent = 'Preview confirmed. No message was sent; connect the approved Elementor form, reCAPTCHA, and CRM during WordPress migration.';
    });
  }
})();

(() => {
  const hero = document.querySelector('[data-cs-hero-slideshow]');
  if (!hero) return;

  const slides = [...hero.querySelectorAll('[data-cs-hero-slide]')];
  const playback = hero.querySelector('[data-cs-hero-playback]');
  if (slides.length < 2 || !playback) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prepared = new WeakMap();
  let activeIndex = 0;
  let paused = reducedMotion.matches;
  let inView = true;
  let intervalId;
  let advancing = false;

  const prepare = (slide) => {
    if (!prepared.has(slide)) {
      // Decode the incoming photo before fading so the hero never flashes blank.
      slide.loading = 'eager';
      prepared.set(slide, slide.decode().then(() => true, () => false));
    }
    return prepared.get(slide);
  };

  const advance = async () => {
    if (advancing) return;
    advancing = true;

    try {
      for (let offset = 1; offset < slides.length; offset += 1) {
        const nextIndex = (activeIndex + offset) % slides.length;
        const loaded = await prepare(slides[nextIndex]);
        if (paused || document.hidden || !inView) return;
        if (!loaded) continue;

        slides[activeIndex].classList.remove('is-active');
        slides[nextIndex].classList.add('is-active');
        activeIndex = nextIndex;
        prepare(slides[(activeIndex + 1) % slides.length]);
        return;
      }
    } finally {
      advancing = false;
    }
  };

  const syncPlayback = () => {
    clearInterval(intervalId);
    const label = paused ? 'Play photo slideshow' : 'Pause photo slideshow';
    playback.setAttribute('aria-label', label);
    playback.setAttribute('title', label);
    playback.setAttribute('aria-pressed', String(paused));
    playback.querySelector('span').textContent = paused ? '▶' : 'Ⅱ';

    if (!paused && !document.hidden && inView) {
      prepare(slides[(activeIndex + 1) % slides.length]);
      intervalId = setInterval(advance, 3000);
    }
  };

  playback.hidden = false;
  playback.addEventListener('click', () => {
    paused = !paused;
    syncPlayback();
  });
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', () => {
    paused = reducedMotion.matches;
    syncPlayback();
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(hero);
  }

  syncPlayback();
})();
