// shared.js — injects nav + footer into every page

const ICONS = {
  airtable: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
  powerbi: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="4" height="18" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="5" width="4" height="16" rx="1"/></svg>`,
  looker: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  spreadsheet: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="8" y1="9" x2="10" y2="9"/></svg>`,
  ai: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg>`,
  automation: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
};

const NAV_HTML = `
<nav id="main-nav">
  <div class="nav-inner">
    <a class="nav-logo" href="../index.html">
      <img src="../images/logo.png" alt="RK Consulting — Data, Analytics & AI">
    </a>
    <div class="nav-links" id="nav-links">
      <a href="../index.html">Home</a>
      <div class="dropdown">
        <a class="dropdown-toggle nav-links">
          Services
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </a>
        <div class="dropdown-menu">
          <a href="airtable.html">${ICONS.airtable} Airtable</a>
          <a href="power-bi.html">${ICONS.powerbi} Power BI</a>
          <a href="looker-studio.html">${ICONS.looker} Looker Studio</a>
          <a href="spreadsheets.html">${ICONS.spreadsheet} Spreadsheets</a>
          <a href="ai-consulting.html">${ICONS.ai} AI Consulting</a>
          <a href="ai-automation.html">${ICONS.automation} AI Automation</a>
        </div>
      </div>
      <a href="../index.html#about">About</a>
      <a href="contact.html" class="nav-cta">Get in Touch</a>
    </div>
    <div class="hamburger" id="hamburger">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <img src="../images/logo.png" alt="RK Consulting">
        <p>Empowering businesses through data, analytics, and AI.</p>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <a href="airtable.html">Airtable</a>
        <a href="power-bi.html">Power BI</a>
        <a href="looker-studio.html">Looker Studio</a>
        <a href="spreadsheets.html">Spreadsheets</a>
      </div>
      <div class="footer-col">
        <h4>AI Services</h4>
        <a href="ai-consulting.html">AI Consulting</a>
        <a href="ai-automation.html">AI Automation</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="../index.html#about">About Us</a>
        <a href="contact.html">Contact</a>
        <a href="mailto:info@rkconsulting.co.nz">info@rkconsulting.co.nz</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 RK Consulting Limited</span>
      <span>Built for data-driven businesses</span>
    </div>
  </div>
</footer>`;

const NAV_ROOT = NAV_HTML
  .replace(/href="\.\.\/index\.html"/g, 'href="index.html"')
  .replace(/href="pages\//g, 'href="pages/')
  .replace(/src="\.\.\/images\//g, 'src="images/');

const FOOTER_ROOT = FOOTER_HTML
  .replace(/href="\.\.\/index\.html/g, 'href="index.html')
  .replace(/href="pages\//g, 'href="pages/')
  .replace(/src="\.\.\/images\//g, 'src="images/');

function injectShared(isRoot = false) {
  const navEl = document.getElementById('nav-placeholder');
  if (navEl) navEl.outerHTML = isRoot ? NAV_ROOT : NAV_HTML;

  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) footerEl.outerHTML = isRoot ? FOOTER_ROOT : FOOTER_HTML;

  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  const links = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
  links.forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
  });
}
