// builder/header-footer.js
const categories = require('./categories');

function getHeaderHtml(relPath = '', active = '') {
  return `
<header class="site-header">
  <div class="container header-inner">
    <a href="${relPath}index.html" class="logo">
      <div class="logo-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      </div>
      <span>Desi<span class="logo-domain">Desk</span></span>
    </a>

    <ul class="nav-links">
      <li><a href="${relPath}index.html" class="nav-link ${active === 'home' ? 'active' : ''}">All Tools</a></li>
      <li><a href="${relPath}categories/pdf-tools.html" class="nav-link ${active === 'pdf' ? 'active' : ''}">PDF</a></li>
      <li><a href="${relPath}categories/image-tools.html" class="nav-link ${active === 'image' ? 'active' : ''}">Image</a></li>
      <li><a href="${relPath}categories/text-tools.html" class="nav-link ${active === 'text' ? 'active' : ''}">Text</a></li>
      <li><a href="${relPath}categories/calculator-tools.html" class="nav-link ${active === 'calculator' ? 'active' : ''}">Calculators</a></li>
      <li><a href="${relPath}categories/converter-tools.html" class="nav-link ${active === 'converter' ? 'active' : ''}">Converters</a></li>
      <li><a href="${relPath}categories/developer-tools.html" class="nav-link ${active === 'developer' ? 'active' : ''}">Developer</a></li>
      <li><a href="${relPath}about.html" class="nav-link ${active === 'about' ? 'active' : ''}">About</a></li>
    </ul>

    <div class="header-actions">
      <button class="header-search-btn" id="openSearchBtn" aria-label="Search tools">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span>Search</span>
        <span class="search-shortcut-badge">⌘K</span>
      </button>

      <button class="menu-toggle" id="mobileMenuOpen" aria-label="Open mobile menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </div>
</header>

<div class="mobile-menu" id="mobileMenu">
  <div class="mobile-menu-content">
    <div class="mobile-menu-header">
      <a href="${relPath}index.html" class="logo">
        <div class="logo-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        </div>
        <span>Desi<span class="logo-domain">Desk</span></span>
      </a>
      <button id="mobileMenuClose" style="background:none;border:none;cursor:pointer;padding:4px;color:var(--text-muted)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <ul class="mobile-nav-list">
      <li><a href="${relPath}index.html" class="mobile-nav-link">Home (All Tools)</a></li>
      <li><a href="${relPath}categories/pdf-tools.html" class="mobile-nav-link">PDF Tools</a></li>
      <li><a href="${relPath}categories/image-tools.html" class="mobile-nav-link">Image Tools</a></li>
      <li><a href="${relPath}categories/text-tools.html" class="mobile-nav-link">Text Tools</a></li>
      <li><a href="${relPath}categories/calculator-tools.html" class="mobile-nav-link">Calculators</a></li>
      <li><a href="${relPath}categories/converter-tools.html" class="mobile-nav-link">Converters</a></li>
      <li><a href="${relPath}categories/developer-tools.html" class="mobile-nav-link">Developer Tools</a></li>
      <li><a href="${relPath}categories/generator-tools.html" class="mobile-nav-link">Generators</a></li>
      <li><a href="${relPath}categories/utility-tools.html" class="mobile-nav-link">File Utilities</a></li>
      <li style="margin-top:0.75rem;border-top:1px solid var(--border-light);padding-top:0.75rem;"><a href="${relPath}about.html" class="mobile-nav-link">About DesiDesk</a></li>
      <li><a href="${relPath}privacy-policy.html" class="mobile-nav-link">Privacy Policy</a></li>
      <li><a href="${relPath}contact.html" class="mobile-nav-link">Contact Us</a></li>
    </ul>
  </div>
</div>
`;
}

