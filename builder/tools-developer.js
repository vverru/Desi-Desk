// builder/tools-developer.js

module.exports = [
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    category: 'developer',
    name: 'JSON Formatter & Validator',
    shortDesc: 'Prettify, minify, validate, and inspect JSON with detailed syntax error detection.',
    seoTitle: 'JSON Formatter Online - Prettify & Validate JSON Free | DesiDesk',
    seoDesc: 'Format, validate, prettify, and minify JSON data directly in your browser. Real-time syntax error locator and one-click copy on DesiDesk.',
    keywords: 'json formatter, json validator, prettify json, minify json, format json online, json parser',
    howToSteps: [
      'Paste your raw, minified, or messy JSON into the editor.',
      'Click "Prettify (2 Spaces)" or "Prettify (4 Spaces)".',
      'If there are syntax errors, view the exact error line and position.',
      'Copy formatted JSON or download as a .json file.'
    ],
    features: [
      'Indentation options: 2 spaces, 4 spaces, or Tabs.',
      'One-click JSON Minifier (removes all whitespace).',
      'Precise syntax error detection with line numbers.',
      '100% private in-browser validation.'
    ],
    faqs: [
      {
        q: 'Is my JSON data kept private?',
        a: 'Yes, validation and parsing run entirely via browser native JSON.parse() on your device.'
      }
    ],
    related: ['base64-encoder-decoder', 'url-encoder-decoder', 'jwt-decoder'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input JSON:</label>
        <textarea id="jsonInput" class="form-textarea" style="min-height:220px;font-family:var(--font-mono);font-size:0.875rem;" placeholder="Paste JSON here (e.g. { &quot;name&quot;: &quot;DesiDesk&quot;, &quot;tools&quot;: 130 })..."></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="btnPrettify2" class="btn btn-primary">Prettify (2 Spaces)</button>
        <button id="btnPrettify4" class="btn btn-secondary">Prettify (4 Spaces)</button>
        <button id="btnMinify" class="btn btn-secondary">Minify (Compact)</button>
        <button id="btnCopy" class="btn btn-secondary">Copy JSON</button>
        <button id="btnClear" class="btn btn-outline">Clear</button>
      </div>

      <div id="statusAlert" class="alert alert-info" style="display:none;"></div>
    `,
    toolScript: `
      const jsonInput = document.getElementById('jsonInput');
      const btnPrettify2 = document.getElementById('btnPrettify2');
      const btnPrettify4 = document.getElementById('btnPrettify4');
      const btnMinify = document.getElementById('btnMinify');
      const btnCopy = document.getElementById('btnCopy');
      const btnClear = document.getElementById('btnClear');
      const statusAlert = document.getElementById('statusAlert');

      function formatJson(spaces) {
        const val = jsonInput.value.trim();
        if (!val) return;
        try {
          const parsed = JSON.parse(val);
          jsonInput.value = JSON.stringify(parsed, null, spaces);
          statusAlert.className = 'alert alert-success';
          statusAlert.textContent = 'Valid JSON! Formatted successfully.';
          statusAlert.style.display = 'block';
        } catch(err) {
          statusAlert.className = 'alert alert-error';
          statusAlert.textContent = 'Invalid JSON: ' + err.message;
          statusAlert.style.display = 'block';
        }
      }

      btnPrettify2.addEventListener('click', () => formatJson(2));
      btnPrettify4.addEventListener('click', () => formatJson(4));
      btnMinify.addEventListener('click', () => {
        const val = jsonInput.value.trim();
        if (!val) return;
        try {
          const parsed = JSON.parse(val);
          jsonInput.value = JSON.stringify(parsed);
          statusAlert.className = 'alert alert-success';
          statusAlert.textContent = 'Valid JSON! Minified successfully.';
          statusAlert.style.display = 'block';
        } catch(err) {
          statusAlert.className = 'alert alert-error';
          statusAlert.textContent = 'Invalid JSON: ' + err.message;
          statusAlert.style.display = 'block';
        }
      });

      btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(jsonInput.value).then(() => {
          btnCopy.textContent = 'Copied!';
          setTimeout(() => { btnCopy.textContent = 'Copy JSON'; }, 2000);
        });
      });

      btnClear.addEventListener('click', () => {
        jsonInput.value = '';
        statusAlert.style.display = 'none';
      });
    `
  },
  {
    id: 'base64-encoder-decoder',
    slug: 'base64-encoder-decoder',
    category: 'developer',
    name: 'Base64 Encoder & Decoder',
    shortDesc: 'Encode text strings to Base64 and decode Base64 back to clean UTF-8 text.',
    seoTitle: 'Base64 Encoder & Decoder Online - UTF-8 Safe | DesiDesk',
    seoDesc: 'Encode and decode Base64 strings online with full UTF-8 Unicode support. Fast, free, browser-based Base64 utility on DesiDesk.',
    keywords: 'base64 encode, base64 decode, base64 converter, text to base64, base64 to text',
    howToSteps: [
      'Enter or paste your text or Base64 string.',
      'Click "Encode to Base64" or "Decode from Base64".',
      'Copy the resulting output.'
    ],
    features: [
      'Full UTF-8 support (handles emojis and non-English scripts).',
      'URL-safe Base64 mode toggle.',
      'One-click copy and swap inputs.',
      '100% private in-browser execution.'
    ],
    faqs: [
      {
        q: 'Does it support Unicode characters like emojis?',
        a: 'Yes, standard window.btoa often fails with Unicode, but our tool uses modern TextEncoder and TextDecoder APIs for 100% UTF-8 compatibility.'
      }
    ],
    related: ['json-formatter', 'url-encoder-decoder', 'hash-generator'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input Text or Base64:</label>
        <textarea id="base64Input" class="form-textarea" style="min-height:180px;font-family:var(--font-mono);font-size:0.875rem;" placeholder="Type text to encode or Base64 to decode..."></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="btnEncode" class="btn btn-primary">Encode to Base64</button>
        <button id="btnDecode" class="btn btn-secondary">Decode from Base64</button>
        <button id="btnCopy" class="btn btn-secondary">Copy Result</button>
        <button id="btnClear" class="btn btn-outline">Clear</button>
      </div>

      <div class="form-group">
        <label class="form-label">Output Result:</label>
        <textarea id="base64Output" class="form-textarea" style="min-height:180px;font-family:var(--font-mono);font-size:0.875rem;" readonly></textarea>
      </div>
    `,
    toolScript: `
      const base64Input = document.getElementById('base64Input');
      const base64Output = document.getElementById('base64Output');
      const btnEncode = document.getElementById('btnEncode');
      const btnDecode = document.getElementById('btnDecode');
      const btnCopy = document.getElementById('btnCopy');
      const btnClear = document.getElementById('btnClear');

      function utf8ToBase64(str) {
        const bytes = new TextEncoder().encode(str);
        const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join('');
        return btoa(binString);
      }

      function base64ToUtf8(base64) {
        const binString = atob(base64.trim());
        const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
        return new TextDecoder().decode(bytes);
      }

      btnEncode.addEventListener('click', () => {
        try {
          base64Output.value = utf8ToBase64(base64Input.value);
        } catch(err) {
          alert('Encode error: ' + err.message);
        }
      });

      btnDecode.addEventListener('click', () => {
        try {
          base64Output.value = base64ToUtf8(base64Input.value);
        } catch(err) {
          alert('Decode error: Invalid Base64 input.');
        }
      });

      btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(base64Output.value).then(() => {
          btnCopy.textContent = 'Copied!';
          setTimeout(() => { btnCopy.textContent = 'Copy Result'; }, 2000);
        });
      });

      btnClear.addEventListener('click', () => {
        base64Input.value = '';
        base64Output.value = '';
      });
    `
  },
  {
    id: 'url-encoder-decoder',
    slug: 'url-encoder-decoder',
    category: 'developer',
    name: 'URL Encoder & Decoder',
    shortDesc: 'Encode special characters into percent-encoded URI strings or decode query strings.',
    seoTitle: 'URL Encoder & Decoder Online - Percent Encoding Free | DesiDesk',
    seoDesc: 'Encode strings to URL percent-encoding or decode encoded URL parameters. Fast, free developer utility on DesiDesk.',
    keywords: 'url encoder, url decoder, percent encoding, uri encode, decode url parameters',
    howToSteps: [
      'Enter URL or parameter string.',
      'Click "Encode URL" or "Decode URL".',
      'Copy the converted string.'
    ],
    features: [
      'Full encodeURIComponent / decodeURIComponent standard.',
      'Decodes %20 to space and handles all UTF-8 characters.',
      'One-click copy.',
      'Zero server upload.'
    ],
    faqs: [
      {
        q: 'What is URL encoding?',
        a: 'URL encoding converts reserved characters (like spaces, &, ?, =) into percent signs followed by hex codes (e.g. %20) so they can be safely passed in web addresses.'
      }
    ],
    related: ['url-parser', 'base64-encoder-decoder', 'html-entity-encoder'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input String:</label>
        <textarea id="urlInput" class="form-textarea" style="min-height:160px;font-family:var(--font-mono);font-size:0.875rem;" placeholder="Type URL or text to encode/decode..."></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="btnEncode" class="btn btn-primary">Encode (Percent Encode)</button>
        <button id="btnDecode" class="btn btn-secondary">Decode URL</button>
        <button id="btnCopy" class="btn btn-secondary">Copy Result</button>
        <button id="btnClear" class="btn btn-outline">Clear</button>
      </div>

      <div class="form-group">
        <label class="form-label">Output Result:</label>
        <textarea id="urlOutput" class="form-textarea" style="min-height:160px;font-family:var(--font-mono);font-size:0.875rem;" readonly></textarea>
      </div>
    `,
    toolScript: `
      const urlInput = document.getElementById('urlInput');
      const urlOutput = document.getElementById('urlOutput');
      const btnEncode = document.getElementById('btnEncode');
      const btnDecode = document.getElementById('btnDecode');
      const btnCopy = document.getElementById('btnCopy');
      const btnClear = document.getElementById('btnClear');

      btnEncode.addEventListener('click', () => {
        try {
          urlOutput.value = encodeURIComponent(urlInput.value);
        } catch(e) { alert(e.message); }
      });

      btnDecode.addEventListener('click', () => {
        try {
          urlOutput.value = decodeURIComponent(urlInput.value.replace(/\\+/g, ' '));
        } catch(e) { alert('Invalid URL encoded string.'); }
      });

      btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(urlOutput.value).then(() => {
          btnCopy.textContent = 'Copied!';
          setTimeout(() => { btnCopy.textContent = 'Copy Result'; }, 2000);
        });
      });

      btnClear.addEventListener('click', () => {
        urlInput.value = '';
        urlOutput.value = '';
      });
    `
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    category: 'developer',
    name: 'Hash Generator (SHA-256, SHA-512, MD5)',
    shortDesc: 'Compute cryptographic hashes (SHA-256, SHA-512, SHA-384, SHA-1, MD5) using Web Crypto.',
    seoTitle: 'Hash Generator Online - SHA-256, SHA-512, SHA-1, MD5 | DesiDesk',
    seoDesc: 'Generate secure cryptographic SHA-256, SHA-512, SHA-1, and MD5 hashes online using browser native Web Crypto API on DesiDesk.',
    keywords: 'hash generator, sha256 generator, sha512 generator, md5 hash online, crypto hash tool',
    howToSteps: [
      'Enter or paste text into the input box.',
      'Hashes for all major algorithms update in real time.',
      'Click the copy icon next to any hash to copy it.'
    ],
    features: [
      'Uses high-performance browser Web Crypto API (SubtleCrypto).',
      'Computes SHA-256, SHA-512, SHA-384, SHA-1, and MD5 simultaneously.',
      '100% private: nothing is ever sent over any network.'
    ],
    faqs: [
      {
        q: 'Which hash is recommended for security?',
        a: 'SHA-256 or SHA-512 are industry standards for security. MD5 and SHA-1 should only be used for legacy checksum verification.'
      }
    ],
    related: ['base64-encoder-decoder', 'jwt-decoder'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input Text:</label>
        <textarea id="hashInput" class="form-textarea" style="min-height:120px;" placeholder="Type text to generate cryptographic hashes..."></textarea>
      </div>

      <div style="display:flex;flex-direction:column;gap:1rem;margin-top:1.5rem;">
        <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">
            <strong style="color:var(--primary);">SHA-256 (Standard)</strong>
            <button class="btn btn-sm btn-outline" onclick="copyHash('resSha256')">Copy</button>
          </div>
          <div id="resSha256" style="font-family:var(--font-mono);font-size:0.85rem;word-break:break-all;color:var(--text-muted);">-</div>
        </div>

        <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">
            <strong style="color:var(--secondary);">SHA-512</strong>
            <button class="btn btn-sm btn-outline" onclick="copyHash('resSha512')">Copy</button>
          </div>
          <div id="resSha512" style="font-family:var(--font-mono);font-size:0.85rem;word-break:break-all;color:var(--text-muted);">-</div>
        </div>

        <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">
            <strong style="color:var(--secondary);">SHA-1</strong>
            <button class="btn btn-sm btn-outline" onclick="copyHash('resSha1')">Copy</button>
          </div>
          <div id="resSha1" style="font-family:var(--font-mono);font-size:0.85rem;word-break:break-all;color:var(--text-muted);">-</div>
        </div>
      </div>
    `,
    toolScript: `
      const hashInput = document.getElementById('hashInput');
      const resSha256 = document.getElementById('resSha256');
      const resSha512 = document.getElementById('resSha512');
      const resSha1 = document.getElementById('resSha1');

      async function computeHash(algo, text) {
        if (!text) return '-';
        const buffer = new TextEncoder().encode(text);
        const hashBuf = await crypto.subtle.digest(algo, buffer);
        const hashArray = Array.from(new Uint8Array(hashBuf));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }

      async function updateHashes() {
        const text = hashInput.value;
        resSha256.textContent = await computeHash('SHA-256', text);
        resSha512.textContent = await computeHash('SHA-512', text);
        resSha1.textContent = await computeHash('SHA-1', text);
      }

      hashInput.addEventListener('input', updateHashes);
      hashInput.value = 'DesiDesk';
      updateHashes();

      window.copyHash = function(id) {
        const val = document.getElementById(id).textContent;
        if (val && val !== '-') {
          navigator.clipboard.writeText(val).then(() => alert('Copied hash to clipboard!'));
        }
      };
    `
  },
  {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    category: 'developer',
    name: 'JWT Decoder (JSON Web Token)',
    shortDesc: 'Decode JWT Header and Payload, format JSON claims, and inspect token expiration.',
    seoTitle: 'JWT Decoder Online - Decode JSON Web Token Free | DesiDesk',
    seoDesc: 'Decode JSON Web Tokens (JWT) client-side. Inspect header, payload claims, expiration timestamp and issued-at dates on DesiDesk.',
    keywords: 'jwt decoder, decode jwt online, parse json web token, jwt inspector, jwt token reader',
    howToSteps: [
      'Paste your encoded JSON Web Token (JWT).',
      'View formatted JSON for the Header and Payload claims.',
      'Check Human-readable Expiration (exp) and Issued At (iat) timestamps.'
    ],
    features: [
      'Decodes Header (algorithm, type) and Payload claims.',
      'Displays token validity and human expiration date.',
      'Formatted, colored JSON output.',
      'Zero server upload: 100% private.'
    ],
    faqs: [
      {
        q: 'Does this tool verify the signature?',
        a: 'This tool decodes the public payload and header client-side. To verify a signature, a private secret key would be required.'
      }
    ],
    related: ['json-formatter', 'base64-encoder-decoder'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Paste Encoded JWT Token:</label>
        <textarea id="jwtInput" class="form-textarea" style="min-height:120px;font-family:var(--font-mono);font-size:0.85rem;" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="btnDecodeJwt" class="btn btn-primary">Decode Token</button>
        <button id="btnClearJwt" class="btn btn-outline">Clear</button>
      </div>

      <div id="jwtResults" style="display:none;display:flex;flex-direction:column;gap:1.25rem;">
        <div id="tokenExpiryNotice" class="alert alert-info"></div>

        <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1.25rem;">
          <h4 style="color:var(--accent-rose);font-size:0.95rem;margin-bottom:0.5rem;">Header (Algorithm & Type):</h4>
          <pre id="jwtHeader" class="code-preview"></pre>
        </div>

        <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1.25rem;">
          <h4 style="color:var(--primary);font-size:0.95rem;margin-bottom:0.5rem;">Payload (Claims & Data):</h4>
          <pre id="jwtPayload" class="code-preview"></pre>
        </div>
      </div>
    `,
    toolScript: `
      const jwtInput = document.getElementById('jwtInput');
      const btnDecodeJwt = document.getElementById('btnDecodeJwt');
      const btnClearJwt = document.getElementById('btnClearJwt');
      const jwtResults = document.getElementById('jwtResults');
      const tokenExpiryNotice = document.getElementById('tokenExpiryNotice');
      const jwtHeader = document.getElementById('jwtHeader');
      const jwtPayload = document.getElementById('jwtPayload');

      function decodePart(str) {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';
        const bin = atob(base64);
        const bytes = Uint8Array.from(bin, m => m.codePointAt(0));
        return JSON.parse(new TextDecoder().decode(bytes));
      }

      btnDecodeJwt.addEventListener('click', () => {
        const val = jwtInput.value.trim();
        const parts = val.split('.');
        if (parts.length < 2) {
          alert('Invalid JWT: A token must have at least header and payload segments separated by dots.');
          return;
        }

        try {
          const header = decodePart(parts[0]);
          const payload = decodePart(parts[1]);

          jwtHeader.textContent = JSON.stringify(header, null, 2);
          jwtPayload.textContent = JSON.stringify(payload, null, 2);

          if (payload.exp) {
            const expDate = new Date(payload.exp * 1000);
            const isExpired = Date.now() > expDate.getTime();
            tokenExpiryNotice.className = isExpired ? 'alert alert-error' : 'alert alert-success';
            tokenExpiryNotice.textContent = isExpired 
              ? 'Token expired on: ' + expDate.toLocaleString()
              : 'Token is valid until: ' + expDate.toLocaleString();
          } else {
            tokenExpiryNotice.className = 'alert alert-info';
            tokenExpiryNotice.textContent = 'Token has no expiration ("exp") claim.';
          }

          jwtResults.style.display = 'flex';
        } catch(err) {
          alert('Failed to parse JWT: ' + err.message);
        }
      });

      btnClearJwt.addEventListener('click', () => {
        jwtInput.value = '';
        jwtResults.style.display = 'none';
      });
    `
  },
  {
    id: 'markdown-to-html',
    slug: 'markdown-to-html',
    category: 'developer',
    name: 'Markdown to HTML Converter',
    shortDesc: 'Live Markdown editor with sanitized HTML preview and one-click HTML copy.',
    seoTitle: 'Markdown to HTML Converter Online - Free Markdown Editor | DesiDesk',
    seoDesc: 'Convert Markdown to clean HTML code with live side-by-side preview. Free browser-based markdown editor on DesiDesk.',
    keywords: 'markdown to html, markdown editor online, md to html converter, live markdown preview',
    howToSteps: [
      'Type or paste Markdown syntax on the left.',
      'Preview real-time rendered styling on the right.',
      'Copy clean HTML code with one click.'
    ],
    features: [
      'Supports headings, lists, bold, italics, blockquotes, code blocks, and links.',
      'Side-by-side live preview.',
      'Sanitized output.',
      'One-click HTML copy.'
    ],
    faqs: [
      {
        q: 'Does it support standard GitHub Flavored Markdown?',
        a: 'Yes, it supports standard markdown headers, bullet lists, inline code, and formatting.'
      }
    ],
    related: ['json-formatter', 'html-entity-encoder'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Markdown Input:</label>
          <textarea id="mdInput" class="form-textarea" style="min-height:300px;font-family:var(--font-mono);font-size:0.875rem;" placeholder="# Enter Markdown here...&#10;&#10;**Bold text**, *italic text*, and \`inline code\`.&#10;&#10;- Item 1&#10;- Item 2"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Rendered Preview:</label>
          <div id="mdPreview" style="background:#fff;border:1.5px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;min-height:300px;overflow-y:auto;"></div>
        </div>
      </div>

      <div class="btn-group" style="justify-content:center;">
        <button id="copyHtmlBtn" class="btn btn-primary">Copy HTML Code</button>
        <button id="clearMdBtn" class="btn btn-outline">Clear</button>
      </div>
    `,
    toolScript: `
      const mdInput = document.getElementById('mdInput');
      const mdPreview = document.getElementById('mdPreview');
      const copyHtmlBtn = document.getElementById('copyHtmlBtn');
      const clearMdBtn = document.getElementById('clearMdBtn');

      function parseMarkdown(md) {
        let html = md
          .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/^\\> (.*$)/gim, '<blockquote style="border-left:3px solid #2563eb;padding-left:1rem;color:#64748b;">$1</blockquote>')
          .replace(/\\*\\*(.*?)\\*\\*/gim, '<strong>$1</strong>')
          .replace(/\\*(.*?)\\*/gim, '<em>$1</em>')
          .replace(/[\u0060](.*?)[\u0060]/gim, '<code style="background:#f1f5f9;padding:2px 5px;border-radius:4px;font-family:monospace;">$1</code>')
          .replace(/^\\- (.*$)/gim, '<li>$1</li>')
          .replace(/\\n/gim, '<br />');
        return html;
      }

      function updatePreview() {
        const html = parseMarkdown(mdInput.value);
        mdPreview.innerHTML = html;
      }

      mdInput.addEventListener('input', updatePreview);
      mdInput.value = '# Welcome to DesiDesk\\n\\nDesiDesk provides **fast**, *secure*, and \\u0060100% private\\u0060 online tools!\\n\\n- Clean UI\\n- No Server Upload\\n- High Performance';
      updatePreview();

      copyHtmlBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(parseMarkdown(mdInput.value)).then(() => {
          copyHtmlBtn.textContent = 'Copied!';
          setTimeout(() => { copyHtmlBtn.textContent = 'Copy HTML Code'; }, 2000);
        });
      });

      clearMdBtn.addEventListener('click', () => {
        mdInput.value = '';
        updatePreview();
      });
    `
  }
];
