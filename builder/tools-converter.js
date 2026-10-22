// builder/tools-converter.js

module.exports = [
  {
    id: 'length-converter',
    slug: 'length-converter',
    category: 'converter',
    name: 'Length & Distance Converter',
    shortDesc: 'Convert between Meters, Kilometers, Centimeters, Miles, Yards, Feet, and Inches.',
    seoTitle: 'Length Converter Online - Meters, Feet, Inches, Miles | DesiDesk',
    seoDesc: 'Convert length and distance units online. Instant conversions between meters, feet, inches, kilometers, miles, yards, and centimeters on DesiDesk.',
    keywords: 'length converter, distance converter, meters to feet, feet to meters, inches to cm, miles to km',
    howToSteps: [
      'Enter the value you wish to convert.',
      'Select the "From" unit (e.g., Meters).',
      'Select the "To" unit (e.g., Feet).',
      'View the converted value and full unit conversion table.'
    ],
    features: [
      'Converts Metric and Imperial distance units.',
      'Precision control up to 6 decimal places.',
      'Real-time bidirectional conversion.',
      'Complete comparison table for all units.'
    ],
    faqs: [
      {
        q: 'How many feet are in a meter?',
        a: '1 meter is approximately equal to 3.28084 feet or 39.3701 inches.'
      }
    ],
    related: ['area-converter', 'weight-converter', 'speed-converter'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Value:</label>
          <input type="number" id="lengthVal" class="form-input" value="1" step="any" />
        </div>
        <div class="form-group">
          <label class="form-label">From Unit:</label>
          <select id="lengthFrom" class="form-select">
            <option value="m" selected>Meters (m)</option>
            <option value="km">Kilometers (km)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="mm">Millimeters (mm)</option>
            <option value="mi">Miles (mi)</option>
            <option value="yd">Yards (yd)</option>
            <option value="ft">Feet (ft)</option>
            <option value="in">Inches (in)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">To Unit:</label>
          <select id="lengthTo" class="form-select">
            <option value="ft" selected>Feet (ft)</option>
            <option value="m">Meters (m)</option>
            <option value="km">Kilometers (km)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="mm">Millimeters (mm)</option>
            <option value="mi">Miles (mi)</option>
            <option value="yd">Yards (yd)</option>
            <option value="in">Inches (in)</option>
          </select>
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;text-align:center;">
        <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Conversion Result</div>
        <div id="resLength" style="font-size:2.5rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">3.28084 ft</div>
        <div id="resFormula" style="font-size:0.875rem;color:var(--text-muted);margin-top:0.25rem;"></div>
      </div>

      <div style="margin-top:1.5rem;background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;">
        <h4 style="font-size:0.95rem;color:var(--secondary);margin-bottom:0.75rem;">Equivalent Values:</h4>
        <div id="equivGrid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:0.75rem;font-size:0.875rem;"></div>
      </div>
    `,
    toolScript: `
      const FACTORS = {
        m: 1,
        km: 1000,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.344,
        yd: 0.9144,
        ft: 0.3048,
        in: 0.0254
      };

      const LABELS = {
        m: 'Meters',
        km: 'Kilometers',
        cm: 'Centimeters',
        mm: 'Millimeters',
        mi: 'Miles',
        yd: 'Yards',
        ft: 'Feet',
        in: 'Inches'
      };

      const lengthVal = document.getElementById('lengthVal');
      const lengthFrom = document.getElementById('lengthFrom');
      const lengthTo = document.getElementById('lengthTo');
      const resLength = document.getElementById('resLength');
      const resFormula = document.getElementById('resFormula');
      const equivGrid = document.getElementById('equivGrid');

      function convertLength() {
        const val = parseFloat(lengthVal.value) || 0;
        const from = lengthFrom.value;
        const to = lengthTo.value;

        const inMeters = val * FACTORS[from];
        const result = inMeters / FACTORS[to];

        resLength.textContent = (result.toFixed(6).replace(/\\.?0+$/, '')) + ' ' + to;
        resFormula.textContent = \`1 \${from} = \${(FACTORS[from] / FACTORS[to]).toFixed(6).replace(/\\.?0+$/, '')} \${to}\`;

        equivGrid.innerHTML = Object.keys(FACTORS).map(k => {
          const v = inMeters / FACTORS[k];
          return \`<div style="padding:6px;background:var(--bg-subtle);border-radius:var(--radius-sm);"><strong>\${v.toFixed(4).replace(/\\.?0+$/, '')}</strong> <span style="color:var(--text-muted);">\${k}</span></div>\`;
        }).join('');
      }

      [lengthVal, lengthFrom, lengthTo].forEach(el => el.addEventListener('input', convertLength));
      convertLength();
    `
  },
  {
    id: 'weight-converter',
    slug: 'weight-converter',
    category: 'converter',
    name: 'Weight & Mass Converter',
    shortDesc: 'Convert between Kilograms, Grams, Milligrams, Pounds, Ounces, and Metric Tons.',
    seoTitle: 'Weight Converter Online - Kilograms, Pounds, Grams, Ounces | DesiDesk',
    seoDesc: 'Convert mass and weight units online. Instant conversions between kg, lbs, grams, ounces, metric tons, and stones on DesiDesk.',
    keywords: 'weight converter, kg to lbs, pounds to kg, grams to ounces, mass converter online',
    howToSteps: [
      'Enter the weight number.',
      'Select starting unit (e.g. Kilograms).',
      'Select target unit (e.g. Pounds).',
      'View instant conversion and full equivalence chart.'
    ],
    features: [
      'Supports Kilograms, Grams, Milligrams, Metric Tons, Pounds, Ounces, Stones.',
      'High-precision float calculation.',
      'Bidirectional converter.',
      'Instant result.'
    ],
    faqs: [
      {
        q: 'How many pounds are in one kilogram?',
        a: '1 kilogram is equal to approximately 2.20462 pounds.'
      }
    ],
    related: ['length-converter', 'area-converter', 'temperature-converter'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Value:</label>
          <input type="number" id="weightVal" class="form-input" value="1" step="any" />
        </div>
        <div class="form-group">
          <label class="form-label">From Unit:</label>
          <select id="weightFrom" class="form-select">
            <option value="kg" selected>Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="mg">Milligrams (mg)</option>
            <option value="lb">Pounds (lbs)</option>
            <option value="oz">Ounces (oz)</option>
            <option value="ton">Metric Tons (t)</option>
            <option value="st">Stones (st)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">To Unit:</label>
          <select id="weightTo" class="form-select">
            <option value="lb" selected>Pounds (lbs)</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="mg">Milligrams (mg)</option>
            <option value="oz">Ounces (oz)</option>
            <option value="ton">Metric Tons (t)</option>
            <option value="st">Stones (st)</option>
          </select>
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;text-align:center;">
        <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Conversion Result</div>
        <div id="resWeight" style="font-size:2.5rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">2.20462 lb</div>
      </div>
    `,
    toolScript: `
      const FACTORS = {
        kg: 1,
        g: 0.001,
        mg: 0.000001,
        lb: 0.45359237,
        oz: 0.028349523125,
        ton: 1000,
        st: 6.35029318
      };

      const weightVal = document.getElementById('weightVal');
      const weightFrom = document.getElementById('weightFrom');
      const weightTo = document.getElementById('weightTo');
      const resWeight = document.getElementById('resWeight');

      function convertWeight() {
        const val = parseFloat(weightVal.value) || 0;
        const from = weightFrom.value;
        const to = weightTo.value;

        const inKg = val * FACTORS[from];
        const res = inKg / FACTORS[to];
        resWeight.textContent = res.toFixed(5).replace(/\\.?0+$/, '') + ' ' + to;
      }

      [weightVal, weightFrom, weightTo].forEach(el => el.addEventListener('input', convertWeight));
      convertWeight();
    `
  },
  {
    id: 'temperature-converter',
    slug: 'temperature-converter',
    category: 'converter',
    name: 'Temperature Converter',
    shortDesc: 'Convert between Celsius (°C), Fahrenheit (°F), and Kelvin (K) with step-by-step formulas.',
    seoTitle: 'Temperature Converter Online - Celsius, Fahrenheit, Kelvin | DesiDesk',
    seoDesc: 'Convert temperature units online. Instant conversions between Celsius, Fahrenheit, and Kelvin with formula breakdown on DesiDesk.',
    keywords: 'temperature converter, celsius to fahrenheit, fahrenheit to celsius, kelvin converter',
    howToSteps: [
      'Enter the temperature value.',
      'Select your source unit (Celsius, Fahrenheit, or Kelvin).',
      'Select your destination unit.',
      'View the converted temperature and exact formula applied.'
    ],
    features: [
      'Supports Celsius (°C), Fahrenheit (°F), Kelvin (K).',
      'Step-by-step formula breakdown.',
      'Instant bidirectional calculation.',
      '100% free and private.'
    ],
    faqs: [
      {
        q: 'What is the formula to convert Celsius to Fahrenheit?',
        a: '°F = (°C × 9/5) + 32.'
      }
    ],
    related: ['length-converter', 'weight-converter', 'speed-converter'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Temperature:</label>
          <input type="number" id="tempVal" class="form-input" value="100" step="any" />
        </div>
        <div class="form-group">
          <label class="form-label">From:</label>
          <select id="tempFrom" class="form-select">
            <option value="C" selected>Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
            <option value="K">Kelvin (K)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">To:</label>
          <select id="tempTo" class="form-select">
            <option value="F" selected>Fahrenheit (°F)</option>
            <option value="C">Celsius (°C)</option>
            <option value="K">Kelvin (K)</option>
          </select>
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;text-align:center;">
        <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Result</div>
        <div id="resTemp" style="font-size:2.5rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">212 °F</div>
        <div id="resTempFormula" style="font-size:0.875rem;color:var(--text-muted);margin-top:0.5rem;">Formula: (100°C × 9/5) + 32 = 212°F</div>
      </div>
    `,
    toolScript: `
      const tempVal = document.getElementById('tempVal');
      const tempFrom = document.getElementById('tempFrom');
      const tempTo = document.getElementById('tempTo');
      const resTemp = document.getElementById('resTemp');
      const resTempFormula = document.getElementById('resTempFormula');

      function convertTemp() {
        const v = parseFloat(tempVal.value) || 0;
        const from = tempFrom.value;
        const to = tempTo.value;

        let inC = 0;
        if (from === 'C') inC = v;
        else if (from === 'F') inC = (v - 32) * (5 / 9);
        else inC = v - 273.15;

        let res = 0;
        let formula = '';

        if (to === 'C') {
          res = inC;
          formula = from === 'F' ? \`(\${v}°F - 32) × 5/9 = \${res.toFixed(2)}°C\` : \`\${v}K - 273.15 = \${res.toFixed(2)}°C\`;
        } else if (to === 'F') {
          res = (inC * (9 / 5)) + 32;
          formula = from === 'C' ? \`(\${v}°C × 9/5) + 32 = \${res.toFixed(2)}°F\` : \`(\${v}K - 273.15) × 9/5 + 32 = \${res.toFixed(2)}°F\`;
        } else {
          res = inC + 273.15;
          formula = from === 'C' ? \`\${v}°C + 273.15 = \${res.toFixed(2)}K\` : \`(\${v}°F - 32) × 5/9 + 273.15 = \${res.toFixed(2)}K\`;
        }

        resTemp.textContent = res.toFixed(2).replace(/\\.00$/, '') + ' ' + (to === 'K' ? 'K' : '°' + to);
        resTempFormula.textContent = formula;
      }

      [tempVal, tempFrom, tempTo].forEach(el => el.addEventListener('input', convertTemp));
      convertTemp();
    `
  },
  {
    id: 'data-storage-converter',
    slug: 'data-storage-converter',
    category: 'converter',
    name: 'Data Storage Converter',
    shortDesc: 'Convert between Bytes, KB, MB, GB, TB, and PB in Decimal (1000) or Binary (1024) bases.',
    seoTitle: 'Data Storage Converter - Bytes, KB, MB, GB, TB Free | DesiDesk',
    seoDesc: 'Convert data units between Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes. Toggle between decimal 1000 and binary 1024 bases on DesiDesk.',
    keywords: 'data storage converter, bytes to mb, mb to gb, gb to tb converter, data size calculator',
    howToSteps: [
      'Enter the numerical data size.',
      'Select starting unit (e.g. Gigabytes).',
      'Select target unit (e.g. Megabytes).',
      'Toggle Base 10 (1000) or Base 2 (1024 KiB/MiB).'
    ],
    features: [
      'Supports Bytes, KB, MB, GB, TB, PB.',
      'Supports both Decimal (1000) and Binary (1024) conventions.',
      'Real-time calculations.',
      'Equivalent storage chart.'
    ],
    faqs: [
      {
        q: 'What is the difference between 1000 vs 1024 base?',
        a: 'Storage manufacturers (HDDs/SSDs) count 1 GB = 1,000 MB, whereas operating systems (Windows) count 1 GiB = 1,024 MiB.'
      }
    ],
    related: ['length-converter', 'unix-timestamp-converter'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Data Value:</label>
          <input type="number" id="dataVal" class="form-input" value="1" min="0" step="any" />
        </div>
        <div class="form-group">
          <label class="form-label">From Unit:</label>
          <select id="dataFrom" class="form-select">
            <option value="B">Bytes (B)</option>
            <option value="KB">Kilobytes (KB)</option>
            <option value="MB">Megabytes (MB)</option>
            <option value="GB" selected>Gigabytes (GB)</option>
            <option value="TB">Terabytes (TB)</option>
            <option value="PB">Petabytes (PB)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">To Unit:</label>
          <select id="dataTo" class="form-select">
            <option value="MB" selected>Megabytes (MB)</option>
            <option value="B">Bytes (B)</option>
            <option value="KB">Kilobytes (KB)</option>
            <option value="GB">Gigabytes (GB)</option>
            <option value="TB">Terabytes (TB)</option>
            <option value="PB">Petabytes (PB)</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Calculation Standard:</label>
        <div style="display:flex;gap:1.5rem;">
          <label style="cursor:pointer;"><input type="radio" name="dataBase" value="1024" checked /> Binary Base 2 (1024 Bytes - OS Standard)</label>
          <label style="cursor:pointer;"><input type="radio" name="dataBase" value="1000" /> Decimal Base 10 (1000 Bytes - Drive Maker Standard)</label>
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;text-align:center;">
        <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Converted Size</div>
        <div id="resData" style="font-size:2.5rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">1,024 MB</div>
      </div>
    `,
    toolScript: `
      const POWERS = { B: 0, KB: 1, MB: 2, GB: 3, TB: 4, PB: 5 };
      const dataVal = document.getElementById('dataVal');
      const dataFrom = document.getElementById('dataFrom');
      const dataTo = document.getElementById('dataTo');
      const resData = document.getElementById('resData');

      function convertData() {
        const val = parseFloat(dataVal.value) || 0;
        const from = dataFrom.value;
        const to = dataTo.value;
        const base = parseInt(document.querySelector('input[name="dataBase"]:checked').value, 10);

        const diff = POWERS[from] - POWERS[to];
        const res = val * Math.pow(base, diff);

        resData.textContent = res.toLocaleString('en-US', { maximumFractionDigits: 6 }) + ' ' + to;
      }

      [dataVal, dataFrom, dataTo].forEach(el => el.addEventListener('input', convertData));
      document.querySelectorAll('input[name="dataBase"]').forEach(el => el.addEventListener('change', convertData));
      convertData();
    `
  },
  {
    id: 'unix-timestamp-converter',
    slug: 'unix-timestamp-converter',
    category: 'converter',
    name: 'Unix Timestamp Converter',
    shortDesc: 'Convert Epoch Unix timestamps to human-readable dates (UTC & Local) and vice versa.',
    seoTitle: 'Unix Timestamp Converter Online - Epoch to Date Free | DesiDesk',
    seoDesc: 'Convert Unix epoch timestamps to human readable dates (UTC and local timezone) and human dates to Unix timestamps in seconds and milliseconds.',
    keywords: 'unix timestamp converter, epoch converter, timestamp to date, epoch time to datetime',
    howToSteps: [
      'Enter an epoch timestamp in seconds or milliseconds.',
      'View instant date and time in your Local Timezone and UTC.',
      'Or pick a date/time to generate the corresponding Unix timestamp.'
    ],
    features: [
      'Supports seconds and milliseconds timestamps.',
      'Displays Local and UTC timestamps.',
      'Relative time breakdown (e.g. "X hours ago").',
      'Bidirectional date to timestamp picker.'
    ],
    faqs: [
      {
        q: 'What is Unix Epoch time?',
        a: 'Unix time is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC.'
      }
    ],
    related: ['data-storage-converter', 'length-converter'],
    toolHtml: `
      <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1.5rem;margin-bottom:1.5rem;">
        <h4 style="font-size:1.05rem;color:var(--secondary);margin-bottom:0.75rem;">1. Timestamp &rarr; Human Date:</h4>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
          <input type="number" id="tsInput" class="form-input" style="flex:1;min-width:200px;" />
          <button id="setNowBtn" class="btn btn-secondary">Current Time</button>
        </div>

        <div style="margin-top:1.25rem;">
          <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;">
            <span style="color:var(--text-muted);">Local Time:</span>
            <span id="tsLocal" style="font-weight:700;">-</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;">
            <span style="color:var(--text-muted);">UTC (GMT) Time:</span>
            <span id="tsUtc" style="font-weight:700;">-</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:6px 0;">
            <span style="color:var(--text-muted);">Relative:</span>
            <span id="tsRelative" style="font-weight:700;color:var(--primary);">-</span>
          </div>
        </div>
      </div>

      <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1.5rem;">
        <h4 style="font-size:1.05rem;color:var(--secondary);margin-bottom:0.75rem;">2. Human Date &rarr; Timestamp:</h4>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
          <input type="datetime-local" id="dateInput" class="form-input" style="flex:1;min-width:200px;" />
        </div>
        <div style="margin-top:1.25rem;">
          <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;">
            <span style="color:var(--text-muted);">Epoch Seconds:</span>
            <span id="dateSec" style="font-weight:700;font-family:var(--font-mono);">-</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:6px 0;">
            <span style="color:var(--text-muted);">Epoch Milliseconds:</span>
            <span id="dateMs" style="font-weight:700;font-family:var(--font-mono);">-</span>
          </div>
        </div>
      </div>
    `,
    toolScript: `
      const tsInput = document.getElementById('tsInput');
      const setNowBtn = document.getElementById('setNowBtn');
      const tsLocal = document.getElementById('tsLocal');
      const tsUtc = document.getElementById('tsUtc');
      const tsRelative = document.getElementById('tsRelative');
      const dateInput = document.getElementById('dateInput');
      const dateSec = document.getElementById('dateSec');
      const dateMs = document.getElementById('dateMs');

      function updateFromTs() {
        let val = parseInt(tsInput.value, 10);
        if (isNaN(val)) return;
        // If in seconds (10 digits), multiply by 1000
        if (val < 10000000000) val *= 1000;
        const d = new Date(val);

        tsLocal.textContent = d.toLocaleString();
        tsUtc.textContent = d.toUTCString();

        const diffSec = Math.round((Date.now() - val) / 1000);
        if (Math.abs(diffSec) < 60) {
          tsRelative.textContent = 'A few seconds ' + (diffSec > 0 ? 'ago' : 'from now');
        } else if (Math.abs(diffSec) < 3600) {
          tsRelative.textContent = Math.round(Math.abs(diffSec) / 60) + ' minutes ' + (diffSec > 0 ? 'ago' : 'from now');
        } else {
          tsRelative.textContent = Math.round(Math.abs(diffSec) / 3600) + ' hours ' + (diffSec > 0 ? 'ago' : 'from now');
        }
      }

      function setNow() {
        tsInput.value = Math.floor(Date.now() / 1000);
        updateFromTs();
      }

      setNowBtn.addEventListener('click', setNow);
      tsInput.addEventListener('input', updateFromTs);
      setNow();

      dateInput.addEventListener('input', () => {
        if (!dateInput.value) return;
        const d = new Date(dateInput.value);
        const ms = d.getTime();
        dateSec.textContent = Math.floor(ms / 1000);
        dateMs.textContent = ms;
      });
      dateInput.value = new Date().toISOString().slice(0, 16);
      dateInput.dispatchEvent(new Event('input'));
    `
  }
];
