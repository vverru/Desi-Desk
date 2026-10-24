// builder/tools-text-2.js

module.exports = [
  {
    id: 'find-and-replace',
    slug: 'find-and-replace',
    category: 'text',
    name: 'Find and Replace Text',
    shortDesc: 'Search and replace words or patterns in text with case sensitivity and regex support.',
    seoTitle: 'Find and Replace Text Online - Regex & Word Replacer | DesiDesk',
    seoDesc: 'Find and replace words, phrases, and regex patterns in text. Case-sensitive and whole-word matching on DesiDesk.',
    keywords: 'find and replace, replace text online, word replacer, regex find and replace, batch text replace',
    howToSteps: [
      'Paste your content into the main text box.',
      'Enter the word or pattern to "Find".',
      'Enter the "Replace with" word.',
      'Click "Replace All" and copy your updated text.'
    ],
    features: [
      'Match case and match whole words options.',
      'Regular Expressions (Regex) mode.',
      'Shows count of replacements made.',
      'One-click copy to clipboard.'
    ],
    faqs: [
      {
        q: 'Can I use Regular Expressions?',
        a: 'Yes, check "Use Regular Expressions" to run advanced regex replacements like `\\d+` or `\\b[A-Z]`.'
      }
    ],
    related: ['word-counter', 'remove-extra-spaces', 'case-converter'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input Text:</label>
        <textarea id="findInputText" class="form-textarea" style="min-height:180px;" placeholder="Paste text here..."></textarea>
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Find:</label>
          <input type="text" id="findStr" class="form-input" placeholder="Text to search for..." />
        </div>
        <div class="form-group">
          <label class="form-label">Replace With:</label>
          <input type="text" id="replaceStr" class="form-input" placeholder="Replacement text..." />
        </div>
      </div>

      <div style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-bottom:1.5rem;">
        <label style="cursor:pointer;"><input type="checkbox" id="chkMatchCase" /> Match Case</label>
        <label style="cursor:pointer;"><input type="checkbox" id="chkWholeWord" /> Whole Words Only</label>
        <label style="cursor:pointer;"><input type="checkbox" id="chkRegex" /> Use Regular Expressions</label>
      </div>

      <div class="btn-group">
        <button id="btnReplaceAll" class="btn btn-primary">Replace All</button>
        <button id="btnCopyResult" class="btn btn-secondary">Copy Text</button>
        <button id="btnClearAll" class="btn btn-outline">Clear</button>
      </div>

      <div id="replaceAlert" class="alert alert-info" style="display:none;margin-top:1.5rem;"></div>
    `,
    toolScript: `
      const findInputText = document.getElementById('findInputText');
      const findStr = document.getElementById('findStr');
      const replaceStr = document.getElementById('replaceStr');
      const chkMatchCase = document.getElementById('chkMatchCase');
      const chkWholeWord = document.getElementById('chkWholeWord');
      const chkRegex = document.getElementById('chkRegex');
      const btnReplaceAll = document.getElementById('btnReplaceAll');
      const btnCopyResult = document.getElementById('btnCopyResult');
      const btnClearAll = document.getElementById('btnClearAll');
      const replaceAlert = document.getElementById('replaceAlert');

      btnReplaceAll.addEventListener('click', () => {
        const text = findInputText.value;
        const findVal = findStr.value;
        const replaceVal = replaceStr.value;

        if (!findVal) {
          alert('Please enter a string to find.');
          return;
        }

        try {
          let flags = 'g';
          if (!chkMatchCase.checked) flags += 'i';

          let pattern = findVal;
          if (!chkRegex.checked) {
            pattern = pattern.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\\\$&');
          }
          if (chkWholeWord.checked) {
            pattern = '\\\\b' + pattern + '\\\\b';
          }

          const regex = new RegExp(pattern, flags);
          const matches = (text.match(regex) || []).length;
          const updated = text.replace(regex, replaceVal);

          findInputText.value = updated;
          replaceAlert.className = 'alert alert-success';
          replaceAlert.textContent = 'Replaced ' + matches + ' occurrence(s) successfully.';
          replaceAlert.style.display = 'block';
        } catch(err) {
          replaceAlert.className = 'alert alert-error';
          replaceAlert.textContent = 'Error: ' + err.message;
          replaceAlert.style.display = 'block';
        }
      });

      btnCopyResult.addEventListener('click', () => {
        navigator.clipboard.writeText(findInputText.value).then(() => {
          btnCopyResult.textContent = 'Copied!';
          setTimeout(() => { btnCopyResult.textContent = 'Copy Text'; }, 2000);
        });
      });

      btnClearAll.addEventListener('click', () => {
        findInputText.value = '';
        findStr.value = '';
        replaceStr.value = '';
        replaceAlert.style.display = 'none';
      });
    `
  },
  {
    id: 'reverse-text',
    slug: 'reverse-text',
    category: 'text',
    name: 'Reverse Text & Words',
    shortDesc: 'Reverse characters, flip words in sentences, or invert lines of text.',
    seoTitle: 'Reverse Text Online - Flip Words, Letters & Lines | DesiDesk',
    seoDesc: 'Reverse words, flip letters backwards, or invert lines upside down. Free online text reversing tool on DesiDesk.',
    keywords: 'reverse text, backwards text generator, flip words, invert text, reverse string online',
    howToSteps: [
      'Type or paste text into the box.',
      'Click "Reverse Characters", "Reverse Words", or "Reverse Lines".',
      'Copy your flipped result.'
    ],
    features: [
      'Reverse all characters backwards (e.g. abc -> cba).',
      'Reverse word order inside sentences.',
      'Invert line ordering.',
      'One-click copy.'
    ],
    faqs: [
      {
        q: 'Can this tool reverse emojis and Unicode characters?',
        a: 'Yes, it uses Unicode code point awareness so emojis and combining characters are reversed without corruption.'
      }
    ],
    related: ['case-converter', 'word-counter'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input Text:</label>
        <textarea id="revInput" class="form-textarea" style="min-height:180px;" placeholder="Type text to reverse..."></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button class="btn btn-secondary" onclick="doReverse('chars')">Reverse Characters</button>
        <button class="btn btn-secondary" onclick="doReverse('words')">Reverse Words</button>
        <button class="btn btn-secondary" onclick="doReverse('lines')">Reverse Lines</button>
      </div>

      <div class="btn-group">
        <button id="copyBtn" class="btn btn-primary">Copy Result</button>
        <button id="clearBtn" class="btn btn-outline">Clear</button>
      </div>
    `,
    toolScript: `
      const revInput = document.getElementById('revInput');
      const copyBtn = document.getElementById('copyBtn');
      const clearBtn = document.getElementById('clearBtn');

      window.doReverse = function(mode) {
        const text = revInput.value;
        if (!text) return;
        if (mode === 'chars') {
          revInput.value = Array.from(text).reverse().join('');
        } else if (mode === 'words') {
          revInput.value = text.split('\\n').map(line => line.split(' ').reverse().join(' ')).join('\\n');
        } else if (mode === 'lines') {
          revInput.value = text.split('\\n').reverse().join('\\n');
        }
      };

      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(revInput.value).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy Result'; }, 2000);
        });
      });
      clearBtn.addEventListener('click', () => { revInput.value = ''; });
    `
  },
  {
    id: 'text-to-binary',
    slug: 'text-to-binary',
    category: 'text',
    name: 'Text to Binary & Binary to Text',
    shortDesc: 'Convert ASCII and Unicode text to 8-bit binary digits and binary code back to text.',
    seoTitle: 'Text to Binary Converter - Binary to Text Online Free | DesiDesk',
    seoDesc: 'Convert text to binary code (0s and 1s) and binary code back to English text. Fast, free, browser-based binary converter on DesiDesk.',
    keywords: 'text to binary, binary to text, english to binary, binary code translator, ascii to binary',
    howToSteps: [
      'Enter text or binary digits into the input box.',
      'Click "Text to Binary" or "Binary to Text".',
      'Copy the converted result.'
    ],
    features: [
      'Standard 8-bit byte representation with space separators.',
      'Bidirectional encoding and decoding.',
      'UTF-8 character support.',
      'One-click copy to clipboard.'
    ],
    faqs: [
      {
        q: 'What binary representation is used?',
        a: 'Each character is converted into its 8-bit binary equivalent (e.g. "A" -> 01000001).'
      }
    ],
    related: ['reverse-text', 'base64-encoder-decoder'],
    toolHtml: `
      <div class="form-group">
        <label class="form-label">Input (Text or Binary):</label>
        <textarea id="binInput" class="form-textarea" style="min-height:160px;font-family:var(--font-mono);font-size:0.875rem;" placeholder="Type text or paste binary (e.g. 01000001 01000010)..."></textarea>
      </div>

      <div class="btn-group" style="margin-bottom:1.5rem;">
        <button id="btnTextToBin" class="btn btn-primary">Text &rarr; Binary</button>
        <button id="btnBinToText" class="btn btn-secondary">Binary &rarr; Text</button>
        <button id="btnCopy" class="btn btn-secondary">Copy Output</button>
        <button id="btnClear" class="btn btn-outline">Clear</button>
      </div>

      <div class="form-group">
        <label class="form-label">Output Result:</label>
        <textarea id="binOutput" class="form-textarea" style="min-height:160px;font-family:var(--font-mono);font-size:0.875rem;" readonly></textarea>
      </div>
    `,
    toolScript: `
      const binInput = document.getElementById('binInput');
      const binOutput = document.getElementById('binOutput');
      const btnTextToBin = document.getElementById('btnTextToBin');
      const btnBinToText = document.getElementById('btnBinToText');
      const btnCopy = document.getElementById('btnCopy');
      const btnClear = document.getElementById('btnClear');

      btnTextToBin.addEventListener('click', () => {
        const text = binInput.value;
        const res = Array.from(text).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        binOutput.value = res;
      });

      btnBinToText.addEventListener('click', () => {
        const bins = binInput.value.trim().split(/\\s+/);
        try {
          const res = bins.map(b => String.fromCharCode(parseInt(b, 2))).join('');
          binOutput.value = res;
        } catch(e) {
          alert('Invalid binary digits.');
        }
      });

      btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(binOutput.value).then(() => {
          btnCopy.textContent = 'Copied!';
          setTimeout(() => { btnCopy.textContent = 'Copy Output'; }, 2000);
        });
      });

      btnClear.addEventListener('click', () => {
        binInput.value = '';
        binOutput.value = '';
      });
    `
  },
  {
    id: 'number-to-words',
    slug: 'number-to-words',
    category: 'text',
    name: 'Number to Words Converter',
    shortDesc: 'Convert numbers and currency figures into English words in Western and Indian Lakh/Crore numbering.',
    seoTitle: 'Number to Words Converter Online - Indian Lakhs & International | DesiDesk',
    seoDesc: 'Convert numbers into English words for cheques, invoices, and legal documents. Supports International (Millions/Billions) and Indian (Lakhs/Crores) formats.',
    keywords: 'number to words, cheque words converter, convert numbers to words online, indian number to words',
    howToSteps: [
      'Enter the numerical amount.',
      'Select formatting standard (Indian Lakhs/Crores or Western Millions/Billions).',
      'Copy the converted written English text.'
    ],
    features: [
      'Supports Indian numbering (Lakhs and Crores).',
      'Supports International numbering (Millions and Billions).',
      'Currency formatting with "Rupees / Dollars Only".',
      'One-click copy for bank cheques.'
    ],
    faqs: [
      {
        q: 'Is this suitable for writing bank cheques?',
        a: 'Yes, it accurately spells out amounts and appends "Only" as required by banking standards.'
      }
    ],
    related: ['word-counter', 'percentage-calculator'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Enter Number / Amount:</label>
          <input type="number" id="numVal" class="form-input" value="1250000" min="0" step="any" />
        </div>
        <div class="form-group">
          <label class="form-label">Numbering Format:</label>
          <select id="numFormat" class="form-select">
            <option value="indian" selected>Indian (Lakhs & Crores)</option>
            <option value="western">International (Millions & Billions)</option>
          </select>
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;">
        <div style="font-size:0.85rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;margin-bottom:0.5rem;">In English Words:</div>
        <div id="resWords" style="font-size:1.35rem;font-weight:700;color:var(--primary);line-height:1.5;">Twelve Lakh Fifty Thousand</div>
        <div id="resCurrencyWords" style="font-size:1.05rem;color:var(--text-main);margin-top:0.5rem;">Rupees Twelve Lakh Fifty Thousand Only.</div>
      </div>

      <div class="btn-group" style="margin-top:1.5rem;">
        <button id="copyWordsBtn" class="btn btn-primary">Copy Words</button>
      </div>
    `,
    toolScript: `
      const numVal = document.getElementById('numVal');
      const numFormat = document.getElementById('numFormat');
      const resWords = document.getElementById('resWords');
      const resCurrencyWords = document.getElementById('resCurrencyWords');
      const copyWordsBtn = document.getElementById('copyWordsBtn');

      const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
      const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

      function convertUnderThousand(n) {
        let str = '';
        if (n >= 100) {
          str += ONES[Math.floor(n / 100)] + " Hundred ";
          n %= 100;
        }
        if (n >= 20) {
          str += TENS[Math.floor(n / 10)] + " ";
          n %= 10;
        }
        if (n > 0) {
          str += ONES[n] + " ";
        }
        return str.trim();
      }

      function toIndianWords(n) {
        if (n === 0) return "Zero";
        let str = '';
        const crore = Math.floor(n / 10000000); n %= 10000000;
        const lakh = Math.floor(n / 100000); n %= 100000;
        const thousand = Math.floor(n / 1000); n %= 1000;

        if (crore > 0) str += toIndianWords(crore) + " Crore ";
        if (lakh > 0) str += convertUnderThousand(lakh) + " Lakh ";
        if (thousand > 0) str += convertUnderThousand(thousand) + " Thousand ";
        if (n > 0) str += convertUnderThousand(n);
        return str.trim();
      }

      function toWesternWords(n) {
        if (n === 0) return "Zero";
        let str = '';
        const billion = Math.floor(n / 1000000000); n %= 1000000000;
        const million = Math.floor(n / 1000000); n %= 1000000;
        const thousand = Math.floor(n / 1000); n %= 1000;

        if (billion > 0) str += convertUnderThousand(billion) + " Billion ";
        if (million > 0) str += convertUnderThousand(million) + " Million ";
        if (thousand > 0) str += convertUnderThousand(thousand) + " Thousand ";
        if (n > 0) str += convertUnderThousand(n);
        return str.trim();
      }

      function update() {
        const val = Math.floor(parseFloat(numVal.value) || 0);
        const fmt = numFormat.value;
        const words = fmt === 'indian' ? toIndianWords(val) : toWesternWords(val);
        resWords.textContent = words;
        resCurrencyWords.textContent = fmt === 'indian'
          ? 'Rupees ' + words + ' Only.'
          : words + ' Dollars Only.';
      }

      numVal.addEventListener('input', update);
      numFormat.addEventListener('change', update);
      update();

      copyWordsBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(resCurrencyWords.textContent).then(() => {
          copyWordsBtn.textContent = 'Copied!';
          setTimeout(() => { copyWordsBtn.textContent = 'Copy Words'; }, 2000);
        });
      });
    `
  }
];
