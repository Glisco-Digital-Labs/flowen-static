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
    console.log(`****** popup ${target}`);
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
    const fromModal = e.target.closest('.popup-modal');
    const goto = e.target.closest('[data-popup-goto]');

    if (goto) {
      const target = document.querySelector(goto.dataset.popupTarget);
      const popup = e.target.closest('.popup-modal'); 
      closePopup(popup);
      if (target) {
        // smooth scroll; if you want instant: behavior:'auto'
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // optional: move focus for a11y
        if (typeof target.tabIndex !== 'number' || target.tabIndex < 0) {
          target.tabIndex = -1; // make focusable without altering visuals
        }
        setTimeout(() => target.focus({ preventScroll: true }), 350);
      }
      return;
    }

    // if (trigger) {
    //   e.preventDefault();
    //   const sel = trigger.getAttribute('data-popup-target');
    //   // Close current, then open target, preserving overlay feel
    //   // Small rAF dance to avoid focus race conditions
    //   if (fromModal) {
    //     const popup = e.target.closest('.popup-modal');
    //     closePopup(popup);
    //     requestAnimationFrame(() => {
    //       openPopup(sel);
    //     });
    //   } else {
    //     openPopup(sel);
    //   } 
      
    // }
    const closer = e.target.closest('[data-popup-close]');
    if (closer) {
      e.preventDefault();
      const popup = e.target.closest('.popup-modal');
      closePopup(popup);
    }
  });

  // --- Add-on: Navigate to another popup from within a popup ---
// Supports: <button data-popup-open="#popup-target">
// document.addEventListener('click', (e) => {
//   const nav = e.target.closest('[data-popup-open]');
//   if (!nav) return;
//   e.preventDefault();

//   const toSel = nav.getAttribute('data-popup-target');
//   const toExists = document.querySelector(toSel);
  
//   console.log(`data-popup-open clicked on. nav`, nav, );
//   console.log(`data-popup-open clicked on. toSel`, toSel);
//   console.log(`data-popup-open clicked on. fromModal`, fromModal);
//   console.log(`data-popup-open clicked on. toExists`, toExists);

//   if (!toExists) return;

//   // Close current, then open target, preserving overlay feel
//   // Small rAF dance to avoid focus race conditions
//   if (fromModal) {
//     window.Popup.close(fromModal);
//     requestAnimationFrame(() => requestAnimationFrame(() => window.Popup.open(toSel)));
//   } else {
//     window.Popup.open(toSel);
//   }
// });

// --- Add-on: CTA that closes popup and scrolls to a target ---
// Supports: <a data-popup-goto="#book-now">
// document.addEventListener('click', (e) => {
//   const goto = e.target.closest('[data-popup-goto]');
//   if (!goto) return;
//   e.preventDefault();

//   const selector = goto.getAttribute('data-popup-goto');
//   const target = document.querySelector(selector);

//   const current = e.target.closest('.popup-modal');
//   if (current) window.Popup.close(current);

//   if (target) {
//     // smooth scroll; if you want instant: behavior:'auto'
//     target.scrollIntoView({ behavior: 'smooth', block: 'start' });

//     // optional: move focus for a11y
//     if (typeof target.tabIndex !== 'number' || target.tabIndex < 0) {
//       target.tabIndex = -1; // make focusable without altering visuals
//     }
//     setTimeout(() => target.focus({ preventScroll: true }), 350);
//   }
// });


  // Expor API global opcional
  window.Popup = { open: openPopup, close: closePopup };
})();

