// builder/tools-utility.js

module.exports = [
  {
    id: 'zip-file-creator',
    slug: 'zip-file-creator',
    category: 'utility',
    name: 'ZIP File Creator',
    shortDesc: 'Bundle multiple files into a single compressed ZIP archive directly in your browser.',
    seoTitle: 'ZIP File Creator Online - Create ZIP Archives Free | DesiDesk',
    seoDesc: 'Create and compress multiple files into a ZIP archive directly in your browser using JSZip. Fast, 100% private with zero server uploads.',
    keywords: 'create zip online, zip file creator, zip archive maker, compress files to zip, browser zip',
    libs: ['https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'],
    howToSteps: [
      'Click or drag and drop multiple files into the upload area.',
      'Specify a custom name for your ZIP archive.',
      'Click "Create ZIP Archive" to package your files.',
      'Download your finished .zip file.'
    ],
    features: [
      'Compress any file types (documents, photos, code).',
      'Custom archive naming.',
      '100% client-side compression via JSZip.',
      'Zero server upload: files never leave your device.'
    ],
    faqs: [
      {
        q: 'Is there a limit on file size?',
        a: 'The limit depends solely on your computer or phone available memory (RAM). Small to medium files zip in milliseconds.'
      }
    ],
    related: ['zip-extractor', 'file-checksum-calculator', 'text-file-merger'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        <div class="dropzone-title">Upload Files to Bundle into ZIP</div>
        <div class="dropzone-subtitle">Click to select or drop multiple files</div>
        <input type="file" id="fileInput" class="dropzone-input" multiple />
      </div>

      <div id="zipWorkspace" style="display:none;margin-top:2rem;">
        <div class="form-group">
          <label class="form-label">Archive File Name:</label>
          <input type="text" id="zipName" class="form-input" value="archive-desidesk.zip" />
        </div>

        <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;margin-bottom:1.5rem;">
          <h4 style="font-size:0.95rem;color:var(--secondary);margin-bottom:0.75rem;">Files to Compress:</h4>
          <div id="zipFileList" style="display:flex;flex-direction:column;gap:0.4rem;max-height:200px;overflow-y:auto;font-size:0.875rem;"></div>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <button id="createZipBtn" class="btn btn-primary">Create ZIP Archive</button>
          <a id="downloadZipBtn" class="btn btn-success" style="display:none;">Download ZIP File</a>
          <button id="clearBtn" class="btn btn-outline">Clear</button>
        </div>
      </div>
    `,
    toolScript: `
      let selectedFiles = [];
      const fileInput = document.getElementById('fileInput');
      const zipWorkspace = document.getElementById('zipWorkspace');
      const zipName = document.getElementById('zipName');
      const zipFileList = document.getElementById('zipFileList');
      const createZipBtn = document.getElementById('createZipBtn');
      const downloadZipBtn = document.getElementById('downloadZipBtn');
      const clearBtn = document.getElementById('clearBtn');

      function formatSize(b) {
        if (b < 1024) return b + ' B';
        if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
        return (b / 1048576).toFixed(2) + ' MB';
      }

      fileInput.addEventListener('change', (e) => {
        selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length === 0) return;
        zipFileList.innerHTML = selectedFiles.map(f => \`
          <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #f1f5f9;">
            <span>\${f.name}</span>
            <span style="color:var(--text-muted);">\${formatSize(f.size)}</span>
          </div>
        \`).join('');
        zipWorkspace.style.display = 'block';
        downloadZipBtn.style.display = 'none';
      });

      createZipBtn.addEventListener('click', async () => {
        if (typeof JSZip === 'undefined') {
          alert('ZIP library is loading. Please check internet connection.');
          return;
        }

        createZipBtn.disabled = true;
        createZipBtn.textContent = 'Compressing...';

        try {
          const zip = new JSZip();
          for (const file of selectedFiles) {
            zip.file(file.name, file);
          }

          const content = await zip.generateAsync({ type: 'blob' });
          const url = URL.createObjectURL(content);

          let name = zipName.value.trim() || 'archive.zip';
          if (!name.endsWith('.zip')) name += '.zip';

          downloadZipBtn.href = url;
          downloadZipBtn.download = name;
          downloadZipBtn.textContent = 'Download ' + name + ' (' + formatSize(content.size) + ')';
          downloadZipBtn.style.display = 'inline-flex';
          createZipBtn.disabled = false;
          createZipBtn.textContent = 'Create ZIP Archive';
        } catch(err) {
          alert('Compression error: ' + err.message);
          createZipBtn.disabled = false;
          createZipBtn.textContent = 'Create ZIP Archive';
        }
      });

      clearBtn.addEventListener('click', () => {
        selectedFiles = [];
        fileInput.value = '';
        zipWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'zip-extractor',
    slug: 'zip-extractor',
    category: 'utility',
    name: 'ZIP File Extractor',
    shortDesc: 'Open, inspect, and extract files from ZIP archives directly in your browser without software installation.',
    seoTitle: 'ZIP Extractor Online - Unzip Files Free | DesiDesk',
    seoDesc: 'Unzip and extract files from ZIP archives directly in your browser. View file list and download individual or all files on DesiDesk.',
    keywords: 'zip extractor, unzip files online, open zip file, uncompress zip online, view zip contents',
    libs: ['https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'],
    howToSteps: [
      'Upload any .zip archive.',
      'Inspect the list of files, folders, and uncompressed sizes.',
      'Click the download button next to any file to extract it instantly.'
    ],
    features: [
      'Extract individual files or complete directory structure.',
      'Zero server upload: 100% private decompression.',
      'Works on mobile and desktop without unzipping software.',
      'Inspect contents before downloading.'
    ],
    faqs: [
      {
        q: 'Can I unzip password-protected archives?',
        a: 'Standard browser JSZip supports unencrypted ZIP archives.'
      }
    ],
    related: ['zip-file-creator', 'file-checksum-calculator'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>
        <div class="dropzone-title">Upload ZIP Archive to Extract</div>
        <div class="dropzone-subtitle">Click or drop your .zip file here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept=".zip,application/zip" />
      </div>

      <div id="unzipWorkspace" style="display:none;margin-top:2rem;">
        <div class="alert alert-info" id="zipInfo"></div>

        <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;margin-top:1.25rem;">
          <h4 style="font-size:0.95rem;color:var(--secondary);margin-bottom:0.75rem;">Archive Contents:</h4>
          <div id="extractedList" style="display:flex;flex-direction:column;gap:0.5rem;max-height:300px;overflow-y:auto;"></div>
        </div>
      </div>
    `,
    toolScript: `
      const fileInput = document.getElementById('fileInput');
      const unzipWorkspace = document.getElementById('unzipWorkspace');
      const zipInfo = document.getElementById('zipInfo');
      const extractedList = document.getElementById('extractedList');

      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (typeof JSZip === 'undefined') {
          alert('ZIP library is loading. Please retry in a moment.');
          return;
        }

        try {
          const zip = await JSZip.loadAsync(file);
          const entries = Object.keys(zip.files);
          zipInfo.textContent = 'Archive: ' + file.name + ' contains ' + entries.length + ' file(s) and folders.';

          extractedList.innerHTML = '';
          for (const filename of entries) {
            const entry = zip.files[filename];
            if (entry.dir) continue;

            const item = document.createElement('div');
            item.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #f1f5f9;font-size:0.875rem;';
            item.innerHTML = \`
              <span style="font-family:var(--font-mono);">\${filename}</span>
              <button class="btn btn-sm btn-outline" style="color:var(--primary);">Extract &darr;</button>
            \`;

            item.querySelector('button').onclick = async () => {
              const blob = await entry.async('blob');
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = filename.split('/').pop();
              a.click();
            };

            extractedList.appendChild(item);
          }

          unzipWorkspace.style.display = 'block';
        } catch(err) {
          alert('Could not unzip file: ' + err.message);
        }
      });
    `
  },
  {
    id: 'file-checksum-calculator',
    slug: 'file-checksum-calculator',
    category: 'utility',
    name: 'File Checksum Calculator (SHA-256 / MD5)',
    shortDesc: 'Compute cryptographic SHA-256, SHA-512, and SHA-1 checksum hashes of any local file.',
    seoTitle: 'File Checksum Calculator Online - SHA-256 & SHA-1 | DesiDesk',
    seoDesc: 'Calculate cryptographic SHA-256 and SHA-1 file checksums directly in your browser. Verify file integrity and authenticity securely on DesiDesk.',
    keywords: 'file checksum, sha256 checksum, file hash calculator, verify file integrity, checksum online',
    howToSteps: [
      'Select or drop any file to inspect.',
      'The browser calculates cryptographic hashes in local memory.',
      'Compare against the publisher hash to verify file integrity.'
    ],
    features: [
      'Calculates SHA-256, SHA-512, and SHA-1 hashes.',
      'Uses Web Crypto API (SubtleCrypto) for hardware acceleration.',
      'Zero server upload: files are never transmitted.',
      'Instant copy of hash strings.'
    ],
    faqs: [
      {
        q: 'Why verify file checksums?',
        a: 'Checksums guarantee that a downloaded file has not been corrupted or tampered with by comparing its unique cryptographic fingerprint.'
      }
    ],
    related: ['zip-file-creator', 'hash-generator'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <div class="dropzone-title">Upload File to Calculate Checksum</div>
        <div class="dropzone-subtitle">Click or drop any file here</div>
        <input type="file" id="fileInput" class="dropzone-input" />
      </div>

      <div id="checksumWorkspace" style="display:none;margin-top:2rem;">
        <div class="alert alert-info" id="fileInfo"></div>

        <div style="display:flex;flex-direction:column;gap:1rem;margin-top:1.25rem;">
          <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">
              <strong style="color:var(--primary);">SHA-256 Checksum:</strong>
              <button class="btn btn-sm btn-outline" onclick="copyText('fileSha256')">Copy</button>
            </div>
            <div id="fileSha256" style="font-family:var(--font-mono);font-size:0.85rem;word-break:break-all;color:var(--text-muted);">-</div>
          </div>

          <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">
              <strong style="color:var(--secondary);">SHA-1 Checksum:</strong>
              <button class="btn btn-sm btn-outline" onclick="copyText('fileSha1')">Copy</button>
            </div>
            <div id="fileSha1" style="font-family:var(--font-mono);font-size:0.85rem;word-break:break-all;color:var(--text-muted);">-</div>
          </div>
        </div>
      </div>
    `,
    toolScript: `
      const fileInput = document.getElementById('fileInput');
      const checksumWorkspace = document.getElementById('checksumWorkspace');
      const fileInfo = document.getElementById('fileInfo');
      const fileSha256 = document.getElementById('fileSha256');
      const fileSha1 = document.getElementById('fileSha1');

      async function hashBuffer(algo, buf) {
        const hashBuf = await crypto.subtle.digest(algo, buf);
        return Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
      }

      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        fileInfo.textContent = 'Calculating hash for: ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)...';
        checksumWorkspace.style.display = 'block';

        const buf = await file.arrayBuffer();
        fileSha256.textContent = await hashBuffer('SHA-256', buf);
        fileSha1.textContent = await hashBuffer('SHA-1', buf);
        fileInfo.textContent = 'File: ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)';
      });

      window.copyText = function(id) {
        const str = document.getElementById(id).textContent;
        navigator.clipboard.writeText(str).then(() => alert('Copied checksum to clipboard!'));
      };
    `
  },
  {
    id: 'csv-viewer-filter',
    slug: 'csv-viewer-filter',
    category: 'utility',
    name: 'CSV Spreadsheet Viewer & Filter',
    shortDesc: 'Open, search, filter, and view large CSV spreadsheet files in your browser.',
    seoTitle: 'CSV Viewer & Filter Online - Spreadsheet Reader Free | DesiDesk',
    seoDesc: 'View, search, and filter CSV data tables directly in your browser. Clean spreadsheet view without Excel or Google Sheets on DesiDesk.',
    keywords: 'csv viewer, csv filter, read csv online, view csv table, csv spreadsheet viewer',
    howToSteps: [
      'Upload your CSV file.',
      'View parsed columns and rows in an interactive table.',
      'Type in the filter search box to find matching records instantly.'
    ],
    features: [
      'Fast client-side CSV parser handling quotes and commas.',
      'Instant search and filter across all columns.',
      'Responsive scrolling table view.',
      'Zero server upload: 100% private.'
    ],
    faqs: [
      {
        q: 'Does it support comma-separated values inside quotation marks?',
        a: 'Yes, the parser adheres to RFC-4180 CSV specifications and respects quoted text.'
      }
    ],
    related: ['text-file-merger', 'file-checksum-calculator'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>
        <div class="dropzone-title">Upload CSV File to View</div>
        <div class="dropzone-subtitle">Click or drop your .csv file here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept=".csv,text/csv" />
      </div>

      <div id="csvWorkspace" style="display:none;margin-top:2rem;">
        <div class="form-group">
          <input type="text" id="csvSearch" class="form-input" placeholder="Search and filter rows..." />
        </div>

        <div style="overflow-x:auto;background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);max-height:400px;">
          <table id="csvTable" style="width:100%;border-collapse:collapse;font-size:0.875rem;text-align:left;"></table>
        </div>
      </div>
    `,
    toolScript: `
      let csvData = [];
      const fileInput = document.getElementById('fileInput');
      const csvWorkspace = document.getElementById('csvWorkspace');
      const csvSearch = document.getElementById('csvSearch');
      const csvTable = document.getElementById('csvTable');

      function parseCsv(text) {
        const lines = text.split(/\\r?\\n/).filter(Boolean);
        return lines.map(line => {
          const row = [];
          let insideQuote = false;
          let entry = '';
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"' && (i === 0 || line[i-1] !== '\\\\')) {
              insideQuote = !insideQuote;
            } else if (char === ',' && !insideQuote) {
              row.push(entry.trim());
              entry = '';
            } else {
              entry += char;
            }
          }
          row.push(entry.trim());
          return row;
        });
      }

      function renderTable(q = '') {
        if (csvData.length === 0) return;
        const headers = csvData[0];
        const rows = csvData.slice(1);
        const query = q.toLowerCase();

        const filtered = query 
          ? rows.filter(r => r.some(col => col.toLowerCase().includes(query)))
          : rows;

        let html = '<thead style="background:var(--bg-subtle);position:sticky;top:0;"><tr>';
        headers.forEach(h => html += '<th style="padding:10px 12px;border-bottom:2px solid var(--border-light);">' + h + '</th>');
        html += '</tr></thead><tbody>';

        filtered.slice(0, 100).forEach(r => {
          html += '<tr style="border-bottom:1px solid #f1f5f9;">';
          r.forEach(col => html += '<td style="padding:8px 12px;">' + col + '</td>');
          html += '</tr>';
        });

        html += '</tbody>';
        csvTable.innerHTML = html;
      }

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          csvData = parseCsv(ev.target.result);
          renderTable();
          csvWorkspace.style.display = 'block';
        };
        reader.readAsText(file);
      });

      csvSearch.addEventListener('input', (e) => renderTable(e.target.value.trim()));
    `
  }
];
