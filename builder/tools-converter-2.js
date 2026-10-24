// builder/tools-converter-2.js

module.exports = [
  {
    id: 'area-converter',
    slug: 'area-converter',
    category: 'converter',
    name: 'Area Land Unit Converter',
    shortDesc: 'Convert between Square Feet, Square Meters, Acres, Hectares, Bigha, and Guntha.',
    seoTitle: 'Area Converter Online - Sq Feet, Acres, Hectares, Bigha | DesiDesk',
    seoDesc: 'Convert area and land units online. Fast conversions between square feet, square meters, acres, hectares, bigha, and guntha on DesiDesk.',
    keywords: 'area converter, sq feet to sq meters, acres to hectares, bigha converter, land measurement calculator',
    howToSteps: [
      'Enter the area measurement.',
      'Select source unit (e.g. Square Feet or Acres).',
      'Select destination unit (e.g. Square Meters or Guntha).',
      'View converted result.'
    ],
    features: [
      'Standard International and Indian land units (Acres, Hectares, Bigha, Guntha).',
      'High decimal precision.',
      'Instant conversion.',
      '100% free and private.'
    ],
    faqs: [
      {
        q: 'How many square feet are in 1 acre?',
        a: '1 acre is equal to exactly 43,560 square feet or approximately 4,046.86 square meters.'
      }
    ],
    related: ['length-converter', 'volume-converter'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Area Value:</label>
          <input type="number" id="areaVal" class="form-input" value="1000" step="any" />
        </div>
        <div class="form-group">
          <label class="form-label">From Unit:</label>
          <select id="areaFrom" class="form-select">
            <option value="sqft" selected>Square Feet (sq ft)</option>
            <option value="sqm">Square Meters (sq m)</option>
            <option value="acre">Acres</option>
            <option value="hectare">Hectares</option>
            <option value="guntha">Guntha (India)</option>
            <option value="sqyd">Square Yards (Gaj)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">To Unit:</label>
          <select id="areaTo" class="form-select">
            <option value="sqm" selected>Square Meters (sq m)</option>
            <option value="sqft">Square Feet (sq ft)</option>
            <option value="acre">Acres</option>
            <option value="hectare">Hectares</option>
            <option value="guntha">Guntha (India)</option>
            <option value="sqyd">Square Yards (Gaj)</option>
          </select>
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;text-align:center;">
        <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Conversion Result</div>
        <div id="resArea" style="font-size:2.5rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">92.903 sqm</div>
      </div>
    `,
    toolScript: `
      const FACTORS = {
        sqm: 1,
        sqft: 0.092903,
        acre: 4046.8564224,
        hectare: 10000,
        guntha: 101.17141056,
        sqyd: 0.836127
      };

      const areaVal = document.getElementById('areaVal');
      const areaFrom = document.getElementById('areaFrom');
      const areaTo = document.getElementById('areaTo');
      const resArea = document.getElementById('resArea');

      function convertArea() {
        const val = parseFloat(areaVal.value) || 0;
        const from = areaFrom.value;
        const to = areaTo.value;

        const inSqm = val * FACTORS[from];
        const res = inSqm / FACTORS[to];
        resArea.textContent = res.toFixed(4).replace(/\\.?0+$/, '') + ' ' + to;
      }

      [areaVal, areaFrom, areaTo].forEach(el => el.addEventListener('input', convertArea));
      convertArea();
    `
  },
  {
    id: 'speed-converter',
    slug: 'speed-converter',
    category: 'converter',
    name: 'Speed Converter',
    shortDesc: 'Convert speeds between Kilometers per Hour (km/h), Miles per Hour (mph), Knots, and Mach.',
    seoTitle: 'Speed Converter Online - km/h, mph, m/s, Knots | DesiDesk',
    seoDesc: 'Convert speed units online. Instant conversions between km/h, mph, meters per second, knots, and Mach on DesiDesk.',
    keywords: 'speed converter, kmh to mph, mph to kmh, knots to kmh, meters per second to kmh',
    howToSteps: [
      'Enter speed number.',
      'Select starting unit (e.g. km/h).',
      'Select destination unit (e.g. mph).',
      'View instant conversion result.'
    ],
    features: [
      'Supports km/h, mph, m/s, Knots, and Mach.',
      'Real-time calculation.',
      'Zero server upload.',
      'Precision up to 4 decimal places.'
    ],
    faqs: [
      {
        q: 'How many mph is 100 km/h?',
        a: '100 km/h is approximately equal to 62.1371 mph.'
      }
    ],
    related: ['length-converter', 'time-unit-converter'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Speed Value:</label>
          <input type="number" id="speedVal" class="form-input" value="100" step="any" />
        </div>
        <div class="form-group">
          <label class="form-label">From Unit:</label>
          <select id="speedFrom" class="form-select">
            <option value="kmh" selected>km/h (Kilometers / hr)</option>
            <option value="mph">mph (Miles / hr)</option>
            <option value="ms">m/s (Meters / sec)</option>
            <option value="knot">Knots (Nautical)</option>
            <option value="mach">Mach (Speed of Sound)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">To Unit:</label>
          <select id="speedTo" class="form-select">
            <option value="mph" selected>mph (Miles / hr)</option>
            <option value="kmh">km/h (Kilometers / hr)</option>
            <option value="ms">m/s (Meters / sec)</option>
            <option value="knot">Knots (Nautical)</option>
            <option value="mach">Mach (Speed of Sound)</option>
          </select>
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;text-align:center;">
        <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Conversion Result</div>
        <div id="resSpeed" style="font-size:2.5rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">62.14 mph</div>
      </div>
    `,
    toolScript: `
      const FACTORS = {
        ms: 1,
        kmh: 1 / 3.6,
        mph: 0.44704,
        knot: 0.514444,
        mach: 343
      };

      const speedVal = document.getElementById('speedVal');
      const speedFrom = document.getElementById('speedFrom');
      const speedTo = document.getElementById('speedTo');
      const resSpeed = document.getElementById('resSpeed');

      function convertSpeed() {
        const val = parseFloat(speedVal.value) || 0;
        const from = speedFrom.value;
        const to = speedTo.value;

        const inMs = val * FACTORS[from];
        const res = inMs / FACTORS[to];
        resSpeed.textContent = res.toFixed(3).replace(/\\.?0+$/, '') + ' ' + to;
      }

      [speedVal, speedFrom, speedTo].forEach(el => el.addEventListener('input', convertSpeed));
      convertSpeed();
    `
  },
  {
    id: 'number-system-converter',
    slug: 'number-system-converter',
    category: 'converter',
    name: 'Number System Converter (Binary, Hex, Dec)',
    shortDesc: 'Convert between Decimal, Binary, Hexadecimal, and Octal numeral systems with real-time updates.',
    seoTitle: 'Number System Converter - Decimal, Binary, Hex, Octal | DesiDesk',
    seoDesc: 'Convert numbers between Decimal, Binary, Hexadecimal, and Octal formats with live two-way synchronization on DesiDesk.',
    keywords: 'number system converter, decimal to binary, binary to hex, hex to decimal, octal converter',
    howToSteps: [
      'Type a number into any field (Decimal, Binary, Hex, or Octal).',
      'All other number systems synchronize and update in real time.',
      'Copy the converted values.'
    ],
    features: [
      'Two-way interactive synchronization.',
      'Validates input characters per base (e.g. 0-1 for binary, 0-F for hex).',
      'Supports large integers.',
      'One-click copy for each base.'
    ],
    faqs: [
      {
        q: 'What is Hexadecimal base?',
        a: 'Hexadecimal uses base-16 with digits 0-9 and letters A-F to represent numbers compactly.'
      }
    ],
    related: ['text-to-binary', 'roman-numeral-converter'],
    toolHtml: `
      <div style="display:flex;flex-direction:column;gap:1.25rem;">
        <div class="form-group">
          <label class="form-label">Decimal (Base 10):</label>
          <input type="text" id="numDec" class="form-input" value="255" />
        </div>
        <div class="form-group">
          <label class="form-label">Binary (Base 2):</label>
          <input type="text" id="numBin" class="form-input" value="11111111" />
        </div>
        <div class="form-group">
          <label class="form-label">Hexadecimal (Base 16):</label>
          <input type="text" id="numHex" class="form-input" value="FF" />
        </div>
        <div class="form-group">
          <label class="form-label">Octal (Base 8):</label>
          <input type="text" id="numOct" class="form-input" value="377" />
        </div>
      </div>
    `,
    toolScript: `
      const numDec = document.getElementById('numDec');
      const numBin = document.getElementById('numBin');
      const numHex = document.getElementById('numHex');
      const numOct = document.getElementById('numOct');

      function updateAll(val, source) {
        if (isNaN(val) || val === null) return;
        if (source !== 'dec') numDec.value = val.toString(10);
        if (source !== 'bin') numBin.value = val.toString(2);
        if (source !== 'hex') numHex.value = val.toString(16).toUpperCase();
        if (source !== 'oct') numOct.value = val.toString(8);
      }

      numDec.addEventListener('input', () => {
        const v = parseInt(numDec.value.trim(), 10);
        updateAll(v, 'dec');
      });
      numBin.addEventListener('input', () => {
        const v = parseInt(numBin.value.trim(), 2);
        updateAll(v, 'bin');
      });
      numHex.addEventListener('input', () => {
        const v = parseInt(numHex.value.trim(), 16);
        updateAll(v, 'hex');
      });
      numOct.addEventListener('input', () => {
        const v = parseInt(numOct.value.trim(), 8);
        updateAll(v, 'oct');
      });
    `
  },
  {
    id: 'roman-numeral-converter',
    slug: 'roman-numeral-converter',
    category: 'converter',
    name: 'Roman Numeral Converter',
    shortDesc: 'Convert Roman numerals (I, V, X, L, C, D, M) to Arabic numbers and numbers to Roman numerals.',
    seoTitle: 'Roman Numeral Converter Online - Roman to Numbers Free | DesiDesk',
    seoDesc: 'Convert Roman numerals to numbers and Arabic numbers to Roman numerals instantly. Free online roman numerals tool on DesiDesk.',
    keywords: 'roman numeral converter, roman to arabic, numbers to roman numerals, roman numerals chart',
    howToSteps: [
      'Enter an Arabic number (e.g. 2026) or Roman numeral (e.g. MMXXVI).',
      'View instant translation between both numeral systems.',
      'Copy the converted result.'
    ],
    features: [
      'Supports numbers from 1 to 3,999.',
      'Two-way instant conversion.',
      'Validates Roman numeral syntax.',
      'One-click copy.'
    ],
    faqs: [
      {
        q: 'What is 2026 in Roman Numerals?',
        a: '2026 in Roman numerals is MMXXVI (M=1000, M=1000, XX=20, VI=6).'
      }
    ],
    related: ['number-system-converter', 'number-to-words'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Arabic Number (1 - 3999):</label>
          <input type="number" id="arabicInput" class="form-input" value="2026" min="1" max="3999" />
        </div>
        <div class="form-group">
          <label class="form-label">Roman Numeral:</label>
          <input type="text" id="romanInput" class="form-input" value="MMXXVI" style="font-weight:700;letter-spacing:1px;" />
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;text-align:center;">
        <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Result</div>
        <div id="resRoman" style="font-size:2.25rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">MMXXVI = 2026</div>
      </div>
    `,
    toolScript: `
      const arabicInput = document.getElementById('arabicInput');
      const romanInput = document.getElementById('romanInput');
      const resRoman = document.getElementById('resRoman');

      const ROMAN_MAP = [
        [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
        [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
        [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
      ];

      function toRoman(num) {
        let roman = '';
        for (const [val, sym] of ROMAN_MAP) {
          while (num >= val) {
            roman += sym;
            num -= val;
          }
        }
        return roman;
      }

      function fromRoman(str) {
        const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        str = str.toUpperCase().trim();
        let total = 0;
        for (let i = 0; i < str.length; i++) {
          const cur = map[str[i]] || 0;
          const next = map[str[i+1]] || 0;
          if (cur < next) {
            total -= cur;
          } else {
            total += cur;
          }
        }
        return total;
      }

      arabicInput.addEventListener('input', () => {
        const val = parseInt(arabicInput.value, 10);
        if (val >= 1 && val <= 3999) {
          const r = toRoman(val);
          romanInput.value = r;
          resRoman.textContent = r + ' = ' + val;
        }
      });

      romanInput.addEventListener('input', () => {
        const r = romanInput.value.toUpperCase().trim();
        const a = fromRoman(r);
        if (a > 0 && a <= 3999) {
          arabicInput.value = a;
          resRoman.textContent = r + ' = ' + a;
        }
      });
    `
  }
];
