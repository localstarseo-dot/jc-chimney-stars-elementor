(() => {
  const gallery = document.querySelector('[data-cs-team-carousel]');
  if (!gallery) return;
  const track = gallery.querySelector('.cs-action-gallery__track');
  const originals = [...track.children];
  if (originals.length < 2) return;
  // Shuffle once per page load, keeping every technician photo in the cycle.
  for (let i = originals.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [originals[i], originals[j]] = [originals[j], originals[i]];
  }
  originals.forEach(item => track.append(item));
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let visible = false;
  let timer;
  let busy = false;
  let generation = 0;
  const clones = originals.slice(0, 4).map(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelector('img').alt = '';
    track.append(clone);
    return clone;
  });
  const slides = [...originals, ...clones];
  gallery.dataset.ready = 'true';
  const step = () => originals[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
  const reset = () => {
    generation += 1;
    busy = false;
    index = 0;
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';
    requestAnimationFrame(() => { track.style.transition = ''; });
  };
  const advance = async () => {
    if (busy || !visible || document.hidden || motion.matches) return;
    busy = true;
    const version = generation;
    const next = index + 1;
    await Promise.all(slides.slice(next, next + 4).map(item => {
      const photo = item.querySelector('img');
      photo.loading = 'eager';
      return photo.decode().catch(() => {});
    }));
    if (version !== generation || !visible || document.hidden || motion.matches) { busy = false; return; }
    index = next;
    track.style.transform = `translateX(${-index * step()}px)`;
  };
  track.addEventListener('transitionend', event => {
    if (event.target !== track || event.propertyName !== 'transform') return;
    if (index === originals.length) reset();
    busy = false;
  });
  const sync = () => {
    clearInterval(timer);
    if (visible && !document.hidden && !motion.matches) timer = setInterval(advance, 2000);
  };
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(gallery);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', () => { reset(); sync(); });
  new ResizeObserver(() => { reset(); sync(); }).observe(gallery);
})();
