// builder/tools-utility-2.js

module.exports = [
  {
    id: 'text-file-merger',
    slug: 'text-file-merger',
    category: 'utility',
    name: 'Text & Log File Merger',
    shortDesc: 'Merge multiple plain text, log (.log), or CSV files into one combined file.',
    seoTitle: 'Text File Merger Online - Combine TXT & Log Files Free | DesiDesk',
    seoDesc: 'Combine multiple text or log files into a single document directly in your browser. Fast, free and 100% private text merger on DesiDesk.',
    keywords: 'merge text files, combine txt files, merge log files online, concatenate text files',
    howToSteps: [
      'Select multiple .txt, .log, or .csv files.',
      'Choose line separator (New Line, Double Line, or Custom text).',
      'Click "Merge Text Files" and download your unified file.'
    ],
    features: [
      'Batch merges unlimited text files.',
      'Custom separator between files.',
      'Reorder files before merging.',
      '100% private in-browser merging.'
    ],
    faqs: [
      {
        q: 'Does it support large log files?',
        a: 'Yes, it streams and concatenates files in memory without transferring anything across the internet.'
      }
    ],
    related: ['zip-file-creator', 'csv-viewer-filter'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>
        <div class="dropzone-title">Upload Text Files to Merge</div>
        <div class="dropzone-subtitle">Click to select or drop .txt, .log, or .csv files</div>
        <input type="file" id="fileInput" class="dropzone-input" multiple accept=".txt,.log,.csv,text/*" />
      </div>

      <div id="mergeWorkspace" style="display:none;margin-top:2rem;">
        <div id="fileCountInfo" class="alert alert-info" style="margin-bottom:1.25rem;"></div>

        <div class="form-group">
          <label class="form-label">Separator Between Files:</label>
          <select id="sepSelect" class="form-select">
            <option value="\\n" selected>Single Line Break (\\n)</option>
            <option value="\\n\\n">Double Line Break (\\n\\n)</option>
            <option value="\\n--- END OF FILE ---\\n">Separator Banner (--- END OF FILE ---)</option>
          </select>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <button id="mergeTxtBtn" class="btn btn-primary">Merge Files Now</button>
          <a id="downloadTxtBtn" class="btn btn-success" style="display:none;">Download Merged File</a>
          <button id="clearBtn" class="btn btn-outline">Clear</button>
        </div>
      </div>
    `,
    toolScript: `
      let selectedFiles = [];
      const fileInput = document.getElementById('fileInput');
      const mergeWorkspace = document.getElementById('mergeWorkspace');
      const fileCountInfo = document.getElementById('fileCountInfo');
      const sepSelect = document.getElementById('sepSelect');
      const mergeTxtBtn = document.getElementById('mergeTxtBtn');
      const downloadTxtBtn = document.getElementById('downloadTxtBtn');
      const clearBtn = document.getElementById('clearBtn');

      fileInput.addEventListener('change', (e) => {
        selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length === 0) return;
        fileCountInfo.textContent = 'Selected ' + selectedFiles.length + ' file(s) for merging.';
        mergeWorkspace.style.display = 'block';
        downloadTxtBtn.style.display = 'none';
      });

      mergeTxtBtn.addEventListener('click', async () => {
        if (selectedFiles.length === 0) return;
        mergeTxtBtn.disabled = true;

        const sep = sepSelect.value.replace(/\\\\n/g, '\\n');
        const contents = [];

        for (const f of selectedFiles) {
          const text = await f.text();
          contents.push(text);
        }

        const merged = contents.join(sep);
        const blob = new Blob([merged], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        downloadTxtBtn.href = url;
        downloadTxtBtn.download = 'merged-desidesk.txt';
        downloadTxtBtn.textContent = 'Download Merged TXT (' + (blob.size / 1024).toFixed(1) + ' KB)';
        downloadTxtBtn.style.display = 'inline-flex';
        mergeTxtBtn.disabled = false;
      });

      clearBtn.addEventListener('click', () => {
        selectedFiles = [];
        fileInput.value = '';
        mergeWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'aspect-ratio-calculator',
    slug: 'aspect-ratio-calculator',
    category: 'utility',
    name: 'Aspect Ratio Calculator',
    shortDesc: 'Calculate dimensions for 16:9, 4:3, 21:9, 1:1, or custom aspect ratios for video and photos.',
    seoTitle: 'Aspect Ratio Calculator Online - 16:9, 4:3, 21:9 | DesiDesk',
    seoDesc: 'Calculate proportional dimensions for 16:9 widescreen, 4:3 standard, 21:9 ultrawide, and custom aspect ratios on DesiDesk.',
    keywords: 'aspect ratio calculator, 16 9 calculator, image aspect ratio, resize proportion, screen aspect ratio',
    howToSteps: [
      'Select a preset ratio (16:9, 4:3, 21:9, 1:1) or enter custom ratio values.',
      'Enter either Width or Height in pixels.',
      'The corresponding dimension calculates automatically.'
    ],
    features: [
      'Presets for 16:9 (YouTube), 4:3 (Photo), 21:9 (Ultrawide), 1:1 (Square).',
      'Two-way calculation (change width to get height, or vice versa).',
      'Visual ratio preview box.',
      'Instant calculation.'
    ],
    faqs: [
      {
        q: 'What is 1080p aspect ratio?',
        a: '1080p (1920x1080) has an aspect ratio of 16:9.'
      }
    ],
    related: ['image-resizer', 'image-cropper'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Preset Ratio:</label>
          <select id="ratioPreset" class="form-select">
            <option value="16:9" selected>16:9 (Widescreen / YouTube / TV)</option>
            <option value="4:3">4:3 (Classic TV / Standard Photo)</option>
            <option value="21:9">21:9 (Ultrawide / Cinema)</option>
            <option value="1:1">1:1 (Square / Instagram)</option>
            <option value="9:16">9:16 (Vertical Story / TikTok)</option>
            <option value="custom">Custom Ratio</option>
          </select>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Ratio W:</label>
            <input type="number" id="rw" class="form-input" value="16" min="1" />
          </div>
          <div class="form-group">
            <label class="form-label">Ratio H:</label>
            <input type="number" id="rh" class="form-input" value="9" min="1" />
          </div>
        </div>
      </div>

      <div class="form-grid-2" style="margin-top:1.5rem;">
        <div class="form-group">
          <label class="form-label">Width (px):</label>
          <input type="number" id="dimW" class="form-input" value="1920" />
        </div>
        <div class="form-group">
          <label class="form-label">Height (px):</label>
          <input type="number" id="dimH" class="form-input" value="1080" />
        </div>
      </div>
    `,
    toolScript: `
      const ratioPreset = document.getElementById('ratioPreset');
      const rw = document.getElementById('rw');
      const rh = document.getElementById('rh');
      const dimW = document.getElementById('dimW');
      const dimH = document.getElementById('dimH');

      ratioPreset.addEventListener('change', () => {
        const val = ratioPreset.value;
        if (val !== 'custom') {
          const [w, h] = val.split(':').map(Number);
          rw.value = w;
          rh.value = h;
          recalcH();
        }
      });

      function recalcH() {
        const wVal = parseFloat(dimW.value) || 0;
        const rW = parseFloat(rw.value) || 1;
        const rH = parseFloat(rh.value) || 1;
        dimH.value = Math.round((wVal / rW) * rH);
      }

      function recalcW() {
        const hVal = parseFloat(dimH.value) || 0;
        const rW = parseFloat(rw.value) || 1;
        const rH = parseFloat(rh.value) || 1;
        dimW.value = Math.round((hVal / rH) * rW);
      }

      dimW.addEventListener('input', recalcH);
      dimH.addEventListener('input', recalcW);
      rw.addEventListener('input', recalcH);
      rh.addEventListener('input', recalcH);
    `
  },
  {
    id: 'screen-resolution-checker',
    slug: 'screen-resolution-checker',
    category: 'utility',
    name: 'Screen Resolution & Display Checker',
    shortDesc: 'Inspect screen resolution, browser viewport size, device pixel ratio (DPR), and color depth.',
    seoTitle: 'Screen Resolution Checker - Display & Viewport Info | DesiDesk',
    seoDesc: 'Check your screen resolution, browser window dimensions, device pixel ratio, and display specs instantly on DesiDesk.',
    keywords: 'screen resolution checker, check screen size, viewport dimensions, device pixel ratio, monitor resolution',
    howToSteps: [
      'Open the tool to view instant metrics for your current display.',
      'Resize your browser window to see live viewport updates.'
    ],
    features: [
      'Detects Physical Screen Resolution (Width x Height).',
      'Detects Browser Viewport Dimensions (Inner Width x Height).',
      'Device Pixel Ratio (DPR) for Retina / High-DPI screens.',
      'Display color depth and orientation.'
    ],
    faqs: [
      {
        q: 'What is Device Pixel Ratio (DPR)?',
        a: 'DPR indicates how many physical device pixels correspond to one CSS logical pixel (e.g., 2 for Apple Retina displays).'
      }
    ],
    related: ['aspect-ratio-calculator'],
    toolHtml: `
      <div class="stat-grid" style="margin-bottom:2rem;">
        <div class="stat-card">
          <div class="stat-value" id="valScreenRes">-</div>
          <div class="stat-label">Physical Screen Resolution</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="valViewport">-</div>
          <div class="stat-label">Browser Viewport Size</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="valDpr">-</div>
          <div class="stat-label">Device Pixel Ratio (DPR)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="valColorDepth">-</div>
          <div class="stat-label">Color Depth</div>
        </div>
      </div>

      <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1.25rem;">
        <h4 style="font-size:1.05rem;color:var(--secondary);margin-bottom:0.75rem;">Display Details:</h4>
        <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;">
          <span>Screen Orientation:</span>
          <span id="valOrientation" style="font-weight:700;">-</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:6px 0;">
          <span>Touch Screen Supported:</span>
          <span id="valTouch" style="font-weight:700;">-</span>
        </div>
      </div>
    `,
    toolScript: `
      const valScreenRes = document.getElementById('valScreenRes');
      const valViewport = document.getElementById('valViewport');
      const valDpr = document.getElementById('valDpr');
      const valColorDepth = document.getElementById('valColorDepth');
      const valOrientation = document.getElementById('valOrientation');
      const valTouch = document.getElementById('valTouch');

      function updateDisplay() {
        valScreenRes.textContent = window.screen.width + ' × ' + window.screen.height;
        valViewport.textContent = window.innerWidth + ' × ' + window.innerHeight;
        valDpr.textContent = (window.devicePixelRatio || 1) + 'x';
        valColorDepth.textContent = window.screen.colorDepth + '-bit';

        const isLandscape = window.innerWidth >= window.innerHeight;
        valOrientation.textContent = isLandscape ? 'Landscape' : 'Portrait';

        const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        valTouch.textContent = hasTouch ? 'Yes' : 'No';
      }

      window.addEventListener('resize', updateDisplay);
      updateDisplay();
    `
  }
];
