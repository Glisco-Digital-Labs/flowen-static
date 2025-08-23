/* ===== Popup (Flowen) =====
 * API:
 *  - data-popup-target="#idDoPopup" em qualquer trigger para abrir
 *  - [data-popup-close] em botões/links para fechar
 *  - window.Popup.open('#id'), window.Popup.close('#id')
 */
(() => {
  const state = { active: null, lastFocus: null };

  function getFocusable(container) {
    return [...container.querySelectorAll(`
      a[href], button:not([disabled]), textarea, input, select,
      [tabindex]:not([tabindex="-1"])
    `)].filter(el => el.offsetParent !== null || el === document.activeElement);
  }

  function lockScroll(lock) {
    document.documentElement.classList.toggle('popup-lock', lock);
    document.body.classList.toggle('popup-lock', lock);
  }

  function setAria(modal, open) {
    modal.setAttribute('aria-hidden', open ? 'false' : 'true');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    if (!modal.getAttribute('aria-labelledby')) {
      // tenta usar o primeiro h1/h2/h3 como rótulo
      const heading = modal.querySelector('h1,h2,h3');
      if (heading && !heading.id) heading.id = `${modal.id || 'popup'}-title`;
      if (heading) modal.setAttribute('aria-labelledby', heading.id);
    }
  }

  function openPopup(target) {
    const popup = typeof target === 'string' ? document.querySelector(target) : target;
    if (!popup || state.active === popup) return;

    state.lastFocus = document.activeElement;

    const overlay = popup.closest('.popup-overlay');
    overlay.classList.add('is-open');
    setAria(popup, true);
    lockScroll(true);
    state.active = popup;

    // foco inicial
    const focusables = getFocusable(popup);
    (focusables[0] || popup).focus();

    // fechar por clique fora
    overlay.addEventListener('mousedown', overlay._outside = (ev) => {
      if (!popup.contains(ev.target)) closePopup(popup);
    });

    // ESC + trap TAB
    overlay.addEventListener('keydown', overlay._keys = (ev) => {
      if (ev.key === 'Escape') { ev.preventDefault(); closePopup(popup); }
      else if (ev.key === 'Tab') {
        const items = getFocusable(popup);
        if (!items.length) { ev.preventDefault(); return; }
        const first = items[0], last = items[items.length - 1];
        if (ev.shiftKey && document.activeElement === first) {
          ev.preventDefault(); last.focus();
        } else if (!ev.shiftKey && document.activeElement === last) {
          ev.preventDefault(); first.focus();
        }
      }
    });
  }

  function closePopup(target) {
    const popup = typeof target === 'string' ? document.querySelector(target) : target || state.active;
    if (!popup) return;
    const overlay = popup.closest('.popup-overlay');
    overlay.classList.remove('is-open');
    setAria(popup, false);
    lockScroll(false);

    // remove handlers
    if (overlay._outside) overlay.removeEventListener('mousedown', overlay._outside);
    if (overlay._keys) overlay.removeEventListener('keydown', overlay._keys);

    // devolver foco
    if (state.lastFocus && typeof state.lastFocus.focus === 'function') {
      state.lastFocus.focus();
    }
    state.active = null;
  }

  // Delegação: abrir por data-popup-target
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-popup-target]');
    if (trigger) {
      e.preventDefault();
      const sel = trigger.getAttribute('data-popup-target');
      openPopup(sel);
    }
    const closer = e.target.closest('[data-popup-close]');
    if (closer) {
      e.preventDefault();
      const popup = e.target.closest('.popup-modal');
      closePopup(popup);
    }
  });

  // Expor API global opcional
  window.Popup = { open: openPopup, close: closePopup };
})();
