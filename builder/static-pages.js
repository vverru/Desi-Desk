// builder/static-pages.js
const categories = require('./categories');
const getMasterCSS = require('./css');
const { getHeaderHtml, getFooterHtml, getSearchModalHtml, getCommonScript } = require('./header-footer');

function getCategoriesMap() {
  const map = {};
  categories.forEach(c => map[c.id] = c);
  return map;
}

function getIndexHtml(tools) {
  const css = getMasterCSS();
  const catMap = getCategoriesMap();
  const toolsJson = JSON.stringify(tools.map(t => ({
    id: t.id,
    name: t.name,
    desc: t.shortDesc,
    cat: t.category,
    catName: catMap[t.category] ? catMap[t.category].name : t.category,
    url: `tools/${t.category}/${t.slug}.html`,
    keywords: t.keywords
  })));

  const popularTools = tools.filter(t => [
    'compress-pdf', 'merge-pdf', 'split-pdf', 'image-compressor', 'image-resizer',
    'emi-calculator', 'gst-calculator', 'qr-code-generator', 'json-formatter',
    'word-counter', 'length-converter', 'password-generator'
  ].includes(t.id));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DesiDesk - 108+ Free Online Tools For Your Daily Work</title>
  <meta name="description" content="108+ free online tools for PDF, image, text, calculations, converters, developer utilities, and generators. 100% private, browser-based, zero file uploads.">
  <meta name="keywords" content="online tools, pdf tools, compress pdf, merge pdf, image compressor, emi calculator, gst calculator, json formatter, qr code generator, free web tools">
  <link rel="canonical" href="https://www.desidesk.in/">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="manifest" href="manifest.webmanifest">
  <meta name="theme-color" content="#2563eb">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.desidesk.in/">
  <meta property="og:title" content="DesiDesk - 108+ Free Online Tools For Your Daily Work">
  <meta property="og:description" content="Fast, 100% private browser-based online tools. No file uploads, no registration required.">
  <meta property="og:image" content="https://www.desidesk.in/favicon.svg">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://www.desidesk.in/">
  <meta name="twitter:title" content="DesiDesk - 108+ Free Online Tools">
  <meta name="twitter:description" content="All-in-one suite of 108+ fast, free and 100% private online tools.">

  <style>
${css}
  </style>
  <script>
    (function(){try{var t=localStorage.getItem('desidesk_theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();
  </script>
</head>
<body>
${getHeaderHtml('', 'home')}

<main class="main-content">
  <section class="hero container">
    <div class="hero-badge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      <span>100% Client-Side Privacy &bull; Zero Server Uploads</span>
    </div>
    <h1 class="hero-title">108+ Free Online Tools <span class="hero-gradient">For Your Daily Work</span></h1>
    <p class="hero-subtitle">
      Fast, free, and secure online utilities. Compress &amp; merge PDFs, resize photos, calculate EMI &amp; GST, generate QR codes, test code, and convert files &mdash; running entirely inside your browser.
    </p>

    <!-- Trust Indicators (Free, Browser-Based, Privacy-Focused) -->
    <div class="hero-trust-row">
      <span class="hero-trust-pill">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        100% Free Forever
      </span>
      <span class="hero-trust-pill">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        Browser-Based (No Software)
      </span>
      <span class="hero-trust-pill">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        Privacy-Focused (Zero Uploads)
      </span>
    </div>

    <!-- Big Functional Search Bar with Instant Suggestions -->
    <div class="search-container">
      <div class="search-input-box">
        <svg class="search-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="homeSearchInput" class="search-input" placeholder="Search 108+ free tools (e.g. compress pdf, merge, emi, qr, json)..." autocomplete="off" />
        <button id="homeClearSearch" class="search-clear-btn" aria-label="Clear search">&times;</button>
      </div>
      <div class="search-suggestions">
        <span>Popular:</span>
        <button type="button" class="suggestion-pill" data-search="compress pdf">PDF Compressor</button>
        <button type="button" class="suggestion-pill" data-search="merge pdf">Merge PDF</button>
        <button type="button" class="suggestion-pill" data-search="image resizer">Image Resizer</button>
        <button type="button" class="suggestion-pill" data-search="gst calculator">GST Calculator</button>
        <button type="button" class="suggestion-pill" data-search="json formatter">JSON Formatter</button>
        <button type="button" class="suggestion-pill" data-search="qr code">QR Code</button>
      </div>
    </div>

    <!-- Category Filter Pills -->
    <div class="filter-pills" id="homeFilterPills">
      <button class="filter-pill active" data-filter="all">All Tools (108)</button>
      ${categories.map(c => {
        const count = tools.filter(t => t.category === c.id).length;
        return `<button class="filter-pill" data-filter="${c.id}">${c.name} (${count})</button>`;
      }).join('')}
    </div>

    <!-- Attractive Feature Showcase Banner -->
    <div class="hero-banner-card">
      <div class="hero-feature-chip">
        <div class="hero-feature-chip-icon" style="background:#fef2f2;color:#dc2626;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div>
          <div style="font-size:0.875rem;font-weight:700;color:var(--secondary);">PDF Tools (15)</div>
          <div style="font-size:0.75rem;color:#10b981;font-weight:600;">Compress, Merge &amp; Split</div>
        </div>
      </div>

      <div class="hero-feature-chip">
        <div class="hero-feature-chip-icon" style="background:#eff6ff;color:#2563eb;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </div>
        <div>
          <div style="font-size:0.875rem;font-weight:700;color:var(--secondary);">Image Tools (18)</div>
          <div style="font-size:0.75rem;color:#2563eb;font-weight:600;">Compress, Resize &amp; WebP</div>
        </div>
      </div>

      <div class="hero-feature-chip">
        <div class="hero-feature-chip-icon" style="background:#fffbeb;color:#d97706;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/></svg>
        </div>
        <div>
          <div style="font-size:0.875rem;font-weight:700;color:var(--secondary);">Calculators (14)</div>
          <div style="font-size:0.75rem;color:#d97706;font-weight:600;">GST, EMI &amp; Financial</div>
        </div>
      </div>

      <div class="hero-feature-chip">
        <div class="hero-feature-chip-icon" style="background:#f0fdf4;color:#059669;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </div>
        <div>
          <div style="font-size:0.875rem;font-weight:700;color:var(--secondary);">Developer Tools (15)</div>
          <div style="font-size:0.75rem;color:#059669;font-weight:600;">JSON, Base64 &amp; Regex</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Recently Used Section (Dynamic via JS) -->
  <section class="container" id="recentSection" style="display:none;margin-bottom:3rem;">
    <div class="section-header">
      <div>
        <h2 class="section-title">Recently Used Tools</h2>
        <p class="section-desc">Quick shortcuts to tools you opened recently</p>
      </div>
    </div>
    <div class="grid-tools" id="recentToolsGrid"></div>
  </section>

  <!-- Popular / Featured Tools Section -->
  <section class="container" id="popularSection" style="margin-bottom:3.5rem;">
    <div class="section-header">
      <div>
        <h2 class="section-title">Popular Tools</h2>
        <p class="section-desc">Most popular productivity tools used every day</p>
      </div>
      <a href="#allToolsSection" class="btn btn-outline btn-sm">
        View All 108 Tools &darr;
      </a>
    </div>
    <div class="grid-tools">
      ${popularTools.map(t => `
        <a href="tools/${t.category}/${t.slug}.html" class="tool-card" onclick="saveRecent('${t.id}')">
          <div class="tool-card-header">
            <div class="tool-card-icon" style="color:${catMap[t.category] ? catMap[t.category].accentColor : '#2563eb'};background:${catMap[t.category] ? catMap[t.category].accentColor + '15' : '#eff6ff'};">
              ${catMap[t.category] ? catMap[t.category].icon : ''}
            </div>
            <span class="category-tag">${catMap[t.category] ? catMap[t.category].name : t.category}</span>
          </div>
          <h3 class="tool-card-title">${t.name}</h3>
          <p class="tool-card-desc">${t.shortDesc}</p>
          <div class="tool-card-footer">
            <span>Use Tool</span>
            <span>&rarr;</span>
          </div>
        </a>
      `).join('')}
    </div>
  </section>

  <!-- Browse by Category Section -->
  <section class="container" id="exploreSection" style="margin-bottom:3.5rem;">
    <div class="section-header">
      <div>
        <h2 class="section-title">Explore by Category</h2>
        <p class="section-desc">Find specialized browser tools organized by purpose</p>
      </div>
    </div>
    <div class="grid-categories">
      ${categories.map(c => {
        const count = tools.filter(t => t.category === c.id).length;
        return `
        <a href="categories/${c.slug}.html" class="cat-card">
          <div class="cat-card-icon" style="color:${c.accentColor};background:${c.accentColor}15;">
            ${c.icon}
          </div>
          <div>
            <h3 class="cat-card-title">${c.name}</h3>
            <p class="cat-card-desc">${c.tagline}</p>
            <div class="cat-tool-count">${count} Tools Available &rarr;</div>
          </div>
        </a>
        `;
      }).join('')}
    </div>
  </section>

  <!-- Master Tool Directory Section -->
  <section class="container" id="directorySection">
    <div id="allToolsSection"></div>
    <div class="section-header">
      <div>
        <h2 class="section-title" id="directoryTitle">All Online Tools (108)</h2>
        <p class="section-desc">Instant access to every client-side tool on DesiDesk</p>
      </div>
    </div>
    <div class="grid-tools" id="directoryGrid">
      ${tools.map(t => `
        <a href="tools/${t.category}/${t.slug}.html" class="tool-card" data-category="${t.category}" data-name="${t.name.toLowerCase()}" data-desc="${t.shortDesc.toLowerCase()}" data-keywords="${(t.keywords || '').toLowerCase()}" onclick="saveRecent('${t.id}')">
          <div class="tool-card-header">
            <div class="tool-card-icon" style="color:${catMap[t.category] ? catMap[t.category].accentColor : '#2563eb'};background:${catMap[t.category] ? catMap[t.category].accentColor + '15' : '#eff6ff'};">
              ${catMap[t.category] ? catMap[t.category].icon : ''}
            </div>
            <span class="category-tag">${catMap[t.category] ? catMap[t.category].name : t.category}</span>
          </div>
          <h3 class="tool-card-title">${t.name}</h3>
          <p class="tool-card-desc">${t.shortDesc}</p>
          <div class="tool-card-footer">
            <span>Open Tool</span>
            <span>&rarr;</span>
          </div>
        </a>
      `).join('')}
    </div>
    <div id="noResultsAlert" style="display:none;text-align:center;padding:3rem 1rem;color:var(--text-muted);">
      <h3 style="font-size:1.25rem;color:var(--secondary);margin-bottom:0.5rem;">No tools found</h3>
      <p>Try searching with another keyword or explore categories above.</p>
    </div>
  </section>

  <!-- Why Choose DesiDesk Features -->
  <section class="container seo-section" style="margin-top:4rem;">
    <div class="content-block">
      <h2>Why Choose DesiDesk.in?</h2>
      <p>
        DesiDesk is designed from the ground up for modern web users who value <strong>speed</strong>, <strong>privacy</strong>, and <strong>simplicity</strong>. Unlike traditional online converters that force you to upload sensitive files to third-party cloud servers, every single tool on DesiDesk executes directly inside your web browser.
      </p>

      <div class="steps-grid" style="margin-top:1.5rem;">
        <div class="step-card">
          <div class="step-number" style="background:#10b981;">&#10003;</div>
          <div class="step-title">100% Confidential</div>
          <div class="step-desc">Your photos, documents, and calculations are never transmitted or stored on any server.</div>
        </div>
        <div class="step-card">
          <div class="step-number" style="background:#2563eb;">&Delta;</div>
          <div class="step-title">Lightning Fast</div>
          <div class="step-desc">No network upload or download lag. Processing happens at full device memory speed.</div>
        </div>
        <div class="step-card">
          <div class="step-number" style="background:#7c3aed;">&infin;</div>
          <div class="step-title">Free Forever</div>
          <div class="step-desc">No registration, no subscriptions, no credit cards, and no artificial restrictions.</div>
        </div>
        <div class="step-card">
          <div class="step-number" style="background:#d97706;">&#9881;</div>
          <div class="step-title">Mobile Optimized</div>
          <div class="step-desc">Engineered for smooth performance on Android smartphones, tablets, and desktops.</div>
        </div>
      </div>
    </div>

    <!-- FAQ Accordion -->
    <div class="content-block">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-list">
        <details class="faq-item" open>
          <summary class="faq-question">Are my files uploaded to any server?</summary>
          <div class="faq-answer">
            No, never. All image compression, PDF manipulation, formatting, and mathematical calculations occur purely in client-side JavaScript and WebAssembly within your local browser sandbox.
          </div>
        </details>
        <details class="faq-item">
          <summary class="faq-question">Do I need to create an account or log in?</summary>
          <div class="faq-answer">
            No registration is required. You can use every tool immediately with zero signups or personal data collection.
          </div>
        </details>
        <details class="faq-item">
          <summary class="faq-question">Does DesiDesk work on mobile phones?</summary>
          <div class="faq-answer">
            Yes, DesiDesk is fully responsive and touch-optimized for Android Chrome, iOS Safari, tablets, and desktop computers.
          </div>
        </details>
        <details class="faq-item">
          <summary class="faq-question">Is DesiDesk free to use?</summary>
          <div class="faq-answer">
            Yes, all 108 published tools on DesiDesk are 100% free with no hidden charges, trial periods, or premium paywalls.
          </div>
        </details>
      </div>
    </div>
  </section>
</main>

${getSearchModalHtml()}
${getFooterHtml('')}

<script>
${getCommonScript(toolsJson, '')}

(function() {
  const homeSearchInput = document.getElementById('homeSearchInput');
  const homeClearSearch = document.getElementById('homeClearSearch');
  const directoryGrid = document.getElementById('directoryGrid');
  const directoryTitle = document.getElementById('directoryTitle');
  const noResultsAlert = document.getElementById('noResultsAlert');
  const filterPills = document.querySelectorAll('#homeFilterPills .filter-pill');
  const cards = Array.from(directoryGrid.querySelectorAll('.tool-card'));
  const popularSection = document.getElementById('popularSection');
  const exploreSection = document.getElementById('exploreSection');
  const directorySection = document.getElementById('directorySection');
  let currentFilter = 'all';

  function filterCards(shouldScroll = false) {
    const q = homeSearchInput.value.toLowerCase().trim();
    if (q) homeClearSearch.style.display = 'block';
    else homeClearSearch.style.display = 'none';

    const isFiltered = currentFilter !== 'all' || q !== '';
    if (popularSection) popularSection.style.display = isFiltered ? 'none' : 'block';
    if (exploreSection) exploreSection.style.display = isFiltered ? 'none' : 'block';

    let visibleCount = 0;
    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const name = card.getAttribute('data-name');
      const desc = card.getAttribute('data-desc');
      const kw = card.getAttribute('data-keywords') || '';

      const matchCat = currentFilter === 'all' || cat === currentFilter;
      const matchQuery = !q || name.includes(q) || desc.includes(q) || kw.includes(q);

      if (matchCat && matchQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      noResultsAlert.style.display = 'block';
      directoryTitle.textContent = 'No matching tools found';
    } else {
      noResultsAlert.style.display = 'none';
      if (currentFilter === 'all') {
        directoryTitle.textContent = q ? 'Search Results (' + visibleCount + ' tools)' : 'All Online Tools (108)';
      } else {
        const catName = filterPills.length ? Array.from(filterPills).find(p => p.getAttribute('data-filter') === currentFilter)?.textContent.split(' (')[0] : '';
        directoryTitle.textContent = (catName || 'Filtered') + ' (' + visibleCount + ' tools)';
      }
    }

    if (shouldScroll && isFiltered && directorySection) {
      directorySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      filterCards(true);
    });
  });

  if (homeSearchInput) {
    homeSearchInput.addEventListener('input', () => filterCards(false));
  }

  if (homeClearSearch) {
    homeClearSearch.addEventListener('click', () => {
      homeSearchInput.value = '';
      filterCards(false);
      homeSearchInput.focus();
    });
  }

  // Handle suggestion pills click
  document.querySelectorAll('.suggestion-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-search') || '';
      homeSearchInput.value = query;
      filterPills.forEach(p => p.classList.remove('active'));
      const allPill = document.querySelector('#homeFilterPills [data-filter="all"]');
      if (allPill) allPill.classList.add('active');
      currentFilter = 'all';
      filterCards(true);
    });
  });

  // Render recently used tools
  function renderRecents() {
    const container = document.getElementById('recentSection');
    const grid = document.getElementById('recentToolsGrid');
    if (!container || !grid) return;
    try {
      const recents = JSON.parse(localStorage.getItem('desidesk_recents') || '[]');
      if (!recents.length) return;
      const recentCards = recents.map(id => cards.find(c => c.getAttribute('onclick')?.includes(id))).filter(Boolean).slice(0, 4);
      if (recentCards.length > 0) {
        grid.innerHTML = '';
        recentCards.forEach(c => {
          const clone = c.cloneNode(true);
          clone.style.display = 'flex';
          grid.appendChild(clone);
        });
        container.style.display = 'block';
      }
    } catch(e) {}
  }
  renderRecents();
})();
</script>
</body>
</html>`;
}

function getCategoryPageHtml(cat, allTools) {
  const css = getMasterCSS();
  const catTools = allTools.filter(t => t.category === cat.id);
  const catMap = getCategoriesMap();

  const toolsJson = JSON.stringify(allTools.map(t => ({
    id: t.id,
    name: t.name,
    desc: t.shortDesc,
    cat: t.category,
    catName: catMap[t.category] ? catMap[t.category].name : t.category,
    url: `tools/${t.category}/${t.slug}.html`,
    keywords: t.keywords
  })));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cat.seoTitle}</title>
  <meta name="description" content="${cat.seoDesc}">
  <link rel="canonical" href="https://www.desidesk.in/categories/${cat.slug}.html">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <meta name="theme-color" content="${cat.accentColor}">

  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.desidesk.in/categories/${cat.slug}.html">
  <meta property="og:title" content="${cat.seoTitle}">
  <meta property="og:description" content="${cat.seoDesc}">

  <style>
${css}
  </style>
  <script>
    (function(){try{var t=localStorage.getItem('desidesk_theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();
  </script>
</head>
<body>
${getHeaderHtml('../', cat.id)}

<main class="main-content">
  <div class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="../index.html">Home</a>
      <span class="sep">/</span>
      <span class="current">${cat.name}</span>
    </nav>

    <div class="tool-page-header">
      <div class="tool-page-icon" style="color:${cat.accentColor};background:${cat.accentColor}15;">
        ${cat.icon}
      </div>
      <h1 class="tool-page-title">${cat.name}</h1>
      <p class="tool-page-lead">${cat.tagline}</p>
      <div class="privacy-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>100% Client-Side Privacy &bull; Zero Server Upload</span>
      </div>
    </div>

    <div class="section-header">
      <div>
        <h2 class="section-title">Available ${cat.name} (${catTools.length})</h2>
        <p class="section-desc">Select any tool below to start using it immediately in your browser</p>
      </div>
    </div>

    <div class="grid-tools">
      ${catTools.map(t => `
        <a href="../tools/${t.category}/${t.slug}.html" class="tool-card" onclick="saveRecent('${t.id}')">
          <div class="tool-card-header">
            <div class="tool-card-icon" style="color:${cat.accentColor};background:${cat.accentColor}15;">
              ${cat.icon}
            </div>
            <span class="category-tag">${cat.name}</span>
          </div>
          <h3 class="tool-card-title">${t.name}</h3>
          <p class="tool-card-desc">${t.shortDesc}</p>
          <div class="tool-card-footer">
            <span>Use Tool</span>
            <span>&rarr;</span>
          </div>
        </a>
      `).join('')}
    </div>

    <section class="seo-section" style="margin-top:3rem;">
      <div class="content-block">
        <h2>About DesiDesk ${cat.name}</h2>
        <p>
          Our collection of <strong>${cat.name}</strong> is built using cutting-edge browser technologies like HTML5 Canvas, Web Crypto, PDF-Lib, and WebAssembly. You never have to wait for large file uploads or worry about confidential data leaks. Everything happens right on your device.
        </p>
      </div>

      <div class="content-block">
        <h2>Other Tool Categories</h2>
        <div class="grid-categories" style="margin-top:1rem;margin-bottom:0;">
          ${categories.filter(c => c.id !== cat.id).slice(0, 4).map(c => {
            const count = allTools.filter(t => t.category === c.id).length;
            return `
            <a href="${c.slug}.html" class="cat-card">
              <div class="cat-card-icon" style="color:${c.accentColor};background:${c.accentColor}15;">
                ${c.icon}
              </div>
              <div>
                <h4 style="font-size:1rem;font-weight:700;color:var(--secondary);">${c.name}</h4>
                <div style="font-size:0.75rem;color:var(--primary);margin-top:0.25rem;">${count} Tools &rarr;</div>
              </div>
            </a>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  </div>
