(() => {
  const root = document.querySelector('.cs-ads');
  if (!root || root.dataset.ready === 'true') return;
  root.dataset.ready = 'true';
  const sticky = root.querySelector('.ads-sticky');
  if (sticky) {
    const reserveStickyHeight = () => {
      root.style.setProperty('--ads-sticky-height', `${Math.ceil(sticky.getBoundingClientRect().height)}px`);
    };
    reserveStickyHeight();
    if ('ResizeObserver' in window) new ResizeObserver(reserveStickyHeight).observe(sticky);
    else window.addEventListener('resize', reserveStickyHeight, { passive: true });
  }
  root.querySelectorAll('[data-ads-compare]').forEach(component => {
    const stage = component.querySelector('[data-ads-stage]');
    const input = component.querySelector('[data-ads-range]');
    let frame = 0;
    let position = Number(input.value);
    let gesture = null;
    function draw() {
      frame = 0;
      component.style.setProperty('--position', position + '%');
      input.value = String(position);
      input.setAttribute('aria-valuetext', position + ' percent after photo');
    }
    function update(value) {
      position = Math.max(0, Math.min(100, Math.round(value)));
      if (!frame) frame = requestAnimationFrame(draw);
    }
    input.addEventListener('input', () => update(Number(input.value)));
    stage.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0) return;
      gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, dragging: false };
    });
    stage.addEventListener('pointermove', event => {
      if (!gesture || gesture.id !== event.pointerId) return;
      const dx = Math.abs(event.clientX - gesture.x);
      const dy = Math.abs(event.clientY - gesture.y);
      if (!gesture.dragging) {
        if (dy > 8 && dy > dx) { gesture = null; return; }
        if (dx < 5 || dx <= dy) return;
        gesture.dragging = true;
        stage.setPointerCapture(event.pointerId);
      }
      const box = stage.getBoundingClientRect();
      update((event.clientX - box.left) / box.width * 100);
    });
    function finish(event) {
      if (!gesture || gesture.id !== event.pointerId) return;
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
      gesture = null;
      if (frame) { cancelAnimationFrame(frame); draw(); }
    }
    stage.addEventListener('pointerup', finish);
    stage.addEventListener('pointercancel', finish);
    stage.addEventListener('lostpointercapture', finish);
    draw();
  });
})();
