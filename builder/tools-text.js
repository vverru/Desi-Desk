// builder/tools-text.js

module.exports = [
  {
    id: 'word-counter',
    slug: 'word-counter',
    category: 'text',
    name: 'Word & Character Counter',
    shortDesc: 'Live statistics for words, characters, sentences, paragraphs, reading and speaking time.',
    seoTitle: 'Word Counter Online - Character & Sentence Counter Free | DesiDesk',
    seoDesc: 'Count words, characters with/without spaces, sentences, paragraphs, and reading time in real-time. Free online word counter on DesiDesk.',
    keywords: 'word counter, character counter, word count online, sentence counter, reading time calculator',
    howToSteps: [
      'Type or paste your text into the box.',
      'View immediate updates for words, characters, sentences, and paragraphs.',
      'Check estimated reading and speaking duration.'
    ],
    features: [
      'Real-time calculations as you type.',
      'Metrics for characters with and without whitespace.',
      'Accurate reading time based on standard 200 WPM speed.',
      'One-click copy and clear buttons.'
    ],
    faqs: [
      {
        q: 'How is reading time calculated?',
        a: 'Reading time is computed using the average adult reading speed of 200 words per minute (WPM).'
      }
    ],
    related: ['case-converter', 'remove-extra-spaces', 'text-cleaner', 'slug-generator'],
    toolHtml: `
      <div class="stat-grid" style="margin-bottom:1.5rem;">
        <div class="stat-card">
          <div class="stat-value" id="valWords">0</div>
          <div class="stat-label">Words</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="valChars">0</div>
          <div class="stat-label">Characters</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="valCharsNoSpace">0</div>
          <div class="stat-label">Chars (No Space)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="valSentences">0</div>
          <div class="stat-label">Sentences</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="valParagraphs">0</div>
          <div class="stat-label">Paragraphs</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="valReadingTime">0s</div>
          <div class="stat-label">Reading Time</div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Type or Paste Text:</label>
        <textarea id="textInput" class="form-textarea" style="min-height:240px;" placeholder="Start typing or paste your content here to see instant statistics..."></textarea>
      </div>

      <div class="btn-group">
        <button id="copyBtn" class="btn btn-primary">Copy Text</button>
        <button id="clearBtn" class="btn btn-outline">Clear</button>
      </div>
    `,
    toolScript: `
      const textInput = document.getElementById('textInput');
      const valWords = document.getElementById('valWords');
      const valChars = document.getElementById('valChars');
      const valCharsNoSpace = document.getElementById('valCharsNoSpace');
      const valSentences = document.getElementById('valSentences');
      const valParagraphs = document.getElementById('valParagraphs');
      const valReadingTime = document.getElementById('valReadingTime');
      const copyBtn = document.getElementById('copyBtn');
      const clearBtn = document.getElementById('clearBtn');

      function updateStats() {
        const text = textInput.value;
        const trimmed = text.trim();
        const words = trimmed ? trimmed.split(/\\s+/).filter(Boolean).length : 0;
        const chars = text.length;
        const charsNoSpace = text.replace(/\\s/g, '').length;
        const sentences = trimmed ? (trimmed.match(/[^.!?]+[.!?]+(\\s|$)/g) || [trimmed]).length : 0;
        const paragraphs = trimmed ? trimmed.split(/\\n+/).filter(s => s.trim().length > 0).length : 0;

        valWords.textContent = words.toLocaleString();
        valChars.textContent = chars.toLocaleString();
        valCharsNoSpace.textContent = charsNoSpace.toLocaleString();
        valSentences.textContent = sentences.toLocaleString();
        valParagraphs.textContent = paragraphs.toLocaleString();

        const seconds = Math.ceil((words / 200) * 60);
        if (seconds < 60) {
          valReadingTime.textContent = seconds + 's';
        } else {
          valReadingTime.textContent = Math.ceil(seconds / 60) + 'm';
        }
      }

      textInput.addEventListener('input', updateStats);
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(textInput.value).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy Text'; }, 2000);
        });
      });
      clearBtn.addEventListener('click', () => {
        textInput.value = '';
        updateStats();
      });
    `
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    category: 'text',
    name: 'Text Case Converter',
    shortDesc: 'Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case.',
    seoTitle: 'Case Converter Online - Change Capitalization Free | DesiDesk',
    seoDesc: 'Convert text case online to uppercase, lowercase, sentence case, title case, camelCase, snake_case, kebab-case with one click.',
    keywords: 'case converter, uppercase to lowercase, title case converter, camelcase converter, text capitalizer',
    howToSteps: [
      'Enter or paste your text into the input area.',
      'Click the button corresponding to your desired case style.',
      'Copy your converted text with one click.'
    ],
    features: [
      'Supports 8 case formats including camelCase and snake_case.',
      'Instant conversion without reloading.',
      'Preserves original punctuation where appropriate.',
      'One-click copy to clipboard.'
    ],
    faqs: [
      {
        q: 'What is Title Case?',
        a: 'Title Case capitalizes the first letter of each significant word while leaving minor words (like "and", "in", "of") lowercase.'
      }
    ],
    related: ['word-counter', 'slug-generator', 'remove-extra-spaces'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input Text:</label>
        <textarea id="caseText" class="form-textarea" style="min-height:180px;" placeholder="Type or paste text to convert case..."></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button class="btn btn-secondary" onclick="convertCase('upper')">UPPERCASE</button>
        <button class="btn btn-secondary" onclick="convertCase('lower')">lowercase</button>
        <button class="btn btn-secondary" onclick="convertCase('title')">Title Case</button>
        <button class="btn btn-secondary" onclick="convertCase('sentence')">Sentence case</button>
        <button class="btn btn-secondary" onclick="convertCase('camel')">camelCase</button>
        <button class="btn btn-secondary" onclick="convertCase('snake')">snake_case</button>
        <button class="btn btn-secondary" onclick="convertCase('kebab')">kebab-case</button>
        <button class="btn btn-secondary" onclick="convertCase('constant')">CONSTANT_CASE</button>
      </div>

      <div class="btn-group">
        <button id="copyBtn" class="btn btn-primary">Copy Result</button>
        <button id="clearBtn" class="btn btn-outline">Clear</button>
      </div>
    `,
    toolScript: `
      const caseText = document.getElementById('caseText');
      const copyBtn = document.getElementById('copyBtn');
      const clearBtn = document.getElementById('clearBtn');

      window.convertCase = function(mode) {
        const val = caseText.value;
        if (!val) return;
        let res = '';
        if (mode === 'upper') {
          res = val.toUpperCase();
        } else if (mode === 'lower') {
          res = val.toLowerCase();
        } else if (mode === 'sentence') {
          res = val.toLowerCase().replace(/(^\\s*\\w|[.!?]\\s*\\w)/g, c => c.toUpperCase());
        } else if (mode === 'title') {
          res = val.toLowerCase().replace(/\\b(\\w)/g, c => c.toUpperCase());
        } else if (mode === 'camel') {
          res = val.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        } else if (mode === 'snake') {
          res = val.trim().toLowerCase().replace(/\\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
        } else if (mode === 'kebab') {
          res = val.trim().toLowerCase().replace(/\\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
        } else if (mode === 'constant') {
          res = val.trim().toUpperCase().replace(/\\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
        }
        caseText.value = res;
      };

      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(caseText.value).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy Result'; }, 2000);
        });
      });
      clearBtn.addEventListener('click', () => { caseText.value = ''; });
    `
  },
  {
    id: 'remove-duplicate-lines',
    slug: 'remove-duplicate-lines',
    category: 'text',
    name: 'Remove Duplicate Lines',
    shortDesc: 'Eliminate duplicate text lines, trim empty spaces, and sort unique entries.',
    seoTitle: 'Remove Duplicate Lines Online - Deduplicate Text List | DesiDesk',
    seoDesc: 'Deduplicate lines from lists, CSVs, and logs in seconds. Options for case-sensitive deduplication and space trimming.',
    keywords: 'remove duplicate lines, deduplicate text, delete duplicates, unique lines finder, clean list',
    howToSteps: [
      'Paste your list of items or lines into the text area.',
      'Toggle case sensitivity or whitespace trimming as needed.',
      'Click "Deduplicate Lines" to remove all duplicate entries.',
      'Copy or download the clean list.'
    ],
    features: [
      'Case-sensitive or case-insensitive matching.',
      'Option to trim whitespace and delete empty lines.',
      'Real-time count of removed duplicates.',
      'One-click copy.'
    ],
    faqs: [
      {
        q: 'Does it preserve the original line order?',
        a: 'Yes, the first occurrence of each unique line is kept in its original order.'
      }
    ],
    related: ['sort-text-lines', 'word-counter', 'remove-extra-spaces'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input Text List:</label>
        <textarea id="dupInput" class="form-textarea" style="min-height:220px;" placeholder="Paste lines of text here..."></textarea>
      </div>

      <div style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-bottom:1.5rem;">
        <label style="cursor:pointer;"><input type="checkbox" id="chkCase" /> Case Sensitive</label>
        <label style="cursor:pointer;"><input type="checkbox" id="chkTrim" checked /> Trim Whitespace</label>
        <label style="cursor:pointer;"><input type="checkbox" id="chkEmpty" checked /> Remove Empty Lines</label>
      </div>

      <div class="btn-group">
        <button id="dedupBtn" class="btn btn-primary">Remove Duplicate Lines</button>
        <button id="copyBtn" class="btn btn-secondary">Copy Result</button>
        <button id="clearBtn" class="btn btn-outline">Clear</button>
      </div>

      <div id="statAlert" class="alert alert-info" style="display:none;margin-top:1.5rem;"></div>
    `,
    toolScript: `
      const dupInput = document.getElementById('dupInput');
      const chkCase = document.getElementById('chkCase');
      const chkTrim = document.getElementById('chkTrim');
      const chkEmpty = document.getElementById('chkEmpty');
      const dedupBtn = document.getElementById('dedupBtn');
      const copyBtn = document.getElementById('copyBtn');
      const clearBtn = document.getElementById('clearBtn');
      const statAlert = document.getElementById('statAlert');

      dedupBtn.addEventListener('click', () => {
        const raw = dupInput.value;
        const lines = raw.split('\\n');
        const seen = new Set();
        const result = [];
        let dupCount = 0;

        lines.forEach(line => {
          let cleaned = chkTrim.checked ? line.trim() : line;
          if (chkEmpty.checked && !cleaned) return;
          const key = chkCase.checked ? cleaned : cleaned.toLowerCase();

          if (seen.has(key)) {
            dupCount++;
          } else {
            seen.add(key);
            result.push(cleaned);
          }
        });

        dupInput.value = result.join('\\n');
        statAlert.className = 'alert alert-success';
        statAlert.textContent = 'Removed ' + dupCount + ' duplicate line(s). ' + result.length + ' unique lines remain.';
        statAlert.style.display = 'block';
      });

      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(dupInput.value).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy Result'; }, 2000);
        });
      });
      clearBtn.addEventListener('click', () => {
        dupInput.value = '';
        statAlert.style.display = 'none';
      });
    `
  },
  {
    id: 'sort-text-lines',
    slug: 'sort-text-lines',
    category: 'text',
    name: 'Sort Text Lines',
    shortDesc: 'Sort lists alphabetically (A-Z, Z-A), numerically, by line length, or reverse order.',
    seoTitle: 'Sort Text Lines Online - Alphabetical & Numeric Sorter | DesiDesk',
    seoDesc: 'Sort text lines alphabetically A-Z or Z-A, naturally by number, or by line length. Free online list sorting tool on DesiDesk.',
    keywords: 'sort lines, sort text online, alphabetical sorter, numerical sort list, reverse lines',
    howToSteps: [
      'Paste your lines or list into the box.',
      'Click A-Z, Z-A, Numeric, or By Length.',
      'Copy your sorted list with one click.'
    ],
    features: [
      'Alphabetical ascending (A-Z) and descending (Z-A).',
      'Natural numerical sorting (1, 2, 10 instead of 1, 10, 2).',
      'Sort by line character length.',
      'Shuffle lines randomly.'
    ],
    faqs: [
      {
        q: 'What is natural numerical sort?',
        a: 'Natural sort understands multi-digit numbers so item 2 appears before item 10, matching human intuition.'
      }
    ],
    related: ['remove-duplicate-lines', 'word-counter', 'case-converter'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input Text to Sort:</label>
        <textarea id="sortInput" class="form-textarea" style="min-height:220px;" placeholder="Paste text lines here..."></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button class="btn btn-secondary" onclick="sortLines('az')">Sort A &rarr; Z</button>
        <button class="btn btn-secondary" onclick="sortLines('za')">Sort Z &rarr; A</button>
        <button class="btn btn-secondary" onclick="sortLines('num')">Natural Numeric</button>
        <button class="btn btn-secondary" onclick="sortLines('len')">By Length</button>
        <button class="btn btn-secondary" onclick="sortLines('rev')">Reverse Lines</button>
        <button class="btn btn-secondary" onclick="sortLines('shuffle')">Shuffle Randomly</button>
      </div>

      <div class="btn-group">
        <button id="copyBtn" class="btn btn-primary">Copy Result</button>
        <button id="clearBtn" class="btn btn-outline">Clear</button>
      </div>
    `,
    toolScript: `
      const sortInput = document.getElementById('sortInput');
      const copyBtn = document.getElementById('copyBtn');
      const clearBtn = document.getElementById('clearBtn');

      window.sortLines = function(mode) {
        const text = sortInput.value;
        if (!text) return;
        const lines = text.split('\\n');

        if (mode === 'az') {
          lines.sort((a,b) => a.localeCompare(b));
        } else if (mode === 'za') {
          lines.sort((a,b) => b.localeCompare(a));
        } else if (mode === 'num') {
          lines.sort((a,b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
        } else if (mode === 'len') {
          lines.sort((a,b) => a.length - b.length);
        } else if (mode === 'rev') {
          lines.reverse();
        } else if (mode === 'shuffle') {
          for (let i = lines.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lines[i], lines[j]] = [lines[j], lines[i]];
          }
        }
        sortInput.value = lines.join('\\n');
      };

      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(sortInput.value).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy Result'; }, 2000);
        });
      });
      clearBtn.addEventListener('click', () => { sortInput.value = ''; });
    `
  },
  {
    id: 'text-diff-checker',
    slug: 'text-diff-checker',
    category: 'text',
    name: 'Text Diff Checker',
    shortDesc: 'Compare two text snippets side-by-side to highlight additions, deletions, and edits.',
    seoTitle: 'Text Diff Checker Online - Compare Two Texts Free | DesiDesk',
    seoDesc: 'Compare two texts side-by-side to find differences, added words, and deleted lines. Free online text difference checker on DesiDesk.',
    keywords: 'diff checker, text difference, compare text online, side by side diff, text comparison',
    howToSteps: [
      'Paste the original text in the left box.',
      'Paste the modified text in the right box.',
      'Click "Compare Differences" to see highlighted additions in green and deletions in red.'
    ],
    features: [
      'Side-by-side and line-by-line visual comparison.',
      'Color-coded highlights (Green = Added, Red = Removed).',
      'Word and character level comparison.',
      '100% private in-browser diff.'
    ],
    faqs: [
      {
        q: 'Is my confidential code or contract sent to a server?',
        a: 'No. The entire diff algorithm executes locally in JavaScript on your machine.'
      }
    ],
    related: ['find-and-replace', 'word-counter', 'remove-extra-spaces'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Original Text (Before):</label>
          <textarea id="diffBefore" class="form-textarea" style="min-height:180px;" placeholder="Paste original text here..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Modified Text (After):</label>
          <textarea id="diffAfter" class="form-textarea" style="min-height:180px;" placeholder="Paste modified text here..."></textarea>
        </div>
      </div>

      <div class="btn-group" style="justify-content:center;margin-bottom:1.5rem;">
        <button id="runDiffBtn" class="btn btn-primary">Compare Differences</button>
        <button id="clearDiffBtn" class="btn btn-outline">Clear All</button>
      </div>

      <div id="diffOutputContainer" style="display:none;">
        <h4 style="font-size:1.05rem;margin-bottom:0.75rem;color:var(--secondary);">Comparison Results:</h4>
        <div id="diffOutput" style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;font-family:var(--font-mono);font-size:0.875rem;line-height:1.6;white-space:pre-wrap;"></div>
      </div>
    `,
    toolScript: `
      const diffBefore = document.getElementById('diffBefore');
      const diffAfter = document.getElementById('diffAfter');
      const runDiffBtn = document.getElementById('runDiffBtn');
      const clearDiffBtn = document.getElementById('clearDiffBtn');
      const diffOutputContainer = document.getElementById('diffOutputContainer');
      const diffOutput = document.getElementById('diffOutput');

      runDiffBtn.addEventListener('click', () => {
        const bLines = diffBefore.value.split('\\n');
        const aLines = diffAfter.value.split('\\n');
        const max = Math.max(bLines.length, aLines.length);

        let html = '';
        for (let i = 0; i < max; i++) {
          const b = bLines[i];
          const a = aLines[i];

          if (b === undefined) {
            html += '<div style="background:#dcfce7;color:#166534;padding:2px 8px;border-left:3px solid #16a34a;">+ ' + escapeHtml(a) + '</div>';
          } else if (a === undefined) {
            html += '<div style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-left:3px solid #dc2626;">- ' + escapeHtml(b) + '</div>';
          } else if (b === a) {
            html += '<div style="color:#64748b;padding:2px 8px;">  ' + escapeHtml(b) + '</div>';
          } else {
            html += '<div style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-left:3px solid #dc2626;">- ' + escapeHtml(b) + '</div>';
            html += '<div style="background:#dcfce7;color:#166534;padding:2px 8px;border-left:3px solid #16a34a;">+ ' + escapeHtml(a) + '</div>';
          }
        }

        diffOutput.innerHTML = html || '<div>No differences detected!</div>';
        diffOutputContainer.style.display = 'block';
      });

      function escapeHtml(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      clearDiffBtn.addEventListener('click', () => {
        diffBefore.value = '';
        diffAfter.value = '';
        diffOutputContainer.style.display = 'none';
      });
    `
  },
  {
    id: 'slug-generator',
    slug: 'slug-generator',
    category: 'text',
    name: 'SEO Slug Generator',
    shortDesc: 'Convert article titles and headlines into clean, URL-friendly SEO slugs.',
    seoTitle: 'Slug Generator Online - Create SEO URL Slugs Free | DesiDesk',
    seoDesc: 'Convert any text, blog title, or article heading into clean, SEO-friendly URL slugs. Customizable separators and lowercase options.',
    keywords: 'slug generator, url slug, seo slug creator, title to url, string to slug',
    howToSteps: [
      'Enter your article title or headline.',
      'Select separator character (hyphen "-" or underscore "_").',
      'Copy your generated SEO URL slug.'
    ],
    features: [
      'Removes special symbols, accents, and punctuation.',
      'Standard hyphens or underscore separators.',
      'Safe for WordPress, Shopify, and modern web frameworks.',
      'One-click copy to clipboard.'
    ],
    faqs: [
      {
        q: 'Why use hyphens in URLs?',
        a: 'Google officially recommends using hyphens (-) rather than underscores (_) to separate words in URLs.'
      }
    ],
    related: ['case-converter', 'word-counter', 'remove-extra-spaces'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Article Title or Headline:</label>
        <input type="text" id="slugInput" class="form-input" placeholder="e.g. 10 Best Productivity Tools for 2026!" />
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Separator:</label>
          <select id="slugSep" class="form-select">
            <option value="-">Hyphen (-)</option>
            <option value="_">Underscore (_)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Letter Casing:</label>
          <select id="slugCase" class="form-select">
            <option value="lower">lowercase (Recommended)</option>
            <option value="upper">UPPERCASE</option>
          </select>
        </div>
      </div>

      <div class="form-group" style="margin-top:1rem;">
        <label class="form-label">Generated URL Slug:</label>
        <input type="text" id="slugOutput" class="form-input" readonly style="font-weight:700;color:var(--primary);background:var(--bg-subtle);" />
      </div>

      <div class="btn-group">
        <button id="copyBtn" class="btn btn-primary">Copy Slug</button>
      </div>
    `,
    toolScript: `
      const slugInput = document.getElementById('slugInput');
      const slugSep = document.getElementById('slugSep');
      const slugCase = document.getElementById('slugCase');
      const slugOutput = document.getElementById('slugOutput');
      const copyBtn = document.getElementById('copyBtn');

      function makeSlug() {
        const text = slugInput.value.trim();
        const sep = slugSep.value;
        let slug = text
          .normalize('NFD')
          .replace(/[\\u0300-\\u036f]/g, '') // remove accents
          .replace(/[^a-zA-Z0-9\\s-_]/g, '') // remove symbols
          .trim()
          .replace(/[\\s-_]+/g, sep);

        if (slugCase.value === 'lower') slug = slug.toLowerCase();
        else slug = slug.toUpperCase();

        slugOutput.value = slug;
      }

      slugInput.addEventListener('input', makeSlug);
      slugSep.addEventListener('change', makeSlug);
      slugCase.addEventListener('change', makeSlug);

      copyBtn.addEventListener('click', () => {
        if (!slugOutput.value) return;
        navigator.clipboard.writeText(slugOutput.value).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy Slug'; }, 2000);
        });
      });
    `
  },
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    category: 'text',
    name: 'Lorem Ipsum Generator',
    shortDesc: 'Generate custom placeholder dummy text in paragraphs, sentences, or words.',
    seoTitle: 'Lorem Ipsum Generator Online - Free Dummy Text | DesiDesk',
    seoDesc: 'Generate customizable Lorem Ipsum placeholder dummy text for mockups, prototypes, and layouts. Choose paragraphs, sentences, or words.',
    keywords: 'lorem ipsum generator, dummy text generator, placeholder text, fake text, lorem ipsum online',
    howToSteps: [
      'Choose whether to generate Paragraphs, Sentences, or Words.',
      'Specify the desired count.',
      'Click "Generate" and copy the placeholder text.'
    ],
    features: [
      'Generate by Paragraphs, Sentences, or Words.',
      'Classic Latin passages.',
      'Includes standard "Lorem ipsum dolor sit amet..." lead.',
      'One-click copy to clipboard.'
    ],
    faqs: [
      {
        q: 'What is Lorem Ipsum?',
        a: 'Lorem Ipsum is standard dummy text used by designers and printers since the 1500s to demonstrate visual layouts without readable content distractions.'
      }
    ],
    related: ['word-counter', 'text-repeater', 'slug-generator'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Generate Type:</label>
          <select id="loremType" class="form-select">
            <option value="paras">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Quantity:</label>
          <input type="number" id="loremCount" class="form-input" min="1" max="50" value="3" />
        </div>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="genLoremBtn" class="btn btn-primary">Generate Dummy Text</button>
        <button id="copyBtn" class="btn btn-secondary">Copy to Clipboard</button>
      </div>

      <div class="form-group">
        <label class="form-label">Generated Text:</label>
        <textarea id="loremOutput" class="form-textarea" style="min-height:220px;" readonly></textarea>
      </div>
    `,
    toolScript: `
      const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ');

      const loremType = document.getElementById('loremType');
      const loremCount = document.getElementById('loremCount');
      const genLoremBtn = document.getElementById('genLoremBtn');
      const copyBtn = document.getElementById('copyBtn');
      const loremOutput = document.getElementById('loremOutput');

      function makeSentence() {
        const len = Math.floor(Math.random() * 10) + 8;
        const words = [];
        for (let i = 0; i < len; i++) {
          words.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
        }
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return words.join(' ') + '.';
      }

      function makeParagraph() {
        const sCount = Math.floor(Math.random() * 4) + 4;
        const sents = [];
        for (let i = 0; i < sCount; i++) sents.push(makeSentence());
        return sents.join(' ');
      }

      function generate() {
        const type = loremType.value;
        const count = parseInt(loremCount.value, 10) || 3;
        let out = '';

        if (type === 'paras') {
          const pList = [];
          for (let i = 0; i < count; i++) {
            let p = makeParagraph();
            if (i === 0) p = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + p;
            pList.push(p);
          }
          out = pList.join('\\n\\n');
        } else if (type === 'sentences') {
          const sList = [];
          for (let i = 0; i < count; i++) sList.push(makeSentence());
          out = sList.join(' ');
        } else {
          const wList = [];
          for (let i = 0; i < count; i++) wList.push(WORDS[i % WORDS.length]);
          out = wList.join(' ');
        }

        loremOutput.value = out;
      }

      genLoremBtn.addEventListener('click', generate);
      generate();

      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(loremOutput.value).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy to Clipboard'; }, 2000);
        });
      });
    `
  },
  {
    id: 'remove-extra-spaces',
    slug: 'remove-extra-spaces',
    category: 'text',
    name: 'Remove Extra Spaces & Blank Lines',
    shortDesc: 'Clean redundant spaces, empty lines, and tabs from your text instantly.',
    seoTitle: 'Remove Extra Spaces Online - Whitespace Cleaner Free | DesiDesk',
    seoDesc: 'Remove multiple spaces, tabs, and blank lines from text. Clean formatting for articles, code, and documents directly in browser.',
    keywords: 'remove extra spaces, whitespace remover, delete duplicate spaces, text space cleaner',
    howToSteps: [
      'Paste your formatted or messy text.',
      'Click "Clean Whitespace" to normalize spaces and remove blank lines.',
      'Copy the cleaned text.'
    ],
    features: [
      'Converts multiple spaces into a single space.',
      'Trims leading and trailing spaces per line.',
      'Removes empty blank lines.',
      'One-click instant cleanup.'
    ],
    faqs: [
      {
        q: 'Does it remove paragraph breaks?',
        a: 'You can choose whether to preserve single line breaks or compress everything into a single continuous paragraph.'
      }
    ],
    related: ['word-counter', 'remove-duplicate-lines', 'case-converter'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input Text:</label>
        <textarea id="spaceInput" class="form-textarea" style="min-height:220px;" placeholder="Paste text with excessive spaces or empty lines..."></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="cleanSpacesBtn" class="btn btn-primary">Clean Extra Spaces</button>
        <button id="singleLineBtn" class="btn btn-secondary">Collapse to Single Line</button>
        <button id="copyBtn" class="btn btn-secondary">Copy Result</button>
        <button id="clearBtn" class="btn btn-outline">Clear</button>
      </div>
    `,
    toolScript: `
      const spaceInput = document.getElementById('spaceInput');
      const cleanSpacesBtn = document.getElementById('cleanSpacesBtn');
      const singleLineBtn = document.getElementById('singleLineBtn');
      const copyBtn = document.getElementById('copyBtn');
      const clearBtn = document.getElementById('clearBtn');

      cleanSpacesBtn.addEventListener('click', () => {
        const val = spaceInput.value;
        const cleaned = val
          .split('\\n')
          .map(line => line.replace(/[ \\t]+/g, ' ').trim())
          .filter(Boolean)
          .join('\\n');
        spaceInput.value = cleaned;
      });

      singleLineBtn.addEventListener('click', () => {
        spaceInput.value = spaceInput.value.replace(/\\s+/g, ' ').trim();
      });

      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(spaceInput.value).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy Result'; }, 2000);
        });
      });

      clearBtn.addEventListener('click', () => { spaceInput.value = ''; });
    `
  }
];
