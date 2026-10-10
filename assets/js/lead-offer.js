(function () {
      "use strict";
      const bar = document.querySelector("[data-cs-lead-bar]");
      const modal = document.querySelector("[data-cs-lead-modal]");
      const sticky = document.querySelector("[data-cs-lead-sticky]");

      if (!bar || !modal || !sticky) return;
      if (modal.dataset.csLeadReady === "true") return;

      modal.dataset.csLeadReady = "true";

      const panel = modal.querySelector("[data-cs-lead-panel]");
      const closeButton = modal.querySelector("[data-cs-lead-close]");
      const form = modal.querySelector("[data-cs-lead-preview-form]");
      const stickyForm = sticky.querySelector("[data-cs-sticky-form]");
      const status = modal.querySelector("[data-cs-lead-status]");
      const resetButton = modal.querySelector("[data-cs-lead-reset]");
      const openButtons = Array.from(
        document.querySelectorAll("[data-cs-lead-open]")
      );
      const timerNodes = Array.from(
        document.querySelectorAll("[data-cs-lead-timer]")
      );

      const expiryKey = "cs_first_time_offer_expiry_59m_v1";
      const duration = 59 * 60 * 1000;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

      let expiry = Date.now() + duration;
      let timer = 0;
      let invitationTimer = 0;
      let isOpen = false;
      let previousFocus = null;
      let stickyFrame = 0;
      let backgroundState = [];
      modal.inert = true;

      function readExpiry() {
        try {
          const stored = Number(window.localStorage.getItem(expiryKey));

          if (Number.isSafeInteger(stored) && stored > Date.now()) {
            expiry = stored;
          } else {
            expiry = Date.now() + duration;
            window.localStorage.setItem(expiryKey, String(expiry));
          }
        } catch (_) {
          expiry = Date.now() + duration;
        }
      }

      function tick() {
        window.clearTimeout(timer);

        if (expiry <= Date.now()) {
          expiry = Date.now() + duration;

          try {
            window.localStorage.setItem(expiryKey, String(expiry));
          } catch (_) {
            // Continue with an in-memory timer if storage is blocked.
          }
        }

        const seconds = Math.max(
          0,
          Math.ceil((expiry - Date.now()) / 1000)
        );
        const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
        const remainder = String(seconds % 60).padStart(2, "0");
        const display = `${minutes}:${remainder}`;

        timerNodes.forEach(node => {
          node.textContent = display;
        });

        if (!document.hidden) {
          timer = window.setTimeout(tick, 1000);
        }
      }

      function syncBarHeight() {
        const height = Math.max(
          44,
          Math.ceil(bar.getBoundingClientRect().height)
        );

        document.documentElement.style.setProperty(
          "--cs-lead-bar-height",
          `${height}px`
        );
      }

      function syncSticky() {
        stickyFrame = 0;

        const header = document.querySelector("[data-cs-header]");
        if (!header) return;

        const offerBottom = Math.max(
          0,
          Math.ceil(bar.getBoundingClientRect().bottom)
        );
        const menuOpen = document.querySelector("[data-cs-navigation]")?.dataset.open === "true";
        const shouldShow = window.scrollY > 300 && !menuOpen && !isOpen;

        document.documentElement.style.setProperty(
          "--cs-lead-sticky-top",
          `${offerBottom}px`
        );

        sticky.classList.toggle("is-visible", shouldShow);
        sticky.setAttribute("aria-hidden", shouldShow ? "false" : "true");

        if (shouldShow) {
          sticky.removeAttribute("inert");
        } else {
          sticky.setAttribute("inert", "");
        }
      }

      function scheduleSticky() {
        if (stickyFrame) return;
        stickyFrame = window.requestAnimationFrame(syncSticky);
      }

      function focusable() {
        return Array.from(
          panel.querySelectorAll(
            "a[href], button, input, select, textarea, [tabindex]"
          )
        ).filter(node => {
          return (
            !node.disabled &&
            node.tabIndex >= 0 &&
            node.getClientRects().length > 0
          );
        });
      }

      function openModal() {
        if (isOpen) return;

        const menuToggle = document.querySelector(
          "[data-cs-menu-toggle][aria-expanded='true']"
        );

        if (menuToggle) menuToggle.click();

        window.clearTimeout(invitationTimer);
        previousFocus = document.activeElement;
        isOpen = true;

        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        modal.inert = false;
        document.documentElement.classList.add("cs-lead-modal-open");
        backgroundState = [...document.body.children]
          .filter(node => node !== modal && node.tagName !== "SCRIPT")
          .map(node => [node, node.inert]);
        backgroundState.forEach(([node]) => { node.inert = true; });

        window.requestAnimationFrame(() => {
          modal.classList.add("is-open");
          closeButton.focus({ preventScroll: true });
        });

        scheduleSticky();
      }

      function closeModal(restoreFocus = true) {
        if (!isOpen) return;

        isOpen = false;
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        modal.inert = true;
        document.documentElement.classList.remove("cs-lead-modal-open");
        backgroundState.forEach(([node, wasInert]) => { node.inert = wasInert; });
        backgroundState = [];
        syncSticky();

        function finish() {
          if (!isOpen) modal.hidden = true;
        }

        if (reducedMotion.matches) {
          finish();
        } else {
          window.setTimeout(finish, 190);
        }

        if (
          restoreFocus &&
          previousFocus &&
          previousFocus.isConnected
        ) {
          previousFocus.focus({ preventScroll: true });
        }

        scheduleSticky();
      }

      openButtons.forEach(button => {
        button.addEventListener("click", openModal);
      });

      closeButton.addEventListener("click", () => closeModal());

      modal.addEventListener("click", event => {
        if (event.target === modal) closeModal();
      });

      document.addEventListener("keydown", event => {
        if (!isOpen) return;

        if (event.key === "Escape") {
          event.preventDefault();
          closeModal();
          return;
        }

        if (event.key !== "Tab") return;

        const nodes = focusable();
        const first = nodes[0];
        const last = nodes[nodes.length - 1];

        if (!first) {
          event.preventDefault();
          panel.focus();
          return;
        }

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      });

      document.addEventListener("focusin", event => {
        if (isOpen && !panel.contains(event.target)) {
          closeButton.focus();
        }
      });

      /* Mock submission: no request, email or CRM delivery. */
      form.addEventListener("submit", event => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        form.reset();
        form.hidden = true;
        status.hidden = false;
        resetButton.focus();
      });

      /* Carry the quick-form values into the popup in memory only. */
      stickyForm.addEventListener("submit", event => {
        event.preventDefault();

        if (!stickyForm.reportValidity()) return;

        const stickyName = stickyForm.elements.namedItem("sticky-name");
        const stickyPhone = stickyForm.elements.namedItem("sticky-phone");
        const stickyAddress = stickyForm.elements.namedItem("sticky-address");
        const modalName = form.elements.namedItem("name-1");
        const modalPhone = form.elements.namedItem("phone-1");
        const modalAddress = form.elements.namedItem("address-1");

        if (modalName) modalName.value = stickyName.value;
        if (modalPhone) modalPhone.value = stickyPhone.value;
        if (modalAddress) modalAddress.value = stickyAddress.value;
        form.hidden = false;
        status.hidden = true;

        stickyForm.reset();
        openModal();
      });

      resetButton.addEventListener("click", () => {
        status.hidden = true;
        form.hidden = false;

        window.requestAnimationFrame(() => {
          form.querySelector("input")?.focus();
        });
      });

      function invite() {
        if (isOpen) return;
        openModal();
      }

      function beginInvitation() {
        window.clearTimeout(invitationTimer);
        invitationTimer = window.setTimeout(invite, 3000);
      }

      beginInvitation();
      window.addEventListener("pageshow", event => {
        if (event.persisted) beginInvitation();
      });

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          window.clearTimeout(timer);
        } else {
          readExpiry();
          tick();
        }
      });

      window.addEventListener("storage", event => {
        if (event.key === expiryKey || event.key === null) {
          readExpiry();
          tick();
        }
      });

      window.addEventListener("pagehide", () => {
        window.clearTimeout(timer);
        window.clearTimeout(invitationTimer);
        closeModal(false);
      });

      window.addEventListener("resize", syncBarHeight, { passive: true });
      window.addEventListener("resize", scheduleSticky, { passive: true });
      window.addEventListener("scroll", scheduleSticky, { passive: true });
      const navigation = document.querySelector("[data-cs-navigation]");
      if (navigation) {
        new MutationObserver(scheduleSticky).observe(navigation, {
          attributes: true, attributeFilter: ["data-open"]
        });
      }

      if ("ResizeObserver" in window) {
        const barObserver = new ResizeObserver(syncBarHeight);
        barObserver.observe(bar);

        const stickyObserver = new ResizeObserver(scheduleSticky);
        stickyObserver.observe(bar);

        const header = document.querySelector("[data-cs-header]");
        if (header) stickyObserver.observe(header);
      }

      readExpiry();
      tick();
      syncBarHeight();
      syncSticky();
    })();
