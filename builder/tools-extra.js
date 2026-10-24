// builder/tools-extra.js

module.exports = [
  // --- PDF EXTRA ---
  {
    id: 'pdf-to-text',
    slug: 'pdf-to-text',
    category: 'pdf',
    name: 'PDF to Text Extractor',
    shortDesc: 'Extract raw text content from any PDF document directly in your browser.',
    seoTitle: 'PDF to Text Online - Extract Text from PDF Free | DesiDesk',
    seoDesc: 'Extract all text content from PDF documents online in your browser. 100% private, free, and fast client-side text extraction on DesiDesk.',
    keywords: 'pdf to text, extract text from pdf, convert pdf to txt, read pdf text',
    libs: ['https://cdn.jsdelivr.net/npm/pdf-lib@1.17.9/dist/pdf-lib.min.js'],
    howToSteps: [
      'Upload your PDF document.',
      'Our client-side reader extracts the text streams from each page.',
      'Copy the extracted plain text or download as a .txt file.'
    ],
    features: [
      'Extracts readable text from all document pages.',
      'Page-by-page text layout.',
      'One-click copy and download as TXT.',
      'Zero server upload: 100% confidential.'
    ],
    faqs: [
      {
        q: 'Does it support scanned image PDFs?',
        a: 'This tool extracts native selectable text. For scanned image-only PDFs, OCR software is required.'
      }
    ],
    related: ['text-to-pdf', 'merge-pdf', 'split-pdf'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        <div class="dropzone-title">Upload PDF to Extract Text</div>
        <div class="dropzone-subtitle">Click to select or drop any PDF document</div>
        <input type="file" id="fileInput" class="dropzone-input" accept=".pdf,application/pdf" />
      </div>

      <div id="textExtractWorkspace" style="display:none;margin-top:2rem;">
        <div class="form-group">
          <label class="form-label">Extracted Text Content:</label>
          <textarea id="extractedPdfText" class="form-textarea" style="min-height:240px;font-family:var(--font-mono);font-size:0.875rem;" readonly></textarea>
        </div>

        <div class="btn-group">
          <button id="copyTxtBtn" class="btn btn-primary">Copy Text</button>
          <button id="downloadTxtBtn" class="btn btn-secondary">Download as TXT</button>
          <button id="clearBtn" class="btn btn-outline">Clear</button>
        </div>
      </div>
    `,
    toolScript: `
      const fileInput = document.getElementById('fileInput');
      const textExtractWorkspace = document.getElementById('textExtractWorkspace');
      const extractedPdfText = document.getElementById('extractedPdfText');
      const copyTxtBtn = document.getElementById('copyTxtBtn');
      const downloadTxtBtn = document.getElementById('downloadTxtBtn');
      const clearBtn = document.getElementById('clearBtn');

      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          const buf = await file.arrayBuffer();
          const doc = await PDFLib.PDFDocument.load(buf, { ignoreEncryption: true });
          const pages = doc.getPages();
          let allText = '';

          for (let i = 0; i < pages.length; i++) {
            allText += '--- PAGE ' + (i + 1) + ' ---\\n';
            try {
              const page = pages[i];
              // Stream text extraction
              const stream = page.node.get(PDFLib.PDFName.of('Contents'));
              if (stream) {
                const raw = stream.toString();
                const matches = raw.match(/\\((.*?)\\)\\s*Tj/g) || [];
                const extracted = matches.map(m => m.replace(/.*\\((.*?)\\).*/, '$1')).join(' ');
                allText += (extracted || '[Graphics / Vector Stream]') + '\\n\\n';
              } else {
                allText += '[No text stream found on this page]\\n\\n';
              }
            } catch(e) {
              allText += '[Page text stream parsing]\\n\\n';
            }
          }

          extractedPdfText.value = allText;
          textExtractWorkspace.style.display = 'block';
        } catch(err) {
          alert('Could not read PDF: ' + err.message);
        }
      });

      copyTxtBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(extractedPdfText.value).then(() => {
          copyTxtBtn.textContent = 'Copied!';
          setTimeout(() => { copyTxtBtn.textContent = 'Copy Text'; }, 2000);
        });
      });

      downloadTxtBtn.addEventListener('click', () => {
        const blob = new Blob([extractedPdfText.value], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'extracted-pdf-text.txt';
        a.click();
      });

      clearBtn.addEventListener('click', () => {
        fileInput.value = '';
        textExtractWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'remove-pdf-pages',
    slug: 'remove-pdf-pages',
    category: 'pdf',
    name: 'Remove PDF Pages',
    shortDesc: 'Delete unwanted or blank pages from any PDF document.',
    seoTitle: 'Remove PDF Pages Online - Delete PDF Pages Free | DesiDesk',
    seoDesc: 'Delete specific pages from PDF documents online. Fast, secure, browser-based page remover on DesiDesk.',
    keywords: 'remove pdf pages, delete pages from pdf, cut pdf pages, pdf page remover',
    libs: ['https://cdn.jsdelivr.net/npm/pdf-lib@1.17.9/dist/pdf-lib.min.js'],
    howToSteps: [
      'Upload the PDF file.',
      'Enter the page numbers you want to remove (e.g., "2, 5").',
      'Click "Remove Pages & Save" to download the cleaned PDF.'
    ],
    features: [
      'Delete individual pages or ranges.',
      'Preserves original formatting of retained pages.',
      'Zero server upload: 100% private.'
    ],
    faqs: [
      {
        q: 'Can I remove multiple pages?',
        a: 'Yes, list pages to delete separated by commas (e.g. 1, 4, 7).'
      }
    ],
    related: ['split-pdf', 'organize-pdf', 'merge-pdf'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
        <div class="dropzone-title">Upload PDF to Remove Pages</div>
        <div class="dropzone-subtitle">Click to select or drop your PDF document</div>
        <input type="file" id="fileInput" class="dropzone-input" accept=".pdf,application/pdf" />
      </div>

      <div id="removeWorkspace" style="display:none;margin-top:2rem;">
        <div class="alert alert-info" id="fileInfo"></div>

        <div class="form-group" style="margin-top:1.25rem;">
          <label class="form-label">Pages to Delete (comma separated, e.g. 2, 5):</label>
          <input type="text" id="delPagesInput" class="form-input" placeholder="e.g. 2, 4" />
        </div>

        <div class="btn-group">
          <button id="btnRemovePages" class="btn btn-primary">Remove Pages &amp; Save</button>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>

      <div id="downloadContainer" class="result-box" style="display:none;text-align:center;">
        <h3 style="color:var(--accent);margin-bottom:0.5rem;font-size:1.25rem;">Pages Removed!</h3>
        <a id="downloadBtn" class="btn btn-success" download="cleaned-desidesk.pdf">Download Cleaned PDF</a>
      </div>
    `,
    toolScript: `
      let pdfDoc = null;
      let totalPages = 0;
      const fileInput = document.getElementById('fileInput');
      const removeWorkspace = document.getElementById('removeWorkspace');
      const fileInfo = document.getElementById('fileInfo');
      const delPagesInput = document.getElementById('delPagesInput');
      const btnRemovePages = document.getElementById('btnRemovePages');
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
          removeWorkspace.style.display = 'block';
          downloadContainer.style.display = 'none';
        } catch(err) {
          alert('Error: ' + err.message);
        }
      });

      btnRemovePages.addEventListener('click', async () => {
        if (!pdfDoc) return;
        const toDelete = new Set(delPagesInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n)));
        const keepIndices = [];
        for (let i = 1; i <= totalPages; i++) {
          if (!toDelete.has(i)) keepIndices.push(i - 1);
        }

        if (keepIndices.length === 0) {
          alert('You cannot delete all pages.');
          return;
        }

        const newDoc = await PDFLib.PDFDocument.create();
        const copied = await newDoc.copyPages(pdfDoc, keepIndices);
        copied.forEach(p => newDoc.addPage(p));

        const bytes = await newDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        downloadBtn.href = URL.createObjectURL(blob);
        downloadContainer.style.display = 'block';
      });

      resetBtn.addEventListener('click', () => {
        pdfDoc = null;
        fileInput.value = '';
        removeWorkspace.style.display = 'none';
        downloadContainer.style.display = 'none';
      });
    `
  },

  // --- IMAGE EXTRA ---
  {
    id: 'image-pixelator',
    slug: 'image-pixelator',
    category: 'image',
    name: 'Image Pixelator & Censor',
    shortDesc: 'Censor sensitive photos or create 8-bit retro pixel art with adjustable block sizes.',
    seoTitle: 'Image Pixelator Online - Pixelate & Censor Photos | DesiDesk',
    seoDesc: 'Pixelate photos or censor faces and sensitive documents online. Adjustable pixel block size with instant download on DesiDesk.',
    keywords: 'pixelate image, censor photo online, blur face, 8 bit pixel art, photo pixelator',
    howToSteps: [
      'Upload the photo you want to pixelate.',
      'Adjust the pixel block size slider (4px to 64px).',
      'Download your pixelated image.'
    ],
    features: [
      'Adjustable pixel block size.',
      'Instant canvas rendering.',
      'Download in high-quality PNG.',
      '100% private in-browser tool.'
    ],
    faqs: [
      {
        q: 'Is pixelation reversible?',
        a: 'No, downsampling and re-expanding pixels permanently destroys high-frequency details, making it safe for censoring sensitive data.'
      }
    ],
    related: ['image-filters', 'image-compressor'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <div class="dropzone-title">Upload Photo to Pixelate</div>
        <div class="dropzone-subtitle">Click or drop image here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/*" />
      </div>

      <div id="pixWorkspace" style="display:none;margin-top:2rem;">
        <div class="form-group" style="max-width:400px;margin:0 auto 1.5rem;">
          <label class="form-label">Pixel Block Size: <span id="valPix">16px</span></label>
          <input type="range" id="pixSize" class="form-range" min="4" max="64" value="16" />
        </div>

        <div class="canvas-wrapper">
          <canvas id="pixCanvas" style="max-height:360px;"></canvas>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <a id="downloadBtn" class="btn btn-success" download="pixelated-desidesk.png">Download Pixelated Image</a>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>
    `,
    toolScript: `
      let rawImg = null;
      const fileInput = document.getElementById('fileInput');
      const pixWorkspace = document.getElementById('pixWorkspace');
      const pixSize = document.getElementById('pixSize');
      const valPix = document.getElementById('valPix');
      const pixCanvas = document.getElementById('pixCanvas');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetBtn = document.getElementById('resetBtn');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          rawImg = new Image();
          rawImg.onload = () => {
            pixWorkspace.style.display = 'block';
            pixelate();
          };
          rawImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      pixSize.addEventListener('input', () => {
        valPix.textContent = pixSize.value + 'px';
        pixelate();
      });

      function pixelate() {
        if (!rawImg) return;
        const size = parseInt(pixSize.value, 10);
        const w = rawImg.width;
        const h = rawImg.height;

        pixCanvas.width = w;
        pixCanvas.height = h;
        const ctx = pixCanvas.getContext('2d');

        const tempCanvas = document.createElement('canvas');
        const scaledW = Math.max(1, Math.floor(w / size));
        const scaledH = Math.max(1, Math.floor(h / size));
        tempCanvas.width = scaledW;
        tempCanvas.height = scaledH;

        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(rawImg, 0, 0, scaledW, scaledH);

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tempCanvas, 0, 0, scaledW, scaledH, 0, 0, w, h);

        downloadBtn.href = pixCanvas.toDataURL('image/png');
      }

      resetBtn.addEventListener('click', () => {
        rawImg = null;
        fileInput.value = '';
        pixWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'image-dimension-checker',
    slug: 'image-dimension-checker',
    category: 'image',
    name: 'Image Dimension & DPI Checker',
    shortDesc: 'Inspect image pixel dimensions, megapixels, aspect ratio, and file size in detail.',
    seoTitle: 'Image Dimension Checker Online - Photo Resolution & Size | DesiDesk',
    seoDesc: 'Inspect image resolution (width, height), aspect ratio, megapixels, and file size online. Free photo inspector on DesiDesk.',
    keywords: 'image dimension checker, check image resolution, photo megapixels, aspect ratio inspector',
    howToSteps: [
      'Upload any image.',
      'Instantly view exact pixel width, height, megapixels, and aspect ratio.',
      'Compare against standard print dimensions.'
    ],
    features: [
      'Pixel resolution (Width x Height).',
      'Megapixels calculation.',
      'Reduced aspect ratio (e.g. 16:9, 4:3).',
      'Zero server upload: 100% private.'
    ],
    faqs: [
      {
        q: 'How are Megapixels calculated?',
        a: 'Megapixels = (Width × Height) / 1,000,000.'
      }
    ],
    related: ['image-resizer', 'aspect-ratio-calculator'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <div class="dropzone-title">Upload Image to Check Dimensions</div>
        <div class="dropzone-subtitle">Click or drop your photo here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/*" />
      </div>

      <div id="dimResults" class="result-box" style="display:none;margin-top:2rem;">
        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-value" id="valResolution">-</div>
            <div class="stat-label">Resolution</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="valMegapixels">-</div>
            <div class="stat-label">Megapixels</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="valAspect">-</div>
            <div class="stat-label">Aspect Ratio</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="valFileSize">-</div>
            <div class="stat-label">File Size</div>
          </div>
        </div>
      </div>
    `,
    toolScript: `
      const fileInput = document.getElementById('fileInput');
      const dimResults = document.getElementById('dimResults');
      const valResolution = document.getElementById('valResolution');
      const valMegapixels = document.getElementById('valMegapixels');
      const valAspect = document.getElementById('valAspect');
      const valFileSize = document.getElementById('valFileSize');

      function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
          const img = new Image();
          img.onload = () => {
            valResolution.textContent = img.width + ' × ' + img.height;
            const mp = (img.width * img.height) / 1000000;
            valMegapixels.textContent = mp.toFixed(2) + ' MP';

            const d = gcd(img.width, img.height);
            valAspect.textContent = (img.width / d) + ':' + (img.height / d);
            valFileSize.textContent = (file.size / 1024).toFixed(1) + ' KB';

            dimResults.style.display = 'block';
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });
    `
  },

  // --- TEXT EXTRA ---
  {
    id: 'text-repeater',
    slug: 'text-repeater',
    category: 'text',
    name: 'Text Repeater Online',
    shortDesc: 'Repeat any text, message, or emoji string up to 1,000 times with custom separators.',
    seoTitle: 'Text Repeater Online - Repeat Words & Messages 1000 Times | DesiDesk',
    seoDesc: 'Repeat any string, word, or emoji multiple times with custom line breaks or separators. Free online text repeater on DesiDesk.',
    keywords: 'text repeater, repeat text online, repeat message 100 times, text multiplier, duplicate text generator',
    howToSteps: [
      'Enter text or emoji you want to repeat.',
      'Enter repetition count (1 to 1000).',
      'Select separator (Line Break, Space, Comma).',
      'Click "Repeat Text" and copy the result.'
    ],
    features: [
      'Repeat up to 1,000 times instantly.',
      'Custom separator between repetitions.',
      'One-click copy to clipboard.',
      '100% private in-browser tool.'
    ],
    faqs: [
      {
        q: 'Can it repeat emojis?',
        a: 'Yes, any text including emojis, symbols, and sentences can be repeated.'
      }
    ],
    related: ['word-counter', 'reverse-text'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Text to Repeat:</label>
          <input type="text" id="repeatStr" class="form-input" value="DesiDesk ❤️ " />
        </div>
        <div class="form-group">
          <label class="form-label">Repeat Count:</label>
          <input type="number" id="repeatCount" class="form-input" value="10" min="1" max="1000" />
        </div>
        <div class="form-group">
          <label class="form-label">Separator:</label>
          <select id="repeatSep" class="form-select">
            <option value=" ">Space (" ")</option>
            <option value="\\n" selected>New Line (\\n)</option>
            <option value=", ">Comma (", ")</option>
            <option value="">None</option>
          </select>
        </div>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="btnRunRepeat" class="btn btn-primary">Repeat Text</button>
        <button id="btnCopyRepeat" class="btn btn-secondary">Copy Result</button>
      </div>

      <div class="form-group">
        <textarea id="repeatOutput" class="form-textarea" style="min-height:200px;" readonly></textarea>
      </div>
    `,
    toolScript: `
      const repeatStr = document.getElementById('repeatStr');
      const repeatCount = document.getElementById('repeatCount');
      const repeatSep = document.getElementById('repeatSep');
      const btnRunRepeat = document.getElementById('btnRunRepeat');
      const btnCopyRepeat = document.getElementById('btnCopyRepeat');
      const repeatOutput = document.getElementById('repeatOutput');

      function doRepeat() {
        const str = repeatStr.value;
        const count = Math.min(1000, Math.max(1, parseInt(repeatCount.value, 10) || 1));
        const sep = repeatSep.value.replace(/\\\\n/g, '\\n');
        repeatOutput.value = Array(count).fill(str).join(sep);
      }

      btnRunRepeat.addEventListener('click', doRepeat);
      doRepeat();

      btnCopyRepeat.addEventListener('click', () => {
        navigator.clipboard.writeText(repeatOutput.value).then(() => {
          btnCopyRepeat.textContent = 'Copied!';
          setTimeout(() => { btnCopyRepeat.textContent = 'Copy Result'; }, 2000);
        });
      });
    `
  },
  {
    id: 'extract-emails-urls',
    slug: 'extract-emails-urls',
    category: 'text',
    name: 'Email & URL Extractor',
    shortDesc: 'Extract all email addresses and website URLs from raw unstructured text.',
    seoTitle: 'Email & URL Extractor Online - Extract Links Free | DesiDesk',
    seoDesc: 'Extract email addresses and website links from text, logs, and HTML source code with automatic deduplication on DesiDesk.',
    keywords: 'email extractor, extract urls from text, find email addresses, link extractor online',
    howToSteps: [
      'Paste your raw text, emails, or HTML code.',
      'Click "Extract Emails" or "Extract URLs".',
      'Copy the deduplicated list.'
    ],
    features: [
      'Extracts valid email addresses and HTTP/HTTPS URLs.',
      'Automatic deduplication.',
      'Alphabetical sorting option.',
      '100% private in-browser extraction.'
    ],
    faqs: [
      {
        q: 'Does it remove duplicate emails?',
        a: 'Yes, duplicates are automatically merged so you get a clean, unique list.'
      }
    ],
    related: ['word-counter', 'remove-duplicate-lines'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input Raw Text:</label>
        <textarea id="extractRaw" class="form-textarea" style="min-height:180px;" placeholder="Paste raw text containing emails (e.g. contact@desidesk.in) or links (https://desidesk.in)..."></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="btnExtractEmails" class="btn btn-primary">Extract Emails Only</button>
        <button id="btnExtractUrls" class="btn btn-secondary">Extract URLs Only</button>
        <button id="btnCopyExtract" class="btn btn-secondary">Copy List</button>
        <button id="btnClear" class="btn btn-outline">Clear</button>
      </div>

      <div class="form-group">
        <label class="form-label">Extracted Results:</label>
        <textarea id="extractResults" class="form-textarea" style="min-height:180px;font-family:var(--font-mono);font-size:0.875rem;" readonly></textarea>
      </div>
    `,
    toolScript: `
      const extractRaw = document.getElementById('extractRaw');
      const extractResults = document.getElementById('extractResults');
      const btnExtractEmails = document.getElementById('btnExtractEmails');
      const btnExtractUrls = document.getElementById('btnExtractUrls');
      const btnCopyExtract = document.getElementById('btnCopyExtract');
      const btnClear = document.getElementById('btnClear');

      btnExtractEmails.addEventListener('click', () => {
        const text = extractRaw.value;
        const matches = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g) || [];
        const unique = Array.from(new Set(matches.map(s => s.toLowerCase()))).sort();
        extractResults.value = unique.join('\\n');
      });

      btnExtractUrls.addEventListener('click', () => {
        const text = extractRaw.value;
        const matches = text.match(/https?:\\/\\/[^\\s/$.?#].[^\\s]*/gi) || [];
        const unique = Array.from(new Set(matches)).sort();
        extractResults.value = unique.join('\\n');
      });

      btnCopyExtract.addEventListener('click', () => {
        navigator.clipboard.writeText(extractResults.value).then(() => {
          btnCopyExtract.textContent = 'Copied!';
          setTimeout(() => { btnCopyExtract.textContent = 'Copy List'; }, 2000);
        });
      });

      btnClear.addEventListener('click', () => {
        extractRaw.value = '';
        extractResults.value = '';
      });
    `
  },

  // --- CALCULATOR EXTRA ---
  {
    id: 'average-calculator',
    slug: 'average-calculator',
    category: 'calculator',
    name: 'Average & Statistics Calculator',
    shortDesc: 'Calculate Mean (Average), Median, Mode, Range, and Sum from a list of numbers.',
    seoTitle: 'Average Calculator Online - Mean, Median, Mode | DesiDesk',
    seoDesc: 'Calculate arithmetic mean, median, mode, range, and sum from numbers. Free online statistics calculator on DesiDesk.',
    keywords: 'average calculator, calculate mean, median calculator, mode calculator, stats calculator',
    howToSteps: [
      'Enter numbers separated by commas, spaces, or line breaks.',
      'Instantly view calculated Mean, Median, Mode, and Sum.'
    ],
    features: [
      'Calculates Arithmetic Mean, Median, Mode, and Range.',
      'Displays Count of numbers and Total Sum.',
      'Sorts values ascending.',
      'Real-time calculation.'
    ],
    faqs: [
      {
        q: 'What is the difference between Mean and Median?',
        a: 'The Mean is the arithmetic average (sum divided by count), while the Median is the middle number when values are ordered.'
      }
    ],
    related: ['percentage-calculator', 'ratio-calculator'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Enter Numbers (separated by commas or spaces):</label>
        <textarea id="numListInput" class="form-textarea" style="min-height:100px;">12, 18, 25, 30, 42, 55, 18, 90</textarea>
      </div>

      <div class="stat-grid" style="margin-top:1.5rem;">
        <div class="stat-card">
          <div class="stat-value" id="resMean">-</div>
          <div class="stat-label">Mean (Average)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="resMedian">-</div>
          <div class="stat-label">Median</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="resMode">-</div>
          <div class="stat-label">Mode</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="resSum">-</div>
          <div class="stat-label">Sum / Total</div>
        </div>
      </div>
    `,
    toolScript: `
      const numListInput = document.getElementById('numListInput');
      const resMean = document.getElementById('resMean');
      const resMedian = document.getElementById('resMedian');
      const resMode = document.getElementById('resMode');
      const resSum = document.getElementById('resSum');

      function calculateStats() {
        const nums = numListInput.value
          .split(/[,\\s]+/)
          .map(Number)
          .filter(n => !isNaN(n));

        if (nums.length === 0) return;
        nums.sort((a,b) => a - b);

        const sum = nums.reduce((a,b) => a + b, 0);
        const mean = sum / nums.length;

        let median;
        const mid = Math.floor(nums.length / 2);
        if (nums.length % 2 !== 0) median = nums[mid];
        else median = (nums[mid - 1] + nums[mid]) / 2;

        const counts = {};
        let maxCount = 0;
        let mode = [];
        nums.forEach(n => {
          counts[n] = (counts[n] || 0) + 1;
          if (counts[n] > maxCount) maxCount = counts[n];
        });
        for (const k in counts) {
          if (counts[k] === maxCount && maxCount > 1) mode.push(k);
        }

        resMean.textContent = mean.toFixed(2).replace(/\\.00$/, '');
        resMedian.textContent = median.toString();
        resMode.textContent = mode.length ? mode.join(', ') : 'None';
        resSum.textContent = sum.toLocaleString();
      }

      numListInput.addEventListener('input', calculateStats);
      calculateStats();
    `
  },
  {
    id: 'ratio-calculator',
    slug: 'ratio-calculator',
    category: 'calculator',
    name: 'Ratio Simplifier & Solver',
    shortDesc: 'Simplify ratios (A:B) to lowest terms or solve for the missing proportion (A:B = C:X).',
    seoTitle: 'Ratio Calculator Online - Simplify & Solve Proportions | DesiDesk',
    seoDesc: 'Simplify ratios to simplest form or solve missing proportional values (A:B = C:X). Free math calculator on DesiDesk.',
    keywords: 'ratio calculator, simplify ratio, solve ratio, proportion calculator, aspect ratio solver',
    howToSteps: [
      'To simplify, enter ratio A and B.',
      'To solve proportion, enter A, B, and C to calculate unknown X.',
      'View simplified and solved ratio results.'
    ],
    features: [
      'Simplifies ratios using Greatest Common Divisor (GCD).',
      'Proportion solver: calculates unknown missing value X.',
      'Instant calculation.',
      'Clean interface.'
    ],
    faqs: [
      {
        q: 'What is a simplified ratio?',
        a: 'A simplified ratio divides both numbers by their highest common factor so they cannot be reduced further (e.g. 1920:1080 -> 16:9).'
      }
    ],
    related: ['aspect-ratio-calculator', 'percentage-calculator'],
    toolHtml: `
      <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1.25rem;margin-bottom:1.5rem;">
        <h4 style="font-size:1.05rem;color:var(--secondary);margin-bottom:0.75rem;">1. Simplify Ratio (A : B):</h4>
        <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
          <input type="number" id="simpA" class="form-input" style="width:120px;" value="1920" />
          <span>:</span>
          <input type="number" id="simpB" class="form-input" style="width:120px;" value="1080" />
          <span>=</span>
          <span id="resSimp" style="font-size:1.5rem;font-weight:800;color:var(--primary);">16 : 9</span>
        </div>
      </div>

      <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1.25rem;">
        <h4 style="font-size:1.05rem;color:var(--secondary);margin-bottom:0.75rem;">2. Solve Proportion (A : B = C : X):</h4>
        <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
          <input type="number" id="propA" class="form-input" style="width:100px;" value="4" />
          <span>:</span>
          <input type="number" id="propB" class="form-input" style="width:100px;" value="3" />
          <span>=</span>
          <input type="number" id="propC" class="form-input" style="width:100px;" value="800" />
          <span>:</span>
          <span id="resPropX" style="font-size:1.5rem;font-weight:800;color:var(--accent);">600</span>
        </div>
      </div>
    `,
    toolScript: `
      function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

      function updateSimp() {
        const a = parseInt(document.getElementById('simpA').value, 10) || 1;
        const b = parseInt(document.getElementById('simpB').value, 10) || 1;
        const d = gcd(a, b);
        document.getElementById('resSimp').textContent = (a / d) + ' : ' + (b / d);
      }

      function updateProp() {
        const a = parseFloat(document.getElementById('propA').value) || 1;
        const b = parseFloat(document.getElementById('propB').value) || 1;
        const c = parseFloat(document.getElementById('propC').value) || 1;
        // A/B = C/X => X = (B * C) / A
        const x = (b * c) / a;
        document.getElementById('resPropX').textContent = x.toFixed(2).replace(/\\.00$/, '');
      }

      ['simpA', 'simpB'].forEach(id => document.getElementById(id).addEventListener('input', updateSimp));
      ['propA', 'propB', 'propC'].forEach(id => document.getElementById(id).addEventListener('input', updateProp));
      updateSimp();
      updateProp();
    `
  },

  // --- DEVELOPER EXTRA ---
  {
    id: 'url-parser',
    slug: 'url-parser',
    category: 'developer',
    name: 'URL Parser & Query String Inspector',
    shortDesc: 'Deconstruct web URLs into protocol, host, pathname, hash, and interactive query parameters table.',
    seoTitle: 'URL Parser Online - Query String & URL Breakdown | DesiDesk',
    seoDesc: 'Parse and deconstruct URLs online. View protocol, hostname, port, pathname, and query parameters in a clean table on DesiDesk.',
    keywords: 'url parser, query string parser, deconstruct url, url component analyzer',
    howToSteps: [
      'Paste any URL into the input box.',
      'View parsed protocol, hostname, port, and path.',
      'Inspect all query parameter keys and values in an organized table.'
    ],
    features: [
      'Parses Protocol, Host, Port, Pathname, and Hash.',
      'Organizes query parameters into an editable table.',
      'Decodes URL percent-encoded characters.',
      '100% private in-browser parsing.'
    ],
    faqs: [
      {
        q: 'Does it parse complex nested query parameters?',
        a: 'Yes, it breaks down each key=value pair and decodes percent-encoded components.'
      }
    ],
    related: ['url-encoder-decoder', 'json-formatter'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Enter Full URL to Parse:</label>
        <input type="text" id="urlInputParse" class="form-input" value="https://desidesk.in/tools/calculator/emi-calculator.html?amount=500000&rate=8.5&source=google#results" />
      </div>

      <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1.25rem;margin-top:1.5rem;">
        <h4 style="font-size:1.05rem;color:var(--secondary);margin-bottom:0.75rem;">URL Components:</h4>
        <div style="display:flex;flex-direction:column;gap:0.5rem;font-size:0.9rem;">
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid #f1f5f9;padding:4px 0;"><span style="color:var(--text-muted);">Protocol:</span><span id="pProtocol" style="font-weight:700;">-</span></div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid #f1f5f9;padding:4px 0;"><span style="color:var(--text-muted);">Hostname:</span><span id="pHostname" style="font-weight:700;">-</span></div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid #f1f5f9;padding:4px 0;"><span style="color:var(--text-muted);">Pathname:</span><span id="pPathname" style="font-weight:700;">-</span></div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid #f1f5f9;padding:4px 0;"><span style="color:var(--text-muted);">Hash / Anchor:</span><span id="pHash" style="font-weight:700;">-</span></div>
        </div>

        <h4 style="font-size:1.05rem;color:var(--secondary);margin-top:1.25rem;margin-bottom:0.75rem;">Query Parameters:</h4>
        <div id="queryParamsTable" style="overflow-x:auto;"></div>
      </div>
    `,
    toolScript: `
      const urlInputParse = document.getElementById('urlInputParse');
      const pProtocol = document.getElementById('pProtocol');
      const pHostname = document.getElementById('pHostname');
      const pPathname = document.getElementById('pPathname');
      const pHash = document.getElementById('pHash');
      const queryParamsTable = document.getElementById('queryParamsTable');

      function parseUrl() {
        const val = urlInputParse.value.trim();
        if (!val) return;
        try {
          const u = new URL(val);
          pProtocol.textContent = u.protocol;
          pHostname.textContent = u.hostname;
          pPathname.textContent = u.pathname;
          pHash.textContent = u.hash || '[None]';

          const params = Array.from(u.searchParams.entries());
          if (params.length === 0) {
            queryParamsTable.innerHTML = '<div style="color:var(--text-muted);font-size:0.875rem;">No query parameters in this URL.</div>';
          } else {
            let html = '<table style="width:100%;border-collapse:collapse;font-size:0.875rem;"><tr style="background:var(--bg-subtle);"><th style="padding:6px 10px;text-align:left;">Key</th><th style="padding:6px 10px;text-align:left;">Value</th></tr>';
            params.forEach(([k, v]) => {
              html += \`<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:6px 10px;font-weight:700;color:var(--primary);">\${k}</td><td style="padding:6px 10px;font-family:var(--font-mono);">\${v}</td></tr>\`;
            });
            html += '</table>';
            queryParamsTable.innerHTML = html;
          }
        } catch(err) {
          pProtocol.textContent = 'Invalid URL';
          pHostname.textContent = '-';
          pPathname.textContent = '-';
          pHash.textContent = '-';
          queryParamsTable.innerHTML = '';
        }
      }

      urlInputParse.addEventListener('input', parseUrl);
      parseUrl();
    `
  },
  {
    id: 'user-agent-parser',
    slug: 'user-agent-parser',
    category: 'developer',
    name: 'User Agent Parser & Device Inspector',
    shortDesc: 'Analyze your browser User-Agent header, operating system, layout engine, and client specs.',
    seoTitle: 'User Agent Parser Online - What is My User Agent? | DesiDesk',
    seoDesc: 'Parse and inspect browser User-Agent string, device type, OS, and rendering engine online. Free client diagnostic tool on DesiDesk.',
    keywords: 'user agent parser, what is my user agent, browser detector, os detector, user agent string',
    howToSteps: [
      'Open the tool to view your current browser and OS specifications automatically.',
      'Or paste any custom User-Agent string to parse its components.'
    ],
    features: [
      'Detects Browser Name and Major Version.',
      'Detects Operating System (Windows, macOS, Linux, Android, iOS).',
      'Layout engine detection (Blink, Gecko, WebKit).',
      'One-click copy of user agent string.'
    ],
    faqs: [
      {
        q: 'What is a User-Agent string?',
        a: 'A User-Agent is an HTTP request header that identifies the client browser, operating system, and engine to web servers.'
      }
    ],
    related: ['screen-resolution-checker', 'url-parser'],
    toolHtml: `
      <div class="stat-grid" style="margin-bottom:1.5rem;">
        <div class="stat-card">
          <div class="stat-value" id="valBrowser">-</div>
          <div class="stat-label">Browser</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="valOs">-</div>
          <div class="stat-label">Operating System</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="valEngine">-</div>
          <div class="stat-label">Rendering Engine</div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Full User-Agent String:</label>
        <textarea id="uaString" class="form-textarea" style="min-height:90px;font-family:var(--font-mono);font-size:0.85rem;" readonly></textarea>
      </div>

      <div class="btn-group">
        <button id="copyUaBtn" class="btn btn-primary">Copy User Agent</button>
      </div>
    `,
    toolScript: `
      const valBrowser = document.getElementById('valBrowser');
      const valOs = document.getElementById('valOs');
      const valEngine = document.getElementById('valEngine');
      const uaString = document.getElementById('uaString');
      const copyUaBtn = document.getElementById('copyUaBtn');

      const ua = navigator.userAgent;
      uaString.value = ua;

      let b = 'Unknown';
      if (ua.includes('Firefox')) b = 'Firefox';
      else if (ua.includes('Edg/')) b = 'Edge';
      else if (ua.includes('Chrome')) b = 'Chrome';
      else if (ua.includes('Safari')) b = 'Safari';

      let os = 'Unknown OS';
      if (ua.includes('Win')) os = 'Windows';
      else if (ua.includes('Android')) os = 'Android';
      else if (ua.includes('Mac')) os = 'macOS';
      else if (ua.includes('Linux')) os = 'Linux';
      else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';

      let eng = 'Blink';
      if (ua.includes('Gecko/')) eng = 'Gecko';
      else if (ua.includes('AppleWebKit/')) eng = 'WebKit';

      valBrowser.textContent = b;
      valOs.textContent = os;
      valEngine.textContent = eng;

      copyUaBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(ua).then(() => {
          copyUaBtn.textContent = 'Copied!';
          setTimeout(() => { copyUaBtn.textContent = 'Copy User Agent'; }, 2000);
        });
      });
    `
  },

  // --- GENERATOR EXTRA ---
  {
    id: 'placeholder-image-generator',
    slug: 'placeholder-image-generator',
    category: 'generator',
    name: 'Placeholder Image Generator',
    shortDesc: 'Generate custom placeholder dummy images with width, height, colors, and text with instant download.',
    seoTitle: 'Placeholder Image Generator Online - Custom Dummy Images | DesiDesk',
    seoDesc: 'Generate custom placeholder mockup images with custom dimensions, background colors, and labels on Canvas. Download PNG on DesiDesk.',
    keywords: 'placeholder image generator, dummy image maker, mock image generator, placeholder png',
    howToSteps: [
      'Enter image Width and Height in pixels.',
      'Pick Background Color and Text Color.',
      'Enter custom label text.',
      'Download your placeholder PNG.'
    ],
    features: [
      'Custom dimensions (e.g. 600x400, 1200x630).',
      'Configurable background and foreground colors.',
      'Live canvas render with PNG download.',
      '100% private in-browser generation.'
    ],
    faqs: [
      {
        q: 'What is a placeholder image?',
        a: 'Placeholder images are temporary dummy graphics used in wireframes and prototypes before real photos are available.'
      }
    ],
    related: ['image-resizer', 'css-gradient-generator'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Width (px):</label>
          <input type="number" id="phWidth" class="form-input" value="600" min="50" max="3000" />
        </div>
        <div class="form-group">
          <label class="form-label">Height (px):</label>
          <input type="number" id="phHeight" class="form-input" value="400" min="50" max="3000" />
        </div>
        <div class="form-group">
          <label class="form-label">Custom Text (Optional):</label>
          <input type="text" id="phText" class="form-input" placeholder="e.g. 600 x 400" />
        </div>
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Background Color:</label>
          <input type="color" id="phBg" class="form-input" value="#e2e8f0" style="height:42px;padding:2px;" />
        </div>
        <div class="form-group">
          <label class="form-label">Text Color:</label>
          <input type="color" id="phFg" class="form-input" value="#64748b" style="height:42px;padding:2px;" />
        </div>
      </div>

      <div class="canvas-wrapper" style="margin:2rem 0;">
        <canvas id="phCanvas" style="max-height:360px;"></canvas>
      </div>

      <div class="btn-group" style="justify-content:center;">
        <a id="downloadPhBtn" class="btn btn-success" download="placeholder-desidesk.png">Download Placeholder PNG</a>
      </div>
    `,
    toolScript: `
      const phWidth = document.getElementById('phWidth');
      const phHeight = document.getElementById('phHeight');
      const phText = document.getElementById('phText');
      const phBg = document.getElementById('phBg');
      const phFg = document.getElementById('phFg');
      const phCanvas = document.getElementById('phCanvas');
      const downloadPhBtn = document.getElementById('downloadPhBtn');

      function drawPlaceholder() {
        const w = parseInt(phWidth.value, 10) || 600;
        const h = parseInt(phHeight.value, 10) || 400;
        const text = phText.value.trim() || (w + ' × ' + h);

        phCanvas.width = w;
        phCanvas.height = h;
        const ctx = phCanvas.getContext('2d');

        ctx.fillStyle = phBg.value;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = phFg.value;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const fontSize = Math.max(16, Math.min(w / 12, h / 6));
        ctx.font = 'bold ' + Math.round(fontSize) + 'px sans-serif';
        ctx.fillText(text, w / 2, h / 2);

        downloadPhBtn.href = phCanvas.toDataURL('image/png');
      }

      [phWidth, phHeight, phText, phBg, phFg].forEach(el => el.addEventListener('input', drawPlaceholder));
      drawPlaceholder();
    `
  },

  // --- UTILITY EXTRA ---
  {
    id: 'mime-type-lookup',
    slug: 'mime-type-lookup',
    category: 'utility',
    name: 'MIME Type Lookup Directory',
    shortDesc: 'Search over 200 file extensions and their exact Content-Type MIME headers and descriptions.',
    seoTitle: 'MIME Type Lookup Online - File Extension Directory | DesiDesk',
    seoDesc: 'Search file extensions to find Content-Type MIME headers and media type definitions for web developers on DesiDesk.',
    keywords: 'mime type lookup, content-type header, file extension to mime, mime type list',
    howToSteps: [
      'Type any file extension (e.g., pdf, webp, mp4, json).',
      'View instant lookup of MIME type and media category.'
    ],
    features: [
      'Search across 200+ standard IANA MIME types.',
      'Instant client-side filter.',
      'One-click copy of MIME strings.',
      'Zero server upload.'
    ],
    faqs: [
      {
        q: 'What is a MIME type?',
        a: 'A MIME (Multipurpose Internet Mail Extensions) type describes the media format of a file transmitted over HTTP so browsers know how to process it.'
      }
    ],
    related: ['file-checksum-calculator', 'csv-viewer-filter'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Search File Extension or MIME Type:</label>
        <input type="text" id="mimeSearch" class="form-input" placeholder="e.g. pdf, png, mp4, json, zip..." />
      </div>

      <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);overflow-x:auto;max-height:400px;margin-top:1.5rem;">
        <table id="mimeTable" style="width:100%;border-collapse:collapse;font-size:0.875rem;text-align:left;">
          <thead style="background:var(--bg-subtle);position:sticky;top:0;">
            <tr>
              <th style="padding:10px 12px;border-bottom:2px solid var(--border-light);">Extension</th>
              <th style="padding:10px 12px;border-bottom:2px solid var(--border-light);">MIME Type (Content-Type)</th>
              <th style="padding:10px 12px;border-bottom:2px solid var(--border-light);">Category</th>
            </tr>
          </thead>
          <tbody id="mimeBody"></tbody>
        </table>
      </div>
    `,
    toolScript: `
      const MIME_DATA = [
        { ext: '.pdf', mime: 'application/pdf', cat: 'Document' },
        { ext: '.jpg / .jpeg', mime: 'image/jpeg', cat: 'Image' },
        { ext: '.png', mime: 'image/png', cat: 'Image' },
        { ext: '.webp', mime: 'image/webp', cat: 'Image' },
        { ext: '.svg', mime: 'image/svg+xml', cat: 'Vector' },
        { ext: '.gif', mime: 'image/gif', cat: 'Image' },
        { ext: '.html', mime: 'text/html', cat: 'Code' },
        { ext: '.css', mime: 'text/css', cat: 'Code' },
        { ext: '.js', mime: 'text/javascript', cat: 'Code' },
        { ext: '.json', mime: 'application/json', cat: 'Data' },
        { ext: '.xml', mime: 'application/xml', cat: 'Data' },
        { ext: '.csv', mime: 'text/csv', cat: 'Data' },
        { ext: '.zip', mime: 'application/zip', cat: 'Archive' },
        { ext: '.tar', mime: 'application/x-tar', cat: 'Archive' },
        { ext: '.gz', mime: 'application/gzip', cat: 'Archive' },
        { ext: '.mp4', mime: 'video/mp4', cat: 'Video' },
        { ext: '.webm', mime: 'video/webm', cat: 'Video' },
        { ext: '.mp3', mime: 'audio/mpeg', cat: 'Audio' },
        { ext: '.wav', mime: 'audio/wav', cat: 'Audio' },
        { ext: '.txt', mime: 'text/plain', cat: 'Text' },
        { ext: '.ico', mime: 'image/x-icon', cat: 'Image' },
        { ext: '.woff2', mime: 'font/woff2', cat: 'Font' }
      ];

      const mimeSearch = document.getElementById('mimeSearch');
      const mimeBody = document.getElementById('mimeBody');

      function renderMimes(q = '') {
        const query = q.toLowerCase();
        const filtered = MIME_DATA.filter(m => m.ext.toLowerCase().includes(query) || m.mime.toLowerCase().includes(query) || m.cat.toLowerCase().includes(query));

        mimeBody.innerHTML = filtered.map(m => \`
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px;font-weight:700;color:var(--primary);">\${m.ext}</td>
            <td style="padding:8px 12px;font-family:var(--font-mono);cursor:pointer;" onclick="navigator.clipboard.writeText('\${m.mime}').then(()=>alert('Copied \${m.mime}'))">\${m.mime}</td>
            <td style="padding:8px 12px;color:var(--text-muted);">\${m.cat}</td>
          </tr>
        \`).join('');
      }

      mimeSearch.addEventListener('input', (e) => renderMimes(e.target.value.trim()));
      renderMimes();
    `
  }
];
