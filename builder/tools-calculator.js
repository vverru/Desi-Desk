// builder/tools-calculator.js

module.exports = [
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    category: 'calculator',
    name: 'Age Calculator',
    shortDesc: 'Calculate your exact age in years, months, days, hours, and next birthday countdown.',
    seoTitle: 'Age Calculator Online - Calculate Exact Age in Years & Days | DesiDesk',
    seoDesc: 'Calculate your exact age in years, months, days, hours, and minutes with our free online age calculator. Find out days until your next birthday.',
    keywords: 'age calculator, calculate age online, date of birth calculator, how old am i, birthday countdown',
    howToSteps: [
      'Select your Date of Birth.',
      'Optionally set the "Age at the Date of" (defaults to today).',
      'Click "Calculate Age" to view your exact age and birthday countdown.'
    ],
    features: [
      'Calculates exact years, months, and days considering leap years.',
      'Breakdown in total months, total weeks, days, and hours.',
      'Countdown to your next birthday.',
      'Instant calculation.'
    ],
    faqs: [
      {
        q: 'Does this calculator account for leap years?',
        a: 'Yes, the calculation uses native calendar date mathematics and accounts for leap days in February.'
      }
    ],
    related: ['date-difference-calculator', 'bmi-calculator', 'percentage-calculator'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Date of Birth:</label>
          <input type="date" id="dobInput" class="form-input" />
        </div>
        <div class="form-group">
          <label class="form-label">Age at Date of (Default Today):</label>
          <input type="date" id="targetDateInput" class="form-input" />
        </div>
      </div>

      <div class="btn-group" style="justify-content:center;margin-bottom:1.5rem;">
        <button id="calcAgeBtn" class="btn btn-primary">Calculate Age</button>
      </div>

      <div id="ageResults" class="result-box" style="display:none;">
        <div style="text-align:center;margin-bottom:1.5rem;">
          <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Your Exact Age</div>
          <div id="primaryAge" style="font-size:2rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">-</div>
          <div id="nextBirthdayText" style="font-size:0.95rem;color:var(--accent);margin-top:0.5rem;font-weight:600;"></div>
        </div>

        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-value" id="totMonths">-</div>
            <div class="stat-label">Total Months</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="totWeeks">-</div>
            <div class="stat-label">Total Weeks</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="totDays">-</div>
            <div class="stat-label">Total Days</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="totHours">-</div>
            <div class="stat-label">Total Hours</div>
          </div>
        </div>
      </div>
    `,
    toolScript: `
      const dobInput = document.getElementById('dobInput');
      const targetDateInput = document.getElementById('targetDateInput');
      const calcAgeBtn = document.getElementById('calcAgeBtn');
      const ageResults = document.getElementById('ageResults');
      const primaryAge = document.getElementById('primaryAge');
      const nextBirthdayText = document.getElementById('nextBirthdayText');
      const totMonths = document.getElementById('totMonths');
      const totWeeks = document.getElementById('totWeeks');
      const totDays = document.getElementById('totDays');
      const totHours = document.getElementById('totHours');

      targetDateInput.value = new Date().toISOString().split('T')[0];

      calcAgeBtn.addEventListener('click', () => {
        if (!dobInput.value) {
          alert('Please select your Date of Birth.');
          return;
        }

        const dob = new Date(dobInput.value);
        const target = new Date(targetDateInput.value || new Date());

        if (dob > target) {
          alert('Date of birth cannot be in the future.');
          return;
        }

        let years = target.getFullYear() - dob.getFullYear();
        let months = target.getMonth() - dob.getMonth();
        let days = target.getDate() - dob.getDate();

        if (days < 0) {
          months--;
          const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
          days += prevMonthLastDay;
        }
        if (months < 0) {
          years--;
          months += 12;
        }

        primaryAge.textContent = \`\${years} Years, \${months} Months, \${days} Days\`;

        // Total durations
        const diffMs = target.getTime() - dob.getTime();
        const totalDaysCount = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const totalWeeksCount = Math.floor(totalDaysCount / 7);
        const totalMonthsCount = years * 12 + months;
        const totalHoursCount = totalDaysCount * 24;

        totMonths.textContent = totalMonthsCount.toLocaleString();
        totWeeks.textContent = totalWeeksCount.toLocaleString();
        totDays.textContent = totalDaysCount.toLocaleString();
        totHours.textContent = totalHoursCount.toLocaleString();

        // Next birthday
        let nextBday = new Date(target.getFullYear(), dob.getMonth(), dob.getDate());
        if (nextBday < target) {
          nextBday = new Date(target.getFullYear() + 1, dob.getMonth(), dob.getDate());
        }
        const bdayDiffDays = Math.ceil((nextBday - target) / (1000 * 60 * 60 * 24));
        nextBirthdayText.textContent = \`Next Birthday in \${bdayDiffDays} day\${bdayDiffDays === 1 ? '' : 's'}!\`;

        ageResults.style.display = 'block';
      });
    `
  },
  {
    id: 'gst-calculator',
    slug: 'gst-calculator',
    category: 'calculator',
    name: 'GST Calculator',
    shortDesc: 'Calculate GST amounts (CGST, SGST, IGST) at 5%, 12%, 18%, 28% for inclusive or exclusive prices.',
    seoTitle: 'GST Calculator Online - Indian GST Exclusive & Inclusive | DesiDesk',
    seoDesc: 'Calculate GST amounts in India with CGST, SGST, IGST breakdown. Supports standard rates (5%, 12%, 18%, 28%) for GST inclusive and exclusive prices.',
    keywords: 'gst calculator, calculate gst online, gst inclusive calculator, gst exclusive, cgst sgst calculator, indian gst',
    howToSteps: [
      'Enter the initial amount in Rupees (₹).',
      'Select the applicable GST slab (5%, 12%, 18%, 28%, or custom).',
      'Choose whether GST is "Exclusive" (add to price) or "Inclusive" (extract from price).',
      'View instant breakdown of CGST, SGST, total GST, and final price.'
    ],
    features: [
      'Supports all standard Indian GST tax slabs (5%, 12%, 18%, 28%).',
      'CGST and SGST 50/50 division or full IGST.',
      'GST Inclusive and GST Exclusive calculation modes.',
      'Formula explanation and detailed currency breakdown.'
    ],
    faqs: [
      {
        q: 'What is GST Inclusive vs Exclusive?',
        a: 'GST Exclusive means the tax is added on top of the base price. GST Inclusive means the displayed price already contains the tax component.'
      }
    ],
    related: ['percentage-calculator', 'emi-calculator', 'discount-calculator'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Amount (₹):</label>
          <input type="number" id="gstAmount" class="form-input" placeholder="e.g. 10000" min="0" value="10000" />
        </div>
        <div class="form-group">
          <label class="form-label">GST Rate (%):</label>
          <select id="gstRate" class="form-select">
            <option value="18" selected>18% (Standard Services / Goods)</option>
            <option value="12">12% (Standard Goods)</option>
            <option value="5">5% (Essential Goods)</option>
            <option value="28">28% (Luxury / Automobiles)</option>
            <option value="3">3% (Gold / Precious Metals)</option>
            <option value="custom">Custom Rate</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Calculation Mode:</label>
        <div style="display:flex;gap:2rem;">
          <label style="cursor:pointer;font-weight:600;"><input type="radio" name="gstMode" value="exclusive" checked /> GST Exclusive (Add GST to Amount)</label>
          <label style="cursor:pointer;font-weight:600;"><input type="radio" name="gstMode" value="inclusive" /> GST Inclusive (Extract GST from Amount)</label>
        </div>
      </div>

      <div id="gstResults" class="result-box" style="margin-top:1.5rem;">
        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-value" id="resBasePrice">₹10,000</div>
            <div class="stat-label">Net Base Price</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="resGstAmount" style="color:var(--accent);">₹1,800</div>
            <div class="stat-label">Total GST Tax</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="resTotalPrice" style="color:var(--primary);">₹11,800</div>
            <div class="stat-label">Gross Total Price</div>
          </div>
        </div>

        <div style="margin-top:1.25rem;background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;">
          <div style="font-weight:700;margin-bottom:0.5rem;color:var(--secondary);">Interstate & Intrastate Tax Split:</div>
          <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #f1f5f9;font-size:0.9rem;">
            <span>CGST (Central GST):</span>
            <span id="resCgst" style="font-weight:600;">₹900 (9%)</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #f1f5f9;font-size:0.9rem;">
            <span>SGST (State GST):</span>
            <span id="resSgst" style="font-weight:600;">₹900 (9%)</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.9rem;">
            <span>IGST (Integrated GST if Interstate):</span>
            <span id="resIgst" style="font-weight:600;">₹1,800 (18%)</span>
          </div>
        </div>
      </div>
    `,
    toolScript: `
      const gstAmount = document.getElementById('gstAmount');
      const gstRate = document.getElementById('gstRate');
      const resBasePrice = document.getElementById('resBasePrice');
      const resGstAmount = document.getElementById('resGstAmount');
      const resTotalPrice = document.getElementById('resTotalPrice');
      const resCgst = document.getElementById('resCgst');
      const resSgst = document.getElementById('resSgst');
      const resIgst = document.getElementById('resIgst');

      function calculateGst() {
        const amt = parseFloat(gstAmount.value) || 0;
        const rate = parseFloat(gstRate.value) || 18;
        const mode = document.querySelector('input[name="gstMode"]:checked').value;

        let basePrice = 0;
        let gstTax = 0;
        let totalPrice = 0;

        if (mode === 'exclusive') {
          basePrice = amt;
          gstTax = (amt * rate) / 100;
          totalPrice = basePrice + gstTax;
        } else {
          totalPrice = amt;
          basePrice = (amt * 100) / (100 + rate);
          gstTax = totalPrice - basePrice;
        }

        const halfTax = gstTax / 2;
        const halfRate = rate / 2;

        resBasePrice.textContent = '₹' + basePrice.toLocaleString('en-IN', { maximumFractionDigits: 2 });
        resGstAmount.textContent = '₹' + gstTax.toLocaleString('en-IN', { maximumFractionDigits: 2 });
        resTotalPrice.textContent = '₹' + totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 });

        resCgst.textContent = \`₹\${halfTax.toLocaleString('en-IN', { maximumFractionDigits: 2 })} (\${halfRate}%)\`;
        resSgst.textContent = \`₹\${halfTax.toLocaleString('en-IN', { maximumFractionDigits: 2 })} (\${halfRate}%)\`;
        resIgst.textContent = \`₹\${gstTax.toLocaleString('en-IN', { maximumFractionDigits: 2 })} (\${rate}%)\`;
      }

      gstAmount.addEventListener('input', calculateGst);
      gstRate.addEventListener('change', calculateGst);
      document.querySelectorAll('input[name="gstMode"]').forEach(el => el.addEventListener('change', calculateGst));
      calculateGst();
    `
  },
  {
    id: 'emi-calculator',
    slug: 'emi-calculator',
    category: 'calculator',
    name: 'EMI Calculator',
    shortDesc: 'Calculate monthly loan EMI, total interest, and total repayment amount for home, car, or personal loans.',
    seoTitle: 'EMI Calculator Online - Home, Car & Personal Loan EMI | DesiDesk',
    seoDesc: 'Calculate monthly loan EMI, total interest payable, and total repayment amount. Accurate financial loan calculator on DesiDesk.',
    keywords: 'emi calculator, loan emi calculator, home loan emi, car loan emi, monthly emi calculate',
    howToSteps: [
      'Enter the Loan Amount.',
      'Enter the Annual Interest Rate (%).',
      'Enter the Loan Tenure in Years or Months.',
      'Instantly view your Monthly EMI, Total Interest, and Total Payable.'
    ],
    features: [
      'Uses standard reducing-balance EMI formula.',
      'Breakdown of Principal vs Interest amounts.',
      'Interactive sliders with live recalculation.',
      '100% free and private.'
    ],
    faqs: [
      {
        q: 'What is the EMI calculation formula?',
        a: 'EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is monthly interest rate, and N is the number of monthly installments.'
      }
    ],
    related: ['gst-calculator', 'sip-calculator', 'simple-compound-interest-calculator'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Loan Amount (₹):</label>
          <input type="number" id="loanAmount" class="form-input" value="1000000" min="1000" step="10000" />
        </div>
        <div class="form-group">
          <label class="form-label">Interest Rate (% p.a.):</label>
          <input type="number" id="loanInterest" class="form-input" value="8.5" min="1" max="30" step="0.1" />
        </div>
        <div class="form-group">
          <label class="form-label">Tenure (Years):</label>
          <input type="number" id="loanTenure" class="form-input" value="15" min="1" max="30" />
        </div>
      </div>

      <div id="emiResults" class="result-box" style="margin-top:1.5rem;">
        <div style="text-align:center;margin-bottom:1.5rem;">
          <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Monthly Loan EMI</div>
          <div id="resMonthlyEmi" style="font-size:2.25rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">₹0</div>
        </div>

        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-value" id="resPrincipal">₹0</div>
            <div class="stat-label">Principal Amount</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="resTotalInterest" style="color:var(--accent-amber);">₹0</div>
            <div class="stat-label">Total Interest</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="resTotalPayment" style="color:var(--accent);">₹0</div>
            <div class="stat-label">Total Payment</div>
          </div>
        </div>
      </div>
    `,
    toolScript: `
      const loanAmount = document.getElementById('loanAmount');
      const loanInterest = document.getElementById('loanInterest');
      const loanTenure = document.getElementById('loanTenure');
      const resMonthlyEmi = document.getElementById('resMonthlyEmi');
      const resPrincipal = document.getElementById('resPrincipal');
      const resTotalInterest = document.getElementById('resTotalInterest');
      const resTotalPayment = document.getElementById('resTotalPayment');

      function calculateEmi() {
        const p = parseFloat(loanAmount.value) || 0;
        const rAnnual = parseFloat(loanInterest.value) || 0;
        const tenureYears = parseFloat(loanTenure.value) || 0;

        if (p <= 0 || rAnnual <= 0 || tenureYears <= 0) return;

        const r = rAnnual / (12 * 100);
        const n = tenureYears * 12;

        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - p;

        resMonthlyEmi.textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
        resPrincipal.textContent = '₹' + Math.round(p).toLocaleString('en-IN');
        resTotalInterest.textContent = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
        resTotalPayment.textContent = '₹' + Math.round(totalPayment).toLocaleString('en-IN');
      }

      [loanAmount, loanInterest, loanTenure].forEach(el => el.addEventListener('input', calculateEmi));
      calculateEmi();
    `
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    category: 'calculator',
    name: 'Percentage Calculator',
    shortDesc: 'Solve all percentage problems: X% of Y, what % is X of Y, and percentage increase/decrease.',
    seoTitle: 'Percentage Calculator Online - Free Percentage Calculations | DesiDesk',
    seoDesc: 'Calculate percentage of numbers, percentage change, and relative fractions easily. Free online percentage calculator on DesiDesk.',
    keywords: 'percentage calculator, calculate percentage, percent increase, percent decrease, percent difference',
    howToSteps: [
      'Choose the percentage formula you need from the 3 sections.',
      'Enter the two numerical values.',
      'View the calculated percentage or result instantly.'
    ],
    features: [
      'Calculate X% of Number Y.',
      'Find what percentage Number X is of Number Y.',
      'Calculate Percentage Increase or Decrease between two values.',
      'Real-time calculations without page refresh.'
    ],
    faqs: [
      {
        q: 'How is percentage increase calculated?',
        a: 'Percentage Increase = [(New Value - Original Value) / Original Value] * 100.'
      }
    ],
    related: ['gst-calculator', 'discount-calculator', 'profit-loss-calculator'],
    toolHtml: `
      <div style="display:flex;flex-direction:column;gap:1.5rem;">
        <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1.25rem;">
          <h4 style="font-size:1.05rem;color:var(--secondary);margin-bottom:0.75rem;">1. What is X% of Y?</h4>
          <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
            <span>What is</span>
            <input type="number" id="p1_x" class="form-input" style="width:110px;" value="15" />
            <span>% of</span>
            <input type="number" id="p1_y" class="form-input" style="width:130px;" value="250" />
            <span>=</span>
            <span id="p1_res" style="font-size:1.25rem;font-weight:800;color:var(--primary);">37.5</span>
          </div>
        </div>

        <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1.25rem;">
          <h4 style="font-size:1.05rem;color:var(--secondary);margin-bottom:0.75rem;">2. X is what percent of Y?</h4>
          <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
            <input type="number" id="p2_x" class="form-input" style="width:110px;" value="45" />
            <span>is what % of</span>
            <input type="number" id="p2_y" class="form-input" style="width:130px;" value="180" />
            <span>=</span>
            <span id="p2_res" style="font-size:1.25rem;font-weight:800;color:var(--primary);">25%</span>
          </div>
        </div>

        <div style="background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1.25rem;">
          <h4 style="font-size:1.05rem;color:var(--secondary);margin-bottom:0.75rem;">3. Percentage Increase / Decrease:</h4>
          <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
            <span>From</span>
            <input type="number" id="p3_old" class="form-input" style="width:120px;" value="500" />
            <span>to</span>
            <input type="number" id="p3_new" class="form-input" style="width:120px;" value="650" />
            <span>=</span>
            <span id="p3_res" style="font-size:1.25rem;font-weight:800;color:var(--accent);">+30% (Increase)</span>
          </div>
        </div>
      </div>
    `,
    toolScript: `
      function calc1() {
        const x = parseFloat(document.getElementById('p1_x').value) || 0;
        const y = parseFloat(document.getElementById('p1_y').value) || 0;
        document.getElementById('p1_res').textContent = ((x * y) / 100).toFixed(2).replace(/\\.00$/, '');
      }
      function calc2() {
        const x = parseFloat(document.getElementById('p2_x').value) || 0;
        const y = parseFloat(document.getElementById('p2_y').value) || 0;
        if (y === 0) { document.getElementById('p2_res').textContent = '0%'; return; }
        document.getElementById('p2_res').textContent = ((x / y) * 100).toFixed(2).replace(/\\.00$/, '') + '%';
      }
      function calc3() {
        const o = parseFloat(document.getElementById('p3_old').value) || 0;
        const n = parseFloat(document.getElementById('p3_new').value) || 0;
        if (o === 0) { document.getElementById('p3_res').textContent = '0%'; return; }
        const diff = n - o;
        const pct = (diff / o) * 100;
        const formatted = pct.toFixed(2).replace(/\\.00$/, '');
        const el = document.getElementById('p3_res');
        if (pct >= 0) {
          el.textContent = '+' + formatted + '% (Increase)';
          el.style.color = 'var(--accent)';
        } else {
          el.textContent = formatted + '% (Decrease)';
          el.style.color = 'var(--accent-rose)';
        }
      }

      ['p1_x', 'p1_y'].forEach(id => document.getElementById(id).addEventListener('input', calc1));
      ['p2_x', 'p2_y'].forEach(id => document.getElementById(id).addEventListener('input', calc2));
      ['p3_old', 'p3_new'].forEach(id => document.getElementById(id).addEventListener('input', calc3));
    `
  },
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    category: 'calculator',
    name: 'BMI Health Calculator',
    shortDesc: 'Calculate Body Mass Index (BMI) and check healthy weight ranges in metric or imperial units.',
    seoTitle: 'BMI Calculator Online - Body Mass Index Calculator Free | DesiDesk',
    seoDesc: 'Calculate your Body Mass Index (BMI) with metric (kg/cm) or imperial (lbs/ft) units. Check weight category and ideal healthy weight range.',
    keywords: 'bmi calculator, body mass index, healthy weight calculator, bmi chart, calculate bmi online',
    howToSteps: [
      'Choose Metric (kg / cm) or Imperial (lbs / feet-inches) unit system.',
      'Enter your Weight and Height.',
      'Click "Calculate BMI" to see your score, category, and healthy target range.'
    ],
    features: [
      'WHO standard BMI classifications (Underweight, Normal, Overweight, Obese).',
      'Calculates ideal healthy weight range.',
      'Metric and Imperial unit support.',
      'Visual category scale.'
    ],
    faqs: [
      {
        q: 'What is a normal BMI range?',
        a: 'A healthy adult BMI is typically between 18.5 and 24.9 according to the World Health Organization.'
      }
    ],
    related: ['age-calculator', 'percentage-calculator'],
    toolHtml: `
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Weight (kg):</label>
          <input type="number" id="bmiWeight" class="form-input" value="70" min="20" max="300" />
        </div>
        <div class="form-group">
          <label class="form-label">Height (cm):</label>
          <input type="number" id="bmiHeight" class="form-input" value="175" min="50" max="250" />
        </div>
      </div>

      <div class="btn-group" style="justify-content:center;margin-bottom:1.5rem;">
        <button id="calcBmiBtn" class="btn btn-primary">Calculate BMI</button>
      </div>

      <div id="bmiResults" class="result-box" style="margin-top:1.5rem;">
        <div style="text-align:center;margin-bottom:1.5rem;">
          <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Your Body Mass Index (BMI)</div>
          <div id="resBmiValue" style="font-size:2.5rem;font-weight:800;color:var(--primary);margin-top:0.25rem;">22.9</div>
          <div id="resBmiCategory" style="font-size:1.1rem;font-weight:700;color:var(--accent);margin-top:0.35rem;">Normal Weight</div>
        </div>

        <div class="stat-card">
          <div class="stat-value" id="resHealthyRange" style="font-size:1.25rem;">56.7 kg &ndash; 76.3 kg</div>
          <div class="stat-label">Recommended Healthy Weight Range</div>
        </div>
      </div>
    `,
    toolScript: `
      const bmiWeight = document.getElementById('bmiWeight');
      const bmiHeight = document.getElementById('bmiHeight');
      const calcBmiBtn = document.getElementById('calcBmiBtn');
      const resBmiValue = document.getElementById('resBmiValue');
      const resBmiCategory = document.getElementById('resBmiCategory');
      const resHealthyRange = document.getElementById('resHealthyRange');

      function calculateBmi() {
        const w = parseFloat(bmiWeight.value) || 0;
        const hCm = parseFloat(bmiHeight.value) || 0;

        if (w <= 0 || hCm <= 0) return;

        const hM = hCm / 100;
        const bmi = w / (hM * hM);
        resBmiValue.textContent = bmi.toFixed(1);

        let cat = '';
        let color = 'var(--primary)';

        if (bmi < 18.5) {
          cat = 'Underweight';
          color = 'var(--accent-amber)';
        } else if (bmi < 25) {
          cat = 'Normal Healthy Weight';
          color = 'var(--accent)';
        } else if (bmi < 30) {
          cat = 'Overweight';
          color = 'var(--accent-amber)';
        } else {
          cat = 'Obese';
          color = 'var(--accent-rose)';
        }

        resBmiCategory.textContent = cat;
        resBmiCategory.style.color = color;

        const minW = (18.5 * hM * hM).toFixed(1);
        const maxW = (24.9 * hM * hM).toFixed(1);
        resHealthyRange.textContent = minW + ' kg – ' + maxW + ' kg';
      }

      calcBmiBtn.addEventListener('click', calculateBmi);
      [bmiWeight, bmiHeight].forEach(el => el.addEventListener('input', calculateBmi));
      calculateBmi();
    `
  },
  {
    id: 'sip-calculator',
    slug: 'sip-calculator',
    category: 'calculator',
    name: 'SIP Return Calculator',
    shortDesc: 'Calculate wealth growth and maturity returns from mutual fund Systematic Investment Plans (SIP).',
    seoTitle: 'SIP Calculator Online - Mutual Fund SIP Return Calculator | DesiDesk',
    seoDesc: 'Calculate future wealth from your monthly mutual fund SIP investments. See total invested capital, expected returns, and maturity corpus.',
    keywords: 'sip calculator, mutual fund sip, systematic investment plan, sip returns, investment calculator',
    howToSteps: [
      'Enter your Monthly Investment amount (₹).',
      'Enter the Expected Annual Return Rate (% p.a.).',
      'Enter the Investment Period (Years).',
      'View total invested amount and expected maturity corpus.'
    ],
    features: [
      'Uses standard compound compounding SIP formula.',
      'Clear breakdown of invested capital vs returns earned.',
      'Real-time calculations.',
      '100% private.'
    ],
    faqs: [
      {
        q: 'What is the compounding frequency for SIP?',
        a: 'SIP calculations assume monthly compounding as investments are deposited each month.'
      }
    ],
    related: ['emi-calculator', 'simple-compound-interest-calculator', 'percentage-calculator'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Monthly Investment (₹):</label>
          <input type="number" id="sipMonthly" class="form-input" value="5000" min="500" step="500" />
        </div>
        <div class="form-group">
          <label class="form-label">Expected Return Rate (% p.a.):</label>
          <input type="number" id="sipRate" class="form-input" value="12" min="1" max="30" step="0.5" />
        </div>
        <div class="form-group">
          <label class="form-label">Time Period (Years):</label>
          <input type="number" id="sipYears" class="form-input" value="10" min="1" max="40" />
        </div>
      </div>

      <div id="sipResults" class="result-box" style="margin-top:1.5rem;">
        <div style="text-align:center;margin-bottom:1.5rem;">
          <div style="font-size:0.9rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;">Expected Maturity Corpus</div>
          <div id="resMaturity" style="font-size:2.25rem;font-weight:800;color:var(--accent);margin-top:0.25rem;">₹0</div>
        </div>

        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-value" id="resInvested">₹0</div>
            <div class="stat-label">Total Invested Amount</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="resReturns" style="color:var(--primary);">₹0</div>
            <div class="stat-label">Estimated Wealth Gain</div>
          </div>
        </div>
      </div>
    `,
    toolScript: `
      const sipMonthly = document.getElementById('sipMonthly');
      const sipRate = document.getElementById('sipRate');
      const sipYears = document.getElementById('sipYears');
      const resMaturity = document.getElementById('resMaturity');
      const resInvested = document.getElementById('resInvested');
      const resReturns = document.getElementById('resReturns');

      function calculateSip() {
        const p = parseFloat(sipMonthly.value) || 0;
        const annualRate = parseFloat(sipRate.value) || 0;
        const years = parseFloat(sipYears.value) || 0;

        if (p <= 0 || annualRate <= 0 || years <= 0) return;

        const i = annualRate / (12 * 100);
        const n = years * 12;

        const maturity = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        const invested = p * n;
        const returns = maturity - invested;

        resMaturity.textContent = '₹' + Math.round(maturity).toLocaleString('en-IN');
        resInvested.textContent = '₹' + Math.round(invested).toLocaleString('en-IN');
        resReturns.textContent = '₹' + Math.round(returns).toLocaleString('en-IN');
      }

      [sipMonthly, sipRate, sipYears].forEach(el => el.addEventListener('input', calculateSip));
      calculateSip();
    `
  },
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    category: 'calculator',
    name: 'Discount & Sale Calculator',
    shortDesc: 'Calculate sale discounts, final price, total savings, and double stacked discounts.',
    seoTitle: 'Discount Calculator Online - Sale Price & Savings | DesiDesk',
    seoDesc: 'Calculate discounted sale prices and total money saved. Includes stacked additional discount option. Free shopping calculator on DesiDesk.',
    keywords: 'discount calculator, sale price calculator, calculate discount, percent off calculator, shopping savings',
    howToSteps: [
      'Enter the original retail price.',
      'Enter primary discount percentage (e.g. 20%).',
      'Optionally enter an additional stacked promo code discount (e.g. extra 10%).',
      'View final payable price and total savings.'
    ],
    features: [
      'Primary discount percentage or flat amount.',
      'Stacked discount support (e.g. 50% + extra 20% off).',
      'Detailed savings summary.',
      'Instant calculation.'
    ],
    faqs: [
      {
        q: 'How do stacked discounts work?',
        a: 'An additional discount is applied to the already-discounted price, not added directly to the first percentage.'
      }
    ],
    related: ['percentage-calculator', 'gst-calculator'],
    toolHtml: `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Original Price (₹):</label>
          <input type="number" id="origPrice" class="form-input" value="2000" min="0" />
        </div>
        <div class="form-group">
          <label class="form-label">Discount (%):</label>
          <input type="number" id="discPercent" class="form-input" value="25" min="0" max="100" />
        </div>
        <div class="form-group">
          <label class="form-label">Extra Promo Discount (%):</label>
          <input type="number" id="extraDiscPercent" class="form-input" value="10" min="0" max="100" />
        </div>
      </div>

      <div class="result-box" style="margin-top:1.5rem;">
        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-value" id="resFinalPrice" style="color:var(--accent);">₹1,350</div>
            <div class="stat-label">Final Sale Price</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="resSavings" style="color:var(--primary);">₹650</div>
            <div class="stat-label">You Save (Total)</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="resTotalPct">32.5%</div>
            <div class="stat-label">Effective Discount</div>
          </div>
        </div>
      </div>
    `,
    toolScript: `
      const origPrice = document.getElementById('origPrice');
      const discPercent = document.getElementById('discPercent');
      const extraDiscPercent = document.getElementById('extraDiscPercent');
      const resFinalPrice = document.getElementById('resFinalPrice');
      const resSavings = document.getElementById('resSavings');
      const resTotalPct = document.getElementById('resTotalPct');

      function calculateDiscount() {
        const p = parseFloat(origPrice.value) || 0;
        const d1 = parseFloat(discPercent.value) || 0;
        const d2 = parseFloat(extraDiscPercent.value) || 0;

        const priceAfterD1 = p * (1 - d1 / 100);
        const finalPrice = priceAfterD1 * (1 - d2 / 100);
        const totalSaved = p - finalPrice;
        const effectivePct = p > 0 ? (totalSaved / p) * 100 : 0;

        resFinalPrice.textContent = '₹' + Math.round(finalPrice).toLocaleString('en-IN');
        resSavings.textContent = '₹' + Math.round(totalSaved).toLocaleString('en-IN');
        resTotalPct.textContent = effectivePct.toFixed(1) + '%';
      }

      [origPrice, discPercent, extraDiscPercent].forEach(el => el.addEventListener('input', calculateDiscount));
      calculateDiscount();
    `
  }
];
