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
