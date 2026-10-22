// builder/tools-calculator-2.js

module.exports = [
  {
    id: 'date-difference-calculator',
    slug: 'date-difference-calculator',
    category: 'calculator',
    name: 'Date Difference Calculator',
    shortDesc: 'Calculate the exact time difference between two calendar dates in days, weeks, and months.',
    seoTitle: 'Date Difference Calculator - Days Between Dates Free | DesiDesk',
    seoDesc: 'Calculate exact duration and number of days between two dates. View breakdown in years, months, weeks, and total days on DesiDesk.',
    keywords: 'date difference calculator, days between dates, duration between two dates, date calculator online',
    howToSteps: [
      'Select Start Date.',
      'Select End Date.',
      'View exact duration in years, months, days, and total calendar days.'
    ],
    features: [
      'Calculates exact calendar months and leap days.',
      'Total breakdown in days, weeks, and months.',
      'Option to include or exclude the end date.',
      'Instant calculation.'
    ],
    faqs: [
      {
        q: 'Does it calculate business days?',
        a: 'The primary display shows total calendar days; total weeks provide business week approximation.'
      }
    ],
    related: ['age-calculator', 'percentage-calculator'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Start Date:</label>
          <input type="date" id="dStart" class="form-input" />
        </div>
        <div class="form-group">
          <label class="form-label">End Date:</label>
          <input type="date" id="dEnd" class="form-input" />
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;text-align:center;">
        <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Time Difference</div>
        <div id="resDateDiff" style="font-size:2rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">-</div>
      </div>

      <div class="stat-grid" style="margin-top:1.5rem;">
        <div class="stat-card">
          <div class="stat-value" id="totDays">-</div>
          <div class="stat-label">Total Days</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="totWeeks">-</div>
          <div class="stat-label">Total Weeks</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="totHours">-</div>
          <div class="stat-label">Total Hours</div>
        </div>
      </div>
    `,
    toolScript: `
      const dStart = document.getElementById('dStart');
      const dEnd = document.getElementById('dEnd');
      const resDateDiff = document.getElementById('resDateDiff');
      const totDays = document.getElementById('totDays');
      const totWeeks = document.getElementById('totWeeks');
      const totHours = document.getElementById('totHours');

      const now = new Date();
      dStart.value = now.toISOString().split('T')[0];
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
      dEnd.value = nextMonth.toISOString().split('T')[0];

      function calcDiff() {
        if (!dStart.value || !dEnd.value) return;
        let s = new Date(dStart.value);
        let e = new Date(dEnd.value);

        if (s > e) {
          const tmp = s; s = e; e = tmp;
        }

        let years = e.getFullYear() - s.getFullYear();
        let months = e.getMonth() - s.getMonth();
        let days = e.getDate() - s.getDate();

        if (days < 0) {
          months--;
          const prevMonthLastDay = new Date(e.getFullYear(), e.getMonth(), 0).getDate();
          days += prevMonthLastDay;
        }
        if (months < 0) {
          years--;
          months += 12;
        }

        resDateDiff.textContent = \`\${years} Years, \${months} Months, \${days} Days\`;

        const diffMs = e.getTime() - s.getTime();
        const totalDaysCount = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const totalWeeksCount = (totalDaysCount / 7).toFixed(1);

        totDays.textContent = totalDaysCount.toLocaleString();
        totWeeks.textContent = totalWeeksCount;
        totHours.textContent = (totalDaysCount * 24).toLocaleString();
      }

      [dStart, dEnd].forEach(el => el.addEventListener('input', calcDiff));
      calcDiff();
    `
  },
  {
    id: 'simple-compound-interest-calculator',
    slug: 'simple-compound-interest-calculator',
    category: 'calculator',
    name: 'Simple vs Compound Interest Calculator',
    shortDesc: 'Compare Simple Interest vs Compound Interest returns with customizable compounding frequency.',
    seoTitle: 'Interest Calculator Online - Simple vs Compound Interest | DesiDesk',
    seoDesc: 'Calculate and compare Simple Interest and Compound Interest side-by-side. Choose compounding frequencies (Yearly, Monthly, Daily) on DesiDesk.',
    keywords: 'compound interest calculator, simple interest, compare interest, interest formula, investment growth',
    howToSteps: [
      'Enter Principal Amount.',
      'Enter Annual Interest Rate (%).',
      'Enter Time Period in Years.',
      'Select Compounding Frequency (Yearly, Semi-Annually, Quarterly, Monthly).'
    ],
    features: [
      'Direct side-by-side comparison of SI vs CI.',
      'Multiple compounding frequencies.',
      'Instant breakdown of interest earned and final amount.',
      'Free and private.'
    ],
    faqs: [
      {
        q: 'Why does compound interest earn more?',
        a: 'Compound interest generates interest on both initial principal and previously accumulated interest, accelerating growth over time.'
      }
    ],
    related: ['sip-calculator', 'emi-calculator'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Principal Amount (₹):</label>
          <input type="number" id="intPrincipal" class="form-input" value="100000" min="100" />
        </div>
        <div class="form-group">
          <label class="form-label">Annual Rate (% p.a.):</label>
          <input type="number" id="intRate" class="form-input" value="7.5" min="0.1" step="0.1" />
        </div>
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Time Period (Years):</label>
          <input type="number" id="intYears" class="form-input" value="5" min="1" max="50" />
        </div>
        <div class="form-group">
          <label class="form-label">Compounding Frequency:</label>
          <select id="intComp" class="form-select">
            <option value="1">Yearly (1x / year)</option>
            <option value="2">Half-Yearly (2x / year)</option>
            <option value="4" selected>Quarterly (4x / year)</option>
            <option value="12">Monthly (12x / year)</option>
          </select>
        </div>
      </div>

      <div class="form-grid-2" style="margin-top:1.5rem;">
        <div class="stat-card" style="text-align:left;">
          <div style="font-weight:700;color:var(--text-muted);margin-bottom:0.5rem;">SIMPLE INTEREST (SI)</div>
          <div style="font-size:0.85rem;color:var(--text-muted);">Interest Earned:</div>
          <div id="resSiInterest" style="font-size:1.5rem;font-weight:800;color:var(--primary);">₹37,500</div>
          <div style="font-size:0.85rem;color:var(--text-muted);margin-top:0.5rem;">Final Total Amount:</div>
          <div id="resSiTotal" style="font-size:1.25rem;font-weight:700;color:var(--secondary);">₹1,37,500</div>
        </div>

        <div class="stat-card" style="text-align:left;border-color:var(--primary-border);">
          <div style="font-weight:700;color:var(--accent);margin-bottom:0.5rem;">COMPOUND INTEREST (CI)</div>
          <div style="font-size:0.85rem;color:var(--text-muted);">Interest Earned:</div>
          <div id="resCiInterest" style="font-size:1.5rem;font-weight:800;color:var(--accent);">₹44,995</div>
          <div style="font-size:0.85rem;color:var(--text-muted);margin-top:0.5rem;">Final Total Amount:</div>
          <div id="resCiTotal" style="font-size:1.25rem;font-weight:700;color:var(--secondary);">₹1,44,995</div>
        </div>
      </div>
    `,
    toolScript: `
      const intPrincipal = document.getElementById('intPrincipal');
      const intRate = document.getElementById('intRate');
      const intYears = document.getElementById('intYears');
      const intComp = document.getElementById('intComp');
      const resSiInterest = document.getElementById('resSiInterest');
      const resSiTotal = document.getElementById('resSiTotal');
      const resCiInterest = document.getElementById('resCiInterest');
      const resCiTotal = document.getElementById('resCiTotal');

      function calculateInterest() {
        const p = parseFloat(intPrincipal.value) || 0;
        const r = parseFloat(intRate.value) || 0;
        const t = parseFloat(intYears.value) || 0;
        const n = parseInt(intComp.value, 10) || 1;

        if (p <= 0 || r <= 0 || t <= 0) return;

        // Simple Interest: SI = P * R * T / 100
        const si = (p * r * t) / 100;
        const siTotal = p + si;

        // Compound Interest: A = P * (1 + r/(n*100))^(n*t)
        const ciTotal = p * Math.pow(1 + (r / (n * 100)), n * t);
        const ci = ciTotal - p;

        resSiInterest.textContent = '₹' + Math.round(si).toLocaleString('en-IN');
        resSiTotal.textContent = '₹' + Math.round(siTotal).toLocaleString('en-IN');
        resCiInterest.textContent = '₹' + Math.round(ci).toLocaleString('en-IN');
        resCiTotal.textContent = '₹' + Math.round(ciTotal).toLocaleString('en-IN');
      }

      [intPrincipal, intRate, intYears, intComp].forEach(el => el.addEventListener('input', calculateInterest));
      calculateInterest();
    `
  },
  {
    id: 'profit-loss-calculator',
    slug: 'profit-loss-calculator',
    category: 'calculator',
    name: 'Profit and Loss Calculator',
    shortDesc: 'Calculate gross profit, net loss, profit margin percentage, and markup percentage on retail sales.',
    seoTitle: 'Profit and Loss Calculator Online - Margin & Markup | DesiDesk',
    seoDesc: 'Calculate profit, loss, profit margin percentage, and markup percentage easily. Free online business calculator on DesiDesk.',
    keywords: 'profit and loss calculator, profit margin, markup calculator, retail profit calculator',
    howToSteps: [
      'Enter the Cost Price (CP).',
      'Enter the Selling Price (SP).',
      'Instantly view Profit/Loss amount, Profit Margin %, and Markup %.'
    ],
    features: [
      'Instant calculation of Profit or Loss.',
      'Calculates both Profit Margin % and Markup %.',
      'Clear color-coded indicators (Green for Profit, Red for Loss).',
      'Zero server upload.'
    ],
    faqs: [
      {
        q: 'What is the difference between Margin and Markup?',
        a: 'Margin is profit divided by Selling Price, while Markup is profit divided by Cost Price.'
      }
    ],
    related: ['discount-calculator', 'percentage-calculator'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Cost Price (CP ₹):</label>
          <input type="number" id="costPrice" class="form-input" value="800" min="0" />
        </div>
        <div class="form-group">
          <label class="form-label">Selling Price (SP ₹):</label>
          <input type="number" id="sellPrice" class="form-input" value="1200" min="0" />
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;">
        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-value" id="resProfitAmount" style="color:var(--accent);">+₹400</div>
            <div class="stat-label">Net Profit / Loss</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="resProfitMargin">33.3%</div>
            <div class="stat-label">Profit Margin</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="resMarkup">50.0%</div>
            <div class="stat-label">Markup Percentage</div>
          </div>
        </div>
      </div>
    `,
    toolScript: `
      const costPrice = document.getElementById('costPrice');
      const sellPrice = document.getElementById('sellPrice');
      const resProfitAmount = document.getElementById('resProfitAmount');
      const resProfitMargin = document.getElementById('resProfitMargin');
      const resMarkup = document.getElementById('resMarkup');

      function calculateProfitLoss() {
        const cp = parseFloat(costPrice.value) || 0;
        const sp = parseFloat(sellPrice.value) || 0;

        const diff = sp - cp;
        const margin = sp > 0 ? (diff / sp) * 100 : 0;
        const markup = cp > 0 ? (diff / cp) * 100 : 0;

        if (diff >= 0) {
          resProfitAmount.textContent = '+₹' + diff.toLocaleString('en-IN');
          resProfitAmount.style.color = 'var(--accent)';
        } else {
          resProfitAmount.textContent = '-₹' + Math.abs(diff).toLocaleString('en-IN');
          resProfitAmount.style.color = 'var(--accent-rose)';
        }

        resProfitMargin.textContent = margin.toFixed(1) + '%';
        resMarkup.textContent = markup.toFixed(1) + '%';
      }

      costPrice.addEventListener('input', calculateProfitLoss);
      sellPrice.addEventListener('input', calculateProfitLoss);
      calculateProfitLoss();
    `
  },
  {
    id: 'fuel-cost-calculator',
    slug: 'fuel-cost-calculator',
    category: 'calculator',
    name: 'Fuel Cost Trip Calculator',
    shortDesc: 'Estimate travel fuel expenses based on trip distance, vehicle mileage, and fuel price per liter.',
    seoTitle: 'Fuel Cost Calculator Online - Trip Petrol & Diesel Expense | DesiDesk',
    seoDesc: 'Calculate total fuel cost and liters required for road trips based on distance, vehicle mileage, and petrol/diesel price on DesiDesk.',
    keywords: 'fuel cost calculator, trip fuel expense, petrol mileage calculator, diesel cost calculator',
    howToSteps: [
      'Enter total trip distance in kilometers.',
      'Enter your vehicle fuel efficiency (km per liter).',
      'Enter current fuel price per liter (₹).',
      'View total fuel required and total trip expense.'
    ],
    features: [
      'Calculates total liters and total cost.',
      'Cost per kilometer breakdown.',
      'Round-trip distance multiplier.',
      'Instant calculation.'
    ],
    faqs: [
      {
        q: 'How is fuel cost calculated?',
        a: 'Total Fuel Cost = (Distance / Mileage) × Fuel Price.'
      }
    ],
    related: ['tip-and-bill-splitter', 'percentage-calculator'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Trip Distance (km):</label>
          <input type="number" id="fuelDistance" class="form-input" value="350" min="1" />
        </div>
        <div class="form-group">
          <label class="form-label">Vehicle Mileage (km/L):</label>
          <input type="number" id="fuelMileage" class="form-input" value="18" min="1" step="0.5" />
        </div>
        <div class="form-group">
          <label class="form-label">Fuel Price (₹ / Liter):</label>
          <input type="number" id="fuelPrice" class="form-input" value="102" min="1" />
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;text-align:center;">
        <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Estimated Fuel Cost</div>
        <div id="resFuelCost" style="font-size:2.25rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">₹1,983</div>
        <div id="resFuelLiters" style="font-size:0.95rem;color:var(--text-muted);margin-top:0.25rem;">Fuel Needed: 19.4 Liters (₹5.67 per km)</div>
      </div>
    `,
    toolScript: `
      const fuelDistance = document.getElementById('fuelDistance');
      const fuelMileage = document.getElementById('fuelMileage');
      const fuelPrice = document.getElementById('fuelPrice');
      const resFuelCost = document.getElementById('resFuelCost');
      const resFuelLiters = document.getElementById('resFuelLiters');

      function calculateFuel() {
        const d = parseFloat(fuelDistance.value) || 0;
        const m = parseFloat(fuelMileage.value) || 0;
        const p = parseFloat(fuelPrice.value) || 0;

        if (d <= 0 || m <= 0 || p <= 0) return;

        const liters = d / m;
        const cost = liters * p;
        const costPerKm = cost / d;

        resFuelCost.textContent = '₹' + Math.round(cost).toLocaleString('en-IN');
        resFuelLiters.textContent = \`Fuel Needed: \${liters.toFixed(1)} Liters (₹\${costPerKm.toFixed(2)} per km)\`;
      }

      [fuelDistance, fuelMileage, fuelPrice].forEach(el => el.addEventListener('input', calculateFuel));
      calculateFuel();
    `
  },
  {
    id: 'tip-and-bill-splitter',
    slug: 'tip-and-bill-splitter',
    category: 'calculator',
    name: 'Tip & Bill Splitter Calculator',
    shortDesc: 'Split dining bills evenly among friends and calculate tip amounts per person.',
    seoTitle: 'Tip & Split Bill Calculator Online - Share Restaurant Bills | DesiDesk',
    seoDesc: 'Calculate tip amounts and split restaurant bills evenly among friends. Free online bill splitter on DesiDesk.',
    keywords: 'bill splitter, tip calculator, split restaurant bill, split check online, tip percentage',
    howToSteps: [
      'Enter total bill amount.',
      'Select tip percentage (0%, 10%, 15%, 20%).',
      'Select number of people sharing the bill.',
      'View individual share per person and total tip.'
    ],
    features: [
      'Tip percentage buttons and custom tip slider.',
      'Even split calculation per person.',
      'Clear breakdown of bill, tip, and total.',
      'Instant calculation.'
    ],
    faqs: [
      {
        q: 'Can tip be set to 0%?',
        a: 'Yes, select 0% to simply split the base bill evenly with no gratuity.'
      }
    ],
    related: ['discount-calculator', 'percentage-calculator'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Total Bill Amount (₹):</label>
          <input type="number" id="billTotal" class="form-input" value="3200" min="0" />
        </div>
        <div class="form-group">
          <label class="form-label">Tip Percentage (%):</label>
          <input type="number" id="tipPct" class="form-input" value="10" min="0" max="100" />
        </div>
        <div class="form-group">
          <label class="form-label">Number of People:</label>
          <input type="number" id="numPeople" class="form-input" value="4" min="1" max="100" />
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;text-align:center;">
        <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Each Person Pays</div>
        <div id="resPerPerson" style="font-size:2.5rem;font-weight:800;color:var(--accent);margin-top:0.25rem;">₹880</div>
        <div id="resBreakdown" style="font-size:0.9rem;color:var(--text-muted);margin-top:0.25rem;">Total Bill: ₹3,520 (Tip: ₹320)</div>
      </div>
    `,
    toolScript: `
      const billTotal = document.getElementById('billTotal');
      const tipPct = document.getElementById('tipPct');
      const numPeople = document.getElementById('numPeople');
      const resPerPerson = document.getElementById('resPerPerson');
      const resBreakdown = document.getElementById('resBreakdown');

      function calculateSplit() {
        const bill = parseFloat(billTotal.value) || 0;
        const tip = parseFloat(tipPct.value) || 0;
        const people = parseInt(numPeople.value, 10) || 1;

        const tipAmount = (bill * tip) / 100;
        const grandTotal = bill + tipAmount;
        const perPerson = grandTotal / people;

        resPerPerson.textContent = '₹' + Math.ceil(perPerson).toLocaleString('en-IN');
        resBreakdown.textContent = \`Total: ₹\${Math.round(grandTotal).toLocaleString('en-IN')} (Tip: ₹\${Math.round(tipAmount).toLocaleString('en-IN')})\`;
      }

      [billTotal, tipPct, numPeople].forEach(el => el.addEventListener('input', calculateSplit));
      calculateSplit();
    `
  }
];
