(() => {
  const toggle = document.querySelector('[data-cs-menu-toggle]');
  const navigation = document.querySelector('[data-cs-navigation]');
  const header = document.querySelector('[data-cs-header]');

  if (!toggle || !navigation || !header) return;

  const mobileQuery = window.matchMedia('(max-width: 1024px)');
  const disclosures = [...navigation.querySelectorAll('.cs-nav-details')];
  const closeDisclosures = () => disclosures.forEach(item => { item.open = false; });
  const syncMobilePanel = () => {
    if (!mobileQuery.matches) return;
    document.documentElement.style.setProperty('--cs-mobile-nav-top', `${Math.max(0, Math.round(header.getBoundingClientRect().bottom))}px`);
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    navigation.dataset.open = 'false';
    document.body.classList.remove('cs-menu-open');
    navigation.inert = mobileQuery.matches;
    closeDisclosures();

    if (restoreFocus) toggle.focus();
  };

  const openMenu = () => {
    syncMobilePanel();
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    navigation.dataset.open = 'true';
    document.body.classList.add('cs-menu-open');
    navigation.inert = false;
    navigation.querySelector('a, summary')?.focus({ preventScroll: true });
  };

  const syncNavigation = () => {
    if (mobileQuery.matches) {
      closeMenu();
    } else {
      toggle.setAttribute('aria-expanded', 'false');
      navigation.dataset.open = 'false';
      navigation.inert = false;
      document.body.classList.remove('cs-menu-open');
      closeDisclosures();
    }
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a') && mobileQuery.matches) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const activeDisclosure = disclosures.find(item => item.open);
      if (toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu({ restoreFocus: true });
      } else if (activeDisclosure) {
        closeDisclosures();
        activeDisclosure.querySelector('summary').focus();
      }
    }
    // Keep keyboard navigation inside the expanded mobile panel and its toggle.
    if (event.key === 'Tab' && mobileQuery.matches && toggle.getAttribute('aria-expanded') === 'true') {
      const nodes = [toggle, ...navigation.querySelectorAll('a, summary')].filter(node => node.getClientRects().length > 0);
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  disclosures.forEach(item => item.addEventListener('toggle', () => {
    if (item.open) disclosures.forEach(other => { if (other !== item) other.open = false; });
  }));
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) {
      closeDisclosures();
      if (mobileQuery.matches) closeMenu();
    }
  });
  mobileQuery.addEventListener('change', syncNavigation);
  window.addEventListener('resize', () => {
    if (navigation.dataset.open === 'true') syncMobilePanel();
  }, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(syncMobilePanel).observe(header);
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
  if (slides.length < 2) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prepared = new WeakMap();
  let activeIndex = 0;
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
        if (reducedMotion.matches || document.hidden || !inView) return;
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
    if (!reducedMotion.matches && !document.hidden && inView) {
      prepare(slides[(activeIndex + 1) % slides.length]);
      intervalId = setInterval(advance, 3000);
    }
  };

  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', syncPlayback);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(hero);
  }

  syncPlayback();
})();
