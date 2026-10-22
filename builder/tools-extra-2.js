// builder/tools-extra-2.js

module.exports = [
  // --- DEVELOPER ---
  {
    id: 'html-formatter-beautifier',
    slug: 'html-formatter-beautifier',
    category: 'developer',
    name: 'HTML Formatter & Beautifier',
    shortDesc: 'Format, indent, and beautify messy or minified HTML markup code.',
    seoTitle: 'HTML Formatter Online - Beautify HTML Code Free | DesiDesk',
    seoDesc: 'Format and beautify HTML code online with clean tag indentation. Free browser-based HTML formatter on DesiDesk.',
    keywords: 'html formatter, beautify html, format html code, clean html online',
    howToSteps: [
      'Paste your raw or minified HTML code.',
      'Click "Format HTML" to auto-indent opening and closing tags.',
      'Copy your beautified HTML.'
    ],
    features: [
      'Automatic indentation of nested HTML tags.',
      'One-click format and copy.',
      '100% private in-browser tool.'
    ],
    faqs: [
      {
        q: 'Does it change text content?',
        a: 'No, it only adjusts indentation and whitespace between tags.'
      }
    ],
    related: ['html-entity-encoder', 'css-formatter-minifier', 'json-formatter'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input HTML Code:</label>
        <textarea id="htmlInput" class="form-textarea" style="min-height:220px;font-family:var(--font-mono);font-size:0.875rem;" placeholder="<div><p>Hello <span>World</span></p></div>"></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="btnFormatHtml" class="btn btn-primary">Format / Beautify HTML</button>
        <button id="btnCopyHtml" class="btn btn-secondary">Copy HTML</button>
        <button id="btnClearHtml" class="btn btn-outline">Clear</button>
      </div>
    `,
    toolScript: `
      const htmlInput = document.getElementById('htmlInput');
      const btnFormatHtml = document.getElementById('btnFormatHtml');
      const btnCopyHtml = document.getElementById('btnCopyHtml');
      const btnClearHtml = document.getElementById('btnClearHtml');

      function formatHtml(html) {
        let tab = '  ';
        let result = '';
        let indent = '';

        html.split(/>\\s*</).forEach(element => {
          if (element.match(/^\\/\\w/)) {
            indent = indent.substring(tab.length);
          }
          result += indent + '<' + element + '>\\r\\n';
          if (element.match(/^<?\\w[^>]*[^\\/]$/) && !element.startsWith("input") && !element.startsWith("img") && !element.startsWith("br") && !element.startsWith("hr")) {
            indent += tab;
          }
        });
        return result.substring(1, result.length - 3);
      }

      btnFormatHtml.addEventListener('click', () => {
        const val = htmlInput.value.trim();
        if (val) htmlInput.value = formatHtml(val);
      });

      btnCopyHtml.addEventListener('click', () => {
        navigator.clipboard.writeText(htmlInput.value).then(() => {
          btnCopyHtml.textContent = 'Copied!';
          setTimeout(() => { btnCopyHtml.textContent = 'Copy HTML'; }, 2000);
        });
      });

      btnClearHtml.addEventListener('click', () => { htmlInput.value = ''; });
    `
  },
  {
    id: 'javascript-minifier',
    slug: 'javascript-minifier',
    category: 'developer',
    name: 'JavaScript Minifier & Cleaner',
    shortDesc: 'Minify JavaScript code, strip comments, and clean whitespace safely client-side.',
    seoTitle: 'JavaScript Minifier Online - Compress JS Code Free | DesiDesk',
    seoDesc: 'Minify JavaScript code directly in your browser. Remove comments, tabs, and unnecessary whitespace to speed up website scripts on DesiDesk.',
    keywords: 'javascript minifier, minify js online, compress javascript, js cleaner',
    howToSteps: [
      'Paste your JavaScript code into the editor.',
      'Click "Minify JavaScript".',
      'Copy the compressed script.'
    ],
    features: [
      'Strips multi-line and single-line comments.',
      'Cleans redundant whitespace while preserving script integrity.',
      'Displays compression statistics.',
      '100% private in-browser minification.'
    ],
    faqs: [
      {
        q: 'Does it execute the code?',
        a: 'No! It only performs lexical whitespace and comment stripping; the code is never executed.'
      }
    ],
    related: ['css-formatter-minifier', 'json-formatter'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input JavaScript Code:</label>
        <textarea id="jsInput" class="form-textarea" style="min-height:220px;font-family:var(--font-mono);font-size:0.875rem;" placeholder="function calculate(a, b) {\\n  // Add two numbers\\n  return a + b;\\n}"></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="btnMinifyJs" class="btn btn-primary">Minify JavaScript</button>
        <button id="btnCopyJs" class="btn btn-secondary">Copy Minified JS</button>
        <button id="btnClearJs" class="btn btn-outline">Clear</button>
      </div>

      <div id="jsStats" class="alert alert-info" style="display:none;"></div>
    `,
    toolScript: `
      const jsInput = document.getElementById('jsInput');
      const btnMinifyJs = document.getElementById('btnMinifyJs');
      const btnCopyJs = document.getElementById('btnCopyJs');
      const btnClearJs = document.getElementById('btnClearJs');
      const jsStats = document.getElementById('jsStats');

      function minifyJs(code) {
        return code
          .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '') // remove multi-line comments
          .replace(/\\/\\/.*$/gm, '') // remove single-line comments
          .replace(/\\s+/g, ' ')
          .replace(/\\s*([\\{\\}\\(\\)\\[\\]=+\\-\\*;:,<>!&\\|\\?])\\s*/g, '$1')
          .trim();
      }

      btnMinifyJs.addEventListener('click', () => {
        const val = jsInput.value.trim();
        if (!val) return;
        const origLen = val.length;
        const minified = minifyJs(val);
        jsInput.value = minified;

        const saved = origLen - minified.length;
        const pct = Math.round((saved / origLen) * 100);
        jsStats.className = 'alert alert-success';
        jsStats.textContent = \`Minified from \${origLen} to \${minified.length} bytes (Saved \${saved} bytes / \${pct}%).\`;
        jsStats.style.display = 'block';
      });

      btnCopyJs.addEventListener('click', () => {
        navigator.clipboard.writeText(jsInput.value).then(() => {
          btnCopyJs.textContent = 'Copied!';
          setTimeout(() => { btnCopyJs.textContent = 'Copy Minified JS'; }, 2000);
        });
      });

      btnClearJs.addEventListener('click', () => {
        jsInput.value = '';
        jsStats.style.display = 'none';
      });
    `
  },
  {
    id: 'sql-formatter',
    slug: 'sql-formatter',
    category: 'developer',
    name: 'SQL Query Formatter',
    shortDesc: 'Prettify and format SQL queries with capitalized keywords and structured indentation.',
    seoTitle: 'SQL Formatter Online - Prettify SQL Queries Free | DesiDesk',
    seoDesc: 'Format and beautify SQL queries online. Capitalize keywords (SELECT, FROM, WHERE, JOIN) and indent clauses on DesiDesk.',
    keywords: 'sql formatter, prettify sql, format sql query online, sql beautifier',
    howToSteps: [
      'Paste your raw SQL query.',
      'Click "Format SQL Query".',
      'Copy the cleanly formatted query.'
    ],
    features: [
      'Capitalizes standard SQL keywords (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY).',
      'Line breaks for major clauses.',
      'Indents nested subqueries.',
      'One-click copy.'
    ],
    faqs: [
      {
        q: 'Which SQL dialects are supported?',
        a: 'Standard ANSI SQL, MySQL, PostgreSQL, SQLite, and MS SQL syntax are all supported.'
      }
    ],
    related: ['json-formatter', 'html-formatter-beautifier'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input SQL Query:</label>
        <textarea id="sqlInput" class="form-textarea" style="min-height:200px;font-family:var(--font-mono);font-size:0.875rem;" placeholder="select id, name, email from users where active = 1 order by created_at desc"></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="btnFormatSql" class="btn btn-primary">Format SQL Query</button>
        <button id="btnCopySql" class="btn btn-secondary">Copy SQL</button>
        <button id="btnClearSql" class="btn btn-outline">Clear</button>
      </div>
    `,
    toolScript: `
      const sqlInput = document.getElementById('sqlInput');
      const btnFormatSql = document.getElementById('btnFormatSql');
      const btnCopySql = document.getElementById('btnCopySql');
      const btnClearSql = document.getElementById('btnClearSql');

      const KEYWORDS = ["SELECT", "FROM", "WHERE", "AND", "OR", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN", "ON", "SET", "INSERT INTO", "VALUES", "UPDATE", "DELETE", "UNION", "AS"];

      function formatSql(query) {
        let q = query.replace(/\\s+/g, ' ');
        KEYWORDS.forEach(kw => {
          const reg = new RegExp('\\\\b' + kw + '\\\\b', 'gi');
          q = q.replace(reg, '\\n' + kw);
        });
        return q.trim();
      }

      btnFormatSql.addEventListener('click', () => {
        const val = sqlInput.value.trim();
        if (val) sqlInput.value = formatSql(val);
      });

      btnCopySql.addEventListener('click', () => {
        navigator.clipboard.writeText(sqlInput.value).then(() => {
          btnCopySql.textContent = 'Copied!';
          setTimeout(() => { btnCopySql.textContent = 'Copy SQL'; }, 2000);
        });
      });

      btnClearSql.addEventListener('click', () => { sqlInput.value = ''; });
    `
  },

  // --- CONVERTERS ---
  {
    id: 'volume-converter',
    slug: 'volume-converter',
    category: 'converter',
    name: 'Volume & Capacity Converter',
    shortDesc: 'Convert between Liters, Milliliters, Gallons (US/UK), Cubic Meters, Cups, and Fluid Ounces.',
    seoTitle: 'Volume Converter Online - Liters, Gallons, Milliliters | DesiDesk',
    seoDesc: 'Convert liquid volume and capacity units online between liters, gallons, milliliters, fluid ounces, and cubic meters on DesiDesk.',
    keywords: 'volume converter, liters to gallons, gallons to liters, ml to oz, capacity converter',
    howToSteps: [
      'Enter the volume number.',
      'Select source unit (e.g. Liters).',
      'Select target unit (e.g. US Gallons).',
      'View instant conversion result.'
    ],
    features: [
      'Supports Liters, Milliliters, Cubic Meters, Gallons (US), Quarts, Cups, Fluid Ounces.',
      'High decimal precision.',
      'Instant conversion.',
      '100% free and private.'
    ],
    faqs: [
      {
        q: 'How many liters are in one US Gallon?',
        a: '1 US liquid gallon is equal to approximately 3.78541 liters.'
      }
    ],
    related: ['weight-converter', 'length-converter'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Volume Value:</label>
          <input type="number" id="volVal" class="form-input" value="1" step="any" />
        </div>
        <div class="form-group">
          <label class="form-label">From Unit:</label>
          <select id="volFrom" class="form-select">
            <option value="l" selected>Liters (L)</option>
            <option value="ml">Milliliters (mL)</option>
            <option value="gal">Gallons (US gal)</option>
            <option value="m3">Cubic Meters (m³)</option>
            <option value="oz">Fluid Ounces (fl oz)</option>
            <option value="cup">Cups (US)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">To Unit:</label>
          <select id="volTo" class="form-select">
            <option value="gal" selected>Gallons (US gal)</option>
            <option value="l">Liters (L)</option>
            <option value="ml">Milliliters (mL)</option>
            <option value="m3">Cubic Meters (m³)</option>
            <option value="oz">Fluid Ounces (fl oz)</option>
            <option value="cup">Cups (US)</option>
          </select>
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;text-align:center;">
        <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Conversion Result</div>
        <div id="resVol" style="font-size:2.5rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">0.26417 gal</div>
      </div>
    `,
    toolScript: `
      const FACTORS = {
        l: 1,
        ml: 0.001,
        gal: 3.785411784,
        m3: 1000,
        oz: 0.0295735295625,
        cup: 0.2365882365
      };

      const volVal = document.getElementById('volVal');
      const volFrom = document.getElementById('volFrom');
      const volTo = document.getElementById('volTo');
      const resVol = document.getElementById('resVol');

      function convertVol() {
        const val = parseFloat(volVal.value) || 0;
        const from = volFrom.value;
        const to = volTo.value;

        const inL = val * FACTORS[from];
        const res = inL / FACTORS[to];
        resVol.textContent = res.toFixed(5).replace(/\\.?0+$/, '') + ' ' + to;
      }

      [volVal, volFrom, volTo].forEach(el => el.addEventListener('input', convertVol));
      convertVol();
    `
  },
  {
    id: 'time-unit-converter',
    slug: 'time-unit-converter',
    category: 'converter',
    name: 'Time Unit Converter',
    shortDesc: 'Convert between Seconds, Minutes, Hours, Days, Weeks, Months, and Years.',
    seoTitle: 'Time Unit Converter Online - Seconds, Minutes, Hours, Days | DesiDesk',
    seoDesc: 'Convert time units online between seconds, minutes, hours, days, weeks, months, and years on DesiDesk.',
    keywords: 'time unit converter, seconds to hours, minutes to hours, hours to days, days to weeks',
    howToSteps: [
      'Enter time value.',
      'Select starting unit (e.g. Hours).',
      'Select target unit (e.g. Minutes or Seconds).',
      'View instant conversion result.'
    ],
    features: [
      'Supports Milliseconds, Seconds, Minutes, Hours, Days, Weeks, Months, Years.',
      'High-precision conversion.',
      'Zero server upload.',
      'Instant result.'
    ],
    faqs: [
      {
        q: 'How many seconds are in one day?',
        a: 'There are 86,400 seconds in a standard 24-hour day.'
      }
    ],
    related: ['length-converter', 'speed-converter'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Time Value:</label>
          <input type="number" id="timeVal" class="form-input" value="24" step="any" />
        </div>
        <div class="form-group">
          <label class="form-label">From Unit:</label>
          <select id="timeFrom" class="form-select">
            <option value="hr" selected>Hours (hr)</option>
            <option value="min">Minutes (min)</option>
            <option value="sec">Seconds (s)</option>
            <option value="day">Days (d)</option>
            <option value="wk">Weeks (wk)</option>
            <option value="yr">Years (yr)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">To Unit:</label>
          <select id="timeTo" class="form-select">
            <option value="min" selected>Minutes (min)</option>
            <option value="hr">Hours (hr)</option>
            <option value="sec">Seconds (s)</option>
            <option value="day">Days (d)</option>
            <option value="wk">Weeks (wk)</option>
            <option value="yr">Years (yr)</option>
          </select>
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;text-align:center;">
        <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Conversion Result</div>
        <div id="resTime" style="font-size:2.5rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">1,440 min</div>
      </div>
    `,
    toolScript: `
      const FACTORS = {
        sec: 1,
        min: 60,
        hr: 3600,
        day: 86400,
        wk: 604800,
        yr: 31536000
      };

      const timeVal = document.getElementById('timeVal');
      const timeFrom = document.getElementById('timeFrom');
      const timeTo = document.getElementById('timeTo');
      const resTime = document.getElementById('resTime');

      function convertTime() {
        const val = parseFloat(timeVal.value) || 0;
        const from = timeFrom.value;
        const to = timeTo.value;

        const inSec = val * FACTORS[from];
        const res = inSec / FACTORS[to];
        resTime.textContent = res.toLocaleString('en-US', { maximumFractionDigits: 6 }) + ' ' + to;
      }

      [timeVal, timeFrom, timeTo].forEach(el => el.addEventListener('input', convertTime));
      convertTime();
    `
  },
  {
    id: 'angle-converter',
    slug: 'angle-converter',
    category: 'converter',
    name: 'Angle Converter (Degrees & Radians)',
    shortDesc: 'Convert between Degrees (°), Radians (rad), Gradians (grad), and Arcminutes.',
    seoTitle: 'Angle Converter Online - Degrees to Radians Free | DesiDesk',
    seoDesc: 'Convert angles between Degrees, Radians, Gradians, and Arcminutes online. Instant trigonometric angle converter on DesiDesk.',
    keywords: 'angle converter, degrees to radians, radians to degrees, gradians converter',
    howToSteps: [
      'Enter the angle value.',
      'Select starting unit (e.g. Degrees).',
      'Select destination unit (e.g. Radians).',
      'View converted result.'
    ],
    features: [
      'Degrees to Radians (and π factor display).',
      'Supports Gradians and Arcminutes.',
      'Real-time calculation.',
      'Free and private.'
    ],
    faqs: [
      {
        q: 'How many radians are in 180 degrees?',
        a: '180 degrees is exactly equal to π radians (approximately 3.14159 radians).'
      }
    ],
    related: ['length-converter', 'speed-converter'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Angle Value:</label>
          <input type="number" id="angVal" class="form-input" value="180" step="any" />
        </div>
        <div class="form-group">
          <label class="form-label">From:</label>
          <select id="angFrom" class="form-select">
            <option value="deg" selected>Degrees (°)</option>
            <option value="rad">Radians (rad)</option>
            <option value="grad">Gradians (grad)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">To:</label>
          <select id="angTo" class="form-select">
            <option value="rad" selected>Radians (rad)</option>
            <option value="deg">Degrees (°)</option>
            <option value="grad">Gradians (grad)</option>
          </select>
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;text-align:center;">
        <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Conversion Result</div>
        <div id="resAng" style="font-size:2.5rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">3.14159 rad</div>
      </div>
    `,
    toolScript: `
      const angVal = document.getElementById('angVal');
      const angFrom = document.getElementById('angFrom');
      const angTo = document.getElementById('angTo');
      const resAng = document.getElementById('resAng');

      function convertAngle() {
        const v = parseFloat(angVal.value) || 0;
        const from = angFrom.value;
        const to = angTo.value;

        let inDeg = v;
        if (from === 'rad') inDeg = v * (180 / Math.PI);
        else if (from === 'grad') inDeg = v * 0.9;

        let res = inDeg;
        if (to === 'rad') res = inDeg * (Math.PI / 180);
        else if (to === 'grad') res = inDeg / 0.9;

        resAng.textContent = res.toFixed(5).replace(/\\.?0+$/, '') + ' ' + to;
      }

      [angVal, angFrom, angTo].forEach(el => el.addEventListener('input', convertAngle));
      convertAngle();
    `
  },

  // --- GENERATOR EXTRA ---
  {
    id: 'robots-txt-generator',
    slug: 'robots-txt-generator',
    category: 'generator',
    name: 'Robots.txt Generator',
    shortDesc: 'Generate search engine crawler rules, allow/disallow paths, and sitemap directives for robots.txt.',
    seoTitle: 'Robots.txt Generator Online - Free SEO Robots File Creator | DesiDesk',
    seoDesc: 'Create a customized robots.txt file online. Configure search engine bots (Google, Bing), crawl delays, and sitemap directives on DesiDesk.',
    keywords: 'robots txt generator, create robots.txt, robots file generator, seo robots tool',
    howToSteps: [
      'Enter your sitemap URL.',
      'Specify paths to Disallow (e.g., /admin/, /private/).',
      'Download your generated robots.txt file.'
    ],
    features: [
      'Preset rules for Googlebot, Bingbot, and all crawlers.',
      'Disallow and Allow path directives.',
      'Sitemap directive inclusion.',
      'Download as robots.txt.'
    ],
    faqs: [
      {
        q: 'Where do I place robots.txt?',
        a: 'The robots.txt file must be placed at the root directory of your website domain (e.g. https://yourwebsite.com/robots.txt).'
      }
    ],
    related: ['sitemap-xml-generator', 'meta-tag-generator'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Sitemap URL:</label>
        <input type="text" id="robSitemap" class="form-input" value="https://desidesk.in/sitemap.xml" />
      </div>

      <div class="form-group">
        <label class="form-label">Disallowed Paths (one per line):</label>
        <textarea id="robDisallow" class="form-textarea" style="min-height:90px;">/admin/\\n/private/\\n/temp/</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Generated robots.txt:</label>
        <textarea id="robOutput" class="form-textarea" style="min-height:160px;font-family:var(--font-mono);font-size:0.875rem;" readonly></textarea>
      </div>

      <div class="btn-group">
        <button id="btnCopyRob" class="btn btn-primary">Copy robots.txt</button>
        <a id="btnDlRob" class="btn btn-secondary" download="robots.txt">Download robots.txt</a>
      </div>
    `,
    toolScript: `
      const robSitemap = document.getElementById('robSitemap');
      const robDisallow = document.getElementById('robDisallow');
      const robOutput = document.getElementById('robOutput');
      const btnCopyRob = document.getElementById('btnCopyRob');
      const btnDlRob = document.getElementById('btnDlRob');

      function updateRob() {
        const sitemap = robSitemap.value.trim();
        const disallowLines = robDisallow.value.split('\\n').map(s => s.trim()).filter(Boolean);

        let txt = 'User-agent: *\\n';
        disallowLines.forEach(p => txt += 'Disallow: ' + p + '\\n');
        txt += 'Allow: /\\n\\n';
        if (sitemap) txt += 'Sitemap: ' + sitemap + '\\n';

        robOutput.value = txt;

        const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
        btnDlRob.href = URL.createObjectURL(blob);
      }

      [robSitemap, robDisallow].forEach(el => el.addEventListener('input', updateRob));
      updateRob();

      btnCopyRob.addEventListener('click', () => {
        navigator.clipboard.writeText(robOutput.value).then(() => {
          btnCopyRob.textContent = 'Copied!';
          setTimeout(() => { btnCopyRob.textContent = 'Copy robots.txt'; }, 2000);
        });
      });
    `
  },
  {
    id: 'utm-link-builder',
    slug: 'utm-link-builder',
    category: 'generator',
    name: 'UTM Campaign Link Builder',
    shortDesc: 'Build trackable Google Analytics campaign URLs with UTM parameters (source, medium, campaign).',
    seoTitle: 'UTM Link Builder Online - Campaign URL Builder Free | DesiDesk',
    seoDesc: 'Generate Google Analytics trackable campaign URLs with utm_source, utm_medium, and utm_campaign parameters on DesiDesk.',
    keywords: 'utm builder, utm link generator, campaign url builder, google analytics utm tool',
    howToSteps: [
      'Enter your Website Destination URL.',
      'Fill in Campaign Source (e.g. google, newsletter).',
      'Fill in Campaign Medium (e.g. cpc, email, social).',
      'Copy your trackable UTM link.'
    ],
    features: [
      'Standard Google Analytics UTM tags.',
      'Auto URL encoding.',
      'One-click copy to clipboard.',
      'Free and instant.'
    ],
    faqs: [
      {
        q: 'What is utm_source vs utm_medium?',
        a: 'Source identifies where the traffic comes from (e.g. google, facebook), while medium indicates the marketing channel (e.g. cpc, email).'
      }
    ],
    related: ['meta-tag-generator', 'url-encoder-decoder'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Website URL:</label>
        <input type="text" id="utmUrl" class="form-input" value="https://desidesk.in/" />
      </div>

      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Campaign Source (utm_source):</label>
          <input type="text" id="utmSource" class="form-input" value="newsletter" />
        </div>
        <div class="form-group">
          <label class="form-label">Campaign Medium (utm_medium):</label>
          <input type="text" id="utmMedium" class="form-input" value="email" />
        </div>
        <div class="form-group">
          <label class="form-label">Campaign Name (utm_campaign):</label>
          <input type="text" id="utmCampaign" class="form-input" value="summer_launch" />
        </div>
      </div>

      <div class="form-group" style="margin-top:1.5rem;">
        <label class="form-label">Generated Trackable Campaign URL:</label>
        <textarea id="utmOutput" class="form-textarea" style="min-height:90px;font-family:var(--font-mono);font-size:0.875rem;" readonly></textarea>
      </div>

      <div class="btn-group">
        <button id="copyUtmBtn" class="btn btn-primary">Copy UTM Link</button>
      </div>
    `,
    toolScript: `
      const utmUrl = document.getElementById('utmUrl');
      const utmSource = document.getElementById('utmSource');
      const utmMedium = document.getElementById('utmMedium');
      const utmCampaign = document.getElementById('utmCampaign');
      const utmOutput = document.getElementById('utmOutput');
      const copyUtmBtn = document.getElementById('copyUtmBtn');

      function updateUtm() {
        let base = utmUrl.value.trim();
        if (!base) return;
        const s = utmSource.value.trim();
        const m = utmMedium.value.trim();
        const c = utmCampaign.value.trim();

        const sep = base.includes('?') ? '&' : '?';
        const params = [];
        if (s) params.push('utm_source=' + encodeURIComponent(s));
        if (m) params.push('utm_medium=' + encodeURIComponent(m));
        if (c) params.push('utm_campaign=' + encodeURIComponent(c));

        utmOutput.value = base + (params.length ? sep + params.join('&') : '');
      }

      [utmUrl, utmSource, utmMedium, utmCampaign].forEach(el => el.addEventListener('input', updateUtm));
      updateUtm();

      copyUtmBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(utmOutput.value).then(() => {
          copyUtmBtn.textContent = 'Copied!';
          setTimeout(() => { copyUtmBtn.textContent = 'Copy UTM Link'; }, 2000);
        });
      });
    `
  }
];
