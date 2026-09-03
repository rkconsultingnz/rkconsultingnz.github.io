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

  dropdown.addEventListener('mouseenter', openMenu);
  dropdown.addEventListener('mouseleave', scheduleClose);
  menu.addEventListener('mouseenter', cancelClose);
  menu.addEventListener('mouseleave', scheduleClose);

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (menu.classList.contains('open')) { scheduleClose(); } else { openMenu(); }
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      if (chevron) chevron.style.transform = '';
    }
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
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
    });
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
