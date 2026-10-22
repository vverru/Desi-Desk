// builder/tools-pdf-2.js

module.exports = [
  {
    id: 'organize-pdf',
    slug: 'organize-pdf',
    category: 'pdf',
    name: 'Organize & Reorder PDF Pages',
    shortDesc: 'Reorder, delete, duplicate, or rotate individual pages inside any PDF document.',
    seoTitle: 'Organize PDF Pages Online - Reorder & Delete Pages | DesiDesk',
    seoDesc: 'Rearrange, delete, and reorder PDF pages visually in your browser. 100% private, free client-side PDF page organizer on DesiDesk.',
    keywords: 'organize pdf, reorder pdf pages, delete pdf pages, rearrange pdf, sort pdf pages',
    libs: ['https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'],
    howToSteps: [
      'Upload the PDF document you want to organize.',
      'Enter the new page order sequence (e.g. "3, 1, 2, 4") or omit pages you want removed.',
      'Click "Apply Page Order".',
      'Download your organized PDF file.'
    ],
    features: [
      'Delete unwanted pages simply by omitting their number.',
      'Reorder and duplicate pages in any sequence.',
      '100% browser-based security without server uploads.',
      'Maintains original vector resolution.'
    ],
    faqs: [
      {
        q: 'Can I duplicate a page?',
        a: 'Yes, if you enter "1, 1, 2, 3", page 1 will appear twice in the resulting PDF.'
      }
    ],
    related: ['merge-pdf', 'split-pdf', 'rotate-pdf'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>
        <div class="dropzone-title">Upload PDF to Reorder / Organize</div>
        <div class="dropzone-subtitle">Click to select or drop your PDF document</div>
        <input type="file" id="fileInput" class="dropzone-input" accept=".pdf,application/pdf" />
      </div>

      <div id="organizeControls" style="display:none;margin-top:2rem;">
        <div class="alert alert-info" id="fileInfo"></div>

        <div class="form-group" style="margin-top:1.25rem;">
          <label class="form-label">New Page Order (comma separated):</label>
          <input type="text" id="orderInput" class="form-input" placeholder="e.g. 3, 1, 2, 4" />
          <div class="form-hint">List pages in your desired sequence. Omit page numbers to delete them.</div>
        </div>

        <div class="btn-group">
          <button id="applyOrderBtn" class="btn btn-primary">Save New Page Order</button>
          <button id="reverseOrderBtn" class="btn btn-secondary">Reverse All Pages</button>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>

      <div id="downloadContainer" class="result-box" style="display:none;text-align:center;">
        <h3 style="color:var(--accent);margin-bottom:0.5rem;font-size:1.25rem;">PDF Organized Successfully!</h3>
        <a id="downloadBtn" class="btn btn-success" download="organized-desidesk.pdf">Download Organized PDF</a>
      </div>
    `,
    toolScript: `
      let pdfDoc = null;
      let totalPages = 0;
      const fileInput = document.getElementById('fileInput');
      const organizeControls = document.getElementById('organizeControls');
      const fileInfo = document.getElementById('fileInfo');
      const orderInput = document.getElementById('orderInput');
      const applyOrderBtn = document.getElementById('applyOrderBtn');
      const reverseOrderBtn = document.getElementById('reverseOrderBtn');
      const resetBtn = document.getElementById('resetBtn');
      const downloadContainer = document.getElementById('downloadContainer');
      const downloadBtn = document.getElementById('downloadBtn');

      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          const buf = await file.arrayBuffer();
          pdfDoc = await PDFLib.PDFDocument.load(buf, { ignoreEncryption: true });
          totalPages = pdfDoc.getPageCount();
          fileInfo.textContent = 'Document has ' + totalPages + ' pages.';
          orderInput.value = Array.from({length: totalPages}, (_, i) => i + 1).join(', ');
          organizeControls.style.display = 'block';
          downloadContainer.style.display = 'none';
        } catch(err) {
          alert('Error: ' + err.message);
        }
      });

      async function buildOrderedDoc(indices) {
        const newDoc = await PDFLib.PDFDocument.create();
        const copied = await newDoc.copyPages(pdfDoc, indices);
        copied.forEach(p => newDoc.addPage(p));
        const bytes = await newDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        downloadBtn.href = URL.createObjectURL(blob);
        downloadContainer.style.display = 'block';
      }

      applyOrderBtn.addEventListener('click', async () => {
        if (!pdfDoc) return;
        const pageNums = orderInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n >= 1 && n <= totalPages);
        if (pageNums.length === 0) {
          alert('Please specify at least one valid page number.');
          return;
        }
        const indices = pageNums.map(n => n - 1);
        await buildOrderedDoc(indices);
      });

      reverseOrderBtn.addEventListener('click', async () => {
        if (!pdfDoc) return;
        const rev = Array.from({length: totalPages}, (_, i) => totalPages - 1 - i);
        orderInput.value = rev.map(i => i + 1).join(', ');
        await buildOrderedDoc(rev);
      });

      resetBtn.addEventListener('click', () => {
        pdfDoc = null;
        fileInput.value = '';
        organizeControls.style.display = 'none';
        downloadContainer.style.display = 'none';
      });
    `
  },
  {
    id: 'crop-pdf',
    slug: 'crop-pdf',
    category: 'pdf',
    name: 'Crop PDF Margins',
    shortDesc: 'Trim margins or set crop bounds on all pages of a PDF document.',
    seoTitle: 'Crop PDF Online - Trim PDF Margins Free | DesiDesk',
    seoDesc: 'Crop PDF margins and trim white borders online in your browser. Fast, free, secure client-side PDF cropping on DesiDesk.',
    keywords: 'crop pdf, trim pdf margins, cut pdf borders, crop pdf online, remove pdf whitespace',
    libs: ['https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'],
    howToSteps: [
      'Upload your PDF document.',
      'Specify margin trim values in points for Top, Bottom, Left, and Right.',
      'Click "Apply Crop" to adjust page bounds.',
      'Download your cropped PDF.'
    ],
    features: [
      'Adjustable top, bottom, left, and right margins.',
      'Preserves text clarity and vector content.',
      'Zero server upload: 100% private.',
      'Instant download.'
    ],
    faqs: [
      {
        q: 'What unit are margins specified in?',
        a: 'Standard PDF points (1 inch = 72 points).'
      }
    ],
    related: ['split-pdf', 'rotate-pdf', 'merge-pdf'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"/><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"/></svg>
        <div class="dropzone-title">Upload PDF to Crop Margins</div>
        <div class="dropzone-subtitle">Click to select or drop your PDF document</div>
        <input type="file" id="fileInput" class="dropzone-input" accept=".pdf,application/pdf" />
      </div>

      <div id="cropControls" style="display:none;margin-top:2rem;">
        <div class="alert alert-info" id="fileInfo"></div>

        <div class="form-grid-2" style="margin-top:1.25rem;">
          <div class="form-group">
            <label class="form-label">Top Margin Trim (pt):</label>
            <input type="number" id="cropTop" class="form-input" value="36" min="0" />
          </div>
          <div class="form-group">
            <label class="form-label">Bottom Margin Trim (pt):</label>
            <input type="number" id="cropBottom" class="form-input" value="36" min="0" />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Left Margin Trim (pt):</label>
            <input type="number" id="cropLeft" class="form-input" value="36" min="0" />
          </div>
          <div class="form-group">
            <label class="form-label">Right Margin Trim (pt):</label>
            <input type="number" id="cropRight" class="form-input" value="36" min="0" />
          </div>
        </div>

        <div class="btn-group">
          <button id="applyCropBtn" class="btn btn-primary">Apply PDF Crop</button>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>

      <div id="downloadContainer" class="result-box" style="display:none;text-align:center;">
        <h3 style="color:var(--accent);margin-bottom:0.5rem;font-size:1.25rem;">PDF Cropped Successfully!</h3>
        <a id="downloadBtn" class="btn btn-success" download="cropped-desidesk.pdf">Download Cropped PDF</a>
      </div>
    `,
    toolScript: `
      let pdfDoc = null;
      const fileInput = document.getElementById('fileInput');
      const cropControls = document.getElementById('cropControls');
      const fileInfo = document.getElementById('fileInfo');
      const cropTop = document.getElementById('cropTop');
      const cropBottom = document.getElementById('cropBottom');
      const cropLeft = document.getElementById('cropLeft');
      const cropRight = document.getElementById('cropRight');
      const applyCropBtn = document.getElementById('applyCropBtn');
      const resetBtn = document.getElementById('resetBtn');
      const downloadContainer = document.getElementById('downloadContainer');
      const downloadBtn = document.getElementById('downloadBtn');

      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          const buf = await file.arrayBuffer();
          pdfDoc = await PDFLib.PDFDocument.load(buf, { ignoreEncryption: true });
          fileInfo.textContent = 'Loaded: ' + file.name + ' (' + pdfDoc.getPageCount() + ' pages)';
          cropControls.style.display = 'block';
          downloadContainer.style.display = 'none';
        } catch(err) {
          alert('Error: ' + err.message);
        }
      });

      applyCropBtn.addEventListener('click', async () => {
        if (!pdfDoc) return;
        const top = parseFloat(cropTop.value) || 0;
        const bottom = parseFloat(cropBottom.value) || 0;
        const left = parseFloat(cropLeft.value) || 0;
        const right = parseFloat(cropRight.value) || 0;

        const pages = pdfDoc.getPages();
        pages.forEach(p => {
          const { width, height } = p.getSize();
          const newW = width - left - right;
          const newH = height - top - bottom;
          if (newW > 50 && newH > 50) {
            p.setCropBox(left, bottom, newW, newH);
          }
        });

        const bytes = await pdfDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        downloadBtn.href = URL.createObjectURL(blob);
        downloadContainer.style.display = 'block';
      });

      resetBtn.addEventListener('click', () => {
        pdfDoc = null;
        fileInput.value = '';
        cropControls.style.display = 'none';
        downloadContainer.style.display = 'none';
      });
    `
  },
  {
    id: 'sign-pdf',
    slug: 'sign-pdf',
    category: 'pdf',
    name: 'Sign PDF (Digital Signature)',
    shortDesc: 'Draw your signature on an interactive pad and stamp it cleanly onto any PDF document.',
    seoTitle: 'Sign PDF Online - Draw & Add Signature Free | DesiDesk',
    seoDesc: 'Sign PDF documents directly in your browser. Draw signature with touch or mouse and stamp onto any PDF page without upload on DesiDesk.',
    keywords: 'sign pdf, digital signature, draw signature on pdf, sign document online, electronic signature free',
    libs: ['https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'],
    howToSteps: [
      'Upload the PDF document you need to sign.',
      'Draw your signature using your finger, stylus, or mouse.',
      'Choose the page number to place the signature.',
      'Click "Stamp Signature & Download" to get your signed PDF.'
    ],
    features: [
      'Interactive smooth signature drawing canvas.',
      'Clear / undo signature pad button.',
      '100% private: signature and document stay on your device.',
      'Download signed PDF in high resolution.'
    ],
    faqs: [
      {
        q: 'Is my digital signature securely processed?',
        a: 'Yes, your signature is converted to a vector PNG in browser memory and embedded directly into the PDF. It is never stored or sent anywhere.'
      }
    ],
    related: ['watermark-pdf', 'add-page-numbers-pdf', 'merge-pdf'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18h.01"/></svg>
        <div class="dropzone-title">Upload PDF to Sign</div>
        <div class="dropzone-subtitle">Click to select or drop your PDF document</div>
        <input type="file" id="fileInput" class="dropzone-input" accept=".pdf,application/pdf" />
      </div>

      <div id="signWorkspace" style="display:none;margin-top:2rem;">
        <div class="alert alert-info" id="fileInfo"></div>

        <div style="margin-top:1.25rem;">
          <label class="form-label">Draw Signature Below (Touch or Mouse):</label>
          <div style="background:#fff;border:2px dashed var(--border-focus);border-radius:var(--radius-md);overflow:hidden;text-align:center;">
            <canvas id="sigCanvas" width="500" height="160" style="touch-action:none;cursor:crosshair;"></canvas>
          </div>
          <div style="display:flex;justify-content:flex-end;margin-top:0.5rem;">
            <button id="clearSigBtn" class="btn btn-sm btn-outline">Clear Signature</button>
          </div>
        </div>

        <div class="form-grid-2" style="margin-top:1rem;">
          <div class="form-group">
            <label class="form-label">Place on Page Number:</label>
            <input type="number" id="sigPage" class="form-input" value="1" min="1" />
          </div>
          <div class="form-group">
            <label class="form-label">Placement Position:</label>
            <select id="sigPos" class="form-select">
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-center">Bottom Center</option>
            </select>
          </div>
        </div>

        <div class="btn-group">
          <button id="applySigBtn" class="btn btn-primary">Stamp Signature & Download</button>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>

      <div id="downloadContainer" class="result-box" style="display:none;text-align:center;">
        <h3 style="color:var(--accent);margin-bottom:0.5rem;font-size:1.25rem;">PDF Signed Successfully!</h3>
        <a id="downloadBtn" class="btn btn-success" download="signed-document-desidesk.pdf">Download Signed PDF</a>
      </div>
    `,
    toolScript: `
      let pdfDoc = null;
      let totalPages = 0;
      let isDrawing = false;
      const fileInput = document.getElementById('fileInput');
      const signWorkspace = document.getElementById('signWorkspace');
      const fileInfo = document.getElementById('fileInfo');
      const sigCanvas = document.getElementById('sigCanvas');
      const clearSigBtn = document.getElementById('clearSigBtn');
      const sigPage = document.getElementById('sigPage');
      const sigPos = document.getElementById('sigPos');
      const applySigBtn = document.getElementById('applySigBtn');
      const resetBtn = document.getElementById('resetBtn');
      const downloadContainer = document.getElementById('downloadContainer');
      const downloadBtn = document.getElementById('downloadBtn');

      const ctx = sigCanvas.getContext('2d');
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#0f172a';

      function getPos(e) {
        const rect = sigCanvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
      }

      function startDraw(e) {
        isDrawing = true;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        e.preventDefault();
      }

      function draw(e) {
        if (!isDrawing) return;
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        e.preventDefault();
      }

      function stopDraw() { isDrawing = false; }

      sigCanvas.addEventListener('mousedown', startDraw);
      sigCanvas.addEventListener('mousemove', draw);
      sigCanvas.addEventListener('mouseup', stopDraw);
      sigCanvas.addEventListener('touchstart', startDraw, { passive: false });
      sigCanvas.addEventListener('touchmove', draw, { passive: false });
      sigCanvas.addEventListener('touchend', stopDraw);

      clearSigBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
      });

      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          const buf = await file.arrayBuffer();
          pdfDoc = await PDFLib.PDFDocument.load(buf, { ignoreEncryption: true });
          totalPages = pdfDoc.getPageCount();
          fileInfo.textContent = 'Loaded: ' + file.name + ' (' + totalPages + ' pages)';
          sigPage.max = totalPages;
          signWorkspace.style.display = 'block';
          downloadContainer.style.display = 'none';
        } catch(err) {
          alert('Error: ' + err.message);
        }
      });

      applySigBtn.addEventListener('click', async () => {
        if (!pdfDoc) return;
        const pNum = parseInt(sigPage.value, 10);
        if (isNaN(pNum) || pNum < 1 || pNum > totalPages) {
          alert('Please select a valid page between 1 and ' + totalPages);
          return;
        }

        const pngUrl = sigCanvas.toDataURL('image/png');
        const pngImageBytes = await fetch(pngUrl).then(res => res.arrayBuffer());
        const pngImage = await pdfDoc.embedPng(pngImageBytes);

        const page = pdfDoc.getPage(pNum - 1);
        const { width, height } = page.getSize();
        const sigW = 160;
        const sigH = (160 / sigCanvas.width) * sigCanvas.height;

        let x = 40, y = 40;
        if (sigPos.value === 'bottom-right') x = width - sigW - 40;
        else if (sigPos.value === 'bottom-center') x = (width - sigW) / 2;

        page.drawImage(pngImage, {
          x,
          y,
          width: sigW,
          height: sigH
        });

        const bytes = await pdfDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        downloadBtn.href = URL.createObjectURL(blob);
        downloadContainer.style.display = 'block';
      });

      resetBtn.addEventListener('click', () => {
        pdfDoc = null;
        fileInput.value = '';
        signWorkspace.style.display = 'none';
        downloadContainer.style.display = 'none';
        ctx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
      });
    `
  }
];
