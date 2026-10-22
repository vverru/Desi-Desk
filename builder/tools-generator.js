// builder/tools-generator.js
const fs = require('fs');
const path = require('path');
const qrcodeVendor = fs.readFileSync(path.join(__dirname, '../assets/vendor/qrcode.min.js'), 'utf8');

module.exports = [
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    category: 'generator',
    name: 'QR Code Generator (UPI, WiFi & URLs)',
    shortDesc: 'Generate high-resolution custom QR codes for Website URLs, UPI Payments (GPay/PhonePe/Paytm), WiFi networks, and WhatsApp.',
    seoTitle: 'QR Code Generator Online - Free UPI, WiFi & URL QR Codes | DesiDesk',
    seoDesc: 'Create free high-resolution QR codes for websites, UPI payments, plain text, and WiFi passwords. 100% private and client-side on DesiDesk.',
    keywords: 'qr code generator, upi qr code generator, wifi qr code, create qr code online, free qr code png, whatsapp qr code',
    libs: [],
    howToSteps: [
      'Select QR Code type: Website URL, UPI Payment, WiFi Network, WhatsApp, or Plain Text.',
      'Fill in the details (e.g. UPI ID and Name, or WiFi SSID and Password).',
      'Customize colors, error correction, and output resolution.',
      'Instantly download high-resolution PNG or copy the QR code.'
    ],
    features: [
      'Dedicated support for Indian UPI Payments (PhonePe, Google Pay, Paytm, BHIM).',
      'One-tap WiFi QR Code: Guests scan to connect automatically.',
      'WhatsApp Direct Chat QR Code with pre-filled message.',
      'Custom color pickers and 6 designer palette presets.',
      'Up to 1024×1024 Ultra-HD resolution for crisp poster printing.',
      '100% Client-Side: Works completely offline, zero external tracking.'
    ],
    faqs: [
      {
        q: 'Do these QR codes expire?',
        a: 'No! These are standard static QR codes. They never expire and encode the data directly without any third-party redirects or subscriptions.'
      },
      {
        q: 'How does the UPI QR code work?',
        a: 'It encodes the standard NPCI UPI specification (upi://pay?...). When scanned with Google Pay, PhonePe, Paytm, or BHIM, it automatically opens the payment screen with your UPI ID and payee name.'
      },
      {
        q: 'How does the WiFi QR code work?',
        a: 'Modern iOS and Android cameras read the WiFi credentials and show a "Join Network" prompt. Users can connect to your WiFi without typing complex passwords.'
      }
    ],
    related: ['barcode-generator', 'password-generator', 'uuid-generator'],
    toolHtml: `
      <!-- Type Switcher Pills -->
      <div class="qr-type-pills" id="qrTypePills">
        <button type="button" class="qr-type-pill active" data-type="url">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          Website URL
        </button>
        <button type="button" class="qr-type-pill" data-type="upi">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          UPI Payment (GPay / PhonePe)
        </button>
        <button type="button" class="qr-type-pill" data-type="wifi">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
          WiFi Network
        </button>
        <button type="button" class="qr-type-pill" data-type="wa">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          WhatsApp Chat
        </button>
        <button type="button" class="qr-type-pill" data-type="text">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Plain Text
        </button>
      </div>

      <!-- Type Input Panels -->
      <div id="panelUrl" class="qr-panel">
        <div class="form-group">
          <label class="form-label">Website URL:</label>
          <input type="url" id="qrInputUrl" class="form-input" value="https://desidesk.in/" placeholder="https://example.com" />
        </div>
      </div>

      <div id="panelUpi" class="qr-panel" style="display:none;">
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">UPI ID / VPA (Required):</label>
            <input type="text" id="upiId" class="form-input" placeholder="e.g. mohan@okhdfcbank or 9876543210@paytm" />
          </div>
          <div class="form-group">
            <label class="form-label">Payee Name:</label>
            <input type="text" id="upiName" class="form-input" placeholder="e.g. Mohan Store" />
          </div>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Amount in ₹ (Optional):</label>
            <input type="number" id="upiAmount" class="form-input" placeholder="e.g. 500 (Leave blank for open amount)" min="0" step="1" />
          </div>
          <div class="form-group">
            <label class="form-label">Transaction Note (Optional):</label>
            <input type="text" id="upiNote" class="form-input" placeholder="e.g. Payment for Services" />
          </div>
        </div>
      </div>

      <div id="panelWifi" class="qr-panel" style="display:none;">
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Network Name (SSID):</label>
            <input type="text" id="wifiSsid" class="form-input" placeholder="e.g. Home_WiFi_5G" />
          </div>
          <div class="form-group">
            <label class="form-label">WiFi Password:</label>
            <input type="text" id="wifiPass" class="form-input" placeholder="WiFi Password" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Security Protocol:</label>
          <select id="wifiType" class="form-select">
            <option value="WPA" selected>WPA / WPA2 / WPA3 (Standard)</option>
            <option value="WEP">WEP (Legacy)</option>
            <option value="nopass">Open Network (No Password)</option>
          </select>
        </div>
      </div>

      <div id="panelWa" class="qr-panel" style="display:none;">
        <div class="form-group">
          <label class="form-label">WhatsApp Mobile Number (with Country Code):</label>
          <input type="text" id="waPhone" class="form-input" placeholder="e.g. 919876543210 (without + or spaces)" />
          <span class="form-hint">Format: 91 followed by 10-digit number for India.</span>
        </div>
        <div class="form-group">
          <label class="form-label">Pre-filled Message (Optional):</label>
          <textarea id="waMsg" class="form-textarea" placeholder="Hello! I am contacting you from your QR code..."></textarea>
        </div>
      </div>

      <div id="panelText" class="qr-panel" style="display:none;">
        <div class="form-group">
          <label class="form-label">Text Content:</label>
          <textarea id="qrInputText" class="form-textarea" placeholder="Type or paste any text or note here..."></textarea>
        </div>
      </div>

      <!-- Styling & Customization -->
      <div style="background:var(--bg-subtle);border:1px solid var(--border-light);border-radius:var(--radius-lg);padding:1.35rem;margin:1.75rem 0;">
        <div style="font-size:0.95rem;font-weight:700;color:var(--secondary);margin-bottom:1rem;">🎨 Design & Customization</div>
        <div class="form-grid-3">
          <div class="form-group" style="margin-bottom:0.5rem;">
            <label class="form-label">Foreground Color:</label>
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <input type="color" id="qrDark" value="#0f172a" style="width:48px;height:40px;padding:2px;border-radius:var(--radius-sm);border:1px solid var(--border-light);cursor:pointer;" />
              <span id="darkHex" style="font-family:var(--font-mono);font-size:0.85rem;color:var(--text-muted);">#0f172a</span>
            </div>
            <div class="qr-swatches">
              <div class="qr-swatch" style="background:#0f172a;" data-color="#0f172a" title="Dark Slate"></div>
              <div class="qr-swatch" style="background:#4338ca;" data-color="#4338ca" title="Royal Indigo"></div>
              <div class="qr-swatch" style="background:#047857;" data-color="#047857" title="Emerald"></div>
              <div class="qr-swatch" style="background:#be123c;" data-color="#be123c" title="Crimson"></div>
              <div class="qr-swatch" style="background:#6d28d9;" data-color="#6d28d9" title="Purple"></div>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:0.5rem;">
            <label class="form-label">Background Color:</label>
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <input type="color" id="qrLight" value="#ffffff" style="width:48px;height:40px;padding:2px;border-radius:var(--radius-sm);border:1px solid var(--border-light);cursor:pointer;" />
              <span id="lightHex" style="font-family:var(--font-mono);font-size:0.85rem;color:var(--text-muted);">#ffffff</span>
            </div>
            <div class="qr-swatches">
              <div class="qr-swatch" style="background:#ffffff;" data-bg="#ffffff" title="Pure White"></div>
              <div class="qr-swatch" style="background:#f8fafc;" data-bg="#f8fafc" title="Light Slate"></div>
              <div class="qr-swatch" style="background:#fefce8;" data-bg="#fefce8" title="Soft Cream"></div>
              <div class="qr-swatch" style="background:#ecfdf5;" data-bg="#ecfdf5" title="Mint"></div>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:0.5rem;">
            <label class="form-label">QR Size (Resolution):</label>
            <select id="qrSize" class="form-select">
              <option value="256">256 × 256 px (Standard)</option>
              <option value="384" selected>384 × 384 px (High Quality)</option>
              <option value="512">512 × 512 px (HD)</option>
              <option value="1024">1024 × 1024 px (Ultra-HD Print)</option>
            </select>
            <div style="margin-top:0.65rem;">
              <label class="form-label" style="font-size:0.8rem;margin-bottom:0.25rem;">Error Correction Level:</label>
              <select id="qrEc" class="form-select" style="padding:0.4rem 0.65rem;font-size:0.85rem;">
                <option value="M" selected>Medium (15%) - Recommended</option>
                <option value="L">Low (7%) - Highest Density</option>
                <option value="Q">Quartile (25%) - Better Durability</option>
                <option value="H">High (30%) - Best for Scanning</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Preview Box -->
      <div style="text-align:center;margin:2rem 0;">
        <div style="display:inline-block;padding:1.5rem;background:var(--bg-card);border:2px solid var(--border-light);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);">
          <canvas id="qrCanvas" style="max-width:100%;height:auto;display:block;border-radius:var(--radius-sm);"></canvas>
          <div id="qrDataInfo" style="margin-top:0.75rem;font-size:0.8rem;color:var(--text-muted);font-family:var(--font-mono);"></div>
        </div>
      </div>

      <div class="btn-group" style="justify-content:center;">
        <a id="downloadQrBtn" class="btn btn-success" download="qrcode-desidesk.png">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download QR Code (PNG)
        </a>
        <button id="copyQrBtn" class="btn btn-primary" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy Image
        </button>
        <button id="printQrBtn" class="btn btn-outline" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print QR
        </button>
      </div>
    `,
    toolScript: `
      // Inlined Pure Client-Side QR Engine
      ${qrcodeVendor}

      (function() {
        let activeType = 'url';
        const typePills = document.querySelectorAll('#qrTypePills .qr-type-pill');
        const panels = {
          url: document.getElementById('panelUrl'),
          upi: document.getElementById('panelUpi'),
          wifi: document.getElementById('panelWifi'),
          wa: document.getElementById('panelWa'),
          text: document.getElementById('panelText')
        };

        const qrCanvas = document.getElementById('qrCanvas');
        const qrDark = document.getElementById('qrDark');
        const qrLight = document.getElementById('qrLight');
        const darkHex = document.getElementById('darkHex');
        const lightHex = document.getElementById('lightHex');
        const qrSize = document.getElementById('qrSize');
        const qrEc = document.getElementById('qrEc');
        const qrDataInfo = document.getElementById('qrDataInfo');
        const downloadQrBtn = document.getElementById('downloadQrBtn');
        const copyQrBtn = document.getElementById('copyQrBtn');
        const printQrBtn = document.getElementById('printQrBtn');

        typePills.forEach(pill => {
          pill.addEventListener('click', () => {
            typePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeType = pill.getAttribute('data-type');
            Object.keys(panels).forEach(k => {
              if (panels[k]) panels[k].style.display = (k === activeType) ? 'block' : 'none';
            });
            makeQr();
          });
        });

        // Swatches
        document.querySelectorAll('.qr-swatch[data-color]').forEach(sw => {
          sw.addEventListener('click', () => {
            qrDark.value = sw.getAttribute('data-color');
            darkHex.textContent = qrDark.value;
            makeQr();
          });
        });
        document.querySelectorAll('.qr-swatch[data-bg]').forEach(sw => {
          sw.addEventListener('click', () => {
            qrLight.value = sw.getAttribute('data-bg');
            lightHex.textContent = qrLight.value;
            makeQr();
          });
        });

        qrDark.addEventListener('input', () => {
          darkHex.textContent = qrDark.value;
          makeQr();
        });
        qrLight.addEventListener('input', () => {
          lightHex.textContent = qrLight.value;
          makeQr();
        });

        function getPayload() {
          if (activeType === 'url') {
            const val = document.getElementById('qrInputUrl').value.trim();
            return val || 'https://desidesk.in/';
          } else if (activeType === 'upi') {
            const vpa = document.getElementById('upiId').value.trim() || 'demo@upi';
            const name = document.getElementById('upiName').value.trim() || 'Payee';
            const amt = document.getElementById('upiAmount').value.trim();
            const note = document.getElementById('upiNote').value.trim();
            let upi = 'upi://pay?pa=' + encodeURIComponent(vpa) + '&pn=' + encodeURIComponent(name) + '&cu=INR';
            if (amt) upi += '&am=' + encodeURIComponent(amt);
            if (note) upi += '&tn=' + encodeURIComponent(note);
            return upi;
          } else if (activeType === 'wifi') {
            const ssid = document.getElementById('wifiSsid').value.trim() || 'DesiDesk_WiFi';
            const pass = document.getElementById('wifiPass').value;
            const type = document.getElementById('wifiType').value;
            return 'WIFI:S:' + ssid + ';T:' + type + ';P:' + pass + ';;';
          } else if (activeType === 'wa') {
            let phone = document.getElementById('waPhone').value.trim().replace(/[^0-9]/g, '');
            if (!phone) phone = '919876543210';
            const msg = document.getElementById('waMsg').value.trim();
            return 'https://wa.me/' + phone + (msg ? '?text=' + encodeURIComponent(msg) : '');
          } else if (activeType === 'text') {
            return document.getElementById('qrInputText').value.trim() || 'Welcome to DesiDesk!';
          }
          return 'https://desidesk.in/';
        }

        function makeQr() {
          const payload = getPayload();
          const size = parseInt(qrSize.value, 10) || 384;
          const dark = qrDark.value || '#0f172a';
          const light = qrLight.value || '#ffffff';
          const ecLevel = qrEc ? qrEc.value : 'M';

          if (typeof QRCode !== 'undefined' && QRCode.toCanvas) {
            QRCode.toCanvas(qrCanvas, payload, {
              width: size,
              margin: 2,
              errorCorrectionLevel: ecLevel,
              color: { dark, light }
            }, function(error) {
              if (!error) {
                const dataUrl = qrCanvas.toDataURL('image/png');
                downloadQrBtn.href = dataUrl;
                downloadQrBtn.download = 'qrcode-' + activeType + '-desidesk.png';
                if (qrDataInfo) {
                  qrDataInfo.textContent = 'Data size: ' + payload.length + ' chars • ' + size + '×' + size + ' px';
                }
              } else {
                console.error(error);
              }
            });
          }
        }

        // Live inputs
        ['qrInputUrl', 'upiId', 'upiName', 'upiAmount', 'upiNote', 'wifiSsid', 'wifiPass', 'wifiType', 'waPhone', 'waMsg', 'qrInputText', 'qrSize', 'qrEc'].forEach(id => {
          const el = document.getElementById(id);
          if (el) {
            el.addEventListener('input', makeQr);
            el.addEventListener('change', makeQr);
          }
        });

        // Copy QR Code to clipboard
        if (copyQrBtn) {
          copyQrBtn.addEventListener('click', async () => {
            try {
              qrCanvas.toBlob(async (blob) => {
                if (!blob) return;
                if (navigator.clipboard && window.ClipboardItem) {
                  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                  const origText = copyQrBtn.innerHTML;
                  copyQrBtn.innerHTML = '✓ Copied!';
                  copyQrBtn.classList.remove('btn-primary');
                  copyQrBtn.classList.add('btn-success');
                  setTimeout(() => {
                    copyQrBtn.innerHTML = origText;
                    copyQrBtn.classList.add('btn-primary');
                    copyQrBtn.classList.remove('btn-success');
                  }, 2000);
                } else {
                  alert('Clipboard image copy is not supported in this browser. Please use the Download button.');
                }
              });
            } catch (err) {
              alert('Could not copy image: ' + err.message);
            }
          });
        }

        // Print QR Code
        if (printQrBtn) {
          printQrBtn.addEventListener('click', () => {
            const dataUrl = qrCanvas.toDataURL('image/png');
            const win = window.open('', '_blank');
            win.document.write('<html><head><title>Print QR Code - DesiDesk</title><style>body{display:flex;flex-direction:column;align-items:center;justify-content:center;height:90vh;font-family:sans-serif;}img{max-width:350px;}p{margin-top:1rem;color:#666;font-size:0.9rem;}</style></head><body><img src="' + dataUrl + '" /><p>Scan with Camera or QR Scanner</p><script>window.onload = function(){ window.print(); }<\\/script></body></html>');
            win.document.close();
          });
        }

        setTimeout(makeQr, 50);
      })();
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
