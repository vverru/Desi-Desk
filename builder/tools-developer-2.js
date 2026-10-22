// builder/tools-developer-2.js

module.exports = [
  {
    id: 'html-entity-encoder',
    slug: 'html-entity-encoder',
    category: 'developer',
    name: 'HTML Entity Encoder & Decoder',
    shortDesc: 'Encode special characters to HTML entities (&amp;, &lt;, &gt;) or decode HTML entities back to raw text.',
    seoTitle: 'HTML Entity Encoder & Decoder Online | DesiDesk',
    seoDesc: 'Convert special characters into HTML entities or decode entities back into plain characters. Free online web developer tool on DesiDesk.',
    keywords: 'html entity encoder, decode html entities, html escape online, html special characters',
    howToSteps: [
      'Paste your HTML or text string.',
      'Click "Encode Entities" to escape special characters or "Decode Entities" to unescape.',
      'Copy the resulting output.'
    ],
    features: [
      'Encodes `&`, `<`, `>`, `"`, and single quotes.',
      'Decodes numeric and named entities.',
      'One-click copy to clipboard.',
      '100% private in-browser tool.'
    ],
    faqs: [
      {
        q: 'Why encode HTML entities?',
        a: 'Encoding special characters prevents them from being parsed as HTML tags or markup, protecting against XSS vulnerabilities.'
      }
    ],
    related: ['url-encoder-decoder', 'markdown-to-html'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input Text or HTML:</label>
        <textarea id="entityInput" class="form-textarea" style="min-height:160px;font-family:var(--font-mono);font-size:0.875rem;" placeholder="Type text or HTML code..."></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="btnEncodeEntities" class="btn btn-primary">Encode Entities (&lt; &rarr; &amp;lt;)</button>
        <button id="btnDecodeEntities" class="btn btn-secondary">Decode Entities (&amp;lt; &rarr; &lt;)</button>
        <button id="btnCopyResult" class="btn btn-secondary">Copy Output</button>
        <button id="btnClear" class="btn btn-outline">Clear</button>
      </div>

      <div class="form-group">
        <label class="form-label">Output Result:</label>
        <textarea id="entityOutput" class="form-textarea" style="min-height:160px;font-family:var(--font-mono);font-size:0.875rem;" readonly></textarea>
      </div>
    `,
    toolScript: `
      const entityInput = document.getElementById('entityInput');
      const entityOutput = document.getElementById('entityOutput');
      const btnEncodeEntities = document.getElementById('btnEncodeEntities');
      const btnDecodeEntities = document.getElementById('btnDecodeEntities');
      const btnCopyResult = document.getElementById('btnCopyResult');
      const btnClear = document.getElementById('btnClear');

      btnEncodeEntities.addEventListener('click', () => {
        const text = entityInput.value;
        entityOutput.value = text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      });

      btnDecodeEntities.addEventListener('click', () => {
        const text = entityInput.value;
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        entityOutput.value = textarea.value;
      });

      btnCopyResult.addEventListener('click', () => {
        navigator.clipboard.writeText(entityOutput.value).then(() => {
          btnCopyResult.textContent = 'Copied!';
          setTimeout(() => { btnCopyResult.textContent = 'Copy Output'; }, 2000);
        });
      });

      btnClear.addEventListener('click', () => {
        entityInput.value = '';
        entityOutput.value = '';
      });
    `
  },
  {
    id: 'css-formatter-minifier',
    slug: 'css-formatter-minifier',
    category: 'developer',
    name: 'CSS Formatter & Minifier',
    shortDesc: 'Prettify messy CSS code or minify stylesheets to reduce page weight and load times.',
    seoTitle: 'CSS Formatter & Minifier Online - Prettify & Compress CSS | DesiDesk',
    seoDesc: 'Format, beautify, or minify CSS code online. Clean stylesheet indentation and reduce CSS file size on DesiDesk.',
    keywords: 'css formatter, css minifier, beautify css, compress css online, clean css',
    howToSteps: [
      'Paste your CSS code into the editor.',
      'Click "Format CSS" to beautify indentation or "Minify CSS" to compress.',
      'Copy the resulting code.'
    ],
    features: [
      'Beautify CSS with clean indentation and line breaks.',
      'Minify CSS by stripping comments and redundant whitespace.',
      'Calculates file size savings.',
      'One-click copy.'
    ],
    faqs: [
      {
        q: 'How much does CSS minification reduce file size?',
        a: 'Minifying typically reduces CSS file sizes by 20% to 50% by stripping comments, tabs, and spaces.'
      }
    ],
    related: ['json-formatter', 'css-box-shadow-generator'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input CSS Code:</label>
        <textarea id="cssCodeInput" class="form-textarea" style="min-height:220px;font-family:var(--font-mono);font-size:0.875rem;" placeholder=".container { display: flex; justify-content: center; }"></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="btnFormatCss" class="btn btn-primary">Format / Beautify CSS</button>
        <button id="btnMinifyCss" class="btn btn-secondary">Minify CSS</button>
        <button id="btnCopyCss" class="btn btn-secondary">Copy CSS</button>
        <button id="btnClearCss" class="btn btn-outline">Clear</button>
      </div>

      <div id="cssStatsAlert" class="alert alert-info" style="display:none;"></div>
    `,
    toolScript: `
      const cssCodeInput = document.getElementById('cssCodeInput');
      const btnFormatCss = document.getElementById('btnFormatCss');
      const btnMinifyCss = document.getElementById('btnMinifyCss');
      const btnCopyCss = document.getElementById('btnCopyCss');
      const btnClearCss = document.getElementById('btnClearCss');
      const cssStatsAlert = document.getElementById('cssStatsAlert');

      function formatCss(code) {
        return code
          .replace(/\\s*([\{\};:,])\\s*/g, '$1')
          .replace(/;/g, ';\\n  ')
          .replace(/\\{/g, ' {\\n  ')
          .replace(/\\}/g, '\\n}\\n\\n')
          .replace(/  \\}/g, '}');
      }

      function minifyCss(code) {
        return code
          .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '') // remove comments
          .replace(/\\s+/g, ' ')
          .replace(/\\s*([\\{\\};:,])\\s*/g, '$1')
          .replace(/;\\}/g, '}')
          .trim();
      }

      btnFormatCss.addEventListener('click', () => {
        const val = cssCodeInput.value.trim();
        if (!val) return;
        cssCodeInput.value = formatCss(val);
        cssStatsAlert.style.display = 'none';
      });

      btnMinifyCss.addEventListener('click', () => {
        const val = cssCodeInput.value.trim();
        if (!val) return;
        const origLen = val.length;
        const minified = minifyCss(val);
        cssCodeInput.value = minified;
        const saved = origLen - minified.length;
        const pct = Math.round((saved / origLen) * 100);

        cssStatsAlert.className = 'alert alert-success';
        cssStatsAlert.textContent = \`Minified from \${origLen} to \${minified.length} chars (Saved \${saved} chars / \${pct}%).\`;
        cssStatsAlert.style.display = 'block';
      });

      btnCopyCss.addEventListener('click', () => {
        navigator.clipboard.writeText(cssCodeInput.value).then(() => {
          btnCopyCss.textContent = 'Copied!';
          setTimeout(() => { btnCopyCss.textContent = 'Copy CSS'; }, 2000);
        });
      });

      btnClearCss.addEventListener('click', () => {
        cssCodeInput.value = '';
        cssStatsAlert.style.display = 'none';
      });
    `
  },
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    category: 'developer',
    name: 'Regex Tester & Match Inspector',
    shortDesc: 'Test Regular Expressions in real-time with flags (g, i, m, s) and visual match highlights.',
    seoTitle: 'Regex Tester Online - Regular Expression Matcher | DesiDesk',
    seoDesc: 'Test regular expressions (RegEx) against text in real time. Highlights matches and captures groups with regex flags on DesiDesk.',
    keywords: 'regex tester, test regular expressions online, regex matcher, javascript regex tester',
    howToSteps: [
      'Enter your Regular Expression pattern.',
      'Select flags: Global (g), Case-Insensitive (i), Multiline (m).',
      'Paste your test string and view highlighted matches.'
    ],
    features: [
      'Real-time syntax highlighting on matched strings.',
      'Displays count of total matches.',
      'Lists capture groups for each match.',
      '100% private in-browser regex tester.'
    ],
    faqs: [
      {
        q: 'What regex flavor is used?',
        a: 'The tool uses the native JavaScript Regular Expression engine standard in modern browsers.'
      }
    ],
    related: ['find-and-replace', 'json-formatter'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Regular Expression Pattern:</label>
          <input type="text" id="regPattern" class="form-input" value="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" placeholder="e.g. \\d+" />
        </div>
        <div class="form-group">
          <label class="form-label">Flags (g, i, m):</label>
          <div style="display:flex;gap:1.5rem;padding-top:0.5rem;">
            <label style="cursor:pointer;"><input type="checkbox" id="flagG" checked /> g (Global)</label>
            <label style="cursor:pointer;"><input type="checkbox" id="flagI" checked /> i (Case Insensitive)</label>
            <label style="cursor:pointer;"><input type="checkbox" id="flagM" /> m (Multiline)</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Test String:</label>
        <textarea id="regTestText" class="form-textarea" style="min-height:160px;font-family:var(--font-mono);font-size:0.875rem;">Contact support@desidesk.in or sales@example.com for help!</textarea>
      </div>

      <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;">
        <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;">
          <h4 style="font-size:0.95rem;color:var(--secondary);">Highlighted Matches:</h4>
          <span id="matchCountBadge" style="font-size:0.8rem;background:var(--primary-light);color:var(--primary);padding:2px 8px;border-radius:var(--radius-full);font-weight:700;">2 Matches</span>
        </div>
        <div id="matchDisplay" style="font-family:var(--font-mono);font-size:0.875rem;line-height:1.6;white-space:pre-wrap;"></div>
      </div>
    `,
    toolScript: `
      const regPattern = document.getElementById('regPattern');
      const flagG = document.getElementById('flagG');
      const flagI = document.getElementById('flagI');
      const flagM = document.getElementById('flagM');
      const regTestText = document.getElementById('regTestText');
      const matchCountBadge = document.getElementById('matchCountBadge');
      const matchDisplay = document.getElementById('matchDisplay');

      function testRegex() {
        const pat = regPattern.value;
        const text = regTestText.value;
        if (!pat) {
          matchDisplay.textContent = text;
          matchCountBadge.textContent = '0 Matches';
          return;
        }

        try {
          let flags = '';
          if (flagG.checked) flags += 'g';
          if (flagI.checked) flags += 'i';
          if (flagM.checked) flags += 'm';

          const regex = new RegExp(pat, flags);
          const matches = text.match(regex);
          const count = matches ? matches.length : 0;
          matchCountBadge.textContent = count + ' Match' + (count === 1 ? '' : 'es');

          let safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          if (count > 0) {
            safe = safe.replace(new RegExp(pat, flags), '<mark style="background:#fef08a;padding:1px 3px;border-radius:3px;color:#854d0e;">$&</mark>');
          }
          matchDisplay.innerHTML = safe;
        } catch(err) {
          matchDisplay.innerHTML = '<span style="color:var(--accent-rose);">Invalid Regex: ' + err.message + '</span>';
          matchCountBadge.textContent = 'Error';
        }
      }

      [regPattern, flagG, flagI, flagM, regTestText].forEach(el => el.addEventListener('input', testRegex));
      testRegex();
    `
  },
  {
    id: 'color-code-converter',
    slug: 'color-code-converter',
    category: 'developer',
    name: 'Color Code Converter (HEX, RGB, HSL)',
    shortDesc: 'Convert colors between HEX, RGB, RGBA, and HSL formats with live color preview box.',
    seoTitle: 'Color Code Converter - HEX to RGB, HSL Online | DesiDesk',
    seoDesc: 'Convert color codes between HEX, RGB, RGBA, and HSL formats with real-time preview and one-click copy on DesiDesk.',
    keywords: 'color code converter, hex to rgb, rgb to hex, hex to hsl, color palette tool',
    howToSteps: [
      'Enter any HEX, RGB, or HSL color value, or use the color picker.',
      'All color code formats update automatically.',
      'Click to copy any format.'
    ],
    features: [
      'Two-way real-time color conversion.',
      'Visual color preview box.',
      'Outputs in HEX, RGB, and HSL.',
      'One-click copy to clipboard.'
    ],
    faqs: [
      {
        q: 'What is HSL color model?',
        a: 'HSL stands for Hue (0-360°), Saturation (0-100%), and Lightness (0-100%).'
      }
    ],
    related: ['image-color-picker', 'css-gradient-generator'],
    toolHtml: `
      <div style="display:flex;gap:2rem;align-items:center;margin-bottom:2rem;flex-wrap:wrap;">
        <input type="color" id="masterColorPicker" value="#2563eb" style="width:100px;height:100px;border-radius:var(--radius-lg);cursor:pointer;border:2px solid var(--border-light);padding:4px;" />
        <div id="colorBox" style="flex:1;height:100px;border-radius:var(--radius-lg);background:#2563eb;box-shadow:var(--shadow-md);"></div>
      </div>

      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">HEX:</label>
          <input type="text" id="valHex" class="form-input" value="#2563EB" />
        </div>
        <div class="form-group">
          <label class="form-label">RGB:</label>
          <input type="text" id="valRgb" class="form-input" value="rgb(37, 99, 235)" />
        </div>
        <div class="form-group">
          <label class="form-label">HSL:</label>
          <input type="text" id="valHsl" class="form-input" value="hsl(221, 83%, 53%)" />
        </div>
      </div>
    `,
    toolScript: `
      const masterColorPicker = document.getElementById('masterColorPicker');
      const colorBox = document.getElementById('colorBox');
      const valHex = document.getElementById('valHex');
      const valRgb = document.getElementById('valRgb');
      const valHsl = document.getElementById('valHsl');

      function hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
        const num = parseInt(hex, 16);
        return [num >> 16, (num >> 8) & 255, num & 255];
      }

      function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) { h = s = 0; }
        else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
      }

      function update(hex) {
        masterColorPicker.value = hex;
        colorBox.style.background = hex;
        valHex.value = hex.toUpperCase();
        const [r, g, b] = hexToRgb(hex);
        valRgb.value = \`rgb(\${r}, \${g}, \${b})\`;
        const [h, s, l] = rgbToHsl(r, g, b);
        valHsl.value = \`hsl(\${h}, \${s}%, \${l}%)\`;
      }

      masterColorPicker.addEventListener('input', () => update(masterColorPicker.value));
      valHex.addEventListener('input', () => {
        if (/^#[0-9A-Fa-f]{6}$/.test(valHex.value)) update(valHex.value);
      });
    `
  }
];
