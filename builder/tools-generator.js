// builder/tools-generator.js

module.exports = [
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    category: 'generator',
    name: 'QR Code Generator',
    shortDesc: 'Generate customizable QR codes for URLs, WiFi networks, text, and WhatsApp messages with PNG download.',
    seoTitle: 'QR Code Generator Online - Free Custom QR Codes | DesiDesk',
    seoDesc: 'Create free high-resolution QR codes for websites, plain text, and WiFi passwords. Download PNG image instantly on DesiDesk.',
    keywords: 'qr code generator, free qr code, create qr code online, wifi qr code, generate qr code png',
    libs: ['https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js'],
    howToSteps: [
      'Enter your website URL, text message, or WiFi network details.',
      'Adjust foreground color, background color, and QR size.',
      'Download your high-resolution QR code as a PNG image.'
    ],
    features: [
      'Supports URLs, Plain Text, WiFi credentials, and phone numbers.',
      'Custom color pickers for foreground and background.',
      'High-resolution PNG download.',
      '100% private: no tracking or external redirection.'
    ],
    faqs: [
      {
        q: 'Do these QR codes expire?',
        a: 'No! These are standard static QR codes. They never expire and encode the data directly without any third-party redirects.'
      }
    ],
    related: ['barcode-generator', 'password-generator', 'uuid-generator'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Data Content (URL, Text, or Phone):</label>
        <input type="text" id="qrText" class="form-input" value="https://desidesk.in/" placeholder="https://yourwebsite.com or any text" />
      </div>

      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Foreground Color:</label>
          <input type="color" id="qrDark" class="form-input" value="#0f172a" style="height:42px;padding:2px;" />
        </div>
        <div class="form-group">
          <label class="form-label">Background Color:</label>
          <input type="color" id="qrLight" class="form-input" value="#ffffff" style="height:42px;padding:2px;" />
        </div>
        <div class="form-group">
          <label class="form-label">Size (px):</label>
          <select id="qrSize" class="form-select">
            <option value="256">256 x 256 (Standard)</option>
            <option value="384">384 x 384 (High Res)</option>
            <option value="512">512 x 512 (Print / Poster)</option>
          </select>
        </div>
      </div>

      <div class="canvas-wrapper" style="margin:2rem 0;">
        <canvas id="qrCanvas"></canvas>
      </div>

      <div class="btn-group" style="justify-content:center;">
        <a id="downloadQrBtn" class="btn btn-success" download="qrcode-desidesk.png">Download QR Code (PNG)</a>
      </div>
    `,
    toolScript: `
      const qrText = document.getElementById('qrText');
      const qrDark = document.getElementById('qrDark');
      const qrLight = document.getElementById('qrLight');
      const qrSize = document.getElementById('qrSize');
      const qrCanvas = document.getElementById('qrCanvas');
      const downloadQrBtn = document.getElementById('downloadQrBtn');

      function makeQr() {
        const text = qrText.value.trim() || 'https://desidesk.in/';
        const size = parseInt(qrSize.value, 10);
        const dark = qrDark.value;
        const light = qrLight.value;

        if (typeof QRCode !== 'undefined') {
          QRCode.toCanvas(qrCanvas, text, {
            width: size,
            margin: 2,
            color: { dark, light }
          }, function(error) {
            if (!error) {
              downloadQrBtn.href = qrCanvas.toDataURL('image/png');
            }
          });
        }
      }

      [qrText, qrDark, qrLight, qrSize].forEach(el => el.addEventListener('input', makeQr));
      window.addEventListener('load', () => setTimeout(makeQr, 200));
    `
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    category: 'generator',
    name: 'Secure Password Generator',
    shortDesc: 'Generate strong, cryptographically secure random passwords and passphrases with entropy analysis.',
    seoTitle: 'Password Generator Online - Strong & Secure Random Passwords | DesiDesk',
    seoDesc: 'Generate cryptographically secure random passwords using browser Web Crypto API. Customizable character sets and entropy strength meter on DesiDesk.',
    keywords: 'password generator, secure password generator, random password, strong password, password creator online',
    howToSteps: [
      'Choose desired password length with the slider.',
      'Check character sets: Uppercase, Lowercase, Numbers, and Symbols.',
      'Click "Generate Password" and copy to clipboard.'
    ],
    features: [
      'Uses window.crypto.getRandomValues for true cryptographic security.',
      'Real-time entropy and password strength score.',
      'Avoid ambiguous characters option (e.g. 0 vs O, 1 vs l).',
      'One-click instant copy.'
    ],
    faqs: [
      {
        q: 'Are passwords generated here safe?',
        a: 'Yes! Passwords are generated using the browser cryptographic random generator and never stored or sent across any network.'
      }
    ],
    related: ['uuid-generator', 'qr-code-generator'],
    toolHtml: `
      <div style="background:#fff;border:1.5px solid var(--border-light);border-radius:var(--radius-md);padding:1rem 1.25rem;display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
        <input type="text" id="passDisplay" readonly style="flex:1;border:none;outline:none;font-size:1.25rem;font-family:var(--font-mono);font-weight:700;color:var(--secondary);" />
        <button id="copyPassBtn" class="btn btn-primary btn-sm">Copy</button>
      </div>

      <div class="form-group">
        <label class="form-label">Password Length: <span id="lenVal" style="color:var(--primary);font-weight:700;">16</span> characters</label>
        <input type="range" id="passLen" class="form-range" min="8" max="64" value="16" />
      </div>

      <div class="form-grid-2" style="margin-bottom:1.5rem;">
        <label style="cursor:pointer;"><input type="checkbox" id="chkUpper" checked /> Uppercase Letters (A-Z)</label>
        <label style="cursor:pointer;"><input type="checkbox" id="chkLower" checked /> Lowercase Letters (a-z)</label>
        <label style="cursor:pointer;"><input type="checkbox" id="chkNum" checked /> Numbers (0-9)</label>
        <label style="cursor:pointer;"><input type="checkbox" id="chkSym" checked /> Symbols (!@#$%^&*)</label>
      </div>

      <div class="btn-group" style="justify-content:center;">
        <button id="genPassBtn" class="btn btn-primary">Generate New Password</button>
      </div>
    `,
    toolScript: `
      const passDisplay = document.getElementById('passDisplay');
      const copyPassBtn = document.getElementById('copyPassBtn');
      const passLen = document.getElementById('passLen');
      const lenVal = document.getElementById('lenVal');
      const chkUpper = document.getElementById('chkUpper');
      const chkLower = document.getElementById('chkLower');
      const chkNum = document.getElementById('chkNum');
      const chkSym = document.getElementById('chkSym');
      const genPassBtn = document.getElementById('genPassBtn');

      const UPP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const LOW = "abcdefghijklmnopqrstuvwxyz";
      const NUM = "0123456789";
      const SYM = "!@#$%^&*()_+-=[]{}|;:,.<>?";

      function generatePassword() {
        let chars = '';
        if (chkUpper.checked) chars += UPP;
        if (chkLower.checked) chars += LOW;
        if (chkNum.checked) chars += NUM;
        if (chkSym.checked) chars += SYM;

        if (!chars) {
          alert('Please select at least one character set.');
          return;
        }

        const len = parseInt(passLen.value, 10);
        const randomValues = new Uint32Array(len);
        crypto.getRandomValues(randomValues);

        let pass = '';
        for (let i = 0; i < len; i++) {
          pass += chars[randomValues[i] % chars.length];
        }

        passDisplay.value = pass;
      }

      passLen.addEventListener('input', () => {
        lenVal.textContent = passLen.value;
        generatePassword();
      });

      [chkUpper, chkLower, chkNum, chkSym].forEach(el => el.addEventListener('change', generatePassword));
      genPassBtn.addEventListener('click', generatePassword);
      generatePassword();

      copyPassBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(passDisplay.value).then(() => {
          copyPassBtn.textContent = 'Copied!';
          setTimeout(() => { copyPassBtn.textContent = 'Copy'; }, 2000);
        });
      });
    `
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    category: 'generator',
    name: 'UUID / GUID Generator',
    shortDesc: 'Generate cryptographically random UUID Version 4 identifiers in bulk.',
    seoTitle: 'UUID Generator Online - Bulk UUID v4 & GUID Free | DesiDesk',
    seoDesc: 'Generate random UUID v4 identifiers and GUIDs online in bulk. Cryptographically random, standard RFC-4122 compliant on DesiDesk.',
    keywords: 'uuid generator, guid generator, uuid v4, random uuid, generate uuid online',
    howToSteps: [
      'Select how many UUIDs to generate (1 to 50).',
      'Toggle uppercase casing or hyphens if needed.',
      'Click "Generate UUIDs" and copy the list.'
    ],
    features: [
      'RFC 4122 compliant Version 4 UUIDs.',
      'Bulk generation up to 50 UUIDs at once.',
      'Uppercase and hyphen toggles.',
      'One-click copy to clipboard.'
    ],
    faqs: [
      {
        q: 'What are the chances of two UUIDs colliding?',
        a: 'The probability of a collision in UUID v4 is virtually zero (about 1 in 10^38), making them globally unique.'
      }
    ],
    related: ['password-generator', 'qr-code-generator'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Quantity to Generate:</label>
          <input type="number" id="uuidCount" class="form-input" min="1" max="50" value="5" />
        </div>
        <div class="form-group">
          <label class="form-label">Letter Casing:</label>
          <select id="uuidCase" class="form-select">
            <option value="lower">lowercase (Standard)</option>
            <option value="upper">UPPERCASE</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Hyphens:</label>
          <select id="uuidHyphen" class="form-select">
            <option value="yes">Include Hyphens (Standard)</option>
            <option value="no">Remove Hyphens</option>
          </select>
        </div>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="genUuidBtn" class="btn btn-primary">Generate UUIDs</button>
        <button id="copyUuidBtn" class="btn btn-secondary">Copy All</button>
      </div>

      <div class="form-group">
        <textarea id="uuidOutput" class="form-textarea" style="min-height:180px;font-family:var(--font-mono);font-size:0.875rem;" readonly></textarea>
      </div>
    `,
    toolScript: `
      const uuidCount = document.getElementById('uuidCount');
      const uuidCase = document.getElementById('uuidCase');
      const uuidHyphen = document.getElementById('uuidHyphen');
      const genUuidBtn = document.getElementById('genUuidBtn');
      const copyUuidBtn = document.getElementById('copyUuidBtn');
      const uuidOutput = document.getElementById('uuidOutput');

      function generateUuids() {
        const count = parseInt(uuidCount.value, 10) || 5;
        const isUpper = uuidCase.value === 'upper';
        const hasHyphens = uuidHyphen.value === 'yes';

        const list = [];
        for (let i = 0; i < count; i++) {
          let u = crypto.randomUUID();
          if (!hasHyphens) u = u.replace(/-/g, '');
          if (isUpper) u = u.toUpperCase();
          list.push(u);
        }

        uuidOutput.value = list.join('\\n');
      }

      genUuidBtn.addEventListener('click', generateUuids);
      [uuidCase, uuidHyphen].forEach(el => el.addEventListener('change', generateUuids));
      generateUuids();

      copyUuidBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(uuidOutput.value).then(() => {
          copyUuidBtn.textContent = 'Copied!';
          setTimeout(() => { copyUuidBtn.textContent = 'Copy All'; }, 2000);
        });
      });
    `
  },
  {
    id: 'css-box-shadow-generator',
    slug: 'css-box-shadow-generator',
    category: 'generator',
    name: 'CSS Box Shadow Generator',
    shortDesc: 'Design modern soft drop shadows with live preview and clean CSS snippet export.',
    seoTitle: 'CSS Box Shadow Generator Online - Visual Shadow Tool | DesiDesk',
    seoDesc: 'Create modern CSS box shadows with interactive blur, spread, X, Y, and color sliders. Copy ready CSS code on DesiDesk.',
    keywords: 'css box shadow generator, box shadow tool, css shadow preview, drop shadow generator',
    howToSteps: [
      'Adjust horizontal (X) and vertical (Y) offset sliders.',
      'Tune blur radius and spread radius.',
      'Pick shadow color and opacity.',
      'Copy the ready-to-use CSS code.'
    ],
    features: [
      'Interactive visual preview box.',
      'Inset and outset shadow modes.',
      'Custom color and alpha opacity control.',
      'One-click CSS code copy.'
    ],
    faqs: [
      {
        q: 'What is the difference between blur and spread?',
        a: 'Blur softens the edge of the shadow, while spread expands or contracts the physical boundary of the shadow.'
      }
    ],
    related: ['css-gradient-generator', 'color-contrast-checker'],
    toolHtml: `
      <div class="form-grid-2">
        <div>
          <div class="form-group">
            <label class="form-label">Horizontal Offset (X): <span id="valX">0px</span></label>
            <input type="range" id="shX" class="form-range" min="-50" max="50" value="0" />
          </div>
          <div class="form-group">
            <label class="form-label">Vertical Offset (Y): <span id="valY">10px</span></label>
            <input type="range" id="shY" class="form-range" min="-50" max="50" value="10" />
          </div>
          <div class="form-group">
            <label class="form-label">Blur Radius: <span id="valBlur">20px</span></label>
            <input type="range" id="shBlur" class="form-range" min="0" max="100" value="20" />
          </div>
          <div class="form-group">
            <label class="form-label">Spread Radius: <span id="valSpread">0px</span></label>
            <input type="range" id="shSpread" class="form-range" min="-30" max="30" value="0" />
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Shadow Color:</label>
              <input type="color" id="shColor" class="form-input" value="#000000" style="height:42px;padding:2px;" />
            </div>
            <div class="form-group">
              <label class="form-label">Opacity: <span id="valOp">15%</span></label>
              <input type="range" id="shOpacity" class="form-range" min="0" max="100" value="15" />
            </div>
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:center;background:#f8fafc;border:1px solid var(--border-light);border-radius:var(--radius-lg);padding:3rem;">
          <div id="previewBox" style="width:160px;height:160px;background:#ffffff;border-radius:16px;"></div>
        </div>
      </div>

      <div class="form-group" style="margin-top:2rem;">
        <label class="form-label">Generated CSS Code:</label>
        <input type="text" id="cssOutput" class="form-input" readonly style="font-family:var(--font-mono);font-weight:700;background:var(--bg-subtle);" />
      </div>

      <div class="btn-group">
        <button id="copyCssBtn" class="btn btn-primary">Copy CSS Code</button>
      </div>
    `,
    toolScript: `
      const shX = document.getElementById('shX');
      const shY = document.getElementById('shY');
      const shBlur = document.getElementById('shBlur');
      const shSpread = document.getElementById('shSpread');
      const shColor = document.getElementById('shColor');
      const shOpacity = document.getElementById('shOpacity');
      const previewBox = document.getElementById('previewBox');
      const cssOutput = document.getElementById('cssOutput');
      const copyCssBtn = document.getElementById('copyCssBtn');

      function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return \`rgba(\${r}, \${g}, \${b}, \${alpha})\`;
      }

      function updateShadow() {
        const x = shX.value;
        const y = shY.value;
        const blur = shBlur.value;
        const spread = shSpread.value;
        const alpha = (parseInt(shOpacity.value, 10) / 100).toFixed(2);
        const rgba = hexToRgba(shColor.value, alpha);

        document.getElementById('valX').textContent = x + 'px';
        document.getElementById('valY').textContent = y + 'px';
        document.getElementById('valBlur').textContent = blur + 'px';
        document.getElementById('valSpread').textContent = spread + 'px';
        document.getElementById('valOp').textContent = shOpacity.value + '%';

        const shadowVal = \`\${x}px \${y}px \${blur}px \${spread}px \${rgba}\`;
        previewBox.style.boxShadow = shadowVal;
        cssOutput.value = \`box-shadow: \${shadowVal};\`;
      }

      [shX, shY, shBlur, shSpread, shColor, shOpacity].forEach(el => el.addEventListener('input', updateShadow));
      updateShadow();

      copyCssBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(cssOutput.value).then(() => {
          copyCssBtn.textContent = 'Copied!';
          setTimeout(() => { copyCssBtn.textContent = 'Copy CSS Code'; }, 2000);
        });
      });
    `
  },
  {
    id: 'css-gradient-generator',
    slug: 'css-gradient-generator',
    category: 'generator',
    name: 'CSS Gradient Generator',
    shortDesc: 'Create gorgeous linear and radial CSS gradients with multi-color stops and CSS code export.',
    seoTitle: 'CSS Gradient Generator Online - Linear & Radial Gradients | DesiDesk',
    seoDesc: 'Design custom CSS gradients online with live preview. Supports linear and radial gradients with customizable angle and color stops on DesiDesk.',
    keywords: 'css gradient generator, linear gradient, radial gradient, background gradient tool, css gradient copy',
    howToSteps: [
      'Choose gradient type (Linear or Radial).',
      'Select starting and ending colors.',
      'Adjust the gradient direction angle.',
      'Copy the ready CSS background property.'
    ],
    features: [
      'Linear and Radial gradient styles.',
      'Adjustable angle from 0° to 360°.',
      'Live gradient canvas preview.',
      'One-click CSS code copy.'
    ],
    faqs: [
      {
        q: 'Is the generated CSS compatible with all modern browsers?',
        a: 'Yes, standard CSS3 linear-gradient and radial-gradient properties are supported by 100% of modern browsers.'
      }
    ],
    related: ['css-box-shadow-generator', 'color-code-converter'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Gradient Type:</label>
          <select id="gradType" class="form-select">
            <option value="linear" selected>Linear Gradient</option>
            <option value="radial">Radial Gradient</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Color 1:</label>
          <input type="color" id="gradCol1" class="form-input" value="#2563eb" style="height:42px;padding:2px;" />
        </div>
        <div class="form-group">
          <label class="form-label">Color 2:</label>
          <input type="color" id="gradCol2" class="form-input" value="#9333ea" style="height:42px;padding:2px;" />
        </div>
      </div>

      <div class="form-group" id="angleGroup">
        <label class="form-label">Angle: <span id="valAngle">135°</span></label>
        <input type="range" id="gradAngle" class="form-range" min="0" max="360" value="135" />
      </div>

      <div id="gradPreview" style="height:180px;border-radius:var(--radius-lg);margin:1.5rem 0;box-shadow:var(--shadow-md);"></div>

      <div class="form-group">
        <label class="form-label">Generated CSS Code:</label>
        <input type="text" id="cssOutput" class="form-input" readonly style="font-family:var(--font-mono);font-weight:700;background:var(--bg-subtle);" />
      </div>

      <div class="btn-group">
        <button id="copyCssBtn" class="btn btn-primary">Copy CSS Code</button>
      </div>
    `,
    toolScript: `
      const gradType = document.getElementById('gradType');
      const gradCol1 = document.getElementById('gradCol1');
      const gradCol2 = document.getElementById('gradCol2');
      const gradAngle = document.getElementById('gradAngle');
      const valAngle = document.getElementById('valAngle');
      const angleGroup = document.getElementById('angleGroup');
      const gradPreview = document.getElementById('gradPreview');
      const cssOutput = document.getElementById('cssOutput');
      const copyCssBtn = document.getElementById('copyCssBtn');

      function updateGradient() {
        const type = gradType.value;
        const c1 = gradCol1.value;
        const c2 = gradCol2.value;
        const angle = gradAngle.value;

        valAngle.textContent = angle + '°';
        let rule = '';

        if (type === 'linear') {
          angleGroup.style.display = 'block';
          rule = \`linear-gradient(\${angle}deg, \${c1}, \${c2})\`;
        } else {
          angleGroup.style.display = 'none';
          rule = \`radial-gradient(circle, \${c1}, \${c2})\`;
        }

        gradPreview.style.background = rule;
        cssOutput.value = \`background: \${rule};\`;
      }

      [gradType, gradCol1, gradCol2, gradAngle].forEach(el => el.addEventListener('input', updateGradient));
      updateGradient();

      copyCssBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(cssOutput.value).then(() => {
          copyCssBtn.textContent = 'Copied!';
          setTimeout(() => { copyCssBtn.textContent = 'Copy CSS Code'; }, 2000);
        });
      });
    `
  }
];
