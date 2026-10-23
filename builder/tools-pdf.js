// builder/tools-pdf.js

module.exports = [
  {
  id: 'compress-pdf',
  slug: 'compress-pdf',
  category: 'pdf',
  name: 'Compress PDF Online',
  shortDesc: 'Reduce PDF file size online while maintaining quality. Batch compress multiple PDFs with ZIP download.',
  seoTitle: 'Compress PDF Online - Reduce PDF File Size Free & Fast | DesiDesk',
  seoDesc: 'Compress PDF files online directly in your browser. Batch reduce PDF size by 50-80% without quality loss. 100% private and free on DesiDesk.',
  keywords: 'compress pdf, reduce pdf size, shrink pdf online, batch compress pdf, pdf compressor free, compress multiple pdfs',
  libs: [
    'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
  ],
  howToSteps: [
    'Select or drop one or more PDF files into the upload area.',
    'Adjust the compression level slider (default 60% provides the best balance of quality and size).',
    'Click "Compress" to optimize all PDF files locally in your browser.',
    'Download individual compressed PDFs or click "Download ZIP" to save all files at once.'
  ],
  features: [
    'Batch Compression: Compress multiple PDF files simultaneously.',
    'Custom Compression Level: Fine-tune compression ratio from 10% to 90%.',
    'Instant Visual Thumbnails: Preview page 1 of each PDF document.',
    'One-Click ZIP Download: Save all compressed documents in a single archive.',
    '100% Client-Side Privacy: Your documents never leave your device.'
  ],
  faqs: [
    {
      q: 'How does client-side PDF compression work?',
      a: 'DesiDesk renders PDF page streams and re-encodes high-resolution embedded images and objects using optimized compression algorithms inside your browser. Your sensitive files are never uploaded to any external server.'
    },
    {
      q: 'Can I compress multiple PDF documents together?',
      a: 'Yes! You can add multiple PDF files at once. Each file will show its original size, new compressed size, and individual download button, plus a "Download ZIP" option to get all files at once.'
    },
    {
      q: 'What compression level should I choose?',
      a: '60% is recommended for everyday documents and email attachments, providing a 40-70% size reduction with crisp text and clear images.'
    }
  ],
  related: ['merge-pdf', 'split-pdf', 'jpg-to-pdf', 'crop-pdf'],
  toolHtml: `
    <!-- Top Controls Bar -->
    <div class="tool-controls-bar" style="background:var(--bg-subtle);border:1px solid var(--border-light);border-radius:var(--radius-lg);padding:1.25rem;margin-bottom:1.5rem;">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.25rem;">
        <div style="display:flex;align-items:center;gap:0.75rem;flex:1;min-width:260px;">
          <label class="form-label" style="margin-bottom:0;display:flex;align-items:center;gap:0.35rem;" title="Higher level gives smaller file size">
            Compression Level
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </label>
          <input type="range" id="compressLevel" class="form-range" min="10" max="90" value="60" style="flex:1;" />
          <span id="levelBadge" style="background:var(--bg-card);border:1px solid var(--border-light);padding:4px 10px;border-radius:var(--radius-md);font-family:var(--font-mono);font-weight:700;font-size:0.9rem;min-width:55px;text-align:center;">60 %</span>
        </div>
        <div style="display:flex;gap:0.75rem;">
          <button type="button" id="startCompressBtn" class="btn btn-primary">Compress</button>
          <button type="button" id="deleteAllBtn" class="btn btn-secondary">Delete All</button>
        </div>
      </div>
    </div>

    <!-- PDF Cards Grid (Screenshot 1 Layout) -->
    <div id="pdfCardGrid" class="pdf-grid">
      <div class="pdf-add-card" id="addMoreCard" onclick="document.getElementById('fileInput').click()">
        <div class="pdf-add-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </div>
        <div class="pdf-add-text">Add More PDF Files</div>
        <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">Drop or click to select</div>
      </div>
    </div>

    <input type="file" id="fileInput" multiple accept=".pdf,application/pdf" style="display:none;" />

    <div id="statusAlert" class="alert alert-info" style="display:none;margin-top:1.25rem;"></div>

    <!-- Bottom Action Bar -->
    <div class="pdf-bottom-bar">
      <div class="pdf-bottom-left">
        <button type="button" class="btn btn-outline" onclick="document.getElementById('fileInput').click()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Select PDF
        </button>
      </div>
      <div class="pdf-bottom-right">
        <button type="button" class="btn-icon-trash" id="trashBtn" title="Clear All Files" aria-label="Clear All">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        </button>
        <button type="button" class="btn btn-primary" id="downloadZipBtn" style="display:none;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download ZIP
        </button>
      </div>
    </div>
  `,
  toolScript: `
    let pdfItems = [];
    const fileInput = document.getElementById('fileInput');
    const compressLevel = document.getElementById('compressLevel');
    const levelBadge = document.getElementById('levelBadge');
    const startCompressBtn = document.getElementById('startCompressBtn');
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    const trashBtn = document.getElementById('trashBtn');
    const downloadZipBtn = document.getElementById('downloadZipBtn');
    const statusAlert = document.getElementById('statusAlert');
    const pdfCardGrid = document.getElementById('pdfCardGrid');
    const addMoreCard = document.getElementById('addMoreCard');

    compressLevel.addEventListener('input', () => {
      levelBadge.textContent = compressLevel.value + ' %';
    });

    function formatSize(bytes) {
      if (!bytes || bytes === 0) return '0 B';
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / 1048576).toFixed(2) + ' MB';
    }

    function truncateName(name, max = 14) {
      if (!name) return '';
      if (name.length <= max) return name;
      const ext = name.substring(name.lastIndexOf('.'));
      return name.substring(0, max - ext.length - 2) + '...' + ext;
    }

    async function renderThumbnail(file, canvas) {
      try {
        if (typeof pdfjsLib !== 'undefined') {
          const buffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1 });
          const scale = Math.min(220 / viewport.width, 220 / viewport.height, 1.5);
          const scaledViewport = page.getViewport({ scale });
          canvas.width = scaledViewport.width;
          canvas.height = scaledViewport.height;
          const ctx = canvas.getContext('2d');
          await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
          return;
        }
      } catch(e) {
        console.warn('PDF.js render fallback:', e);
      }
      canvas.width = 160;
      canvas.height = 220;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 160, 220);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.strokeRect(4, 4, 152, 212);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(16, 16, 36, 44);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PDF', 34, 42);
      ctx.fillStyle = '#475569';
      ctx.font = '11px sans-serif';
      ctx.fillText('Document', 80, 130);
    }

    function renderGrid() {
      Array.from(pdfCardGrid.querySelectorAll('.pdf-card')).forEach(c => c.remove());

      pdfItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'pdf-card';
        card.id = 'pdf-card-' + index;

        let footerText = item.compressedSize 
          ? 'New size: <strong>' + formatSize(item.compressedSize) + '</strong> (' + item.savedRatio + ')'
          : 'Ready to compress';

        card.innerHTML = \`
          <div class="pdf-card-header">
            <span class="pdf-card-name" title="\${item.file.name}">\${truncateName(item.file.name)}</span>
            <span class="pdf-card-size">\${formatSize(item.file.size)}</span>
            <button type="button" class="pdf-card-close" onclick="removePdfItem(\${index})" title="Remove">&times;</button>
          </div>
          <div class="pdf-card-preview">
            <canvas id="thumb-canvas-\${index}"></canvas>
          </div>
          <div class="pdf-card-footer" id="card-footer-\${index}">
            \${footerText}
          </div>
          <div id="card-action-\${index}">
            \${item.downloadUrl ? \`
              <a href="\${item.downloadUrl}" download="compressed-\${item.file.name}" class="btn btn-primary btn-sm btn-block">Download</a>
            \` : ''}
          </div>
        \`;

        pdfCardGrid.insertBefore(card, addMoreCard);

        const canvas = card.querySelector('#thumb-canvas-' + index);
        if (canvas) renderThumbnail(item.file, canvas);
      });

      const hasCompressed = pdfItems.some(i => i.downloadUrl);
      downloadZipBtn.style.display = (pdfItems.length > 1 && hasCompressed) ? 'inline-flex' : 'none';
    }

    window.removePdfItem = function(index) {
      pdfItems.splice(index, 1);
      renderGrid();
      if (pdfItems.length === 0) {
        statusAlert.style.display = 'none';
      }
    };

    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files).filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
      files.forEach(f => {
        pdfItems.push({
          file: f,
          compressedBlob: null,
          compressedSize: null,
          savedRatio: null,
          downloadUrl: null
        });
      });
      fileInput.value = '';
      renderGrid();
    });

    function clearAll() {
      pdfItems = [];
      renderGrid();
      statusAlert.style.display = 'none';
      downloadZipBtn.style.display = 'none';
    }

    deleteAllBtn.addEventListener('click', clearAll);
    trashBtn.addEventListener('click', clearAll);

    async function compressPdfFile(item, level) {
      const file = item.file;
      const origSize = file.size;
      const quality = Math.max(0.15, (100 - level) / 100);
      const scale = Math.max(0.75, 1.6 * quality);

      const arrayBuffer = await file.arrayBuffer();

      if (typeof pdfjsLib !== 'undefined' && typeof PDFLib !== 'undefined') {
        try {
          const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          const numPages = pdfDoc.numPages;
          const newPdf = await PDFLib.PDFDocument.create();

          for (let p = 1; p <= numPages; p++) {
            const page = await pdfDoc.getPage(p);
            const viewport = page.getViewport({ scale: scale });
            const offscreen = document.createElement('canvas');
            offscreen.width = viewport.width;
            offscreen.height = viewport.height;
            const ctx = offscreen.getContext('2d');
            await page.render({ canvasContext: ctx, viewport: viewport }).promise;

            const imgDataUrl = offscreen.toDataURL('image/jpeg', quality);
            const imgBytes = await fetch(imgDataUrl).then(r => r.arrayBuffer());
            const embeddedImg = await newPdf.embedJpg(imgBytes);

            const newPage = newPdf.addPage([viewport.width / scale, viewport.height / scale]);
            newPage.drawImage(embeddedImg, {
              x: 0,
              y: 0,
              width: viewport.width / scale,
              height: viewport.height / scale
            });
          }

          const compressedBytes = await newPdf.save({ useObjectStreams: true });
          if (compressedBytes.length < origSize) {
            return new Blob([compressedBytes], { type: 'application/pdf' });
          }
        } catch(err) {
          console.warn('Raster recompression fallback:', err);
        }
      }

      if (typeof PDFLib !== 'undefined') {
        const doc = await PDFLib.PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const streamBytes = await doc.save({ useObjectStreams: true });
        return new Blob([streamBytes], { type: 'application/pdf' });
      }

      return new Blob([arrayBuffer], { type: 'application/pdf' });
    }

    startCompressBtn.addEventListener('click', async () => {
      if (pdfItems.length === 0) {
        fileInput.click();
        return;
      }

      const level = parseInt(compressLevel.value, 10);
      startCompressBtn.disabled = true;
      statusAlert.className = 'alert alert-info';
      statusAlert.textContent = 'Compressing ' + pdfItems.length + ' PDF document(s) locally...';
      statusAlert.style.display = 'block';

      for (let i = 0; i < pdfItems.length; i++) {
        const item = pdfItems[i];
        const footerEl = document.getElementById('card-footer-' + i);
        if (footerEl) footerEl.innerHTML = '<span style="color:var(--primary);">Compressing...</span>';

        const blob = await compressPdfFile(item, level);
        item.compressedBlob = blob;
        item.compressedSize = blob.size;
        item.downloadUrl = URL.createObjectURL(blob);

        const saved = item.file.size - blob.size;
        const ratio = saved > 0 ? Math.round((saved / item.file.size) * 100) : 0;
        item.savedRatio = ratio > 0 ? '-' + ratio + '%' : 'Optimized';

        if (footerEl) {
          footerEl.innerHTML = 'New size: <strong>' + formatSize(blob.size) + '</strong> (' + item.savedRatio + ')';
        }
        const actionEl = document.getElementById('card-action-' + i);
        if (actionEl) {
          actionEl.innerHTML = \`<a href="\${item.downloadUrl}" download="compressed-\${item.file.name}" class="btn btn-primary btn-sm btn-block">Download</a>\`;
        }
      }

      startCompressBtn.disabled = false;
      statusAlert.className = 'alert alert-success';
      statusAlert.textContent = '✓ Compression completed successfully for all documents!';
      downloadZipBtn.style.display = pdfItems.length > 1 ? 'inline-flex' : 'none';
    });

    downloadZipBtn.addEventListener('click', async () => {
      if (typeof JSZip === 'undefined') {
        alert('ZIP library is loading. Please retry in a moment.');
        return;
      }
      downloadZipBtn.disabled = true;
      downloadZipBtn.textContent = 'Creating ZIP...';

      const zip = new JSZip();
      for (let i = 0; i < pdfItems.length; i++) {
        const item = pdfItems[i];
        if (item.compressedBlob) {
          const buf = await item.compressedBlob.arrayBuffer();
          zip.file('compressed-' + item.file.name, buf);
        }
      }

      const zipContent = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(zipContent);
      a.download = 'compressed-pdfs-desidesk.zip';
      a.click();

      downloadZipBtn.disabled = false;
      downloadZipBtn.innerHTML = \`
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download ZIP
      \`;
    });
  `
  },
  {
  id: 'merge-pdf',
  slug: 'merge-pdf',
  category: 'pdf',
  name: 'Merge PDF Files',
  shortDesc: 'Combine multiple PDF documents into a single organized file in seconds.',
  seoTitle: 'Merge PDF Online - Combine Multiple PDF Files Free | DesiDesk',
  seoDesc: 'Combine multiple PDF files into one document directly in your browser. 100% private, fast, and free client-side PDF merger with DesiDesk.',
  keywords: 'merge pdf, combine pdf files, join pdf, free pdf merger, merge pdf online',
  libs: [
    'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
  ],
  howToSteps: [
    'Click or drag and drop two or more PDF files into the upload zone.',
    'Review uploaded document cards with real visual thumbnails and reorder as desired.',
    'Click "Merge PDF" to let your browser combine them instantly.',
    'Download your consolidated PDF document with one click.'
  ],
  features: [
    'Visual Document Cards: Real page 1 preview thumbnails for each file.',
    '100% Private: All processing happens in your browser with zero server uploads.',
    'Reorder or remove individual documents before combining.',
    'Unlimited file count with no registration required.'
  ],
  faqs: [
    {
      q: 'Are my confidential PDF documents safe?',
      a: 'Yes, absolutely. DesiDesk uses client-side JavaScript via pdf-lib. Your files never leave your computer or phone and are never transmitted to any external server.'
    },
    {
      q: 'Is there a limit on how many PDF files I can merge?',
      a: 'There is no artificial limit set by DesiDesk. You can merge as many files as your device memory can accommodate.'
    }
  ],
  related: ['compress-pdf', 'split-pdf', 'rotate-pdf', 'organize-pdf', 'jpg-to-pdf'],
  toolHtml: `
    <!-- PDF Cards Grid (Screenshot 2 Layout) -->
    <div id="pdfCardGrid" class="pdf-grid">
      <div class="pdf-add-card" id="addMoreCard" onclick="document.getElementById('fileInput').click()">
        <div class="pdf-add-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </div>
        <div class="pdf-add-text">Add PDF or Image Files</div>
        <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">Drop or click to select</div>
      </div>
    </div>

    <input type="file" id="fileInput" multiple accept=".pdf,application/pdf,image/jpeg,image/png" style="display:none;" />

    <div id="statusAlert" class="alert alert-info" style="display:none;margin-top:1.25rem;"></div>

    <!-- Bottom Action Bar (Screenshot 2) -->
    <div class="pdf-bottom-bar">
      <div class="pdf-bottom-left">
        <button type="button" class="btn btn-outline" onclick="document.getElementById('fileInput').click()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Select PDF
        </button>
      </div>
      <div class="pdf-bottom-right">
        <button type="button" class="btn-icon-trash" id="trashBtn" title="Clear All Files" aria-label="Clear All">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        </button>
        <button type="button" class="btn btn-primary" id="mergeBtn" style="display:none;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
          Merge PDF
        </button>
      </div>
    </div>

    <div id="downloadContainer" class="result-box" style="display:none;text-align:center;margin-top:1.5rem;">
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
    const fileInput = document.getElementById('fileInput');
    const pdfCardGrid = document.getElementById('pdfCardGrid');
    const addMoreCard = document.getElementById('addMoreCard');
    const mergeBtn = document.getElementById('mergeBtn');
    const trashBtn = document.getElementById('trashBtn');
    const statusAlert = document.getElementById('statusAlert');
    const downloadContainer = document.getElementById('downloadContainer');
    const downloadBtn = document.getElementById('downloadBtn');
    const resultStats = document.getElementById('resultStats');

    function formatSize(bytes) {
      if (!bytes || bytes === 0) return '0 B';
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / 1048576).toFixed(2) + ' MB';
    }

    function truncateName(name, max = 16) {
      if (!name) return '';
      if (name.length <= max) return name;
      const ext = name.substring(name.lastIndexOf('.'));
      return name.substring(0, max - ext.length - 2) + '...' + ext;
    }

    async function renderThumbnail(file, canvas) {
      try {
        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
          if (typeof pdfjsLib !== 'undefined') {
            const buffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 1 });
            const scale = Math.min(220 / viewport.width, 220 / viewport.height, 1.5);
            const scaledViewport = page.getViewport({ scale });
            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;
            const ctx = canvas.getContext('2d');
            await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
            return;
          }
        } else if (file.type.startsWith('image/')) {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          await new Promise(r => img.onload = r);
          const scale = Math.min(220 / img.width, 220 / img.height, 1);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          return;
        }
      } catch(e) {
        console.warn('Thumbnail render fallback:', e);
      }

      canvas.width = 160;
      canvas.height = 220;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 160, 220);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.strokeRect(4, 4, 152, 212);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(16, 16, 36, 44);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PDF', 34, 42);
      ctx.fillStyle = '#475569';
      ctx.font = '11px sans-serif';
      ctx.fillText('Document', 80, 130);
    }

    function renderGrid() {
      Array.from(pdfCardGrid.querySelectorAll('.pdf-card')).forEach(c => c.remove());

      uploadedFiles.forEach((file, index) => {
        const card = document.createElement('div');
        card.className = 'pdf-card';

        card.innerHTML = \`
          <div class="pdf-card-header">
            <span class="pdf-card-size">\${formatSize(file.size)}</span>
            <div style="display:flex;align-items:center;gap:4px;">
              \${index > 0 ? \`<button type="button" class="pdf-card-close" onclick="moveFile(\${index}, -1)" title="Move Left">&larr;</button>\` : ''}
              \${index < uploadedFiles.length - 1 ? \`<button type="button" class="pdf-card-close" onclick="moveFile(\${index}, 1)" title="Move Right">&rarr;</button>\` : ''}
              <button type="button" class="pdf-card-close" onclick="removeFile(\${index})" title="Remove">&times;</button>
            </div>
          </div>
          <div class="pdf-card-preview">
            <canvas id="merge-thumb-\${index}"></canvas>
          </div>
          <div class="pdf-card-footer" style="margin-bottom:0;">
            <span title="\${file.name}">\${truncateName(file.name, 22)}</span>
          </div>
        \`;

        pdfCardGrid.insertBefore(card, addMoreCard);

        const canvas = card.querySelector('#merge-thumb-' + index);
        if (canvas) renderThumbnail(file, canvas);
      });

      mergeBtn.style.display = uploadedFiles.length >= 2 ? 'inline-flex' : 'none';
    }

    window.moveFile = function(index, dir) {
      const target = index + dir;
      if (target < 0 || target >= uploadedFiles.length) return;
      const temp = uploadedFiles[index];
      uploadedFiles[index] = uploadedFiles[target];
      uploadedFiles[target] = temp;
      renderGrid();
    };

    window.removeFile = function(index) {
      uploadedFiles.splice(index, 1);
      renderGrid();
      if (uploadedFiles.length === 0) {
        downloadContainer.style.display = 'none';
        statusAlert.style.display = 'none';
      }
    };

    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      uploadedFiles = uploadedFiles.concat(files);
      fileInput.value = '';
      renderGrid();
    });

    trashBtn.addEventListener('click', () => {
      uploadedFiles = [];
      renderGrid();
      downloadContainer.style.display = 'none';
      statusAlert.style.display = 'none';
    });

    mergeBtn.addEventListener('click', async () => {
      if (uploadedFiles.length < 2) {
        alert('Please select at least 2 PDF or image files to merge.');
        return;
      }

      if (typeof PDFLib === 'undefined') {
        statusAlert.className = 'alert alert-error';
        statusAlert.textContent = 'PDF engine is loading. Please check your connection and retry in a moment.';
        statusAlert.style.display = 'block';
        return;
      }

      try {
        mergeBtn.disabled = true;
        statusAlert.className = 'alert alert-info';
        statusAlert.textContent = 'Merging ' + uploadedFiles.length + ' documents locally...';
        statusAlert.style.display = 'block';

        const mergedPdf = await PDFLib.PDFDocument.create();
        let totalPages = 0;

        for (const file of uploadedFiles) {
          const buffer = await file.arrayBuffer();
          if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
            const pdf = await PDFLib.PDFDocument.load(buffer, { ignoreEncryption: true });
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach(p => mergedPdf.addPage(p));
            totalPages += copiedPages.length;
          } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            const img = await mergedPdf.embedJpg(buffer);
            const p = mergedPdf.addPage([img.width, img.height]);
            p.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
            totalPages++;
          } else if (file.type === 'image/png') {
            const img = await mergedPdf.embedPng(buffer);
            const p = mergedPdf.addPage([img.width, img.height]);
            p.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
            totalPages++;
          }
        }

        const mergedBytes = await mergedPdf.save({ useObjectStreams: true });
        const blob = new Blob([mergedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        downloadBtn.href = url;
        resultStats.textContent = 'Combined ' + uploadedFiles.length + ' files with a total of ' + totalPages + ' pages (' + formatSize(blob.size) + ').';
        downloadContainer.style.display = 'block';
        statusAlert.style.display = 'none';
        mergeBtn.disabled = false;
      } catch(err) {
        console.error(err);
        statusAlert.className = 'alert alert-error';
        statusAlert.textContent = 'Error merging PDFs: ' + err.message;
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
  shortDesc: 'Extract individual pages or custom page ranges from any PDF document with visual page thumbnails.',
  seoTitle: 'Split PDF Online - Visual Page Splitter Free & Fast | DesiDesk',
  seoDesc: 'Split PDF files and extract custom page ranges visually. Click on page thumbnails, choose ranges, and download separated PDFs with DesiDesk.',
  keywords: 'split pdf, extract pdf pages, separate pdf, split pdf online, visual pdf splitter',
  libs: [
    'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
  ],
  howToSteps: [
    'Upload the PDF document you want to split.',
    'Click on individual page cards to select or deselect them, or use range presets (Odd/Even/All).',
    'Click "Extract Selected Pages" to save a single consolidated document, or "Extract All as ZIP" for individual files.',
    'Download your extracted PDF files immediately.'
  ],
  features: [
    'Visual Page Grid: Live thumbnail rendering of every single page.',
    'One-Click Range Filters: Select All, Deselect All, Odd Pages, or Even Pages.',
    'Extract All to ZIP: Automatically separates every page into individual numbered PDFs.',
    '100% Client-Side Privacy: Processing runs entirely inside your browser.'
  ],
  faqs: [
    {
      q: 'Can I extract non-consecutive pages?',
      a: 'Yes! You can click on any page cards directly to toggle them on or off, or enter comma-separated numbers like 1, 3, 7.'
    },
    {
      q: 'Does splitting maintain original PDF quality?',
      a: 'Yes! Pages are extracted losslessly without compressing or modifying the original text, vector shapes, or fonts.'
    }
  ],
  related: ['compress-pdf', 'merge-pdf', 'rotate-pdf', 'organize-pdf', 'crop-pdf'],
  toolHtml: `
    <!-- Upload Zone -->
    <div class="dropzone" id="dropzone">
      <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/></svg>
      <div class="dropzone-title">Upload PDF to Split</div>
      <div class="dropzone-subtitle">Click to select or drop a single PDF document</div>
      <input type="file" id="fileInput" class="dropzone-input" accept=".pdf,application/pdf" />
    </div>

    <!-- Controls & Visual Page Grid -->
    <div id="splitWorkspace" style="display:none;margin-top:2rem;">
      <div style="background:var(--bg-subtle);border:1px solid var(--border-light);border-radius:var(--radius-lg);padding:1.25rem;margin-bottom:1.5rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:1rem;">
          <div>
            <span id="docInfoBadge" style="font-weight:700;color:var(--secondary);font-size:1.05rem;"></span>
            <span id="docSizeBadge" style="font-size:0.85rem;color:var(--text-muted);margin-left:0.5rem;"></span>
          </div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <button type="button" class="btn btn-outline btn-sm" id="btnSelectAll">Select All</button>
            <button type="button" class="btn btn-outline btn-sm" id="btnSelectNone">Clear All</button>
            <button type="button" class="btn btn-outline btn-sm" id="btnSelectOdd">Odd Pages</button>
            <button type="button" class="btn btn-outline btn-sm" id="btnSelectEven">Even Pages</button>
          </div>
        </div>
        <div>
          <label class="form-label" style="font-size:0.85rem;margin-bottom:0.35rem;">Custom Range Input (or click page cards below):</label>
          <input type="text" id="rangeInput" class="form-input" placeholder="e.g. 1-3, 5, 8-10" />
        </div>
      </div>

      <!-- Pages Grid -->
      <div id="pageCardGrid" class="pdf-grid"></div>

      <!-- Bottom Action Bar -->
      <div class="pdf-bottom-bar">
        <div class="pdf-bottom-left">
          <button type="button" class="btn btn-outline" onclick="document.getElementById('fileInput').click()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Choose Another PDF
          </button>
        </div>
        <div class="pdf-bottom-right">
          <button type="button" class="btn-icon-trash" id="trashBtn" title="Reset" aria-label="Reset">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
          <button type="button" class="btn btn-secondary" id="extractZipBtn">
            Extract All to ZIP
          </button>
          <button type="button" class="btn btn-primary" id="extractSelectedBtn">
            Extract Selected Pages
          </button>
        </div>
      </div>
    </div>

    <div id="statusAlert" class="alert alert-info" style="display:none;margin-top:1.25rem;"></div>

    <div id="downloadContainer" class="result-box" style="display:none;text-align:center;margin-top:1.5rem;">
      <h3 style="color:var(--accent);margin-bottom:0.5rem;font-size:1.25rem;">Extraction Complete!</h3>
      <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;" id="resultStats"></p>
      <a id="downloadBtn" class="btn btn-success" download="split-desidesk.pdf">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download Extracted File
      </a>
    </div>
  `,
  toolScript: `
    let currentFile = null;
    let currentBuffer = null;
    let totalPages = 0;
    let selectedPages = new Set();

    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const splitWorkspace = document.getElementById('splitWorkspace');
    const docInfoBadge = document.getElementById('docInfoBadge');
    const docSizeBadge = document.getElementById('docSizeBadge');
    const rangeInput = document.getElementById('rangeInput');
    const pageCardGrid = document.getElementById('pageCardGrid');
    const btnSelectAll = document.getElementById('btnSelectAll');
    const btnSelectNone = document.getElementById('btnSelectNone');
    const btnSelectOdd = document.getElementById('btnSelectOdd');
    const btnSelectEven = document.getElementById('btnSelectEven');
    const extractSelectedBtn = document.getElementById('extractSelectedBtn');
    const extractZipBtn = document.getElementById('extractZipBtn');
    const trashBtn = document.getElementById('trashBtn');
    const statusAlert = document.getElementById('statusAlert');
    const downloadContainer = document.getElementById('downloadContainer');
    const downloadBtn = document.getElementById('downloadBtn');
    const resultStats = document.getElementById('resultStats');

    function formatSize(bytes) {
      if (!bytes) return '0 B';
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / 1048576).toFixed(2) + ' MB';
    }

    function updateRangeInputFromSet() {
      const sorted = Array.from(selectedPages).sort((a,b) => a - b);
      if (sorted.length === 0) {
        rangeInput.value = '';
        return;
      }
      let ranges = [];
      let start = sorted[0];
      let end = start;
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] === end + 1) {
          end = sorted[i];
        } else {
          ranges.push(start === end ? '' + start : start + '-' + end);
          start = sorted[i];
          end = start;
        }
      }
      ranges.push(start === end ? '' + start : start + '-' + end);
      rangeInput.value = ranges.join(', ');
    }

    function parseRangeInput(text) {
      const pages = new Set();
      if (!text.trim()) return pages;
      const parts = text.split(',');
      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [s, e] = trimmed.split('-').map(x => parseInt(x.trim(), 10));
          if (!isNaN(s) && !isNaN(e)) {
            for (let p = Math.max(1, s); p <= Math.min(totalPages, e); p++) {
              pages.add(p);
            }
          }
        } else {
          const p = parseInt(trimmed, 10);
          if (!isNaN(p) && p >= 1 && p <= totalPages) {
            pages.add(p);
          }
        }
      }
      return pages;
    }

    function syncCardSelections() {
      for (let p = 1; p <= totalPages; p++) {
        const card = document.getElementById('page-card-' + p);
        const chk = document.getElementById('chk-page-' + p);
        const isSelected = selectedPages.has(p);
        if (card) {
          if (isSelected) {
            card.style.borderColor = 'var(--primary)';
            card.style.boxShadow = '0 0 0 2px var(--primary)';
          } else {
            card.style.borderColor = 'var(--border-light)';
            card.style.boxShadow = 'none';
          }
        }
        if (chk) chk.checked = isSelected;
      }
      extractSelectedBtn.textContent = 'Extract Selected Pages (' + selectedPages.size + ')';
    }

    rangeInput.addEventListener('input', () => {
      selectedPages = parseRangeInput(rangeInput.value);
      syncCardSelections();
    });

    btnSelectAll.addEventListener('click', () => {
      selectedPages = new Set();
      for (let i = 1; i <= totalPages; i++) selectedPages.add(i);
      updateRangeInputFromSet();
      syncCardSelections();
    });

    btnSelectNone.addEventListener('click', () => {
      selectedPages.clear();
      updateRangeInputFromSet();
      syncCardSelections();
    });

    btnSelectOdd.addEventListener('click', () => {
      selectedPages = new Set();
      for (let i = 1; i <= totalPages; i += 2) selectedPages.add(i);
      updateRangeInputFromSet();
      syncCardSelections();
    });

    btnSelectEven.addEventListener('click', () => {
      selectedPages = new Set();
      for (let i = 2; i <= totalPages; i += 2) selectedPages.add(i);
      updateRangeInputFromSet();
      syncCardSelections();
    });

    async function loadPdfDocument(file) {
      currentFile = file;
      currentBuffer = await file.arrayBuffer();

      dropzone.style.display = 'none';
      splitWorkspace.style.display = 'block';
      downloadContainer.style.display = 'none';
      statusAlert.style.display = 'none';

      docSizeBadge.textContent = '(' + formatSize(file.size) + ')';

      try {
        let pdfJsDoc = null;
        if (typeof pdfjsLib !== 'undefined') {
          pdfJsDoc = await pdfjsLib.getDocument({ data: currentBuffer.slice(0) }).promise;
          totalPages = pdfJsDoc.numPages;
        } else if (typeof PDFLib !== 'undefined') {
          const pdfDoc = await PDFLib.PDFDocument.load(currentBuffer.slice(0), { ignoreEncryption: true });
          totalPages = pdfDoc.getPageCount();
        }

        docInfoBadge.textContent = file.name + ' • ' + totalPages + ' Pages';
        selectedPages = new Set();
        for (let p = 1; p <= totalPages; p++) selectedPages.add(p);
        updateRangeInputFromSet();

        pageCardGrid.innerHTML = '';
        for (let p = 1; p <= totalPages; p++) {
          const card = document.createElement('div');
          card.className = 'pdf-card';
          card.id = 'page-card-' + p;
          card.style.cursor = 'pointer';

          card.innerHTML = \`
            <div class="pdf-card-header">
              <span style="font-weight:700;color:var(--secondary);">Page \${p}</span>
              <input type="checkbox" id="chk-page-\${p}" checked style="width:18px;height:18px;cursor:pointer;" />
            </div>
            <div class="pdf-card-preview" style="height:210px;">
              <canvas id="page-canvas-\${p}"></canvas>
            </div>
          \`;

          card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT') {
              const chk = document.getElementById('chk-page-' + p);
              if (chk) chk.checked = !chk.checked;
            }
            const isChecked = document.getElementById('chk-page-' + p).checked;
            if (isChecked) selectedPages.add(p);
            else selectedPages.delete(p);
            updateRangeInputFromSet();
            syncCardSelections();
          });

          pageCardGrid.appendChild(card);

          if (pdfJsDoc) {
            const canvas = card.querySelector('#page-canvas-' + p);
            (async function(pageNum, c) {
              try {
                const page = await pdfJsDoc.getPage(pageNum);
                const viewport = page.getViewport({ scale: 1 });
                const scale = Math.min(200 / viewport.width, 200 / viewport.height, 1.2);
                const scaledViewport = page.getViewport({ scale });
                c.width = scaledViewport.width;
                c.height = scaledViewport.height;
                const ctx = c.getContext('2d');
                await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
              } catch(e) {
                console.warn('Page thumbnail error:', e);
              }
            })(p, canvas);
          }
        }

        syncCardSelections();
      } catch(err) {
        statusAlert.className = 'alert alert-error';
        statusAlert.textContent = 'Could not read PDF: ' + err.message;
        statusAlert.style.display = 'block';
      }
    }

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        loadPdfDocument(e.target.files[0]);
      }
    });

    function resetTool() {
      currentFile = null;
      currentBuffer = null;
      totalPages = 0;
      selectedPages.clear();
      fileInput.value = '';
      dropzone.style.display = 'block';
      splitWorkspace.style.display = 'none';
      downloadContainer.style.display = 'none';
      statusAlert.style.display = 'none';
    }

    trashBtn.addEventListener('click', resetTool);

    extractSelectedBtn.addEventListener('click', async () => {
      if (selectedPages.size === 0) {
        alert('Please select at least 1 page to extract.');
        return;
      }

      try {
        extractSelectedBtn.disabled = true;
        statusAlert.className = 'alert alert-info';
        statusAlert.textContent = 'Extracting ' + selectedPages.size + ' page(s)...';
        statusAlert.style.display = 'block';

        const pdfDoc = await PDFLib.PDFDocument.load(currentBuffer.slice(0), { ignoreEncryption: true });
        const newPdf = await PDFLib.PDFDocument.create();

        const sortedIndices = Array.from(selectedPages).sort((a,b) => a - b).map(p => p - 1);
        const copied = await newPdf.copyPages(pdfDoc, sortedIndices);
        copied.forEach(p => newPdf.addPage(p));

        const bytes = await newPdf.save({ useObjectStreams: true });
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        downloadBtn.href = url;
        downloadBtn.download = 'split-' + currentFile.name;
        resultStats.textContent = 'Extracted ' + selectedPages.size + ' page(s) into a new PDF (' + formatSize(blob.size) + ').';
        downloadContainer.style.display = 'block';
        statusAlert.style.display = 'none';
        extractSelectedBtn.disabled = false;
      } catch(err) {
        console.error(err);
        statusAlert.className = 'alert alert-error';
        statusAlert.textContent = 'Split error: ' + err.message;
        extractSelectedBtn.disabled = false;
      }
    });

    extractZipBtn.addEventListener('click', async () => {
      if (typeof JSZip === 'undefined') {
        alert('ZIP library is loading. Please retry in a moment.');
        return;
      }

      try {
        extractZipBtn.disabled = true;
        statusAlert.className = 'alert alert-info';
        statusAlert.textContent = 'Extracting all ' + totalPages + ' pages into separate PDFs...';
        statusAlert.style.display = 'block';

        const pdfDoc = await PDFLib.PDFDocument.load(currentBuffer.slice(0), { ignoreEncryption: true });
        const zip = new JSZip();

        for (let p = 0; p < totalPages; p++) {
          const singlePdf = await PDFLib.PDFDocument.create();
          const [copied] = await singlePdf.copyPages(pdfDoc, [p]);
          singlePdf.addPage(copied);
          const bytes = await singlePdf.save({ useObjectStreams: true });
          const pageNumStr = String(p + 1).padStart(3, '0');
          zip.file('page_' + pageNumStr + '.pdf', bytes);
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);

        downloadBtn.href = url;
        downloadBtn.download = 'pages-' + currentFile.name.replace(/\\.pdf$/i, '') + '.zip';
        resultStats.textContent = 'All ' + totalPages + ' pages separated into individual PDFs (' + formatSize(zipBlob.size) + ').';
        downloadContainer.style.display = 'block';
        statusAlert.style.display = 'none';
        extractZipBtn.disabled = false;
      } catch(err) {
        console.error(err);
        statusAlert.className = 'alert alert-error';
        statusAlert.textContent = 'ZIP extraction error: ' + err.message;
        extractZipBtn.disabled = false;
      }
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
    libs: ['https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'],
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
    libs: ['https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'],
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
    libs: ['https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'],
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
    libs: ['https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'],
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
    libs: ['https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'],
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
    libs: ['https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'],
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
    libs: ['https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'],
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