function getFooterHtml(relPath = '') {
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${relPath}index.html" class="footer-logo">
          <div class="logo-icon" style="background:linear-gradient(135deg, #3b82f6, #1d4ed8);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
          <span>DesiDesk.in</span>
        </a>
        <p class="footer-text">
          Free, fast and 100% private browser-based online tools for everyday productivity. All processing runs locally on your device with zero server uploads.
        </p>
        <div style="display:flex;align-items:center;gap:0.5rem;font-size:0.8rem;color:#10b981;font-weight:600;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span>100% Client-Side Privacy Guarantee</span>
        </div>
      </div>

      <div>
        <h4 class="footer-heading">Tool Categories</h4>
        <ul class="footer-links">
          <li><a href="${relPath}categories/pdf-tools.html">PDF Tools</a></li>
          <li><a href="${relPath}categories/image-tools.html">Image Tools</a></li>
          <li><a href="${relPath}categories/text-tools.html">Text Tools</a></li>
          <li><a href="${relPath}categories/calculator-tools.html">Calculators</a></li>
          <li><a href="${relPath}categories/converter-tools.html">Unit Converters</a></li>
          <li><a href="${relPath}categories/developer-tools.html">Developer Tools</a></li>
          <li><a href="${relPath}categories/generator-tools.html">Generators</a></li>
          <li><a href="${relPath}categories/utility-tools.html">File Utilities</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-heading">Popular Tools</h4>
        <ul class="footer-links">
          <li><a href="${relPath}tools/image/image-compressor.html">Image Compressor</a></li>
          <li><a href="${relPath}tools/pdf/merge-pdf.html">Merge PDF</a></li>
          <li><a href="${relPath}tools/calculator/emi-calculator.html">EMI Calculator</a></li>
          <li><a href="${relPath}tools/calculator/gst-calculator.html">GST Calculator</a></li>
          <li><a href="${relPath}tools/developer/json-formatter.html">JSON Formatter</a></li>
          <li><a href="${relPath}tools/generator/qr-code-generator.html">QR Code Generator</a></li>
          <li><a href="${relPath}tools/text/word-counter.html">Word Counter</a></li>
          <li><a href="${relPath}tools/converter/length-converter.html">Length Converter</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-heading">Company & Legal</h4>
        <ul class="footer-links">
          <li><a href="${relPath}about.html">About DesiDesk</a></li>
          <li><a href="${relPath}privacy-policy.html">Privacy Policy</a></li>
          <li><a href="${relPath}terms.html">Terms of Service</a></li>
          <li><a href="${relPath}disclaimer.html">Disclaimer</a></li>
          <li><a href="${relPath}contact.html">Contact Us</a></li>
          <li><a href="${relPath}sitemap.xml">XML Sitemap</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div>&copy; 2026 DesiDesk.in. All rights reserved. Crafted for speed, privacy, and simplicity.</div>
      <div class="footer-legal-links">
        <a href="${relPath}privacy-policy.html">Privacy</a>
        <a href="${relPath}terms.html">Terms</a>
        <a href="${relPath}disclaimer.html">Disclaimer</a>
        <a href="${relPath}contact.html">Contact</a>
      </div>
    </div>
  </div>
</footer>
`;
}

function getSearchModalHtml() {
  return `
<div class="search-modal" id="searchModal">
  <div class="search-modal-box">
    <div class="search-modal-header">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" class="search-modal-input" id="searchModalInput" placeholder="Search 130+ online tools (e.g. compress, merge, emi, json)..." autocomplete="off" />
      <button id="closeSearchBtn" style="background:none;border:none;cursor:pointer;color:var(--text-muted);padding:4px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="search-modal-results" id="searchModalResults">
      <div style="padding:1.5rem;text-align:center;color:var(--text-muted);font-size:0.9rem;">Type to instantly search tools...</div>
    </div>
  </div>
</div>
`;
}

function getCommonScript(toolsListJson, relPath = '') {
  return `
(function() {
  const tools = ${toolsListJson};
  const searchBtn = document.getElementById('openSearchBtn');
  const searchModal = document.getElementById('searchModal');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchInput = document.getElementById('searchModalInput');
  const searchResults = document.getElementById('searchModalResults');
  const mobileOpen = document.getElementById('mobileMenuOpen');
  const mobileClose = document.getElementById('mobileMenuClose');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileOpen && mobileMenu) {
    mobileOpen.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) mobileMenu.classList.remove('open');
    });
  }

  function openSearch() {
    if (!searchModal) return;
    searchModal.classList.add('open');
    setTimeout(() => {
      if (searchInput) {
        searchInput.focus();
        renderResults(searchInput.value.trim());
      }
    }, 50);
  }

  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.remove('open');
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (searchModal && searchModal.classList.contains('open')) closeSearch();
      else openSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
      if (mobileMenu) mobileMenu.classList.remove('open');
    }
  });

  function renderResults(q) {
    if (!searchResults) return;
    const query = q.toLowerCase();
    const filtered = tools.filter(t => 
      t.name.toLowerCase().includes(query) || 
      t.desc.toLowerCase().includes(query) || 
      (t.keywords && t.keywords.toLowerCase().includes(query)) ||
      t.cat.toLowerCase().includes(query)
    ).slice(0, 10);

    if (filtered.length === 0) {
      searchResults.innerHTML = '<div style="padding:1.5rem;text-align:center;color:var(--text-muted);font-size:0.9rem;">No tools found matching "' + q.replace(/</g, '&lt;') + '". Try another keyword.</div>';
      return;
    }

    searchResults.innerHTML = filtered.map(t => \`
      <a href="\${'${relPath}' + t.url}" class="search-result-item" onclick="saveRecent('\${t.id}')">
        <div class="search-result-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        </div>
        <div style="flex:1;">
          <div class="search-result-title">\${t.name}</div>
          <div class="search-result-cat">\${t.catName} • \${t.desc}</div>
        </div>
        <span style="font-size:0.8rem;color:var(--primary);font-weight:600;">Open &rarr;</span>
      </a>
    \`).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderResults(e.target.value.trim()));
  }

  window.saveRecent = function(toolId) {
    try {
      let recents = JSON.parse(localStorage.getItem('desidesk_recents') || '[]');
      recents = recents.filter(id => id !== toolId);
      recents.unshift(toolId);
      if (recents.length > 8) recents.pop();
      localStorage.setItem('desidesk_recents', JSON.stringify(recents));
    } catch(e) {}
  };
})();
`;
}

module.exports = {
  getHeaderHtml,
  getFooterHtml,
  getSearchModalHtml,
  getCommonScript
};
