# DesiDesk.in — Premium All-in-One Online Tools

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-Pure%20Vanilla-orange.svg)](https://desidesk.in/)
[![Zero Backend](https://img.shields.io/badge/Backend-None%20(Client--Side)-brightgreen.svg)](https://desidesk.in/)
[![Privacy Guarantee](https://img.shields.io/badge/Privacy-100%25%20Local%20Browser-success.svg)](https://desidesk.in/privacy-policy.html)

**DesiDesk.in** is a production-ready, privacy-first, all-in-one suite of **107+ online tools** built with modern browser-native technologies (HTML5, CSS3, and Vanilla JavaScript).

Every tool runs **100% client-side** inside the user's web browser using native APIs (Canvas, Web Crypto, Web Workers) and battle-tested browser libraries (pdf-lib, JSZip). **User files and private documents never leave their device.**

---

## 🌟 Key Features

- **107+ Functional Tools:** Comprehensive coverage across PDF manipulation, Image processing, Text utilities, Financial & Health Calculators, Unit Converters, Developer utilities, and File archives.
- **100% Client-Side Privacy:** No server uploads, no remote processing pipelines, no cloud databases.
- **Strict Self-Contained Architecture:** Every HTML page contains its complete structure, responsive `<style>` block, and functional `<script>` logic. Zero separate `.css` or `.js` file dependencies.
- **SEO & Discoverability:** Unique titles, meta descriptions, canonical URLs (`https://desidesk.in/...`), Open Graph tags, structured schema, step-by-step instructions, and FAQs on every tool page.
- **Global Search:** Fast live search modal with keyboard shortcut (`⌘K` or `/`) and category filtering.
- **Mobile First Design:** Designed for small Android phones, large tablets, laptops, and 4K desktop screens.

---

## 📁 Project Architecture

```
desi-desk/
├── index.html                  # Master Homepage with live search & tool directory
├── categories/
│   ├── pdf-tools.html          # PDF Tools category
│   ├── image-tools.html        # Image Tools category
│   ├── text-tools.html         # Text Tools category
│   ├── calculator-tools.html   # Calculators category
│   ├── converter-tools.html    # Converters category
│   ├── developer-tools.html    # Developer Tools category
│   ├── generator-tools.html    # Generators category
│   └── utility-tools.html      # File & Utilities category
├── tools/
│   ├── pdf/                    # 10 PDF tools (Merge, Split, Rotate, JPG to PDF, etc.)
│   ├── image/                  # 14 Image tools (Compressor, Resizer, Cropper, WebP, etc.)
│   ├── text/                   # 11 Text tools (Word counter, Case converter, Diff, etc.)
│   ├── calculator/             # 11 Calculators (Age, EMI, GST, SIP, BMI, etc.)
│   ├── converter/              # 9 Converters (Length, Weight, Temp, Storage, etc.)
│   ├── developer/              # 10 Developer tools (JSON, Base64, Regex, Hashes, etc.)
│   ├── generator/              # 9 Generators (QR, Barcode, Passwords, UUID, Shadows, etc.)
│   └── utility/                # 7 File utilities (ZIP creator, Extractor, Checksum, CSV, etc.)
├── about.html                  # About DesiDesk & privacy philosophy
├── contact.html                # Contact and tool request page
├── privacy-policy.html         # Comprehensive client-side privacy disclosure
├── terms.html                  # Terms of service
├── disclaimer.html             # Financial & accuracy disclaimers
├── 404.html                    # Custom 404 error page
├── robots.txt                  # Search crawler directives
├── sitemap.xml                 # XML Sitemap with all 121 canonical URLs
├── manifest.webmanifest        # Progressive Web App manifest
├── favicon.svg                 # Vector brand favicon
└── builder/                    # Modular build & QA automation suite
```

---

## 🛠️ Master Tool Inventory (107 Tools)

### A. PDF Tools (`tools/pdf/`)
1. **Merge PDF Files** (`merge-pdf.html`) — Combine multiple PDF documents into one single document.
2. **Split PDF Pages** (`split-pdf.html`) — Extract individual pages or custom ranges.
3. **Rotate PDF Pages** (`rotate-pdf.html`) — Permanently rotate pages 90°, 180°, or 270°.
4. **JPG to PDF** (`jpg-to-pdf.html`) — Convert JPG, PNG, and WebP images to a clean PDF.
5. **Add Page Numbers to PDF** (`add-page-numbers-pdf.html`) — Insert customizable page numbers.
6. **Watermark PDF** (`watermark-pdf.html`) — Stamp diagonal text watermarks with opacity control.
7. **PDF Page Counter** (`pdf-page-counter.html`) — Count pages and inspect dimensions.
8. **PDF Metadata Viewer** (`pdf-metadata-viewer.html`) — Inspect and edit Title, Author, and Subject.
9. **Text to PDF** (`text-to-pdf.html`) — Convert plain text notes into a formatted A4 PDF.
10. **Organize PDF Pages** (`organize-pdf.html`) — Reorder, delete, and duplicate pages.
11. **Crop PDF Margins** (`crop-pdf.html`) — Trim white margins and set custom crop boxes.
12. **Sign PDF** (`sign-pdf.html`) — Draw your digital signature and stamp it onto PDF pages.
13. **PDF to Text Extractor** (`pdf-to-text.html`) — Extract plain text content from documents.
14. **Remove PDF Pages** (`remove-pdf-pages.html`) — Delete unwanted pages from documents.

### B. Image Tools (`tools/image/`)
15. **Image Compressor** (`image-compressor.html`) — Compress JPG, PNG, and WebP with quality slider.
16. **Image Resizer** (`image-resizer.html`) — Resize by pixel dimensions or scale percentage.
17. **Image Cropper** (`image-cropper.html`) — Crop with standard ratios (1:1, 16:9, 4:3) or freeform.
18. **Circle Image Cropper** (`circle-image-cropper.html`) — Round profile avatar cropper with transparent PNG.
19. **Image Rotator & Flipper** (`image-rotator-flipper.html`) — Rotate 90° and flip horizontally/vertically.
20. **PNG to JPG Converter** (`png-to-jpg.html`) — Convert PNG to JPG with custom background color.
21. **JPG to PNG Converter** (`jpg-to-png.html`) — Lossless conversion preserving clarity.
22. **Image to WebP Converter** (`image-to-webp.html`) — Next-generation web optimization.
23. **WebP to JPG Converter** (`webp-to-jpg.html`) — Convert modern WebP to standard JPEG.
24. **Image to Base64** (`image-to-base64.html`) — Convert images to Base64 data URIs and CSS snippets.
25. **Base64 to Image** (`base64-to-image.html`) — Decode Base64 strings to downloadable PNG.
26. **Add Watermark to Image** (`image-watermark.html`) — Stamp copyright text on photos.
27. **Passport Photo Maker** (`passport-photo-maker.html`) — Create 2x2 inch and 35x45mm printable sheets.
28. **Color Palette Extractor** (`color-palette-extractor.html`) — Extract dominant colors from photos.
29. **Photo Filters & Adjustments** (`image-filters.html`) — Brightness, contrast, saturation, grayscale.
30. **Image Pixelator & Censor** (`image-pixelator.html`) — Censor sensitive photos with pixel blocks.
31. **Image Color Picker** (`image-color-picker.html`) — Interactive canvas eyedropper for pixel inspection.
32. **Image Dimension Checker** (`image-dimension-checker.html`) — Check resolution and megapixels.

### C. Text Tools (`tools/text/`)
33. **Word & Character Counter** (`word-counter.html`) — Words, chars, sentences, and reading time.
34. **Text Case Converter** (`case-converter.html`) — UPPERCASE, lowercase, Title Case, camelCase, snake_case.
35. **Remove Duplicate Lines** (`remove-duplicate-lines.html`) — Deduplicate list lines.
36. **Sort Text Lines** (`sort-text-lines.html`) — Alphabetical A-Z, Z-A, and natural numeric sorting.
37. **Text Diff Checker** (`text-diff-checker.html`) — Side-by-side comparison of text differences.
38. **SEO Slug Generator** (`slug-generator.html`) — Convert headlines to clean URL slugs.
39. **Lorem Ipsum Generator** (`lorem-ipsum-generator.html`) — Customizable dummy placeholder text.
40. **Remove Extra Spaces** (`remove-extra-spaces.html`) — Strip redundant whitespace and empty lines.
41. **Find and Replace Text** (`find-and-replace.html`) — Batch text search and regex replacement.
42. **Reverse Text & Words** (`reverse-text.html`) — Reverse letters, words, and lines.
43. **Text to Binary** (`text-to-binary.html`) — Encode text to binary 0s and 1s and vice versa.
44. **Number to Words** (`number-to-words.html`) — Convert numbers to words (Indian Lakhs & Western).
45. **Text Repeater** (`text-repeater.html`) — Repeat text and messages up to 1,000 times.
46. **Email & URL Extractor** (`extract-emails-urls.html`) — Extract all emails and links from raw text.

### D. Calculators (`tools/calculator/`)
47. **Age Calculator** (`age-calculator.html`) — Exact age in years, months, days, and birthday countdown.
48. **GST Calculator** (`gst-calculator.html`) — Indian GST (5%, 12%, 18%, 28%) inclusive and exclusive.
49. **EMI Calculator** (`emi-calculator.html`) — Monthly loan EMI, total interest, and total payable.
50. **Percentage Calculator** (`percentage-calculator.html`) — 3-in-1 percentage calculations.
51. **BMI Health Calculator** (`bmi-calculator.html`) — Body Mass Index with WHO health ranges.
52. **SIP Return Calculator** (`sip-calculator.html`) — Mutual fund systematic investment returns.
53. **Discount Calculator** (`discount-calculator.html`) — Sale price and stacked promo discount calculator.
54. **Date Difference Calculator** (`date-difference-calculator.html`) — Duration between two dates.
55. **Simple vs Compound Interest** (`simple-compound-interest-calculator.html`) — Side-by-side comparison.
56. **Profit and Loss Calculator** (`profit-loss-calculator.html`) — Profit margin % and markup %.
57. **Fuel Cost Calculator** (`fuel-cost-calculator.html`) — Trip petrol and diesel expenses.
58. **Tip & Bill Splitter** (`tip-and-bill-splitter.html`) — Restaurant bill splitter per person.
59. **Average & Stats Calculator** (`average-calculator.html`) — Mean, median, mode, and sum.
60. **Ratio Calculator** (`ratio-calculator.html`) — Simplify ratios and solve proportions (A:B = C:X).

### E. Converters (`tools/converter/`)
61. **Length Converter** (`length-converter.html`) — Meters, feet, inches, kilometers, miles, yards.
62. **Weight Converter** (`weight-converter.html`) — Kilograms, pounds, grams, ounces, metric tons.
63. **Temperature Converter** (`temperature-converter.html`) — Celsius, Fahrenheit, Kelvin with formulas.
64. **Data Storage Converter** (`data-storage-converter.html`) — Bytes, KB, MB, GB, TB (1000 & 1024 base).
65. **Unix Timestamp Converter** (`unix-timestamp-converter.html`) — Epoch timestamp to date and vice versa.
66. **Area Land Converter** (`area-converter.html`) — Sq feet, sq meters, acres, hectares, bigha, guntha.
67. **Speed Converter** (`speed-converter.html`) — km/h, mph, m/s, knots, Mach.
68. **Number System Converter** (`number-system-converter.html`) — Decimal, Binary, Hex, Octal.
69. **Roman Numeral Converter** (`roman-numeral-converter.html`) — Roman numerals to Arabic numbers.
70. **Volume Converter** (`volume-converter.html`) — Liters, gallons, milliliters, fluid ounces.
71. **Time Unit Converter** (`time-unit-converter.html`) — Seconds, minutes, hours, days, weeks, years.
72. **Angle Converter** (`angle-converter.html`) — Degrees, radians, gradians.

### F. Developer Tools (`tools/developer/`)
73. **JSON Formatter & Validator** (`json-formatter.html`) — Prettify, minify, and validate JSON.
74. **Base64 Encoder & Decoder** (`base64-encoder-decoder.html`) — UTF-8 safe Base64 encoder/decoder.
75. **URL Encoder & Decoder** (`url-encoder-decoder.html`) — Percent-encode and decode URL parameters.
76. **Hash Generator** (`hash-generator.html`) — SHA-256, SHA-512, and SHA-1 via Web Crypto.
77. **JWT Decoder** (`jwt-decoder.html`) — Decode JSON Web Token header, payload, and expiry.
78. **Markdown to HTML** (`markdown-to-html.html`) — Live markdown preview with sanitized HTML copy.
79. **HTML Entity Encoder** (`html-entity-encoder.html`) — Escape and unescape HTML special characters.
80. **CSS Formatter & Minifier** (`css-formatter-minifier.html`) — Beautify and compress CSS stylesheets.
81. **Regex Tester** (`regex-tester.html`) — Test regular expressions with live flags and match highlights.
82. **Color Code Converter** (`color-code-converter.html`) — Convert HEX, RGB, and HSL colors.
83. **HTML Formatter** (`html-formatter-beautifier.html`) — Auto-indent nested HTML code.
84. **JavaScript Minifier** (`javascript-minifier.html`) — Strip comments and compress JS code.
85. **SQL Query Formatter** (`sql-formatter.html`) — Prettify SQL queries with capitalized clauses.
86. **URL Parser** (`url-parser.html`) — Break down URL into protocol, host, and query table.
87. **User Agent Parser** (`user-agent-parser.html`) — Analyze client browser, OS, and device type.

### G. Generators (`tools/generator/`)
88. **QR Code Generator** (`qr-code-generator.html`) — Custom color QR codes with PNG download.
89. **Secure Password Generator** (`password-generator.html`) — Cryptographic random passwords.
90. **UUID / GUID Generator** (`uuid-generator.html`) — Bulk RFC-4122 Version 4 UUIDs.
91. **CSS Box Shadow Generator** (`css-box-shadow-generator.html`) — Visual shadow builder with CSS export.
92. **CSS Gradient Generator** (`css-gradient-generator.html`) — Linear and radial gradient creator.
93. **Barcode Generator** (`barcode-generator.html`) — CODE128 printable barcodes with PNG export.
94. **CSS Border Radius Generator** (`css-border-radius-generator.html`) — 8-point organic rounded corner builder.
95. **SEO Meta Tag Generator** (`meta-tag-generator.html`) — Title, description, robots, and Open Graph tags.
96. **Color Contrast Checker** (`color-contrast-checker.html`) — WCAG 2.1 AA/AAA accessibility compliance.
97. **Placeholder Image Generator** (`placeholder-image-generator.html`) — Custom mockup images with download.
98. **Robots.txt Generator** (`robots-txt-generator.html`) — Search engine crawler directives.
99. **UTM Campaign Link Builder** (`utm-link-builder.html`) — Google Analytics campaign tracking URLs.

### H. File Utilities (`tools/utility/`)
100. **ZIP File Creator** (`zip-file-creator.html`) — Bundle multiple files into a ZIP archive.
101. **ZIP File Extractor** (`zip-extractor.html`) — Unzip and inspect files from ZIP archives in browser.
102. **File Checksum Calculator** (`file-checksum-calculator.html`) — Calculate SHA-256 and SHA-1 file hashes.
103. **CSV Spreadsheet Viewer** (`csv-viewer-filter.html`) — Search, filter, and inspect CSV tables.
104. **Text & Log File Merger** (`text-file-merger.html`) — Merge multiple text and log files.
105. **Aspect Ratio Calculator** (`aspect-ratio-calculator.html`) — 16:9, 4:3, 21:9 proportions for video.
106. **Screen Resolution Checker** (`screen-resolution-checker.html`) — Display resolution, DPR, and viewport.
107. **MIME Type Lookup Directory** (`mime-type-lookup.html`) — Search over 200 Content-Type headers.

---

## 🚀 Static Hosting & Deployment Instructions

DesiDesk is designed for static web hosts like **GitHub Pages**, **Cloudflare Pages**, **Netlify**, or **Vercel**.

### GitHub Pages Deployment:
1. Push the entire `/workspace/desi-desk` directory to your GitHub repository `main` branch.
2. Go to **Settings > Pages** in your GitHub repository.
3. Under **Branch**, select `main` and root folder `/` (or `docs` if configured).
4. Click **Save**.

### Custom Domain Configuration (`https://desidesk.in/`):
1. In your static hosting settings (e.g. GitHub Pages or Cloudflare Pages), add the custom domain:
   ```
   desidesk.in
   ```
2. In your DNS provider (e.g. Cloudflare, Namecheap, GoDaddy):
   - **Apex Domain (`desidesk.in`):** Add `A` records pointing to your static hosting provider's IP addresses.
   - **Subdomain (`www.desidesk.in`):** Add a `CNAME` record pointing to your hosting target (e.g., `<username>.github.io`).
3. Enable **Enforce HTTPS** in your hosting dashboard to ensure all traffic is securely encrypted.

---

## 🧪 Quality Assurance & Testing

An automated test suite is included in `builder/qa-test.js` to verify link integrity, file compliance, and SEO requirements:

```bash
# Run the build system
node builder/build.js

# Run the QA verification test suite
node builder/qa-test.js
```

### Verification Checks Performed:
- ✅ **1,110 Automated Tests:** Verifies all HTML documents exist and contain valid structures.
- ✅ **Critical Rule Check:** Verifies every page has inline `<style>` and `<script>`, with no separate external `.css` or `.js` stylesheets.
- ✅ **Zero Broken Links:** All tool cards, navigation links, and sitemap entries point to existing HTML files.
- ✅ **SEO Compliance:** Verified canonical tags, title tags, and meta descriptions across all 122 pages.

---

## 📄 License & Attribution

- **Website Source Code:** MIT License © 2026 DesiDesk.in
- **Client Libraries Used:**
  - [pdf-lib](https://pdf-lib.js.org/) — MIT License (Client-side PDF manipulation)
  - [JSZip](https://stuk.github.io/jszip/) — MIT License (Client-side ZIP compression/extraction)
  - [QRCode.js](https://github.com/soldair/node-qrcode) — MIT License (QR code generation)
  - [JsBarcode](https://lindell.me/JsBarcode/) — MIT License (Barcode rendering)
