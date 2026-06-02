// shared.js — nav + footer injection

const ICONS = {
  airtable: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
  powerbi: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="4" height="18" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="5" width="4" height="16" rx="1"/></svg>`,
  looker: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  spreadsheet: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>`,
  ai: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"/><circle cx="9" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1" fill="currentColor" stroke="none"/></svg>`,
  automation: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
};

function buildNav(isRoot) {
  const base = isRoot ? '' : '../';
  const pagesBase = isRoot ? 'pages/' : '';
  const aboutHref = isRoot ? '#about' : '../index.html#about';

  return `
<nav id="main-nav">
  <div class="nav-inner">
    <a class="nav-logo" href="${base}index.html">
      <img src="${base}images/logo.png" alt="RK Consulting — Data, Analytics &amp; AI">
    </a>
    <div class="nav-links" id="nav-links">
      <a href="${base}index.html">Home</a>
      <div class="dropdown" id="services-dropdown">
        <a class="dropdown-toggle" id="dropdown-toggle" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          Services
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" id="dropdown-chevron">
            <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </a>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <a href="${pagesBase}airtable.html" role="menuitem">${ICONS.airtable} Airtable</a>
          <a href="${pagesBase}power-bi.html" role="menuitem">${ICONS.powerbi} Power BI</a>
          <a href="${pagesBase}looker-studio.html" role="menuitem">${ICONS.looker} Looker Studio</a>
          <a href="${pagesBase}spreadsheets.html" role="menuitem">${ICONS.spreadsheet} Spreadsheets</a>
          <a href="${pagesBase}ai-consulting.html" role="menuitem">${ICONS.ai} AI Consulting</a>
          <a href="${pagesBase}ai-automation.html" role="menuitem">${ICONS.automation} AI Automation</a>
        </div>
      </div>
      <a href="${aboutHref}">About</a>
      <a href="${pagesBase}contact.html" class="nav-cta">Get in Touch</a>
    </div>
    <div class="hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>`;
}

function buildFooter(isRoot) {
  const base = isRoot ? '' : '../';
  const pagesBase = isRoot ? 'pages/' : '';
  const aboutHref = isRoot ? '#about' : '../index.html#about';

  return `
<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <img src="${base}images/logo.png" alt="RK Consulting">
        <p>Turning Data into Decisions. AI into Impact.</p>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <a href="${pagesBase}airtable.html">Airtable</a>
        <a href="${pagesBase}power-bi.html">Power BI</a>
        <a href="${pagesBase}looker-studio.html">Looker Studio</a>
        <a href="${pagesBase}spreadsheets.html">Spreadsheets</a>
      </div>
      <div class="footer-col">
        <h4>AI Services</h4>
        <a href="${pagesBase}ai-consulting.html">AI Consulting</a>
        <a href="${pagesBase}ai-automation.html">AI Automation</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="${aboutHref}">About Us</a>
        <a href="${pagesBase}contact.html">Contact</a>
        <a href="mailto:info@rkconsulting.co.nz">info@rkconsulting.co.nz</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 RK Consulting Limited</span>
      <span>Built for data-driven businesses</span>
    </div>
  </div>
</footer>`;
}

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
    }, 150); // 150ms grace period — enough time to move mouse into menu
  }

  function cancelClose() {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
  }

  // Hover on the whole dropdown area (toggle + menu together)
  dropdown.addEventListener('mouseenter', openMenu);
  dropdown.addEventListener('mouseleave', scheduleClose);

  // Keep open while mouse is inside the menu
  menu.addEventListener('mouseenter', cancelClose);
  menu.addEventListener('mouseleave', scheduleClose);

  // Click toggle for keyboard / touch users
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (menu.classList.contains('open')) {
      scheduleClose();
    } else {
      openMenu();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      if (chevron) chevron.style.transform = '';
    }
  });

  // Ensure menu link clicks fire normally (don't get swallowed)
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      // Let the navigation happen naturally — just close the menu
      menu.classList.remove('open');
    });
    // Also handle mousedown to be safe
    link.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });
  });
}

function injectShared(isRoot = false) {
  // Inject nav
  const navEl = document.getElementById('nav-placeholder');
  if (navEl) navEl.outerHTML = buildNav(isRoot);

  // Inject footer
  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) footerEl.outerHTML = buildFooter(isRoot);

  // Scroll shadow
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  // Init dropdown after DOM is ready
  initDropdown();

  // Active link highlight
  const allLinks = document.querySelectorAll('#nav-links a:not(.dropdown-toggle):not(.nav-cta)');
  allLinks.forEach(link => {
    if (link.href && link.href === window.location.href) {
      link.classList.add('active');
    }
  });
}
