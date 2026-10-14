// site.js — interactive behaviour only.
// Nav and footer markup is now rendered server-side by Jekyll includes so that
// crawlers which do not execute JavaScript can still see the site's navigation.

function initDropdown() {
  const dropdown = document.getElementById('services-dropdown');
  const menu = document.getElementById('dropdown-menu');
  const toggle = document.getElementById('dropdown-toggle');
  const chevron = document.getElementById('dropdown-chevron');

  if (!dropdown || !menu || !toggle) return;

  let closeTimer = null;

  function openMenu() {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }

  function scheduleClose() {
    closeTimer = setTimeout(() => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      if (chevron) chevron.style.transform = '';
    }, 150); // grace period — enough time to move the mouse into the menu
  }

  function cancelClose() {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
  }

  // Hover-to-open only on devices with a real mouse. On touch screens a tap fires emulated
  // mouseenter + click together, which would open and immediately close the menu.
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const ifHover = (fn) => () => { if (canHover.matches) fn(); };
  dropdown.addEventListener('mouseenter', ifHover(openMenu));
  dropdown.addEventListener('mouseleave', ifHover(scheduleClose));
  menu.addEventListener('mouseenter', ifHover(cancelClose));
  menu.addEventListener('mouseleave', ifHover(scheduleClose));

  // With a mouse, hovering already opens the menu, so a click on "Services" must never close it
  // (people naturally hover and then click). Touch screens and keyboard (Enter/Space, detail === 0)
  // still toggle it open and closed.
  function closeNow() {
    cancelClose();
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    if (chevron) chevron.style.transform = '';
  }

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = menu.classList.contains('open');
    if (!isOpen) { openMenu(); return; }
    if (e.detail === 0 || !canHover.matches) closeNow();
  });

  dropdown.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeNow();
      toggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) closeNow();
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { menu.classList.remove('open'); });
    link.addEventListener('mousedown', (e) => { e.stopPropagation(); });
  });
}

function initNav() {
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    const toggleMenu = () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    hamburger.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active link highlight
  document.querySelectorAll('#nav-links a:not(.dropdown-toggle):not(.nav-cta)').forEach(link => {
    if (link.href && link.href === window.location.href) link.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initDropdown();
});
