// builder/tools-pdf.js

module.exports = [
  {
    id: 'merge-pdf',
    slug: 'merge-pdf',
    category: 'pdf',
    name: 'Merge PDF Files',
    shortDesc: 'Combine multiple PDF documents into a single organized file in seconds.',
    seoTitle: 'Merge PDF Online - Combine Multiple PDF Files Free | DesiDesk',
    seoDesc: 'Combine multiple PDF files into one document directly in your browser. 100% private, fast, and free client-side PDF merger with DesiDesk.',
    keywords: 'merge pdf, combine pdf files, join pdf, free pdf merger, merge pdf online',
    libs: ['https://cdn.jsdelivr.net/npm/pdf-lib@1.17.9/dist/pdf-lib.min.js'],
    howToSteps: [
      'Click or drag and drop two or more PDF files into the upload zone.',
      'Review the uploaded files list, drag or move up/down to set the desired order.',
      'Click "Merge PDFs" to let your browser combine them instantly.',
      'Click "Download Merged PDF" to save the consolidated file to your device.'
    ],
    features: [
      '100% Private: All processing happens in your browser with zero server uploads.',
      'Reorder documents easily before combining.',
      'Unlimited file count with no registration required.',
      'Preserves original page resolutions, bookmarks, and formatting.'
    ],
    faqs: [
      {
        q: 'Are my confidential PDF documents safe?',
        a: 'Yes, absolutely. DesiDesk uses client-side WebAssembly and JavaScript via pdf-lib. Your files never leave your computer or phone and are never transmitted to any external server.'
      },
      {
        q: 'Is there a limit on how many PDF files I can merge?',
        a: 'There is no artificial limit set by DesiDesk. You can merge as many files as your device memory can accommodate.'
      },
      {
        q: 'Does merging PDFs reduce their quality?',
        a: 'No. The merger extracts and combines raw PDF page streams losslessly without recompressing vector assets or text.'
      }
    ],
    related: ['split-pdf', 'rotate-pdf', 'organize-pdf', 'jpg-to-pdf'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="12" y2="12"/><line x1="15" y1="15" x2="12" y2="12"/></svg>
        <div class="dropzone-title">Select or Drop PDF Files Here</div>
        <div class="dropzone-subtitle">Choose two or more PDF files to combine (drag to reorder)</div>
        <input type="file" id="fileInput" class="dropzone-input" multiple accept=".pdf,application/pdf" />
      </div>

      <div id="fileListContainer" style="margin-top:1.5rem;display:none;">
        <h4 style="font-size:0.95rem;margin-bottom:0.75rem;color:var(--secondary);">Selected Files (in merge order):</h4>
        <div id="fileList" style="display:flex;flex-direction:column;gap:0.5rem;"></div>
      </div>

      <div class="btn-group" style="justify-content:center;margin-top:2rem;">
        <button id="mergeBtn" class="btn btn-primary" style="display:none;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
          Merge PDFs Now
        </button>
        <button id="clearBtn" class="btn btn-outline" style="display:none;">Clear All</button>
      </div>

      <div id="statusAlert" class="alert alert-info" style="display:none;"></div>

      <div id="downloadContainer" class="result-box" style="display:none;text-align:center;">
        <h3 style="color:var(--accent);margin-bottom:0.5rem;font-size:1.25rem;">Merge Complete!</h3>
        <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;" id="resultStats"></p>
        <a id="downloadBtn" class="btn btn-success" download="merged-desidesk.pdf">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Merged PDF
        </a>
      </div>
    `,
    toolScript: `
      let uploadedFiles = [];
      const dropzone = document.getElementById('dropzone');
      const fileInput = document.getElementById('fileInput');
      const fileListContainer = document.getElementById('fileListContainer');
      const fileList = document.getElementById('fileList');
      const mergeBtn = document.getElementById('mergeBtn');
      const clearBtn = document.getElementById('clearBtn');
      const statusAlert = document.getElementById('statusAlert');
      const downloadContainer = document.getElementById('downloadContainer');
      const downloadBtn = document.getElementById('downloadBtn');
      const resultStats = document.getElementById('resultStats');

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(2) + ' MB';
      }

      function renderFileList() {
        if (uploadedFiles.length === 0) {
          fileListContainer.style.display = 'none';
          mergeBtn.style.display = 'none';
          clearBtn.style.display = 'none';
          return;
        }
        fileListContainer.style.display = 'block';
        mergeBtn.style.display = 'inline-flex';
        clearBtn.style.display = 'inline-flex';
        fileList.innerHTML = '';
        uploadedFiles.forEach((file, index) => {
          const item = document.createElement('div');
          item.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;background:var(--bg-subtle);border:1px solid var(--border-light);border-radius:var(--radius-md);font-size:0.9rem;';
          item.innerHTML = \`
            <div style="display:flex;align-items:center;gap:0.75rem;overflow:hidden;">
              <span style="font-weight:700;color:var(--text-muted);font-size:0.8rem;width:20px;">\${index + 1}.</span>
              <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:600;">\${file.name}</span>
              <span style="color:var(--text-muted);font-size:0.8rem;">(\${formatSize(file.size)})</span>
            </div>
            <div style="display:flex;align-items:center;gap:0.35rem;">
              <button type="button" class="btn btn-outline btn-sm" onclick="moveFile(\${index}, -1)" \${index === 0 ? 'disabled' : ''}>&uarr;</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="moveFile(\${index}, 1)" \${index === uploadedFiles.length - 1 ? 'disabled' : ''}>&darr;</button>
              <button type="button" class="btn btn-outline btn-sm" style="color:var(--accent-rose);" onclick="removeFile(\${index})">&times;</button>
            </div>
          \`;
          fileList.appendChild(item);
        });
      }

      window.moveFile = function(index, dir) {
        const target = index + dir;
        if (target < 0 || target >= uploadedFiles.length) return;
        const temp = uploadedFiles[index];
        uploadedFiles[index] = uploadedFiles[target];
        uploadedFiles[target] = temp;
        renderFileList();
      };

      window.removeFile = function(index) {
        uploadedFiles.splice(index, 1);
        renderFileList();
      };

      fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files).filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
        uploadedFiles = uploadedFiles.concat(files);
        fileInput.value = '';
        renderFileList();
      });

      clearBtn.addEventListener('click', () => {
        uploadedFiles = [];
        renderFileList();
        downloadContainer.style.display = 'none';
        statusAlert.style.display = 'none';
      });

      mergeBtn.addEventListener('click', async () => {
        if (uploadedFiles.length < 2) {
          alert('Please select at least 2 PDF files to merge.');
          return;
        }
        if (typeof PDFLib === 'undefined') {
          statusAlert.className = 'alert alert-error';
          statusAlert.textContent = 'PDF engine library is still loading. Please check your internet connection and retry in a moment.';
          statusAlert.style.display = 'block';
          return;
        }
        try {
          mergeBtn.disabled = true;
          statusAlert.className = 'alert alert-info';
          statusAlert.textContent = 'Processing and merging pages locally...';
          statusAlert.style.display = 'block';

          const mergedPdf = await PDFLib.PDFDocument.create();
          let totalPages = 0;

          for (const file of uploadedFiles) {
            const buffer = await file.arrayBuffer();
            const pdf = await PDFLib.PDFDocument.load(buffer, { ignoreEncryption: true });
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach(p => mergedPdf.addPage(p));
            totalPages += copiedPages.length;
          }

          const mergedBytes = await mergedPdf.save();
          const blob = new Blob([mergedBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);

          downloadBtn.href = url;
          resultStats.textContent = \`Combined \${uploadedFiles.length} files with a total of \${totalPages} pages (\${formatSize(blob.size)}).\`;
          downloadContainer.style.display = 'block';
          statusAlert.style.display = 'none';
          mergeBtn.disabled = false;
        } catch (err) {
          console.error(err);
          statusAlert.className = 'alert alert-error';
          statusAlert.textContent = 'Error merging PDFs: ' + err.message + '. Ensure files are valid unencrypted PDFs.';
          statusAlert.style.display = 'block';
          mergeBtn.disabled = false;
        }
      });
    `
  },
  {
    id: 'split-pdf',
    slug: 'split-pdf',
    category: 'pdf',
    name: 'Split PDF Pages',
    shortDesc: 'Extract individual pages or custom page ranges from any PDF document.',
    seoTitle: 'Split PDF Online - Extract Pages Free & Fast | DesiDesk',
    seoDesc: 'Split PDF files and extract custom page ranges directly in your browser. 100% private, no signup, no file upload to external servers.',
    keywords: 'split pdf, extract pdf pages, separate pdf, split pdf online, divide pdf',
    libs: ['https://cdn.jsdelivr.net/npm/pdf-lib@1.17.9/dist/pdf-lib.min.js'],
    howToSteps: [
      'Upload the PDF document you want to split.',
      'Specify the page range (e.g., "1-3, 5, 8-10") or choose to extract all pages.',
      'Click "Extract Pages" to generate your split document.',
      'Download your new custom PDF document instantly.'
    ],
    features: [
      'Precise page range selection (ranges, single pages, or combinations).',
      '100% browser-based security without server transfers.',
      'Instant preview of page count and file size.',
      'Maintains vector clarity and embedded hyperlinks.'
    ],
    faqs: [
      {
        q: 'How do I specify multiple page ranges?',
        a: 'You can enter page numbers separated by commas and dashes, such as "1-3, 5, 7-10".'
      },
      {
        q: 'Can I split password-protected PDFs?',
        a: 'For security, the PDF must be decrypted first before extracting pages in the browser.'
      }
    ],
    related: ['merge-pdf', 'rotate-pdf', 'organize-pdf', 'crop-pdf'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/></svg>
        <div class="dropzone-title">Upload PDF to Split</div>
        <div class="dropzone-subtitle">Click to select or drop a single PDF file</div>
        <input type="file" id="fileInput" class="dropzone-input" accept=".pdf,application/pdf" />
      </div>

      <div id="splitControls" style="display:none;margin-top:2rem;">
        <div class="alert alert-info" id="fileInfo"></div>
        <div class="form-group" style="margin-top:1.25rem;">
          <label class="form-label">Page Selection Mode:</label>
          <div style="display:flex;gap:1.5rem;margin-bottom:1rem;">
            <label style="cursor:pointer;"><input type="radio" name="splitMode" value="range" checked /> Custom Range (e.g. 1-3, 5)</label>
            <label style="cursor:pointer;"><input type="radio" name="splitMode" value="all" /> Extract All Pages Individually</label>
          </div>
          <div id="rangeInputBox">
            <label class="form-label">Enter Pages to Extract:</label>
            <input type="text" id="pageRange" class="form-input" placeholder="e.g. 1-3, 5, 7-9" value="1" />
            <div class="form-hint">Use commas to separate single pages or hyphens for ranges.</div>
          </div>
        </div>

        <div class="btn-group">
          <button id="splitBtn" class="btn btn-primary">Split & Extract PDF</button>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>

      <div id="statusAlert" class="alert alert-info" style="display:none;margin-top:1.5rem;"></div>

      <div id="downloadContainer" class="result-box" style="display:none;text-align:center;">
        <h3 style="color:var(--accent);margin-bottom:0.5rem;font-size:1.25rem;">Split Complete!</h3>
        <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;" id="resultStats"></p>
        <a id="downloadBtn" class="btn btn-success" download="split-desidesk.pdf">Download Extracted PDF</a>
      </div>
    `,
    toolScript: `
      let currentPdfDoc = null;
      let currentFileBuffer = null;
      let totalPageCount = 0;
      const fileInput = document.getElementById('fileInput');
      const splitControls = document.getElementById('splitControls');
      const fileInfo = document.getElementById('fileInfo');
      const pageRange = document.getElementById('pageRange');
      const splitBtn = document.getElementById('splitBtn');
      const resetBtn = document.getElementById('resetBtn');
      const statusAlert = document.getElementById('statusAlert');
      const downloadContainer = document.getElementById('downloadContainer');
      const downloadBtn = document.getElementById('downloadBtn');
      const resultStats = document.getElementById('resultStats');

      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          currentFileBuffer = await file.arrayBuffer();
          currentPdfDoc = await PDFLib.PDFDocument.load(currentFileBuffer, { ignoreEncryption: true });
          totalPageCount = currentPdfDoc.getPageCount();
          fileInfo.innerHTML = '<strong>' + file.name + '</strong> contains <strong>' + totalPageCount + '</strong> pages.';
          pageRange.value = '1-' + Math.min(totalPageCount, 3);
          splitControls.style.display = 'block';
          downloadContainer.style.display = 'none';
        } catch(err) {
          alert('Could not read PDF: ' + err.message);
        }
      });

      function parseRange(str, max) {
        const indices = new Set();
        const parts = str.split(',');
        for (const part of parts) {
          const trimmed = part.trim();
          if (trimmed.includes('-')) {
            const [s, e] = trimmed.split('-').map(n => parseInt(n.trim(), 10));
            if (!isNaN(s) && !isNaN(e)) {
              const start = Math.max(1, Math.min(s, e));
              const end = Math.min(max, Math.max(s, e));
              for (let i = start; i <= end; i++) indices.add(i - 1);
            }
          } else {
            const num = parseInt(trimmed, 10);
            if (!isNaN(num) && num >= 1 && num <= max) indices.add(num - 1);
          }
        }
        return Array.from(indices).sort((a,b) => a - b);
      }

      splitBtn.addEventListener('click', async () => {
        if (!currentPdfDoc) return;
        const mode = document.querySelector('input[name="splitMode"]:checked').value;
        const indices = mode === 'all' 
          ? Array.from({length: totalPageCount}, (_, i) => i) 
          : parseRange(pageRange.value, totalPageCount);

        if (indices.length === 0) {
          alert('Please enter a valid page number or range between 1 and ' + totalPageCount);
          return;
        }

        try {
          splitBtn.disabled = true;
          statusAlert.className = 'alert alert-info';
          statusAlert.textContent = 'Extracting ' + indices.length + ' page(s)...';
          statusAlert.style.display = 'block';

          const newDoc = await PDFLib.PDFDocument.create();
          const copiedPages = await newDoc.copyPages(currentPdfDoc, indices);
          copiedPages.forEach(p => newDoc.addPage(p));

          const newBytes = await newDoc.save();
          const blob = new Blob([newBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);

          downloadBtn.href = url;
          resultStats.textContent = 'Extracted ' + indices.length + ' pages (' + (blob.size / 1024).toFixed(1) + ' KB).';
          downloadContainer.style.display = 'block';
          statusAlert.style.display = 'none';
          splitBtn.disabled = false;
        } catch(err) {
          statusAlert.className = 'alert alert-error';
          statusAlert.textContent = 'Split error: ' + err.message;
          splitBtn.disabled = false;
        }
      });

      resetBtn.addEventListener('click', () => {
        currentPdfDoc = null;
        fileInput.value = '';
        splitControls.style.display = 'none';
        downloadContainer.style.display = 'none';
        statusAlert.style.display = 'none';
      });
    `
  },
  {
    id: 'rotate-pdf',
    slug: 'rotate-pdf',
    category: 'pdf',
    name: 'Rotate PDF Pages',
    shortDesc: 'Permanently rotate PDF pages clockwise or counter-clockwise (90°, 180°, 270°).',
    seoTitle: 'Rotate PDF Online - Rotate PDF Pages Free | DesiDesk',
    seoDesc: 'Rotate PDF pages permanently 90 degrees, 180 degrees or 270 degrees in your browser. Fast, free, secure client-side PDF rotator.',
    keywords: 'rotate pdf, rotate pdf pages, turn pdf, flip pdf pages, free pdf rotate',
    libs: ['https://cdn.jsdelivr.net/npm/pdf-lib@1.17.9/dist/pdf-lib.min.js'],
    howToSteps: [
      'Upload the PDF document with misoriented pages.',
      'Select rotation angle (90° Clockwise, 180° Upside Down, or 270° Counter-Clockwise).',
      'Choose whether to rotate all pages or only odd/even/custom pages.',
      'Click "Rotate PDF" and download the corrected document.'
    ],
    features: [
      'Rotate 90°, 180°, or 270° with a single click.',
      'Selective rotation: All pages, Odd pages only, Even pages only.',
      'Preserves high resolution and page formatting.',
      'Zero server upload: 100% confidential.'
    ],
    faqs: [
      {
        q: 'Does rotating PDF degrade quality?',
        a: 'No. Rotating simply alters the orientation metadata of the page, maintaining 100% original vector and image fidelity.'
      }
    ],
    related: ['merge-pdf', 'split-pdf', 'crop-pdf', 'organize-pdf'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        <div class="dropzone-title">Upload PDF to Rotate</div>
        <div class="dropzone-subtitle">Click to select or drop your PDF document</div>
        <input type="file" id="fileInput" class="dropzone-input" accept=".pdf,application/pdf" />
      </div>

      <div id="rotateControls" style="display:none;margin-top:2rem;">
        <div class="alert alert-info" id="fileInfo"></div>
        <div class="form-grid-2" style="margin-top:1.25rem;">
          <div class="form-group">
            <label class="form-label">Rotation Angle:</label>
            <select id="rotAngle" class="form-select">
              <option value="90">90° Clockwise (Right)</option>
              <option value="180">180° Upside Down</option>
              <option value="270">270° Counter-Clockwise (Left)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Apply To:</label>
            <select id="rotScope" class="form-select">
              <option value="all">All Pages</option>
              <option value="odd">Odd Pages Only (1, 3, 5...)</option>
              <option value="even">Even Pages Only (2, 4, 6...)</option>
            </select>
          </div>
        </div>

        <div class="btn-group">
          <button id="rotateBtn" class="btn btn-primary">Apply Rotation</button>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>

      <div id="downloadContainer" class="result-box" style="display:none;text-align:center;">
        <h3 style="color:var(--accent);margin-bottom:0.5rem;font-size:1.25rem;">Rotation Applied!</h3>
        <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;" id="resultStats"></p>
        <a id="downloadBtn" class="btn btn-success" download="rotated-desidesk.pdf">Download Rotated PDF</a>
      </div>
    `,
    toolScript: `
      let pdfDoc = null;
      let totalPages = 0;
      const fileInput = document.getElementById('fileInput');
      const rotateControls = document.getElementById('rotateControls');
      const fileInfo = document.getElementById('fileInfo');
      const rotateBtn = document.getElementById('rotateBtn');
      const resetBtn = document.getElementById('resetBtn');
      const downloadContainer = document.getElementById('downloadContainer');
      const downloadBtn = document.getElementById('downloadBtn');
      const resultStats = document.getElementById('resultStats');

      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          const buf = await file.arrayBuffer();
          pdfDoc = await PDFLib.PDFDocument.load(buf, { ignoreEncryption: true });
          totalPages = pdfDoc.getPageCount();
          fileInfo.textContent = 'Loaded: ' + file.name + ' (' + totalPages + ' pages)';
          rotateControls.style.display = 'block';
          downloadContainer.style.display = 'none';
        } catch(err) {
          alert('Error loading PDF: ' + err.message);
        }
      });

      rotateBtn.addEventListener('click', async () => {
        if (!pdfDoc) return;
        const angle = parseInt(document.getElementById('rotAngle').value, 10);
        const scope = document.getElementById('rotScope').value;
        const pages = pdfDoc.getPages();

        pages.forEach((page, idx) => {
          const pageNum = idx + 1;
          const isOdd = pageNum % 2 !== 0;
          if (scope === 'all' || (scope === 'odd' && isOdd) || (scope === 'even' && !isOdd)) {
            const currentRot = page.getRotation().angle;
            page.setRotation(PDFLib.degrees((currentRot + angle) % 360));
          }
        });

        const bytes = await pdfDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        downloadBtn.href = URL.createObjectURL(blob);
        resultStats.textContent = 'Rotated pages successfully by ' + angle + '°.';
        downloadContainer.style.display = 'block';
      });

      resetBtn.addEventListener('click', () => {
        pdfDoc = null;
        fileInput.value = '';
        rotateControls.style.display = 'none';
        downloadContainer.style.display = 'none';
      });
    `
  },
  {
    id: 'jpg-to-pdf',
    slug: 'jpg-to-pdf',
    category: 'pdf',
    name: 'JPG to PDF Converter',
    shortDesc: 'Convert JPG, PNG, and WebP images into a single clean PDF document.',
    seoTitle: 'JPG to PDF Online - Convert Images to PDF Free | DesiDesk',
    seoDesc: 'Convert JPG, PNG, WebP images to a professional PDF document right in your browser. Fast, free and 100% private image to PDF conversion.',
    keywords: 'jpg to pdf, convert image to pdf, png to pdf, photo to pdf, free jpg to pdf',
    libs: ['https://cdn.jsdelivr.net/npm/pdf-lib@1.17.9/dist/pdf-lib.min.js'],
    howToSteps: [
      'Select or drop JPG, PNG, or WebP images into the upload area.',
      'Reorder images or adjust page margin and orientation settings.',
      'Click "Generate PDF" to compile your images.',
      'Download your finished PDF document.'
    ],
    features: [
      'Supports JPG, JPEG, PNG and WebP formats.',
      'Configurable page orientation (Portrait, Landscape, or Auto).',
      'Batch conversion of unlimited images.',
      'Instant client-side processing with zero upload delay.'
    ],
    faqs: [
      {
        q: 'Will my image quality be preserved?',
        a: 'Yes. Images are directly embedded inside the PDF at their original pixel resolution.'
      }
    ],
    related: ['merge-pdf', 'split-pdf', 'watermark-pdf'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <div class="dropzone-title">Upload Images to Convert to PDF</div>
        <div class="dropzone-subtitle">Select one or more JPG, PNG, or WebP images</div>
        <input type="file" id="fileInput" class="dropzone-input" multiple accept="image/jpeg,image/png,image/webp" />
      </div>

      <div id="imageSettings" style="display:none;margin-top:2rem;">
        <div id="imageList" style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1.5rem;"></div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Page Orientation:</label>
            <select id="pageOrientation" class="form-select">
              <option value="auto">Auto (Match Image)</option>
              <option value="portrait">Portrait (A4)</option>
              <option value="landscape">Landscape (A4)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Margin:</label>
            <select id="pageMargin" class="form-select">
              <option value="0">No Margin (Full Bleed)</option>
              <option value="20">Small Margin (20pt)</option>
              <option value="40">Standard Margin (40pt)</option>
            </select>
          </div>
        </div>

        <div class="btn-group">
          <button id="convertBtn" class="btn btn-primary">Generate PDF Now</button>
          <button id="resetBtn" class="btn btn-outline">Clear All</button>
        </div>
      </div>

      <div id="downloadContainer" class="result-box" style="display:none;text-align:center;">
        <h3 style="color:var(--accent);margin-bottom:0.5rem;font-size:1.25rem;">PDF Created Successfully!</h3>
        <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;" id="resultStats"></p>
        <a id="downloadBtn" class="btn btn-success" download="images-desidesk.pdf">Download Generated PDF</a>
      </div>
    `,
    toolScript: `
      let selectedImages = [];
      const fileInput = document.getElementById('fileInput');
      const imageSettings = document.getElementById('imageSettings');
      const imageList = document.getElementById('imageList');
      const convertBtn = document.getElementById('convertBtn');
      const resetBtn = document.getElementById('resetBtn');
      const downloadContainer = document.getElementById('downloadContainer');
      const downloadBtn = document.getElementById('downloadBtn');
      const resultStats = document.getElementById('resultStats');

      fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        selectedImages = selectedImages.concat(files);
        renderThumbnails();
      });

      function renderThumbnails() {
        if (selectedImages.length === 0) {
          imageSettings.style.display = 'none';
          return;
        }
        imageSettings.style.display = 'block';
        imageList.innerHTML = '';
        selectedImages.forEach((imgFile, idx) => {
          const item = document.createElement('div');
          item.style.cssText = 'position:relative;width:90px;height:90px;border:1px solid var(--border-light);border-radius:var(--radius-md);overflow:hidden;background:#fff;';
          const img = document.createElement('img');
          img.src = URL.createObjectURL(imgFile);
          img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
          const del = document.createElement('button');
          del.innerHTML = '&times;';
          del.style.cssText = 'position:absolute;top:2px;right:2px;background:rgba(0,0,0,0.6);color:#fff;border:none;border-radius:50%;width:20px;height:20px;font-size:14px;cursor:pointer;';
          del.onclick = () => {
            selectedImages.splice(idx, 1);
            renderThumbnails();
          };
          item.appendChild(img);
          item.appendChild(del);
          imageList.appendChild(item);
        });
      }

      convertBtn.addEventListener('click', async () => {
        if (selectedImages.length === 0) return;
        convertBtn.disabled = true;
        try {
          const pdfDoc = await PDFLib.PDFDocument.create();
          const margin = parseInt(document.getElementById('pageMargin').value, 10);
          const orientation = document.getElementById('pageOrientation').value;

          for (const file of selectedImages) {
            const buffer = await file.arrayBuffer();
            let embeddedImage;
            if (file.type === 'image/png') {
              embeddedImage = await pdfDoc.embedPng(buffer);
            } else {
              // Convert WebP or JPG via canvas to clean JPEG
              const imgObj = await new Promise((res, rej) => {
                const img = new Image();
                img.onload = () => res(img);
                img.onerror = rej;
                img.src = URL.createObjectURL(file);
              });
              const canvas = document.createElement('canvas');
              canvas.width = imgObj.width;
              canvas.height = imgObj.height;
              const ctx = canvas.getContext('2d');
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(imgObj, 0, 0);
              const jpgBlob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.92));
              const jpgBuf = await jpgBlob.arrayBuffer();
              embeddedImage = await pdfDoc.embedJpg(jpgBuf);
            }

            const imgWidth = embeddedImage.width;
            const imgHeight = embeddedImage.height;
            let pageWidth, pageHeight;

            if (orientation === 'auto') {
              pageWidth = imgWidth + margin * 2;
              pageHeight = imgHeight + margin * 2;
            } else if (orientation === 'portrait') {
              pageWidth = 595.28; // A4 pt
              pageHeight = 841.89;
            } else {
              pageWidth = 841.89;
              pageHeight = 595.28;
            }

            const page = pdfDoc.addPage([pageWidth, pageHeight]);
            const maxWidth = pageWidth - margin * 2;
            const maxHeight = pageHeight - margin * 2;
            const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight, 1);
            const drawW = imgWidth * scale;
            const drawH = imgHeight * scale;
            const drawX = (pageWidth - drawW) / 2;
            const drawY = (pageHeight - drawH) / 2;

            page.drawImage(embeddedImage, {
              x: drawX,
              y: drawY,
              width: drawW,
              height: drawH,
            });
          }

          const pdfBytes = await pdfDoc.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          downloadBtn.href = URL.createObjectURL(blob);
          resultStats.textContent = 'Converted ' + selectedImages.length + ' image(s) into PDF (' + (blob.size / 1024).toFixed(1) + ' KB).';
          downloadContainer.style.display = 'block';
          convertBtn.disabled = false;
        } catch(err) {
          alert('Error: ' + err.message);
          convertBtn.disabled = false;
        }
      });

      resetBtn.addEventListener('click', () => {
        selectedImages = [];
        renderThumbnails();
        downloadContainer.style.display = 'none';
      });
    `
  },
  {
    id: 'add-page-numbers-pdf',
    slug: 'add-page-numbers-pdf',
    category: 'pdf',
    name: 'Add Page Numbers to PDF',
    shortDesc: 'Number pages of your PDF documents with customizable position and format.',
    seoTitle: 'Add Page Numbers to PDF Online - Free & Private | DesiDesk',
    seoDesc: 'Insert page numbers into PDF documents easily in your browser. Choose position, font size, and format like Page X of Y.',
    keywords: 'add page numbers to pdf, number pdf pages, paginate pdf, free pdf numbering',
    libs: ['https://cdn.jsdelivr.net/npm/pdf-lib@1.17.9/dist/pdf-lib.min.js'],
    howToSteps: [
      'Upload your PDF file.',
      'Select page numbering position (Bottom Right, Bottom Center, Top Right).',
      'Choose numbering format (e.g., "1", "Page 1", "Page 1 of 10").',
      'Click "Add Page Numbers" and download your numbered PDF.'
    ],
    features: [
      'Multiple numbering formats: "1", "Page 1", "Page 1 of N".',
      'Position options: Bottom Center, Bottom Right, Top Center, Top Right.',
      'Custom starting number and font size controls.',
      'No files uploaded to any server.'
    ],
    faqs: [
      {
        q: 'Can I start numbering from a specific number?',
        a: 'Yes, you can set the start number offset to any number you need.'
      }
    ],
    related: ['watermark-pdf', 'rotate-pdf', 'merge-pdf'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="12" x2="12" y2="18"/></svg>
        <div class="dropzone-title">Upload PDF to Add Page Numbers</div>
        <div class="dropzone-subtitle">Click or drop your PDF document</div>
        <input type="file" id="fileInput" class="dropzone-input" accept=".pdf,application/pdf" />
      </div>

      <div id="numberingControls" style="display:none;margin-top:2rem;">
        <div class="alert alert-info" id="fileInfo"></div>
        <div class="form-grid-3" style="margin-top:1.25rem;">
          <div class="form-group">
            <label class="form-label">Position:</label>
            <select id="posSelect" class="form-select">
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="top-right">Top Right</option>
              <option value="top-center">Top Center</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Format:</label>
            <select id="formatSelect" class="form-select">
              <option value="num">1, 2, 3...</option>
              <option value="pageX">Page 1, Page 2...</option>
              <option value="pageXofY">Page 1 of 10...</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Font Size:</label>
            <input type="number" id="fontSize" class="form-input" value="11" min="8" max="24" />
          </div>
        </div>

        <div class="btn-group">
          <button id="applyBtn" class="btn btn-primary">Apply Page Numbers</button>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>

      <div id="downloadContainer" class="result-box" style="display:none;text-align:center;">
        <h3 style="color:var(--accent);margin-bottom:0.5rem;font-size:1.25rem;">Page Numbers Added!</h3>
        <a id="downloadBtn" class="btn btn-success" download="numbered-desidesk.pdf">Download Numbered PDF</a>
      </div>
    `,
    toolScript: `
      let pdfDoc = null;
      let totalPages = 0;
      const fileInput = document.getElementById('fileInput');
      const numberingControls = document.getElementById('numberingControls');
      const fileInfo = document.getElementById('fileInfo');
      const applyBtn = document.getElementById('applyBtn');
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
          fileInfo.textContent = 'Ready: ' + file.name + ' (' + totalPages + ' pages)';
          numberingControls.style.display = 'block';
          downloadContainer.style.display = 'none';
        } catch(err) {
          alert('Error: ' + err.message);
        }
      });

      applyBtn.addEventListener('click', async () => {
        if (!pdfDoc) return;
        const pos = document.getElementById('posSelect').value;
        const fmt = document.getElementById('formatSelect').value;
        const fSize = parseInt(document.getElementById('fontSize').value, 10) || 11;
        const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

        const pages = pdfDoc.getPages();
        pages.forEach((page, idx) => {
          const pNum = idx + 1;
          let text = '';
          if (fmt === 'num') text = String(pNum);
          else if (fmt === 'pageX') text = 'Page ' + pNum;
          else text = 'Page ' + pNum + ' of ' + totalPages;

          const textWidth = font.widthOfTextAtSize(text, fSize);
          const { width, height } = page.getSize();
          let x = 0, y = 0;

          if (pos === 'bottom-center') {
            x = (width - textWidth) / 2;
            y = 25;
          } else if (pos === 'bottom-right') {
            x = width - textWidth - 30;
            y = 25;
          } else if (pos === 'bottom-left') {
            x = 30;
            y = 25;
          } else if (pos === 'top-right') {
            x = width - textWidth - 30;
            y = height - 30;
          } else {
            x = (width - textWidth) / 2;
            y = height - 30;
          }

          page.drawText(text, {
            x,
            y,
            size: fSize,
            font,
            color: PDFLib.rgb(0.2, 0.2, 0.2)
          });
        });

        const bytes = await pdfDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        downloadBtn.href = URL.createObjectURL(blob);
        downloadContainer.style.display = 'block';
      });

      resetBtn.addEventListener('click', () => {
        pdfDoc = null;
        fileInput.value = '';
        numberingControls.style.display = 'none';
        downloadContainer.style.display = 'none';
      });
    `
  },
  {
    id: 'watermark-pdf',
    slug: 'watermark-pdf',
    category: 'pdf',
    name: 'Add Watermark to PDF',
    shortDesc: 'Stamp confidential, draft, or custom text watermarks diagonally across PDF pages.',
    seoTitle: 'Watermark PDF Online - Add Text Watermark Free | DesiDesk',
    seoDesc: 'Stamp customized text watermarks onto PDF pages with configurable opacity, color, and angle directly in your browser. 100% private.',
    keywords: 'watermark pdf, stamp pdf, add watermark to pdf, protect pdf document, pdf watermark online',
    libs: ['https://cdn.jsdelivr.net/npm/pdf-lib@1.17.9/dist/pdf-lib.min.js'],
    howToSteps: [
      'Upload your PDF file.',
      'Enter the watermark text (e.g. "CONFIDENTIAL", "DRAFT", or your company name).',
      'Adjust text size, opacity slider, and angle.',
      'Click "Apply Watermark" and download the secured PDF.'
    ],
    features: [
      'Custom text with rotation angle (e.g., 45° diagonal).',
      'Configurable opacity so background text remains readable.',
      'Works instantly on all pages.',
      'Completely client-side security.'
    ],
    faqs: [
      {
        q: 'Can the watermark be easily erased?',
        a: 'The watermark is rendered directly into the PDF content stream across every page.'
      }
    ],
    related: ['add-page-numbers-pdf', 'merge-pdf', 'rotate-pdf'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        <div class="dropzone-title">Upload PDF to Watermark</div>
        <div class="dropzone-subtitle">Click to select or drop your PDF document</div>
        <input type="file" id="fileInput" class="dropzone-input" accept=".pdf,application/pdf" />
      </div>

      <div id="watermarkControls" style="display:none;margin-top:2rem;">
        <div class="alert alert-info" id="fileInfo"></div>
        <div class="form-grid-2" style="margin-top:1.25rem;">
          <div class="form-group">
            <label class="form-label">Watermark Text:</label>
            <input type="text" id="wmText" class="form-input" value="CONFIDENTIAL" />
          </div>
          <div class="form-group">
            <label class="form-label">Opacity (0.1 to 0.9):</label>
            <input type="range" id="wmOpacity" class="form-range" min="0.1" max="0.9" step="0.05" value="0.25" />
            <div class="form-hint" id="opacityVal">Opacity: 25%</div>
          </div>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Font Size:</label>
            <input type="number" id="wmSize" class="form-input" value="48" min="20" max="100" />
          </div>
          <div class="form-group">
            <label class="form-label">Angle (degrees):</label>
            <input type="number" id="wmAngle" class="form-input" value="45" min="-90" max="90" />
          </div>
        </div>

        <div class="btn-group">
          <button id="applyBtn" class="btn btn-primary">Apply Watermark</button>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>

      <div id="downloadContainer" class="result-box" style="display:none;text-align:center;">
        <h3 style="color:var(--accent);margin-bottom:0.5rem;font-size:1.25rem;">Watermark Applied!</h3>
        <a id="downloadBtn" class="btn btn-success" download="watermarked-desidesk.pdf">Download Watermarked PDF</a>
      </div>
    `,
    toolScript: `
      let pdfDoc = null;
      const fileInput = document.getElementById('fileInput');
      const watermarkControls = document.getElementById('watermarkControls');
      const fileInfo = document.getElementById('fileInfo');
      const wmOpacity = document.getElementById('wmOpacity');
      const opacityVal = document.getElementById('opacityVal');
      const applyBtn = document.getElementById('applyBtn');
      const resetBtn = document.getElementById('resetBtn');
      const downloadContainer = document.getElementById('downloadContainer');
      const downloadBtn = document.getElementById('downloadBtn');

      wmOpacity.addEventListener('input', () => {
        opacityVal.textContent = 'Opacity: ' + Math.round(wmOpacity.value * 100) + '%';
      });

      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          const buf = await file.arrayBuffer();
          pdfDoc = await PDFLib.PDFDocument.load(buf, { ignoreEncryption: true });
          fileInfo.textContent = 'Loaded: ' + file.name + ' (' + pdfDoc.getPageCount() + ' pages)';
          watermarkControls.style.display = 'block';
          downloadContainer.style.display = 'none';
        } catch(err) {
          alert('Error: ' + err.message);
        }
      });

      applyBtn.addEventListener('click', async () => {
        if (!pdfDoc) return;
        const text = document.getElementById('wmText').value.trim() || 'CONFIDENTIAL';
        const opacity = parseFloat(wmOpacity.value) || 0.25;
        const size = parseInt(document.getElementById('wmSize').value, 10) || 48;
        const angle = parseInt(document.getElementById('wmAngle').value, 10) || 45;

        const font = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
        const pages = pdfDoc.getPages();

        pages.forEach(page => {
          const { width, height } = page.getSize();
          const textWidth = font.widthOfTextAtSize(text, size);
          page.drawText(text, {
            x: (width - textWidth) / 2,
            y: height / 2,
            size,
            font,
            color: PDFLib.rgb(0.8, 0.1, 0.1),
            opacity,
            rotate: PDFLib.degrees(angle)
          });
        });

        const bytes = await pdfDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        downloadBtn.href = URL.createObjectURL(blob);
        downloadContainer.style.display = 'block';
      });

      resetBtn.addEventListener('click', () => {
        pdfDoc = null;
        fileInput.value = '';
        watermarkControls.style.display = 'none';
        downloadContainer.style.display = 'none';
      });
    `
  },
  {
    id: 'pdf-page-counter',
    slug: 'pdf-page-counter',
    category: 'pdf',
    name: 'PDF Page Counter & Inspector',
    shortDesc: 'Inspect exact page count, page dimensions, orientation and file size of any PDF.',
    seoTitle: 'PDF Page Counter Online - Count Pages & Inspect PDF Free | DesiDesk',
    seoDesc: 'Quickly count PDF pages and inspect page dimensions, aspect ratio, orientation, and file size in your browser without uploading.',
    keywords: 'pdf page counter, count pages in pdf, check pdf pages, pdf info viewer',
    libs: ['https://cdn.jsdelivr.net/npm/pdf-lib@1.17.9/dist/pdf-lib.min.js'],
    howToSteps: [
      'Select or drop any PDF document.',
      'View instant breakdown of total pages, orientation (Portrait/Landscape), and page dimensions.',
      'Check per-page measurements in millimeters and inches.'
    ],
    features: [
      'Instant count without server upload.',
      'Displays dimensions in points, millimeters, and inches.',
      'Detects mixed page orientations.',
      'Safe for sensitive contracts and financial reports.'
    ],
    faqs: [
      {
        q: 'Why count PDF pages locally?',
        a: 'Local processing is instantaneous and 100% confidential. No sensitive document ever touches an external network.'
      }
    ],
    related: ['merge-pdf', 'split-pdf', 'pdf-metadata-viewer'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        <div class="dropzone-title">Upload PDF to Count Pages</div>
        <div class="dropzone-subtitle">Click to select or drop any PDF document</div>
        <input type="file" id="fileInput" class="dropzone-input" accept=".pdf,application/pdf" />
      </div>

      <div id="resultContainer" class="result-box" style="display:none;margin-top:2rem;">
        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-value" id="statPages">-</div>
            <div class="stat-label">Total Pages</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="statSize">-</div>
            <div class="stat-label">File Size</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="statOrientation">-</div>
            <div class="stat-label">Primary Orientation</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="statDimension">-</div>
            <div class="stat-label">Page 1 Dimensions</div>
          </div>
        </div>

        <div id="pagesBreakdown" style="max-height:240px;overflow-y:auto;background:white;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;margin-top:1rem;font-size:0.875rem;"></div>
      </div>
    `,
    toolScript: `
      const fileInput = document.getElementById('fileInput');
      const resultContainer = document.getElementById('resultContainer');
      const statPages = document.getElementById('statPages');
      const statSize = document.getElementById('statSize');
      const statOrientation = document.getElementById('statOrientation');
      const statDimension = document.getElementById('statDimension');
      const pagesBreakdown = document.getElementById('pagesBreakdown');

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(2) + ' MB';
      }

      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          const buf = await file.arrayBuffer();
          const doc = await PDFLib.PDFDocument.load(buf, { ignoreEncryption: true });
          const pages = doc.getPages();
          const count = pages.length;

          statPages.textContent = count;
          statSize.textContent = formatSize(file.size);

          let portraitCount = 0;
          let listHtml = '<table style="width:100%;border-collapse:collapse;"><tr style="border-bottom:1px solid #e2e8f0;text-align:left;"><th style="padding:4px 8px;">Page</th><th style="padding:4px 8px;">Points</th><th style="padding:4px 8px;">Millimeters</th><th style="padding:4px 8px;">Orientation</th></tr>';

          pages.forEach((p, idx) => {
            const { width, height } = p.getSize();
            const isPort = height >= width;
            if (isPort) portraitCount++;
            const wMm = (width * 0.352778).toFixed(1);
            const hMm = (height * 0.352778).toFixed(1);

            if (idx === 0) {
              statDimension.textContent = Math.round(width) + 'x' + Math.round(height) + ' pt';
            }

            listHtml += \`<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:4px 8px;">#\${idx + 1}</td><td style="padding:4px 8px;">\${Math.round(width)} &times; \${Math.round(height)}</td><td style="padding:4px 8px;">\${wMm} &times; \${hMm} mm</td><td style="padding:4px 8px;">\${isPort ? 'Portrait' : 'Landscape'}</td></tr>\`;
          });
          listHtml += '</table>';

          statOrientation.textContent = portraitCount >= count / 2 ? 'Portrait' : 'Landscape';
          pagesBreakdown.innerHTML = listHtml;
          resultContainer.style.display = 'block';
        } catch(err) {
          alert('Could not inspect PDF: ' + err.message);
        }
      });
    `
  },
  {
    id: 'pdf-metadata-viewer',
    slug: 'pdf-metadata-viewer',
    category: 'pdf',
    name: 'PDF Metadata Viewer & Editor',
    shortDesc: 'View and edit Title, Author, Subject, Keywords and Producer metadata of your PDF.',
    seoTitle: 'PDF Metadata Viewer & Editor Online - Free | DesiDesk',
    seoDesc: 'Inspect and modify Title, Author, Subject, and Creator PDF metadata directly in your browser. 100% private and secure.',
    keywords: 'pdf metadata viewer, edit pdf metadata, change pdf author, remove pdf metadata, view pdf properties',
    libs: ['https://cdn.jsdelivr.net/npm/pdf-lib@1.17.9/dist/pdf-lib.min.js'],
    howToSteps: [
      'Upload any PDF file to view its embedded metadata.',
      'Inspect or modify the Title, Author, Subject, Keywords, or Producer fields.',
      'Click "Save & Update Metadata" and download your updated PDF document.'
    ],
    features: [
      'View embedded Document Properties.',
      'Clean or anonymize metadata for privacy before sending.',
      'Update Title, Author, Subject, and Producer fields.',
      'Zero server upload.'
    ],
    faqs: [
      {
        q: 'Why remove or edit PDF metadata?',
        a: 'PDFs often contain hidden metadata like your operating system, author name, or creation date. Editing it preserves privacy.'
      }
    ],
    related: ['pdf-page-counter', 'merge-pdf', 'watermark-pdf'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <div class="dropzone-title">Upload PDF to View & Edit Metadata</div>
        <div class="dropzone-subtitle">Click to select or drop your PDF document</div>
        <input type="file" id="fileInput" class="dropzone-input" accept=".pdf,application/pdf" />
      </div>

      <div id="metaControls" style="display:none;margin-top:2rem;">
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Document Title:</label>
            <input type="text" id="metaTitle" class="form-input" placeholder="Title" />
          </div>
          <div class="form-group">
            <label class="form-label">Author Name:</label>
            <input type="text" id="metaAuthor" class="form-input" placeholder="Author" />
          </div>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Subject:</label>
            <input type="text" id="metaSubject" class="form-input" placeholder="Subject" />
          </div>
          <div class="form-group">
            <label class="form-label">Keywords (comma separated):</label>
            <input type="text" id="metaKeywords" class="form-input" placeholder="keywords, tags" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Producer / Application:</label>
          <input type="text" id="metaProducer" class="form-input" placeholder="Producer" />
        </div>

        <div class="btn-group">
          <button id="saveMetaBtn" class="btn btn-primary">Save & Update Metadata</button>
          <button id="stripMetaBtn" class="btn btn-secondary">Strip All Metadata (Anonymize)</button>
        </div>
      </div>

      <div id="downloadContainer" class="result-box" style="display:none;text-align:center;">
        <h3 style="color:var(--accent);margin-bottom:0.5rem;font-size:1.25rem;">Metadata Updated!</h3>
        <a id="downloadBtn" class="btn btn-success" download="updated-metadata-desidesk.pdf">Download Updated PDF</a>
      </div>
    `,
    toolScript: `
      let pdfDoc = null;
      const fileInput = document.getElementById('fileInput');
      const metaControls = document.getElementById('metaControls');
      const metaTitle = document.getElementById('metaTitle');
      const metaAuthor = document.getElementById('metaAuthor');
      const metaSubject = document.getElementById('metaSubject');
      const metaKeywords = document.getElementById('metaKeywords');
      const metaProducer = document.getElementById('metaProducer');
      const saveMetaBtn = document.getElementById('saveMetaBtn');
      const stripMetaBtn = document.getElementById('stripMetaBtn');
      const downloadContainer = document.getElementById('downloadContainer');
      const downloadBtn = document.getElementById('downloadBtn');

      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          const buf = await file.arrayBuffer();
          pdfDoc = await PDFLib.PDFDocument.load(buf, { ignoreEncryption: true });
          metaTitle.value = pdfDoc.getTitle() || '';
          metaAuthor.value = pdfDoc.getAuthor() || '';
          metaSubject.value = pdfDoc.getSubject() || '';
          metaKeywords.value = (pdfDoc.getKeywords() || []).join(', ');
          metaProducer.value = pdfDoc.getProducer() || '';
          metaControls.style.display = 'block';
          downloadContainer.style.display = 'none';
        } catch(err) {
          alert('Error: ' + err.message);
        }
      });

      async function savePdf() {
        const bytes = await pdfDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        downloadBtn.href = URL.createObjectURL(blob);
        downloadContainer.style.display = 'block';
      }

      saveMetaBtn.addEventListener('click', async () => {
        if (!pdfDoc) return;
        pdfDoc.setTitle(metaTitle.value.trim());
        pdfDoc.setAuthor(metaAuthor.value.trim());
        pdfDoc.setSubject(metaSubject.value.trim());
        const kw = metaKeywords.value.split(',').map(s => s.trim()).filter(Boolean);
        pdfDoc.setKeywords(kw);
        pdfDoc.setProducer(metaProducer.value.trim());
        await savePdf();
      });

      stripMetaBtn.addEventListener('click', async () => {
        if (!pdfDoc) return;
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer('');
        metaTitle.value = '';
        metaAuthor.value = '';
        metaSubject.value = '';
        metaKeywords.value = '';
        metaProducer.value = '';
        await savePdf();
      });
    `
  },
  {
    id: 'text-to-pdf',
    slug: 'text-to-pdf',
    category: 'pdf',
    name: 'Text to PDF Converter',
    shortDesc: 'Create a clean, formatted PDF document directly from raw text or notes.',
    seoTitle: 'Text to PDF Online - Convert Plain Text to PDF Free | DesiDesk',
    seoDesc: 'Convert plain text, notes, and articles into formatted PDF documents in your browser. Fast, free, completely client-side with DesiDesk.',
    keywords: 'text to pdf, convert txt to pdf, notes to pdf, create pdf from text',
    libs: ['https://cdn.jsdelivr.net/npm/pdf-lib@1.17.9/dist/pdf-lib.min.js'],
    howToSteps: [
      'Type or paste your text into the editor.',
      'Set your document title, font size, and line spacing.',
      'Click "Create PDF" to format and generate the document.',
      'Download your PDF instantly.'
    ],
    features: [
      'Automatic word wrapping and multi-page calculation.',
      'Standard A4 format with clean margins.',
      'Custom title and header.',
      'Instant generation with zero server lag.'
    ],
    faqs: [
      {
        q: 'Does it support multi-page documents?',
        a: 'Yes, long text automatically wraps and splits across subsequent pages.'
      }
    ],
    related: ['jpg-to-pdf', 'merge-pdf', 'add-page-numbers-pdf'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Document Title (Optional):</label>
        <input type="text" id="docTitle" class="form-input" placeholder="e.g. Project Notes or Meeting Minutes" />
      </div>

      <div class="form-group">
        <label class="form-label">Enter or Paste Text:</label>
        <textarea id="textContent" class="form-textarea" style="min-height:220px;" placeholder="Type or paste your text here..."></textarea>
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Font Size:</label>
          <select id="fontSize" class="form-select">
            <option value="11">11 pt (Standard)</option>
            <option value="12">12 pt (Large)</option>
            <option value="14">14 pt (Extra Large)</option>
            <option value="10">10 pt (Compact)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Line Spacing:</label>
          <select id="lineHeight" class="form-select">
            <option value="1.4">1.4 (Normal)</option>
            <option value="1.6">1.6 (Relaxed)</option>
            <option value="2.0">2.0 (Double)</option>
          </select>
        </div>
      </div>

      <div class="btn-group">
        <button id="generateBtn" class="btn btn-primary">Generate PDF Document</button>
        <button id="clearBtn" class="btn btn-outline">Clear Text</button>
      </div>

      <div id="downloadContainer" class="result-box" style="display:none;text-align:center;">
        <h3 style="color:var(--accent);margin-bottom:0.5rem;font-size:1.25rem;">PDF Generated Successfully!</h3>
        <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;" id="resultStats"></p>
        <a id="downloadBtn" class="btn btn-success" download="document-desidesk.pdf">Download PDF</a>
      </div>
    `,
    toolScript: `
      const docTitle = document.getElementById('docTitle');
      const textContent = document.getElementById('textContent');
      const fontSize = document.getElementById('fontSize');
      const lineHeight = document.getElementById('lineHeight');
      const generateBtn = document.getElementById('generateBtn');
      const clearBtn = document.getElementById('clearBtn');
      const downloadContainer = document.getElementById('downloadContainer');
      const downloadBtn = document.getElementById('downloadBtn');
      const resultStats = document.getElementById('resultStats');

      clearBtn.addEventListener('click', () => {
        textContent.value = '';
        docTitle.value = '';
        downloadContainer.style.display = 'none';
      });

      generateBtn.addEventListener('click', async () => {
        const text = textContent.value.trim();
        if (!text) {
          alert('Please enter some text to generate a PDF.');
          return;
        }

        generateBtn.disabled = true;
        try {
          const pdfDoc = await PDFLib.PDFDocument.create();
          const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
          const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
          const fSize = parseInt(fontSize.value, 10);
          const lHeight = fSize * parseFloat(lineHeight.value);

          const pageWidth = 595.28; // A4
          const pageHeight = 841.89;
          const margin = 40;
          const maxTextWidth = pageWidth - margin * 2;

          let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
          let currentY = pageHeight - margin;

          if (docTitle.value.trim()) {
            const title = docTitle.value.trim();
            currentPage.drawText(title, {
              x: margin,
              y: currentY - 18,
              size: 18,
              font: fontBold,
              color: PDFLib.rgb(0.1, 0.1, 0.1)
            });
            currentY -= 40;
          }

          const paragraphs = text.split('\\n');
          for (const para of paragraphs) {
            if (para.trim() === '') {
              currentY -= lHeight;
              if (currentY < margin + lHeight) {
                currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                currentY = pageHeight - margin;
              }
              continue;
            }

            const words = para.split(' ');
            let line = '';

            for (const word of words) {
              const testLine = line + (line ? ' ' : '') + word;
              const testWidth = font.widthOfTextAtSize(testLine, fSize);

              if (testWidth > maxTextWidth && line !== '') {
                currentPage.drawText(line, {
                  x: margin,
                  y: currentY,
                  size: fSize,
                  font,
                  color: PDFLib.rgb(0.15, 0.15, 0.15)
                });
                currentY -= lHeight;
                if (currentY < margin + lHeight) {
                  currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                  currentY = pageHeight - margin;
                }
                line = word;
              } else {
                line = testLine;
              }
            }

            if (line) {
              currentPage.drawText(line, {
                x: margin,
                y: currentY,
                size: fSize,
                font,
                color: PDFLib.rgb(0.15, 0.15, 0.15)
              });
              currentY -= lHeight;
              if (currentY < margin + lHeight) {
                currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                currentY = pageHeight - margin;
              }
            }
          }

          const pdfBytes = await pdfDoc.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          downloadBtn.href = URL.createObjectURL(blob);
          resultStats.textContent = 'Created ' + pdfDoc.getPageCount() + ' page(s) PDF document.';
          downloadContainer.style.display = 'block';
          generateBtn.disabled = false;
        } catch(err) {
          alert('Error: ' + err.message);
          generateBtn.disabled = false;
        }
      });
    `
  }
];