</main>

${getSearchModalHtml()}
${getFooterHtml('../')}

<script>
${getCommonScript(toolsJson, '../')}
</script>
</body>
</html>`;
}

function getToolPageHtml(tool, allTools) {
  const css = getMasterCSS();
  const catMap = getCategoriesMap();
  const cat = catMap[tool.category] || { name: tool.category, slug: tool.category + '-tools', accentColor: '#2563eb' };
  const catToolCount = allTools.filter(t => t.category === tool.category).length;

  const relatedTools = (tool.related || [])
    .map(id => allTools.find(t => t.id === id))
    .filter(Boolean)
    .slice(0, 4);

  const toolsJson = JSON.stringify(allTools.map(t => ({
    id: t.id,
    name: t.name,
    desc: t.shortDesc,
    cat: t.category,
    catName: catMap[t.category] ? catMap[t.category].name : t.category,
    url: `tools/${t.category}/${t.slug}.html`,
    keywords: t.keywords
  })));

  function buildLibraryTags(tool) {
    let tags = [];
    if (tool.category === 'pdf') {
      tags.push(`  <script src="../../assets/vendor/pdf-lib.min.js"></script>
  <script src="../../assets/vendor/pdf.min.js"></script>
  <script src="../../assets/vendor/jszip.min.js"></script>
  <script>
    if (typeof PDFLib === 'undefined') {
      document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js"><\\\\/script>');
    }
  </script>
  <script>
    if (typeof PDFLib === 'undefined') {
      document.write('<script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js"><\\\\/script>');
    }
  </script>
  <script>
    if (typeof pdfjsLib === 'undefined') {
      document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"><\\\\/script>');
    }
  </script>
  <script>
    if (typeof JSZip === 'undefined') {
      document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"><\\\\/script>');
    }
  </script>
  <script>
    if (window.pdfjsLib) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = '../../assets/vendor/pdf.worker.min.js';
    }
  </script>`);
    } else if (tool.id === 'qr-code-generator') {
      tags.push(`  <script src="../../assets/vendor/qrcode.min.js"></script>
  <script>
    if (typeof QRCode === 'undefined') {
      document.write('<script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js"><\\\\/script>');
    }
  </script>
  <script>
    if (typeof QRCode === 'undefined') {
      document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\\\\/script>');
    }
  </script>`);
    } else if (tool.id === 'barcode-generator') {
      tags.push(`  <script src="../../assets/vendor/jsbarcode.min.js"></script>
  <script>
    if (typeof JsBarcode === 'undefined') {
      document.write('<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"><\\\\/script>');
    }
  </script>`);
    } else if (tool.id === 'zip-file-creator' || tool.id === 'zip-extractor') {
      tags.push(`  <script src="../../assets/vendor/jszip.min.js"></script>
  <script>
    if (typeof JSZip === 'undefined') {
      document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"><\\\\/script>');
    }
  </script>`);
    }

    if (tool.libs && tool.libs.length) {
      tool.libs.forEach(src => {
        if (!src.includes('pdf-lib') && !src.includes('qrcode') && !src.includes('jsbarcode') && !src.includes('jszip')) {
          tags.push(`  <script src="${src}"></script>`);
        }
      });
    }

    return tags.join('\n');
  }

  const externalLibsHtml = buildLibraryTags(tool);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${tool.seoTitle}</title>
  <meta name="description" content="${tool.seoDesc}">
  <meta name="keywords" content="${tool.keywords || ''}">
  <link rel="canonical" href="https://www.desidesk.in/tools/${tool.category}/${tool.slug}.html">
  <link rel="icon" type="image/svg+xml" href="../../favicon.svg">
  <meta name="theme-color" content="${cat.accentColor}">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://www.desidesk.in/tools/${tool.category}/${tool.slug}.html">
  <meta property="og:title" content="${tool.seoTitle}">
  <meta property="og:description" content="${tool.seoDesc}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${tool.seoTitle}">
  <meta name="twitter:description" content="${tool.seoDesc}">

  <style>
${css}
  </style>
  <script>
    (function(){try{var t=localStorage.getItem('desidesk_theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();
  </script>
  ${externalLibsHtml}
</head>
<body>
${getHeaderHtml('../../', tool.category)}

<main class="main-content">
  <div class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="../../index.html">Home</a>
      <span class="sep">/</span>
      <a href="../../categories/${cat.slug}.html">${cat.name}</a>
      <span class="sep">/</span>
      <span class="current">${tool.name}</span>
    </nav>

    <div class="tool-page-header">
      <div class="tool-page-icon" style="color:${cat.accentColor};background:${cat.accentColor}15;">
        ${cat.icon || `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`}
      </div>
      <h1 class="tool-page-title">${tool.name}</h1>
      <p class="tool-page-lead">${tool.shortDesc}</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:0.75rem;flex-wrap:wrap;">
        <span class="privacy-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          100% Client-Side Privacy
        </span>
        <span class="privacy-badge" style="background:#eff6ff;border-color:#bfdbfe;color:#1e40af;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Free &amp; Unlimited
        </span>
        <span class="privacy-badge" style="background:#fef3c7;border-color:#fde68a;color:#92400e;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          Instant Browser Processing
        </span>
      </div>
    </div>

    <!-- Reusable Two-Column Desktop Tool Page Layout (Reference Screenshot 2) -->
    <div class="tool-page-layout">
      <!-- Left Column: Tool Workspace & Usage Guide -->
      <div class="tool-main-col">
        <!-- Active Tool Workspace -->
        <div class="tool-workspace">
          ${tool.toolHtml}
        </div>

        <!-- How to Use Step-by-Step Guide -->
        <div class="tool-guide-card content-block">
          <div class="section-badge">Step-by-Step Guide</div>
          <h2>How to Use ${tool.name}</h2>
          <div class="steps-grid" style="margin-top:1.25rem;">
            ${(tool.howToSteps || [
              'Upload or enter your input data.',
              'Adjust tool settings to your desired specifications.',
              'View the real-time calculated result or preview.',
              'Download or copy your output.'
            ]).map((step, idx) => `
              <div class="step-card">
                <div class="step-number">${idx + 1}</div>
                <div class="step-title">Step ${idx + 1}</div>
                <div class="step-desc">${step}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Frequently Asked Questions -->
        ${tool.faqs && tool.faqs.length > 0 ? `
        <div class="content-block" style="margin-top:2rem;">
          <div class="section-badge">FAQs</div>
          <h2>Frequently Asked Questions</h2>
          <div class="faq-list" style="margin-top:1.25rem;">
            ${tool.faqs.map((faq, i) => `
              <details class="faq-item" ${i === 0 ? 'open' : ''}>
                <summary class="faq-question">${faq.q}</summary>
                <div class="faq-answer">${faq.a}</div>
              </details>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>

      <!-- Right Column: Sidebar Privacy, Highlights & Related Tools -->
      <aside class="tool-side-col">
        <!-- Privacy & Security Card -->
        <div class="sidebar-card">
          <div class="sidebar-card-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <h4>Privacy &amp; Security</h4>
          </div>
          <ul class="trust-list">
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <div>
                <strong>100% Client-Side Processing</strong>
                <span>Data and files never leave your device memory</span>
              </div>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <div>
                <strong>Zero Server Storage</strong>
                <span>No files uploaded to any external server</span>
              </div>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <div>
                <strong>Completely Free &amp; Unlimited</strong>
                <span>No sign-up, subscriptions, or watermarks</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Tool Highlights Card -->
        <div class="sidebar-card">
          <div class="sidebar-card-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <h4>Key Features</h4>
          </div>
          <ul class="features-list">
            ${(tool.features || [
              '100% Private: All processing runs locally inside your browser.',
              'Fast and responsive performance on mobile and desktop.',
              'No registration or payment required.',
              'High-quality, accurate results with instant download.'
            ]).slice(0, 5).map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        <!-- Category Explorer Card -->
        <div class="sidebar-card category-card-mini">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">
            <div class="mini-cat-icon" style="color:${cat.accentColor};background:${cat.accentColor}18;">
              ${cat.icon}
            </div>
            <div>
              <div style="font-weight:700;color:var(--secondary);font-size:0.95rem;">${cat.name}</div>
              <div style="font-size:0.8rem;color:var(--text-muted);">${catToolCount} Tools in this category</div>
            </div>
          </div>
          <a href="../../categories/${cat.slug}.html" class="btn btn-outline btn-sm btn-block">
            Explore All ${cat.name} &rarr;
          </a>
        </div>

        <!-- Related Tools Quick List -->
        ${relatedTools.length > 0 ? `
        <div class="sidebar-card">
          <div class="sidebar-card-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            <h4>Related Tools</h4>
          </div>
          <div style="display:flex;flex-direction:column;gap:0.65rem;">
            ${relatedTools.map(r => `
              <a href="../../tools/${r.category}/${r.slug}.html" style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0.65rem;border-radius:var(--radius-sm);background:var(--bg-subtle);text-decoration:none;color:var(--text-main);transition:all 0.15s;" onmouseover="this.style.background='var(--primary-light)'" onmouseout="this.style.background='var(--bg-subtle)'">
                <span style="font-size:0.85rem;font-weight:600;color:var(--secondary);">${r.name}</span>
                <span style="color:var(--primary);font-size:0.85rem;font-weight:700;">&rarr;</span>
              </a>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </aside>
    </div>

    <!-- Below the Main Tool: Features & Benefits & More Recommended Tools -->
    <section class="seo-section">
      <div class="content-block">
        <h2>Features &amp; Benefits of ${tool.name}</h2>
        <ul>
          ${(tool.features || [
            '100% Private: All processing runs locally inside your browser with zero server uploads.',
            'Fast and responsive performance on mobile and desktop.',
            'No registration or payment required.',
            'High-quality, accurate results with instant download.'
          ]).map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      ${relatedTools.length > 0 ? `
      <div class="content-block">
        <h2>More Recommended Online Tools</h2>
        <div class="grid-tools" style="margin-top:1rem;margin-bottom:0;">
          ${relatedTools.map(r => `
            <a href="../../tools/${r.category}/${r.slug}.html" class="tool-card" onclick="saveRecent('${r.id}')">
              <div class="tool-card-header">
                <span class="category-tag">${catMap[r.category] ? catMap[r.category].name : r.category}</span>
              </div>
              <h3 class="tool-card-title">${r.name}</h3>
              <p class="tool-card-desc">${r.shortDesc}</p>
              <div class="tool-card-footer">
                <span>Open Tool &rarr;</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
      ` : ''}
    </section>
  </div>
</main>

${getSearchModalHtml()}
${getFooterHtml('../../')}

<script>
${getCommonScript(toolsJson, '../../')}

${tool.toolScript}
</script>
</body>
</html>`;
}

function getStaticPageHtml(pageType, tools) {
  const css = getMasterCSS();
  const catMap = getCategoriesMap();
  const toolsJson = JSON.stringify(tools.map(t => ({
    id: t.id,
    name: t.name,
    desc: t.shortDesc,
    cat: t.category,
    catName: catMap[t.category] ? catMap[t.category].name : t.category,
    url: `tools/${t.category}/${t.slug}.html`,
    keywords: t.keywords
  })));

  let title = 'DesiDesk.in';
  let desc = 'Free online productivity tools for everyday users.';
  let contentHtml = '';

  if (pageType === 'about') {
    title = 'About Us - DesiDesk.in';
    desc = 'Learn about DesiDesk, our privacy-first philosophy, and our mission to provide high-speed browser-based online tools.';
    contentHtml = `
      <h1>About DesiDesk.in</h1>
      <p class="tool-page-lead">Building fast, secure, and truly private online tools for everyone.</p>

      <h2>Our Mission</h2>
      <p>
        DesiDesk was founded with a straightforward goal: create a world-class, all-in-one suite of everyday online utilities that respect user privacy. Traditional web tools often silently upload personal documents, confidential PDFs, and family photos to remote servers. At DesiDesk, all data processing takes place <strong>100% locally on your device</strong>.
      </p>

      <h2>Zero Server Storage Philosophy</h2>
      <p>
        When you compress an image, merge PDF contracts, calculate your taxes, or format JSON code on DesiDesk, your files never leave your computer or smartphone. We do not operate custom file storage databases or backend processing pipelines for tool operations. Your private data remains strictly in your hands.
      </p>

      <h2>Key Advantages</h2>
      <ul>
        <li><strong>Maximum Speed:</strong> Without waiting for multi-megabyte file uploads, operations complete instantly using your local device CPU and GPU.</li>
        <li><strong>No Account Required:</strong> No login barriers, subscriptions, or credit card requirements.</li>
        <li><strong>Mobile First:</strong> Clean, responsive UI tailored for Android, iOS, tablets, and desktop computers.</li>
        <li><strong>Comprehensive Coverage:</strong> Over 108 dedicated tools across PDF, image, text, financial calculation, unit conversion, and developer needs.</li>
      </ul>

      <div id="guides" style="margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--border-light);">
        <h2>Guides &amp; Resources</h2>
        <p>Explore helpful tips for maximizing your productivity with DesiDesk browser tools:</p>
        <div class="steps-grid" style="margin-top:1.25rem;">
          <div class="step-card">
            <div class="step-title">How to Compress PDFs Safely</div>
            <div class="step-desc">Learn how client-side PDF raster recompression reduces file size by 50-80% without exposing private contracts to external servers.</div>
          </div>
          <div class="step-card">
            <div class="step-title">Optimizing Web Images with WebP</div>
            <div class="step-desc">Why converting JPG and PNG to modern WebP format speeds up your website load times by up to 35%.</div>
          </div>
          <div class="step-card">
            <div class="step-title">Mastering GST &amp; Loan EMI Calculations</div>
            <div class="step-desc">Understand compound interest schedules and Indian GST tax brackets for smarter budgeting.</div>
          </div>
        </div>
      </div>
    `;
  } else if (pageType === 'privacy') {
    title = 'Privacy Policy - DesiDesk.in';
    desc = 'DesiDesk privacy policy: We do not upload, store, or process your files on remote servers. All operations run locally in your browser.';
    contentHtml = `
      <h1>Privacy Policy</h1>
      <p class="tool-page-lead">Last Updated: October 2026</p>

      <h2>1. Client-Side Processing Guarantee</h2>
      <p>
        DesiDesk operates strictly on a <strong>client-side architecture</strong>. When you upload files or enter text into any of our tools (including Image Compressor, Merge PDF, Password Generator, and Calculators), all processing is performed by your device browser using native APIs (such as HTML5 Canvas, Web Crypto, and WebAssembly).
      </p>
      <p>
        <strong>Your files, documents, and inputs are never uploaded to any remote server or cloud storage operated by DesiDesk.</strong>
      </p>

      <h2>2. Data Collection and Tracking</h2>
      <p>
        We do not require user accounts, email addresses, phone numbers, or passwords to use our tools. We do not track your personal identity or sell your data to any third party.
      </p>

      <h2>3. Local Storage</h2>
      <p>
        Certain non-sensitive preferences, such as your theme choice or list of recently used tools, may be stored in your browser's <code>localStorage</code>. This data never leaves your device and can be cleared at any time via your browser settings.
      </p>

      <h2>4. External Libraries</h2>
      <p>
        Certain tools load browser-compatible libraries (such as pdf-lib or JSZip) from public Content Delivery Networks (CDNs) or local bundled assets. These CDNs only serve static script assets and do not receive or process your uploaded files.
      </p>

      <h2>5. Contact Information</h2>
      <p>
        If you have questions regarding this Privacy Policy, please reach out to us via our <a href="contact.html">Contact Us</a> page.
      </p>
    `;
  } else if (pageType === 'terms') {
    title = 'Terms of Service - DesiDesk.in';
    desc = 'Terms of Service and conditions for using DesiDesk.in online tools.';
    contentHtml = `
      <h1>Terms of Service</h1>
      <p class="tool-page-lead">Last Updated: October 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using DesiDesk.in ("Website"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use the website.
      </p>

      <h2>2. Permitted Use</h2>
      <p>
        DesiDesk provides online tools for personal, educational, and commercial productivity. You agree to use the services only for lawful purposes and in accordance with all applicable local, national, and international laws.
      </p>

      <h2>3. Disclaimer of Warranties</h2>
      <p>
        The tools and services are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. While we strive for absolute mathematical and technical accuracy, DesiDesk does not warrant that calculations (e.g. loan EMI, tax amounts) are guaranteed financial outcomes.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        In no event shall DesiDesk or its operators be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the tools.
      </p>
    `;
  } else if (pageType === 'disclaimer') {
    title = 'Disclaimer - DesiDesk.in';
    desc = 'Legal and financial disclaimer regarding calculations, conversions, and tool outputs on DesiDesk.in.';
    contentHtml = `
      <h1>Website Disclaimer</h1>
      <p class="tool-page-lead">Important notices regarding tool accuracy and financial calculations.</p>

      <h2>General Information Only</h2>
      <p>
        All tools, calculators, converters, and content published on DesiDesk.in are provided for educational and general informational purposes only.
      </p>

      <h2>Financial &amp; Legal Calculations</h2>
      <p>
        Financial calculators (including EMI Calculator, GST Calculator, SIP Calculator, and Salary Calculator) provide estimates based on standard mathematical formulas. They do not constitute certified financial, tax, or legal advice. Consult a certified financial planner, accountant, or tax advisor before making major financial commitments.
      </p>

      <h2>Client-Side Performance</h2>
      <p>
        File processing times and capabilities depend on your individual hardware specifications and browser capabilities. DesiDesk does not guarantee identical performance on outdated hardware or legacy browsers.
      </p>
    `;
  } else if (pageType === 'contact') {
    title = 'Contact Us - DesiDesk.in';
    desc = 'Get in touch with the DesiDesk team for feedback, suggestions, or tool requests.';
    contentHtml = `
      <h1>Contact Us</h1>
      <p class="tool-page-lead">We would love to hear your feedback, suggestions, or bug reports.</p>

      <div class="form-grid-2">
        <div>
          <h2>Get in Touch</h2>
          <p>
            Have a suggestion for a new tool? Found a bug? Let us know! Our engineering team continuously refines DesiDesk to serve your everyday productivity needs.
          </p>
          <div style="margin-top:1.5rem;display:flex;flex-direction:column;gap:0.75rem;">
            <div><strong>Email:</strong> <a href="mailto:support@desidesk.in">support@desidesk.in</a></div>
            <div><strong>Website:</strong> <a href="https://www.desidesk.in/">https://www.desidesk.in/</a></div>
            <div><strong>Response Time:</strong> Typically within 24 to 48 hours.</div>
          </div>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-lg);padding:1.5rem;box-shadow:var(--shadow-sm);">
          <h3 style="margin-bottom:1rem;color:var(--secondary);">Send a Message</h3>
          <div class="form-group">
            <label class="form-label">Your Name:</label>
            <input type="text" class="form-input" placeholder="e.g. Rahul Sharma" />
          </div>
          <div class="form-group">
            <label class="form-label">Your Email:</label>
            <input type="email" class="form-input" placeholder="e.g. rahul@example.com" />
          </div>
          <div class="form-group">
            <label class="form-label">Message / Tool Request:</label>
            <textarea class="form-textarea" style="min-height:100px;" placeholder="Tell us what you think..."></textarea>
          </div>
          <button class="btn btn-primary" onclick="alert('Thank you for reaching out! Your message has been noted.')">Send Feedback</button>
        </div>
      </div>
    `;
  } else if (pageType === '404') {
    title = 'Page Not Found (404) - DesiDesk.in';
    desc = 'Page not found on DesiDesk.in. Search over 108+ free online productivity tools.';
    contentHtml = `
      <div style="text-align:center;padding:3rem 1rem;">
        <div style="font-size:4rem;font-weight:900;color:var(--primary);line-height:1;">404</div>
        <h1 style="font-size:2rem;margin-top:1rem;color:var(--secondary);">Page Not Found</h1>
        <p style="color:var(--text-muted);margin:1rem auto 2rem;max-width:480px;">
          The page or tool you are looking for may have been moved, renamed, or does not exist.
        </p>
        <div class="btn-group" style="justify-content:center;">
          <a href="index.html" class="btn btn-primary">Return to Homepage</a>
          <button class="btn btn-secondary" onclick="document.getElementById('openSearchBtn').click()">Search All Tools</button>
        </div>
      </div>
    `;
  }

  const canonicalPath = pageType === 'about' ? 'about.html' : (pageType === 'privacy' ? 'privacy-policy.html' : (pageType === 'terms' ? 'terms.html' : (pageType === 'disclaimer' ? 'disclaimer.html' : (pageType === 'contact' ? 'contact.html' : '404.html'))));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="https://www.desidesk.in/${canonicalPath}">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <meta name="theme-color" content="#2563eb">

  <style>
${css}
  </style>
  <script>
    (function(){try{var t=localStorage.getItem('desidesk_theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();
  </script>
</head>
<body>
${getHeaderHtml('', pageType)}

<main class="main-content">
  <div class="container seo-section">
    <div class="content-block">
      ${contentHtml}
    </div>
  </div>
</main>

${getSearchModalHtml()}
${getFooterHtml('')}

<script>
${getCommonScript(toolsJson, '')}
</script>
</body>
</html>`;
}

module.exports = {
  getIndexHtml,
  getCategoryPageHtml,
  getToolPageHtml,
  getStaticPageHtml
};
