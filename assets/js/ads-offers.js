(() => {
  const root = document.querySelector('.cs-ads');
  const offer = root?.querySelector('.ads-offer-dialog');
  const exit = root?.querySelector('.ads-exit-dialog');
  if (!offer?.showModal || !exit?.showModal || root.dataset.offersReady) return;
  root.dataset.offersReady = 'true';
  const expiryKey = 'cs_first_time_offer_expiry_59m_v1';
  const duration = 59 * 60 * 1000;
  const started = Date.now();
  const focus = new WeakMap();
  let destination = null;
  let exitSeen = false;
  let expiry = Date.now() + duration;
  let invitation;
  try { exitSeen = sessionStorage.getItem('cs-exit-offer-seen-v1') === 'true'; } catch (_) {}
  // Local mock only. An approved genuine offer deadline is required for launch.
  function tick() {
    try {
      const stored = Number(localStorage.getItem(expiryKey));
      if (Number.isSafeInteger(stored) && stored > Date.now()) expiry = stored;
      else {
        expiry = Date.now() + duration;
        localStorage.setItem(expiryKey, String(expiry));
      }
    } catch (_) { if (expiry <= Date.now()) expiry = Date.now() + duration; }
    const seconds = Math.max(0, Math.ceil((expiry - Date.now()) / 1000));
    const display = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    root.querySelectorAll('[data-ads-offer-timer]').forEach(node => { node.textContent = display; });
  }
  function open(dialog) {
    if (document.hidden || document.querySelector('dialog[open]')) return false;
    document.querySelector('[data-cs-menu-toggle][aria-expanded="true"]')?.click();
    clearTimeout(invitation);
    focus.set(dialog, document.activeElement);
    tick();
    dialog.showModal();
    dialog.querySelector('button').focus({ preventScroll: true });
    return true;
  }
  for (const dialog of [offer, exit]) {
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const box = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (dialog === exit && destination) {
        const next = destination;
        destination = null;
        location.assign(next);
      } else focus.get(dialog)?.focus({ preventScroll: true });
    });
  }
  root.querySelectorAll('[data-ads-offer-open]').forEach(link => link.addEventListener('click', event => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (open(offer)) event.preventDefault();
  }));
  exit.querySelector('.cs-exit-offer__continue').addEventListener('click', () => exit.close());
  function openExit(url = null) {
    if ((!url && exitSeen) || !open(exit)) return false;
    destination = url;
    exitSeen = true;
    try { sessionStorage.setItem('cs-exit-offer-seen-v1', 'true'); } catch (_) {}
    exit.querySelector('.cs-exit-offer__continue').textContent = url ? 'No Thanks, Continue to Page' : 'No Thanks';
    return true;
  }
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download') || link.hasAttribute('data-ads-offer-open')) return;
    const url = new URL(link.href, location.href);
    if (/\/book-online\/?$/.test(url.pathname) || !['http:', 'https:'].includes(url.protocol) || url.origin !== location.origin || url.pathname === location.pathname) return;
    if (openExit(url.href)) event.preventDefault();
  });
  document.addEventListener('mouseout', event => {
    if (Date.now() - started < 8000 || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (!event.relatedTarget && event.clientY <= 0) openExit();
  });
  function invite() {
    if (document.hidden || document.querySelector('dialog[open]') || document.querySelector('[data-cs-menu-toggle][aria-expanded="true"]') || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '')) return;
    open(offer);
  }
  tick();
  let timer = setInterval(() => { if (!document.hidden) tick(); }, 1000);
  invitation = setTimeout(invite, 3000);
  window.addEventListener('storage', tick);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
  window.addEventListener('pagehide', () => { clearInterval(timer); clearTimeout(invitation); });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    tick();
    clearInterval(timer);
    timer = setInterval(() => { if (!document.hidden) tick(); }, 1000);
  });
})();
