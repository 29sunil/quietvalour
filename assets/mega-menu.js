(() => {
  const SELECTORS = {
    menu: '[data-mega-menu]',
    summary: '.custom-mega-menu__summary',
    panel: '.custom-mega-menu__panel',
    item: '[data-mega-menu-item]',
    toggle: '[data-mega-menu-toggle]',
    submenu: '[data-mega-menu-panel]'
  };

  const MOBILE_QUERY = '(max-width: 989px)';
  const hoverTimers = new WeakMap();

  const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;

  const setSummaryState = (menu, isOpen) => {
    const summary = menu.querySelector(SELECTORS.summary);

    if (summary) {
      summary.setAttribute('aria-expanded', String(isOpen));
    }
  };

  const closeNestedPanels = (scope) => {
    scope.querySelectorAll(SELECTORS.toggle).forEach((toggle) => {
      toggle.setAttribute('aria-expanded', 'false');
    });

    scope.querySelectorAll(SELECTORS.submenu).forEach((panel) => {
      panel.hidden = true;
    });
  };

  const openMenu = (menu) => {
    if (!menu || menu.open) {
      return;
    }

    document.querySelectorAll(`${SELECTORS.menu}[open]`).forEach((openMenuItem) => {
      if (openMenuItem !== menu) {
        closeMenu(openMenuItem);
      }
    });

    menu.open = true;
    setSummaryState(menu, true);
  };

  const closeMenu = (menu) => {
    if (!menu) {
      return;
    }

    menu.open = false;
    setSummaryState(menu, false);
    closeNestedPanels(menu);
  };

  const toggleSubmenu = (toggle) => {
    const panelId = toggle.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;

    if (!panel) {
      return;
    }

    const item = toggle.closest(SELECTORS.item);
    const parentList = item ? item.parentElement : null;
    const willOpen = toggle.getAttribute('aria-expanded') !== 'true';

    if (parentList) {
      parentList.querySelectorAll(':scope > [data-mega-menu-item] > .custom-mega-menu__item-row [data-mega-menu-toggle]').forEach((siblingToggle) => {
        if (siblingToggle === toggle) {
          return;
        }

        const siblingPanelId = siblingToggle.getAttribute('aria-controls');
        const siblingPanel = siblingPanelId ? document.getElementById(siblingPanelId) : null;
        siblingToggle.setAttribute('aria-expanded', 'false');

        if (siblingPanel) {
          siblingPanel.hidden = true;
          closeNestedPanels(siblingPanel);
        }
      });
    }

    toggle.setAttribute('aria-expanded', String(willOpen));
    panel.hidden = !willOpen;
  };

  const scheduleOpen = (menu) => {
    const pendingTimer = hoverTimers.get(menu);

    if (pendingTimer) {
      window.clearTimeout(pendingTimer);
    }

    const timer = window.setTimeout(() => openMenu(menu), 80);
    hoverTimers.set(menu, timer);
  };

  const scheduleClose = (menu) => {
    const pendingTimer = hoverTimers.get(menu);

    if (pendingTimer) {
      window.clearTimeout(pendingTimer);
    }

    const timer = window.setTimeout(() => closeMenu(menu), 160);
    hoverTimers.set(menu, timer);
  };

  const handleClick = (event) => {
    const toggle = event.target.closest(SELECTORS.toggle);

    if (toggle) {
      event.preventDefault();
      toggleSubmenu(toggle);
      return;
    }

    const summary = event.target.closest(SELECTORS.summary);

    if (summary) {
      const menu = summary.closest(SELECTORS.menu);

      if (!menu) {
        return;
      }

      if (!isMobile()) {
        event.preventDefault();
      }

      menu.open ? closeMenu(menu) : openMenu(menu);
      return;
    }

    if (!event.target.closest(SELECTORS.menu)) {
      document.querySelectorAll(`${SELECTORS.menu}[open]`).forEach(closeMenu);
    }
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      const openMenus = document.querySelectorAll(`${SELECTORS.menu}[open]`);

      openMenus.forEach((menu) => {
        closeMenu(menu);
        const summary = menu.querySelector(SELECTORS.summary);

        if (summary && menu.contains(document.activeElement)) {
          summary.focus();
        }
      });
    }
  };

  const handlePointerEnter = (event) => {
    if (isMobile()) {
      return;
    }

    const menu = event.target.closest(SELECTORS.menu);

    if (menu && !menu.contains(event.relatedTarget)) {
      scheduleOpen(menu);
    }
  };

  const handlePointerLeave = (event) => {
    if (isMobile()) {
      return;
    }

    const menu = event.target.closest(SELECTORS.menu);

    if (menu && !menu.contains(event.relatedTarget)) {
      scheduleClose(menu);
    }
  };

  const handleFocusIn = (event) => {
    const menu = event.target.closest(SELECTORS.menu);

    if (menu && !isMobile()) {
      openMenu(menu);
    }
  };

  const handleFocusOut = (event) => {
    const menu = event.target.closest(SELECTORS.menu);

    if (!menu || isMobile()) {
      return;
    }

    window.setTimeout(() => {
      if (!menu.contains(document.activeElement)) {
        closeMenu(menu);
      }
    }, 0);
  };

  const initializeMenus = (scope = document) => {
    scope.querySelectorAll(SELECTORS.menu).forEach((menu) => {
      setSummaryState(menu, menu.open);
      closeNestedPanels(menu);
    });
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('focusin', handleFocusIn);
  document.addEventListener('focusout', handleFocusOut);
  document.addEventListener('pointerover', handlePointerEnter);
  document.addEventListener('pointerout', handlePointerLeave);

  document.addEventListener('shopify:section:load', (event) => {
    initializeMenus(event.target);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initializeMenus());
  } else {
    initializeMenus();
  }
})();