// ===== Portal mode (single global overlay with swap) =====
(function(){
  let overlay, currentModal, lastFocus;

  function ensureOverlay(){
    if (overlay) return overlay;
    overlay = document.getElementById('popup-overlay-global');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'popup-overlay-global';
      overlay.className = 'popup-overlay';
      document.body.appendChild(overlay);
    }
    // outside click
    overlay.addEventListener('mousedown', (ev) => {
      if (currentModal && !currentModal.contains(ev.target)) Popup.close();
    });
    // keys
    overlay.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') { ev.preventDefault(); Popup.close(); }
      else if (ev.key === 'Tab' && currentModal) {
        const items = [...currentModal.querySelectorAll(`
          a[href], button:not([disabled]), textarea, input, select,
          [tabindex]:not([tabindex="-1"])
        `)];
        if (!items.length) { ev.preventDefault(); return; }
        const first = items[0], last = items[items.length - 1];
        if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
        else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
      }
    });
    return overlay;
  }

  function setAria(modal, open){
    modal.setAttribute('aria-hidden', open ? 'false':'true');
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    const h = modal.querySelector('h1,h2,h3,.popup-header');
    if (h && !modal.getAttribute('aria-labelledby')) {
      if (!h.id) h.id = modal.id ? `${modal.id}-title` : `popup-title`;
      modal.setAttribute('aria-labelledby', h.id);
    }
  }

  function focusFirst(modal){
    const items = [...modal.querySelectorAll(`
      a[href], button:not([disabled]), textarea, input, select,
      [tabindex]:not([tabindex="-1"])
    `)];
    (items[0] || modal).focus();
  }

  // Core: open/swap from <template id="...">
  function openFromTemplate(selector){
    const tpl = document.querySelector(selector);
    if (!(tpl instanceof HTMLTemplateElement)) return false;

    const ov = ensureOverlay();
    const wasOpen = ov.classList.contains('is-open'); // <— detect prior state
    lastFocus = document.activeElement;

    const nextModal = tpl.content.firstElementChild.cloneNode(true);

    if (currentModal) {
      ov.replaceChild(nextModal, currentModal);
    } else {
      ov.appendChild(nextModal);
    }

    // Always ensure visible/locked
    ov.classList.add('is-open');
    document.documentElement.classList.add('popup-lock');
    document.body.classList.add('popup-lock');

    // Animate ONLY on first open (not on swaps)
    if (!wasOpen) {
      ov.classList.add('animating');
      const clear = () => ov.classList.remove('animating');
      // prefer event, fallback to timeout
      nextModal.addEventListener('animationend', clear, { once: true });
      setTimeout(clear, 250);
    } else {
      // Just in case: ensure no residual animation class on swaps
      ov.classList.remove('animating');
      nextModal.classList.add('no-anim'); // extra guard (can omit)
      requestAnimationFrame(() => nextModal.classList.remove('no-anim'));
    }

    currentModal = nextModal;
    setAria(currentModal, true);
    document.documentElement.dataset.currentPopup = selector;
    focusFirst(currentModal);
    return true;
  }

  function closePortal(){
    if (!overlay || !currentModal) return;
    overlay.classList.remove('is-open');
    overlay.innerHTML = ''; // remove modal
    currentModal = null;
    document.documentElement.classList.remove('popup-lock');
    document.body.classList.remove('popup-lock');
    const lf = lastFocus; lastFocus = null;
    if (lf && typeof lf.focus === 'function') lf.focus();
    delete document.documentElement.dataset.currentPopup;
  }

  // Hook into your existing API, keeping backward compatibility:
  const origOpen = window.Popup?.open;
  const origClose = window.Popup?.close;

  window.Popup = Object.assign({}, window.Popup, {
    open(target){
      // If target is a <template>, use portal mode; otherwise fall back to original
      const ok = typeof target === 'string' && openFromTemplate(target);
      if (!ok && origOpen) return origOpen(target);
    },
    swap(to){
      // Always try swapping via template (no flicker)
      const ok = typeof to === 'string' && openFromTemplate(to);
      if (!ok && origOpen) return origOpen(to);
    },
    close(target){
      if (!target || target === document.documentElement.dataset.currentPopup) {
        closePortal();
      } else if (origClose) {
        origClose(target);
      }
    }
  });

  // Delegate clicks for next/prev and goto (works with portal mode too)
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-popup-open]');
    if (openBtn) {
      e.preventDefault();
      const toSel = openBtn.getAttribute('data-popup-open');
      // Prefer swap (no flicker)
      console.log(`Popup => nav netx/prev to ${toSel}`);
      return window.Popup.swap(toSel);
    }

    // We're closing the popup or moving away from the page anyway
    const goto = e.target.closest('[data-popup-goto]');
    // If go-to is not null, we're simply closing the popup and moving to the target
    if (goto) {
      e.preventDefault();
      const sel = goto.getAttribute('data-popup-goto');
      window.Popup.close(); // closes portal if open
      const target = document.querySelector(sel);
      if (target) {
        target.scrollIntoView({ behavior:'smooth', block:'start' });
        if (typeof target.tabIndex !== 'number' || target.tabIndex < 0) target.tabIndex = -1;
        setTimeout(() => target.focus({ preventScroll:true }), 350);
      }
    }
  });

  // Make [data-popup-close] call the portal close
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-popup-close]');
    if (!t) return;
    e.preventDefault();
    // close the portal overlay (restores focus, clears state)
    window.Popup?.close();
  });

})();
