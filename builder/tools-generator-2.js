// builder/tools-generator-2.js

module.exports = [
  {
    id: 'barcode-generator',
    slug: 'barcode-generator',
    category: 'generator',
    name: 'Barcode Generator (CODE128)',
    shortDesc: 'Generate printable CODE128 and standard retail barcodes with high-resolution PNG download.',
    seoTitle: 'Barcode Generator Online - Free CODE128 Barcodes | DesiDesk',
    seoDesc: 'Generate printable CODE128 barcodes online. Enter text or serial numbers and download barcode PNG images on DesiDesk.',
    keywords: 'barcode generator, code128 generator, make barcode online, printable barcode, free barcode maker',
    libs: ['https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js'],
    howToSteps: [
      'Enter the text, SKU, or serial number you want to encode.',
      'Adjust barcode height, width, and display value options.',
      'Download your barcode as a PNG image.'
    ],
    features: [
      'Standard CODE128 barcode encoding.',
      'Adjustable bar height and bar width.',
      'Option to show or hide human-readable text.',
      'Instant high-resolution PNG export.'
    ],
    faqs: [
      {
        q: 'Can these barcodes be scanned with a retail scanner?',
        a: 'Yes, CODE128 is the universal standard for logistics, shipping labels, and inventory systems worldwide.'
      }
    ],
    related: ['qr-code-generator', 'password-generator'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Barcode Value (Text or Numbers):</label>
        <input type="text" id="barcodeValue" class="form-input" value="DESIDESK-2026" />
      </div>

      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Bar Height (px):</label>
          <input type="number" id="barHeight" class="form-input" value="80" min="30" max="200" />
        </div>
        <div class="form-group">
          <label class="form-label">Bar Width:</label>
          <select id="barWidth" class="form-select">
            <option value="2" selected>2 (Standard)</option>
            <option value="3">3 (Thick / Large)</option>
            <option value="1">1 (Compact)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Show Text Below:</label>
          <select id="displayValue" class="form-select">
            <option value="true" selected>Yes, Show Text</option>
            <option value="false">No, Bars Only</option>
          </select>
        </div>
      </div>

      <div class="canvas-wrapper" style="margin:2rem 0;">
        <canvas id="barcodeCanvas"></canvas>
      </div>

      <div class="btn-group" style="justify-content:center;">
        <a id="downloadBarcodeBtn" class="btn btn-success" download="barcode-desidesk.png">Download Barcode (PNG)</a>
      </div>
    `,
    toolScript: `
      const barcodeValue = document.getElementById('barcodeValue');
      const barHeight = document.getElementById('barHeight');
      const barWidth = document.getElementById('barWidth');
      const displayValue = document.getElementById('displayValue');
      const barcodeCanvas = document.getElementById('barcodeCanvas');
      const downloadBarcodeBtn = document.getElementById('downloadBarcodeBtn');

      function generateBarcode() {
        const val = barcodeValue.value.trim() || 'DESIDESK';
        const height = parseInt(barHeight.value, 10);
        const width = parseInt(barWidth.value, 10);
        const showText = displayValue.value === 'true';

        if (typeof JsBarcode !== 'undefined') {
          try {
            JsBarcode(barcodeCanvas, val, {
              format: 'CODE128',
              width,
              height,
              displayValue: showText,
              font: 'sans-serif',
              fontSize: 16,
              margin: 10
            });
            downloadBarcodeBtn.href = barcodeCanvas.toDataURL('image/png');
          } catch(e) {
            console.error(e);
          }
        }
      }

      [barcodeValue, barHeight, barWidth, displayValue].forEach(el => el.addEventListener('input', generateBarcode));
      window.addEventListener('load', () => setTimeout(generateBarcode, 200));
    `
  },
  {
    id: 'css-border-radius-generator',
    slug: 'css-border-radius-generator',
    category: 'generator',
    name: 'CSS Border Radius Generator',
    shortDesc: 'Design custom rounded corners and organic blob shapes with an interactive 8-point border radius builder.',
    seoTitle: 'CSS Border Radius Generator Online - Custom Rounded Corners | DesiDesk',
    seoDesc: 'Generate custom CSS border-radius and organic blob shapes interactively. Visual 8-point slider tool with instant CSS copy on DesiDesk.',
    keywords: 'border radius generator, css rounded corners, border radius blob, 8 point border radius',
    howToSteps: [
      'Drag the sliders to adjust top, right, bottom, and left corner curves.',
      'Preview shape transitions in real-time.',
      'Copy the generated CSS border-radius property.'
    ],
    features: [
      'Interactive 8-point border radius control.',
      'Live visual box preview.',
      'Generates standard CSS3 border-radius values.',
      'One-click CSS code copy.'
    ],
    faqs: [
      {
        q: 'What is 8-point border radius?',
        a: 'CSS border-radius allows specifying horizontal and vertical radii separately using a slash (/), creating smooth organic curves and custom geometric shapes.'
      }
    ],
    related: ['css-box-shadow-generator', 'css-gradient-generator'],
    toolHtml: `
      <div class="form-grid-2">
        <div>
          <div class="form-group">
            <label class="form-label">Top-Left: <span id="valTL">20px</span></label>
            <input type="range" id="rTL" class="form-range" min="0" max="150" value="20" />
          </div>
          <div class="form-group">
            <label class="form-label">Top-Right: <span id="valTR">40px</span></label>
            <input type="range" id="rTR" class="form-range" min="0" max="150" value="40" />
          </div>
          <div class="form-group">
            <label class="form-label">Bottom-Right: <span id="valBR">20px</span></label>
            <input type="range" id="rBR" class="form-range" min="0" max="150" value="20" />
          </div>
          <div class="form-group">
            <label class="form-label">Bottom-Left: <span id="valBL">40px</span></label>
            <input type="range" id="rBL" class="form-range" min="0" max="150" value="40" />
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:center;background:#f8fafc;border:1px solid var(--border-light);border-radius:var(--radius-lg);padding:3rem;">
          <div id="radiusBox" style="width:160px;height:160px;background:linear-gradient(135deg, #2563eb, #1d4ed8);box-shadow:var(--shadow-md);"></div>
        </div>
      </div>

      <div class="form-group" style="margin-top:2rem;">
        <label class="form-label">Generated CSS Code:</label>
        <input type="text" id="radiusOutput" class="form-input" readonly style="font-family:var(--font-mono);font-weight:700;background:var(--bg-subtle);" />
      </div>

      <div class="btn-group">
        <button id="copyRadiusBtn" class="btn btn-primary">Copy CSS Code</button>
      </div>
    `,
    toolScript: `
      const rTL = document.getElementById('rTL');
      const rTR = document.getElementById('rTR');
      const rBR = document.getElementById('rBR');
      const rBL = document.getElementById('rBL');
      const radiusBox = document.getElementById('radiusBox');
      const radiusOutput = document.getElementById('radiusOutput');
      const copyRadiusBtn = document.getElementById('copyRadiusBtn');

      function updateRadius() {
        const tl = rTL.value + 'px';
        const tr = rTR.value + 'px';
        const br = rBR.value + 'px';
        const bl = rBL.value + 'px';

        document.getElementById('valTL').textContent = tl;
        document.getElementById('valTR').textContent = tr;
        document.getElementById('valBR').textContent = br;
        document.getElementById('valBL').textContent = bl;

        const val = \`\${tl} \${tr} \${br} \${bl}\`;
        radiusBox.style.borderRadius = val;
        radiusOutput.value = \`border-radius: \${val};\`;
      }

      [rTL, rTR, rBR, rBL].forEach(el => el.addEventListener('input', updateRadius));
      updateRadius();

      copyRadiusBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(radiusOutput.value).then(() => {
          copyRadiusBtn.textContent = 'Copied!';
          setTimeout(() => { copyRadiusBtn.textContent = 'Copy CSS Code'; }, 2000);
        });
      });
    `
  },
  {
    id: 'meta-tag-generator',
    slug: 'meta-tag-generator',
    category: 'generator',
    name: 'SEO Meta Tag Generator',
    shortDesc: 'Generate complete HTML SEO meta tags (title, description, canonical, robots, viewport) for higher rankings.',
    seoTitle: 'Meta Tag Generator Online - Free SEO HTML Tags | DesiDesk',
    seoDesc: 'Generate complete, SEO-friendly HTML meta tags including title, description, canonical, Open Graph, and robots tags on DesiDesk.',
    keywords: 'meta tag generator, seo meta tags, html meta tags creator, open graph tags, website meta generator',
    howToSteps: [
      'Enter your page title and meta description.',
      'Enter canonical URL and author name.',
      'Copy the generated HTML head snippet.'
    ],
    features: [
      'Generates Title, Description, Robots, Viewport, and Canonical tags.',
      'Includes Open Graph meta tags for Facebook and Twitter Cards.',
      'One-click HTML copy.',
      'Free and instant.'
    ],
    faqs: [
      {
        q: 'What is the recommended length for a meta description?',
        a: 'Between 120 and 160 characters for best display on Google search result snippets.'
      }
    ],
    related: ['robots-txt-generator', 'sitemap-xml-generator'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Page Title:</label>
          <input type="text" id="metaTitle" class="form-input" value="DesiDesk - Free Online Tools for Everyday Tasks" />
        </div>
        <div class="form-group">
          <label class="form-label">Canonical URL:</label>
          <input type="text" id="metaUrl" class="form-input" value="https://desidesk.in/" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Meta Description (150-160 chars recommended):</label>
        <textarea id="metaDesc" class="form-textarea" style="min-height:80px;">Compress images, manage PDFs, convert files and simplify everyday tasks with fast, easy-to-use online tools on DesiDesk.</textarea>
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Robots Indexing:</label>
          <select id="metaRobots" class="form-select">
            <option value="index, follow" selected>index, follow (Allow all)</option>
            <option value="noindex, follow">noindex, follow</option>
            <option value="noindex, nofollow">noindex, nofollow (Private)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Author / Brand:</label>
          <input type="text" id="metaAuthor" class="form-input" value="DesiDesk" />
        </div>
      </div>

      <div class="form-group" style="margin-top:1.5rem;">
        <label class="form-label">Generated HTML &lt;head&gt; Tags:</label>
        <textarea id="metaOutput" class="form-textarea" style="min-height:220px;font-family:var(--font-mono);font-size:0.85rem;" readonly></textarea>
      </div>

      <div class="btn-group">
        <button id="copyMetaBtn" class="btn btn-primary">Copy Meta Tags</button>
      </div>
    `,
    toolScript: `
      const metaTitle = document.getElementById('metaTitle');
      const metaUrl = document.getElementById('metaUrl');
      const metaDesc = document.getElementById('metaDesc');
      const metaRobots = document.getElementById('metaRobots');
      const metaAuthor = document.getElementById('metaAuthor');
      const metaOutput = document.getElementById('metaOutput');
      const copyMetaBtn = document.getElementById('copyMetaBtn');

      function updateMeta() {
        const title = metaTitle.value.trim();
        const url = metaUrl.value.trim();
        const desc = metaDesc.value.trim();
        const robots = metaRobots.value;
        const author = metaAuthor.value.trim();

        const tags = [
          \`<title>\${title}</title>\`,
          \`<meta name="description" content="\${desc}">\`,
          \`<meta name="robots" content="\${robots}">\`,
          \`<meta name="author" content="\${author}">\`,
          \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`,
          \`<link rel="canonical" href="\${url}">\`,
          '',
          \`<!-- Open Graph / Facebook -->\`,
          \`<meta property="og:type" content="website">\`,
          \`<meta property="og:url" content="\${url}">\`,
          \`<meta property="og:title" content="\${title}">\`,
          \`<meta property="og:description" content="\${desc}">\`,
          '',
          \`<!-- Twitter Card -->\`,
          \`<meta name="twitter:card" content="summary_large_image">\`,
          \`<meta name="twitter:url" content="\${url}">\`,
          \`<meta name="twitter:title" content="\${title}">\`,
          \`<meta name="twitter:description" content="\${desc}">\`
        ].join('\\n');

        metaOutput.value = tags;
      }

      [metaTitle, metaUrl, metaDesc, metaRobots, metaAuthor].forEach(el => el.addEventListener('input', updateMeta));
      updateMeta();

      copyMetaBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(metaOutput.value).then(() => {
          copyMetaBtn.textContent = 'Copied!';
          setTimeout(() => { copyMetaBtn.textContent = 'Copy Meta Tags'; }, 2000);
        });
      });
    `
  },
  {
    id: 'color-contrast-checker',
    slug: 'color-contrast-checker',
    category: 'generator',
    name: 'Color Contrast Checker (WCAG 2.1)',
    shortDesc: 'Test color contrast ratio between text and background for WCAG 2.1 AA and AAA accessibility compliance.',
    seoTitle: 'Color Contrast Checker Online - WCAG 2.1 AA/AAA | DesiDesk',
    seoDesc: 'Calculate color contrast ratio between foreground text and background colors for WCAG 2.1 AA and AAA compliance on DesiDesk.',
    keywords: 'color contrast checker, wcag contrast ratio, accessible color checker, web accessibility color tool',
    howToSteps: [
      'Select Text (Foreground) Color.',
      'Select Background Color.',
      'View calculated contrast ratio and WCAG AA/AAA pass or fail status.'
    ],
    features: [
      'WCAG 2.1 AA and AAA compliance rating for normal and large text.',
      'Interactive color pickers and HEX inputs.',
      'Live sample text preview.',
      'Calculates exact luminance ratio.'
    ],
    faqs: [
      {
        q: 'What is the minimum WCAG contrast ratio?',
        a: 'WCAG Level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.'
      }
    ],
    related: ['color-code-converter', 'image-color-picker'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Text Color (Foreground):</label>
          <div style="display:flex;gap:0.75rem;">
            <input type="color" id="fgColorPicker" value="#0f172a" style="height:42px;width:50px;padding:2px;" />
            <input type="text" id="fgColorText" class="form-input" value="#0F172A" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Background Color:</label>
          <div style="display:flex;gap:0.75rem;">
            <input type="color" id="bgColorPicker" value="#ffffff" style="height:42px;width:50px;padding:2px;" />
            <input type="text" id="bgColorText" class="form-input" value="#FFFFFF" />
          </div>
        </div>
      </div>

      <div id="contrastPreview" style="padding:2.5rem;border-radius:var(--radius-lg);margin:1.5rem 0;text-align:center;border:1px solid var(--border-light);">
        <h3 style="font-size:1.5rem;margin-bottom:0.5rem;">Large Heading Text</h3>
        <p style="font-size:1rem;line-height:1.6;">This is sample normal body paragraph text to test accessibility readability.</p>
      </div>

      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-value" id="contrastRatioVal">15.8:1</div>
          <div class="stat-label">Contrast Ratio</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="badgeAaNormal" style="color:var(--accent);">PASS</div>
          <div class="stat-label">WCAG AA (Normal)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="badgeAaaNormal" style="color:var(--accent);">PASS</div>
          <div class="stat-label">WCAG AAA (Normal)</div>
        </div>
      </div>
    `,
    toolScript: `
      const fgColorPicker = document.getElementById('fgColorPicker');
      const fgColorText = document.getElementById('fgColorText');
      const bgColorPicker = document.getElementById('bgColorPicker');
      const bgColorText = document.getElementById('bgColorText');
      const contrastPreview = document.getElementById('contrastPreview');
      const contrastRatioVal = document.getElementById('contrastRatioVal');
      const badgeAaNormal = document.getElementById('badgeAaNormal');
      const badgeAaaNormal = document.getElementById('badgeAaaNormal');

      function getLuminance(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
        const rgb = [0, 2, 4].map(idx => parseInt(hex.substr(idx, 2), 16) / 255);
        const a = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
      }

      function updateContrast() {
        const fg = fgColorPicker.value;
        const bg = bgColorPicker.value;

        fgColorText.value = fg.toUpperCase();
        bgColorText.value = bg.toUpperCase();

        contrastPreview.style.color = fg;
        contrastPreview.style.backgroundColor = bg;

        const l1 = getLuminance(fg);
        const l2 = getLuminance(bg);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

        contrastRatioVal.textContent = ratio.toFixed(1) + ':1';

        const passAa = ratio >= 4.5;
        const passAaa = ratio >= 7;

        badgeAaNormal.textContent = passAa ? 'PASS' : 'FAIL';
        badgeAaNormal.style.color = passAa ? 'var(--accent)' : 'var(--accent-rose)';

        badgeAaaNormal.textContent = passAaa ? 'PASS' : 'FAIL';
        badgeAaaNormal.style.color = passAaa ? 'var(--accent)' : 'var(--accent-rose)';
      }

      fgColorPicker.addEventListener('input', updateContrast);
      bgColorPicker.addEventListener('input', updateContrast);
      fgColorText.addEventListener('input', () => {
        if (/^#[0-9A-Fa-f]{6}$/.test(fgColorText.value)) {
          fgColorPicker.value = fgColorText.value;
          updateContrast();
        }
      });
      bgColorText.addEventListener('input', () => {
        if (/^#[0-9A-Fa-f]{6}$/.test(bgColorText.value)) {
          bgColorPicker.value = bgColorText.value;
          updateContrast();
        }
      });
      updateContrast();
    `
  }
];
