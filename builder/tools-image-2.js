// builder/tools-image-2.js

module.exports = [
  {
    id: 'webp-to-jpg',
    slug: 'webp-to-jpg',
    category: 'image',
    name: 'WebP to JPG Converter',
    shortDesc: 'Convert modern WebP images to widely compatible JPG format in high quality.',
    seoTitle: 'WebP to JPG Converter Online - Fast & Free | DesiDesk',
    seoDesc: 'Convert WebP photos to JPG format online in seconds. Set output quality and download immediately on DesiDesk.',
    keywords: 'webp to jpg, convert webp to jpeg, webp converter online, save webp as jpg',
    howToSteps: [
      'Upload your WebP image.',
      'Adjust JPG quality slider (default 90%).',
      'Download your converted JPG image.'
    ],
    features: [
      'Fast client-side conversion via Canvas.',
      'Configurable quality slider.',
      'Zero server upload: 100% private.',
      'Works on all modern browsers.'
    ],
    faqs: [
      {
        q: 'Why convert WebP to JPG?',
        a: 'While WebP is great for web speed, some older software, graphic editors, and printers only support standard JPG files.'
      }
    ],
    related: ['image-to-webp', 'png-to-jpg', 'image-compressor'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><polyline points="21 15 16 10 5 21"/></svg>
        <div class="dropzone-title">Upload WebP to Convert to JPG</div>
        <div class="dropzone-subtitle">Click or drop your WebP image here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/webp" />
      </div>

      <div id="convWorkspace" style="display:none;margin-top:2rem;">
        <div class="form-group" style="max-width:400px;margin:0 auto 1.5rem;">
          <label class="form-label">JPG Quality: <span id="qVal">90%</span></label>
          <input type="range" id="jpgQuality" class="form-range" min="30" max="100" value="90" />
        </div>

        <div class="canvas-wrapper">
          <canvas id="convCanvas" style="max-height:360px;"></canvas>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <a id="downloadBtn" class="btn btn-success" download="converted-desidesk.jpg">Download JPG</a>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>
    `,
    toolScript: `
      let rawImg = null;
      const fileInput = document.getElementById('fileInput');
      const convWorkspace = document.getElementById('convWorkspace');
      const jpgQuality = document.getElementById('jpgQuality');
      const qVal = document.getElementById('qVal');
      const convCanvas = document.getElementById('convCanvas');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetBtn = document.getElementById('resetBtn');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          rawImg = new Image();
          rawImg.onload = () => {
            convWorkspace.style.display = 'block';
            convert();
          };
          rawImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      jpgQuality.addEventListener('input', () => {
        qVal.textContent = jpgQuality.value + '%';
        convert();
      });

      function convert() {
        if (!rawImg) return;
        convCanvas.width = rawImg.width;
        convCanvas.height = rawImg.height;
        const ctx = convCanvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, convCanvas.width, convCanvas.height);
        ctx.drawImage(rawImg, 0, 0);

        const q = parseInt(jpgQuality.value, 10) / 100;
        downloadBtn.href = convCanvas.toDataURL('image/jpeg', q);
      }

      resetBtn.addEventListener('click', () => {
        rawImg = null;
        fileInput.value = '';
        convWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'base64-to-image',
    slug: 'base64-to-image',
    category: 'image',
    name: 'Base64 to Image Decoder',
    shortDesc: 'Decode Base64 Data URI strings into previewable and downloadable image files.',
    seoTitle: 'Base64 to Image Online - Decode Base64 to JPG/PNG | DesiDesk',
    seoDesc: 'Convert Base64 strings into previewable and downloadable PNG or JPG images. Free online Base64 image viewer on DesiDesk.',
    keywords: 'base64 to image, decode base64 image, base64 to png, data uri to image',
    howToSteps: [
      'Paste your Base64 string or Data URI.',
      'Click "Decode to Image" to render the photo.',
      'Download the image as PNG.'
    ],
    features: [
      'Supports Data URIs and raw Base64 strings.',
      'Automatic MIME type detection.',
      'Download as high-quality PNG.',
      '100% private in-browser tool.'
    ],
    faqs: [
      {
        q: 'Does it work with raw Base64 without the data:image prefix?',
        a: 'Yes, our tool automatically prefixes "data:image/png;base64," if omitted.'
      }
    ],
    related: ['image-to-base64', 'image-compressor'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Paste Base64 String or Data URI:</label>
        <textarea id="base64Input" class="form-textarea" style="min-height:160px;font-family:var(--font-mono);font-size:0.85rem;" placeholder="data:image/png;base64,iVBORw0KGgo..."></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="decodeBtn" class="btn btn-primary">Decode to Image</button>
        <button id="clearBtn" class="btn btn-outline">Clear</button>
      </div>

      <div id="resultContainer" class="canvas-wrapper" style="display:none;">
        <img id="decodedImg" style="max-height:360px;" alt="Decoded Base64" />
        <div style="margin-top:1.25rem;">
          <a id="downloadBtn" class="btn btn-success" download="decoded-desidesk.png">Download Image</a>
        </div>
      </div>
    `,
    toolScript: `
      const base64Input = document.getElementById('base64Input');
      const decodeBtn = document.getElementById('decodeBtn');
      const clearBtn = document.getElementById('clearBtn');
      const resultContainer = document.getElementById('resultContainer');
      const decodedImg = document.getElementById('decodedImg');
      const downloadBtn = document.getElementById('downloadBtn');

      decodeBtn.addEventListener('click', () => {
        let val = base64Input.value.trim();
        if (!val) return;
        if (!val.startsWith('data:image/')) {
          val = 'data:image/png;base64,' + val;
        }

        decodedImg.onload = () => {
          resultContainer.style.display = 'block';
          downloadBtn.href = val;
        };
        decodedImg.onerror = () => {
          alert('Invalid Base64 image data.');
        };
        decodedImg.src = val;
      });

      clearBtn.addEventListener('click', () => {
        base64Input.value = '';
        resultContainer.style.display = 'none';
      });
    `
  },
  {
    id: 'image-watermark',
    slug: 'image-watermark',
    category: 'image',
    name: 'Add Watermark to Image',
    shortDesc: 'Stamp customized copyright or brand text watermarks onto any photograph.',
    seoTitle: 'Watermark Image Online - Add Text Watermark Free | DesiDesk',
    seoDesc: 'Add copyright text watermarks to your photos. Customize font size, color, opacity, and position directly in your browser on DesiDesk.',
    keywords: 'watermark image, add watermark to photo, stamp photo, protect photo online',
    howToSteps: [
      'Upload the photo you want to protect.',
      'Enter your watermark text (e.g. "© 2026 Your Name").',
      'Select position (Bottom Right, Center, Diagonal) and opacity.',
      'Download your watermarked image.'
    ],
    features: [
      'Custom text with opacity and font size control.',
      'Preset positions (Center, Corners, Diagonal).',
      'High-resolution output preserving photo quality.',
      '100% private in-browser watermarking.'
    ],
    faqs: [
      {
        q: 'Will watermarking overwrite my original file?',
        a: 'No, you download a newly created copy with the watermark embedded.'
      }
    ],
    related: ['image-resizer', 'image-compressor', 'watermark-pdf'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        <div class="dropzone-title">Upload Photo to Watermark</div>
        <div class="dropzone-subtitle">Click or drop your photo here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/*" />
      </div>

      <div id="wmWorkspace" style="display:none;margin-top:2rem;">
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Watermark Text:</label>
            <input type="text" id="wmText" class="form-input" value="© DesiDesk.in" />
          </div>
          <div class="form-group">
            <label class="form-label">Position:</label>
            <select id="wmPos" class="form-select">
              <option value="bottom-right" selected>Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="center">Center</option>
              <option value="diagonal">Diagonal Across Center</option>
            </select>
          </div>
        </div>

        <div class="form-grid-3">
          <div class="form-group">
            <label class="form-label">Font Size (px):</label>
            <input type="number" id="wmSize" class="form-input" value="32" min="12" max="120" />
          </div>
          <div class="form-group">
            <label class="form-label">Opacity: <span id="opVal">50%</span></label>
            <input type="range" id="wmOp" class="form-range" min="10" max="100" value="50" />
          </div>
          <div class="form-group">
            <label class="form-label">Color:</label>
            <input type="color" id="wmColor" class="form-input" value="#ffffff" style="height:42px;padding:2px;" />
          </div>
        </div>

        <div class="canvas-wrapper">
          <canvas id="wmCanvas" style="max-height:360px;"></canvas>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <a id="downloadBtn" class="btn btn-success" download="watermarked-desidesk.png">Download Watermarked Photo</a>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>
    `,
    toolScript: `
      let rawImg = null;
      const fileInput = document.getElementById('fileInput');
      const wmWorkspace = document.getElementById('wmWorkspace');
      const wmText = document.getElementById('wmText');
      const wmPos = document.getElementById('wmPos');
      const wmSize = document.getElementById('wmSize');
      const wmOp = document.getElementById('wmOp');
      const opVal = document.getElementById('opVal');
      const wmColor = document.getElementById('wmColor');
      const wmCanvas = document.getElementById('wmCanvas');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetBtn = document.getElementById('resetBtn');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          rawImg = new Image();
          rawImg.onload = () => {
            wmWorkspace.style.display = 'block';
            drawWm();
          };
          rawImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      [wmText, wmPos, wmSize, wmOp, wmColor].forEach(el => {
        el.addEventListener('input', () => {
          opVal.textContent = wmOp.value + '%';
          drawWm();
        });
      });

      function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return \`rgba(\${r}, \${g}, \${b}, \${alpha})\`;
      }

      function drawWm() {
        if (!rawImg) return;
        wmCanvas.width = rawImg.width;
        wmCanvas.height = rawImg.height;
        const ctx = wmCanvas.getContext('2d');
        ctx.drawImage(rawImg, 0, 0);

        const text = wmText.value.trim() || 'DesiDesk.in';
        const size = parseInt(wmSize.value, 10);
        const alpha = parseInt(wmOp.value, 10) / 100;
        const pos = wmPos.value;

        ctx.font = 'bold ' + size + 'px sans-serif';
        ctx.fillStyle = hexToRgba(wmColor.value, alpha);
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;

        if (pos === 'diagonal') {
          ctx.save();
          ctx.translate(wmCanvas.width / 2, wmCanvas.height / 2);
          ctx.rotate(-Math.PI / 4);
          ctx.textAlign = 'center';
          ctx.fillText(text, 0, 0);
          ctx.restore();
        } else if (pos === 'center') {
          ctx.textAlign = 'center';
          ctx.fillText(text, wmCanvas.width / 2, wmCanvas.height / 2);
        } else if (pos === 'bottom-left') {
          ctx.textAlign = 'left';
          ctx.fillText(text, 30, wmCanvas.height - 30);
        } else {
          ctx.textAlign = 'right';
          ctx.fillText(text, wmCanvas.width - 30, wmCanvas.height - 30);
        }

        downloadBtn.href = wmCanvas.toDataURL('image/png');
      }

      resetBtn.addEventListener('click', () => {
        rawImg = null;
        fileInput.value = '';
        wmWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'image-color-picker',
    slug: 'image-color-picker',
    category: 'image',
    name: 'Image Color Picker (Eyedropper)',
    shortDesc: 'Click anywhere on an uploaded image to sample exact pixel colors in HEX, RGB, and HSL.',
    seoTitle: 'Image Color Picker Online - Eyedropper & Pixel Inspector | DesiDesk',
    seoDesc: 'Pick colors from images online. Click any pixel on your photo to get exact HEX, RGB, and HSL values with one-click copy on DesiDesk.',
    keywords: 'image color picker, eyedropper tool online, pick color from photo, hex color from image',
    howToSteps: [
      'Upload your image.',
      'Hover and click any pixel to sample its color.',
      'Click the copy button to copy the HEX, RGB, or HSL code.'
    ],
    features: [
      'Zoomed pixel magnifier preview on hover.',
      'Exact HEX, RGB, and HSL color values.',
      'One-click copy to clipboard.',
      '100% private in-browser tool.'
    ],
    faqs: [
      {
        q: 'Does it work with zoomed-in pixels?',
        a: 'Yes, clicking on any pixel directly queries the raw canvas ImageData array.'
      }
    ],
    related: ['color-palette-extractor', 'color-code-converter'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
        <div class="dropzone-title">Upload Image to Pick Colors</div>
        <div class="dropzone-subtitle">Click or drop your photo here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/*" />
      </div>

      <div id="pickerWorkspace" style="display:none;margin-top:2rem;">
        <div style="display:flex;align-items:center;gap:1.5rem;background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;margin-bottom:1.5rem;">
          <div id="colorSwatch" style="width:64px;height:64px;border-radius:var(--radius-md);border:2px solid var(--border-light);background:#2563eb;"></div>
          <div style="flex:1;display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
            <div>
              <div style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">HEX</div>
              <div id="hexVal" style="font-weight:800;font-size:1.1rem;cursor:pointer;" onclick="copyVal('hexVal')">#2563EB</div>
            </div>
            <div>
              <div style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">RGB</div>
              <div id="rgbVal" style="font-weight:800;font-size:1.1rem;cursor:pointer;" onclick="copyVal('rgbVal')">rgb(37, 99, 235)</div>
            </div>
            <div>
              <div style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">ACTION</div>
              <button class="btn btn-sm btn-primary" onclick="copyVal('hexVal')">Copy HEX</button>
            </div>
          </div>
        </div>

        <div class="canvas-wrapper">
          <canvas id="pickerCanvas" style="cursor:crosshair;max-height:450px;"></canvas>
        </div>
      </div>
    `,
    toolScript: `
      let rawImg = null;
      const fileInput = document.getElementById('fileInput');
      const pickerWorkspace = document.getElementById('pickerWorkspace');
      const colorSwatch = document.getElementById('colorSwatch');
      const hexVal = document.getElementById('hexVal');
      const rgbVal = document.getElementById('rgbVal');
      const pickerCanvas = document.getElementById('pickerCanvas');
      const ctx = pickerCanvas.getContext('2d');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          rawImg = new Image();
          rawImg.onload = () => {
            pickerCanvas.width = rawImg.width;
            pickerCanvas.height = rawImg.height;
            ctx.drawImage(rawImg, 0, 0);
            pickerWorkspace.style.display = 'block';
          };
          rawImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      function sampleColor(e) {
        if (!rawImg) return;
        const rect = pickerCanvas.getBoundingClientRect();
        const scaleX = pickerCanvas.width / rect.width;
        const scaleY = pickerCanvas.height / rect.height;

        const x = Math.floor((e.clientX - rect.left) * scaleX);
        const y = Math.floor((e.clientY - rect.top) * scaleY);

        if (x < 0 || y < 0 || x >= pickerCanvas.width || y >= pickerCanvas.height) return;

        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const r = pixel[0], g = pixel[1], b = pixel[2];
        const hex = '#' + [r, g, b].map(n => n.toString(16).padStart(2, '0')).join('').toUpperCase();

        colorSwatch.style.backgroundColor = hex;
        hexVal.textContent = hex;
        rgbVal.textContent = \`rgb(\${r}, \${g}, \${b})\`;
      }

      pickerCanvas.addEventListener('click', sampleColor);
      pickerCanvas.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) sampleColor(e);
      });

      window.copyVal = function(id) {
        const txt = document.getElementById(id).textContent;
        navigator.clipboard.writeText(txt).then(() => alert('Copied ' + txt + ' to clipboard!'));
      };
    `
  }
];
