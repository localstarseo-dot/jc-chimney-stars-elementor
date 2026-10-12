(() => {
  const key = 'cs-exit-offer-seen-v1';
  let seen = false;
  try { seen = sessionStorage.getItem(key) === 'true'; } catch (_) {}
  let destination = null;
  let previousFocus = null;
  const started = Date.now();
  const dialog = document.createElement('dialog');
  dialog.className = 'cs-exit-offer';
  dialog.setAttribute('aria-labelledby', 'cs-exit-title');
  dialog.setAttribute('aria-describedby', 'cs-exit-description');
  dialog.innerHTML = `
    <button type="button" class="cs-exit-offer__close" aria-label="Close and continue">×</button>
    <p class="cs-exit-offer__eyebrow">One more thing</p>
    <h2 id="cs-exit-title">First time Customer Discount</h2>
    <p id="cs-exit-description">Before you go, call our team or book online to ask about your first-time customer discount.</p>
    <div class="cs-popout-rating"><span>Our Customers Rate Us 5.0 Out Of 5.0</span><span class="cs-popout-rating__stars" aria-label="Five stars">★★★★★</span><span>Based On 619+ Reviews!</span></div>
    <p class="cs-exit-offer__timer">Offer timer <b data-cs-exit-timer>59:00</b></p>
    <div class="cs-exit-offer__actions">
      <a class="cs-button cs-button--primary" href="book-online/">Book Online Now</a>
      <a class="cs-button cs-button--call-white" href="tel:+15125012755">Call Now</a>
    </div>
    <button type="button" class="cs-exit-offer__continue">No Thanks</button>`;
  document.body.append(dialog);
  const countdown = dialog.querySelector('[data-cs-exit-timer]');
  const expiryKey = 'cs_first_time_offer_expiry_59m_v1';
  const duration = 59 * 60 * 1000;
  let expiry = Date.now() + duration;
  function syncCountdown() {
    try {
      const stored = Number(localStorage.getItem(expiryKey));
      if (Number.isSafeInteger(stored) && stored > Date.now()) expiry = stored;
      else if (expiry <= Date.now()) {
        expiry = Date.now() + duration;
        localStorage.setItem(expiryKey, String(expiry));
      }
    } catch (_) { if (expiry <= Date.now()) expiry = Date.now() + duration; }
    const seconds = Math.max(0, Math.ceil((expiry - Date.now()) / 1000));
    countdown.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  }
  syncCountdown();
  const timer = setInterval(syncCountdown, 1000);
  window.addEventListener('pagehide', () => clearInterval(timer), { once: true });
  const continueButton = dialog.querySelector('.cs-exit-offer__continue');
  function open(url = null) {
    if ((!url && seen) || document.documentElement.classList.contains('cs-lead-modal-open') || document.querySelector('dialog[open]')) return false;
    seen = true;
    try { sessionStorage.setItem(key, 'true'); } catch (_) {}
    destination = url;
    previousFocus = document.activeElement;
    syncCountdown();
    continueButton.textContent = url ? 'No Thanks, Continue to Page' : 'No Thanks';
    dialog.showModal();
    document.documentElement.classList.add('cs-exit-offer-open');
    dialog.querySelector('.cs-exit-offer__actions a').focus();
    return true;
  }
  function dismiss() { dialog.close(); }
  dialog.querySelector('.cs-exit-offer__close').addEventListener('click', dismiss);
  continueButton.addEventListener('click', dismiss);
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dismiss();
  } });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('cs-exit-offer-open');
    if (destination) location.assign(destination);
    else previousFocus?.focus();
  });
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || link.target === '_blank' || link.hasAttribute('data-cs-lead-open')) return;
    const url = new URL(link.href, location.href);
    if (/\/book-online\/?$/.test(url.pathname)) return;
    if (!['http:', 'https:'].includes(url.protocol) || url.origin !== location.origin || url.pathname === location.pathname) return;
    if (open(url.href)) event.preventDefault();
  });
  document.addEventListener('mouseout', event => {
    if (Date.now() - started < 8000 || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (!event.relatedTarget && event.clientY <= 0) open();
  });
})();
