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
    if (window.matchMedia('(max-width: 1023px)').matches) {
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
    if (event.target.closest('a') && window.matchMedia('(max-width: 1023px)').matches) {
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
