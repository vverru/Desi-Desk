// builder/css.js
module.exports = function getMasterCSS() {
  return `
:root {
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --primary-light: #eff6ff;
  --primary-border: #bfdbfe;
  --secondary: #0f172a;
  --accent: #10b981;
  --accent-amber: #f59e0b;
  --accent-rose: #f43f5e;
  --bg-page: #f8fafc;
  --bg-card: #ffffff;
  --bg-subtle: #f1f5f9;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --text-light: #94a3b8;
  --border-light: #e2e8f0;
  --border-focus: #3b82f6;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--bg-page);
  color: var(--text-main);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.15s ease;
}

a:hover {
  color: var(--primary-hover);
}

img, svg {
  vertical-align: middle;
}

/* Layout Container */
.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

/* Header & Navbar */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-light);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--secondary);
  letter-spacing: -0.025em;
  text-decoration: none;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #1e40af, #2563eb);
  color: white;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
}

.logo-domain {
  color: var(--primary);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
}

.nav-link {
  font-size: 0.925rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: color 0.15s;
}

.nav-link:hover, .nav-link.active {
  color: var(--primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-search-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.85rem;
  background-color: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  color: var(--text-muted);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.header-search-btn:hover {
  background-color: #e2e8f0;
  color: var(--text-main);
  border-color: #cbd5e1;
}

.search-shortcut-badge {
  background: white;
  border: 1px solid var(--border-light);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.4rem;
  color: var(--text-main);
  cursor: pointer;
}

/* Mobile Drawer */
.mobile-menu {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 99;
  background-color: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
}

.mobile-menu.open {
  display: block;
}

.mobile-menu-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 320px;
  height: 100%;
  background: white;
  padding: 1.5rem;
  overflow-y: auto;
  box-shadow: -4px 0 25px rgba(0, 0, 0, 0.15);
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-light);
}

.mobile-nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.75rem;
  border-radius: var(--radius-md);
  color: var(--text-main);
  font-weight: 500;
  font-size: 0.95rem;
}

.mobile-nav-link:hover {
  background-color: var(--bg-subtle);
  color: var(--primary);
}

/* Main Content Area */
.main-content {
  flex: 1;
  padding-top: 2rem;
  padding-bottom: 4rem;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 3rem 1rem 3.5rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.95rem;
  background-color: var(--primary-light);
  border: 1px solid var(--primary-border);
  color: var(--primary);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
}

.hero-title {
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: var(--secondary);
  margin-bottom: 1.25rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--text-muted);
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Big Search Bar */
.search-container {
  max-width: 640px;
  margin: 0 auto 2.5rem;
  position: relative;
}

.search-input-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input-icon {
  position: absolute;
  left: 1.25rem;
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 1rem 3.5rem 1rem 3.25rem;
  font-size: 1.05rem;
  border: 2px solid var(--border-light);
  border-radius: var(--radius-full);
  background-color: white;
  color: var(--text-main);
  box-shadow: var(--shadow-md);
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15), var(--shadow-md);
}

.search-clear-btn {
  position: absolute;
  right: 1.25rem;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: none;
  padding: 4px;
}

/* Quick Filter Pills */
.filter-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.filter-pill {
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 500;
  background: white;
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s;
}

.filter-pill:hover, .filter-pill.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
}

/* Section Headings */
.section-header {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--secondary);
}

.section-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

/* Tool & Category Grids */
.grid-tools {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.25rem;
  margin-bottom: 3.5rem;
}

.grid-categories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
  margin-bottom: 3.5rem;
}

/* Tool Card */
.tool-card {
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}

.tool-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-border);
  color: inherit;
}

.tool-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.9rem;
}

.tool-card-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-light);
  color: var(--primary);
  flex-shrink: 0;
}

.category-tag {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
  background-color: var(--bg-subtle);
  color: var(--text-muted);
}

.tool-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 0.4rem;
  line-height: 1.35;
}

.tool-card-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.5;
  flex: 1;
  margin-bottom: 0.75rem;
}

.tool-card-footer {
  display: flex;
  align-items: center;
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--primary);
  gap: 0.35rem;
  margin-top: auto;
}

/* Category Card */
.cat-card {
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1.15rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.cat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-focus);
  color: inherit;
}

.cat-card-icon {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: var(--bg-subtle);
  color: var(--secondary);
}

.cat-card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 0.25rem;
}

.cat-card-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.45;
}

.cat-tool-count {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary);
  margin-top: 0.4rem;
}

/* Breadcrumbs */
.breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.breadcrumbs a {
  color: var(--text-muted);
}

.breadcrumbs a:hover {
  color: var(--primary);
}

.breadcrumbs .sep {
  color: var(--border-light);
  user-select: none;
}

.breadcrumbs .current {
  color: var(--text-main);
  font-weight: 600;
}

/* Tool Page Header */
.tool-page-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2.25rem;
}

.tool-page-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.25rem;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
}

.tool-page-title {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--secondary);
  margin-bottom: 0.75rem;
}

.tool-page-lead {
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.privacy-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.85rem;
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #065f46;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: var(--radius-full);
}

/* Tool Main Workspace Card */
.tool-workspace {
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  margin-bottom: 3.5rem;
}

/* Form Controls & Layout */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--secondary);
  margin-bottom: 0.45rem;
}

.form-hint {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.35rem;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 0.75rem 0.95rem;
  font-size: 0.95rem;
  font-family: inherit;
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-md);
  background-color: white;
  color: var(--text-main);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.form-grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.25rem;
}

.form-range {
  width: 100%;
  accent-color: var(--primary);
  cursor: pointer;
}

/* Drag and Drop Upload Zone */
.dropzone {
  border: 2px dashed var(--border-focus);
  background-color: var(--primary-light);
  border-radius: var(--radius-lg);
  padding: 2.5rem 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.dropzone:hover, .dropzone.dragover {
  background-color: #dbeafe;
  border-color: var(--primary-hover);
}

.dropzone-icon {
  color: var(--primary);
  margin-bottom: 0.75rem;
}

.dropzone-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 0.25rem;
}

.dropzone-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.dropzone-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

/* Button System */
.btn-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.4rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
  line-height: 1;
}

.btn:active {
  transform: translateY(1px);
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.25);
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  color: white;
}

.btn-secondary {
  background-color: var(--bg-subtle);
  border-color: var(--border-light);
  color: var(--secondary);
}

.btn-secondary:hover {
  background-color: #e2e8f0;
  color: var(--secondary);
}

.btn-success {
  background-color: var(--accent);
  color: white;
}

.btn-success:hover {
  background-color: #059669;
  color: white;
}

.btn-outline {
  background-color: transparent;
  border-color: var(--border-light);
  color: var(--text-muted);
}

.btn-outline:hover {
  background-color: var(--bg-subtle);
  color: var(--text-main);
}

.btn-sm {
  padding: 0.45rem 0.85rem;
  font-size: 0.85rem;
}

.btn-block {
  width: 100%;
}

/* Results & Output Card */
.result-box {
  margin-top: 1.75rem;
  padding: 1.5rem;
  background-color: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
}

.result-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.stat-card {
  background: white;
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary);
  line-height: 1.2;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-top: 0.25rem;
}

/* Alert Boxes */
.alert {
  padding: 0.95rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.alert-info {
  background-color: var(--primary-light);
  border: 1px solid var(--primary-border);
  color: #1e40af;
}

.alert-success {
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #065f46;
}

.alert-warning {
  background-color: #fffbeb;
  border: 1px solid #fde68a;
  color: #92400e;
}

.alert-error {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}

/* Code Previews */
.code-preview {
  background-color: #0f172a;
  color: #f8fafc;
  padding: 1.25rem;
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

/* SEO Content Section */
.seo-section {
  max-width: 900px;
  margin: 0 auto;
}

.content-block {
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 2rem;
}

.content-block h2 {
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.content-block h3 {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--secondary);
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.content-block p {
  color: var(--text-muted);
  margin-bottom: 1rem;
  line-height: 1.65;
}

.content-block ul, .content-block ol {
  margin-left: 1.5rem;
  margin-bottom: 1.25rem;
  color: var(--text-muted);
}

.content-block li {
  margin-bottom: 0.45rem;
  line-height: 1.6;
}

/* Steps Grid */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  margin-top: 1.25rem;
}

.step-card {
  background: var(--bg-subtle);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  border: 1px solid var(--border-light);
}

.step-number {
  width: 32px;
  height: 32px;
  background: var(--primary);
  color: white;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.step-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 0.35rem;
}

.step-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Accordion FAQs */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.faq-item {
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: white;
}

.faq-question {
  padding: 1rem 1.25rem;
  font-weight: 600;
  color: var(--secondary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  user-select: none;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-question::after {
  content: "+";
  font-size: 1.25rem;
  color: var(--primary);
  font-weight: 700;
  transition: transform 0.2s;
}

details[open] .faq-question::after {
  content: "−";
}

.faq-answer {
  padding: 0 1.25rem 1.25rem;
  color: var(--text-muted);
  font-size: 0.925rem;
  line-height: 1.6;
}

/* Footer */
.site-footer {
  background-color: var(--secondary);
  color: #94a3b8;
  padding: 4rem 0 2rem;
  margin-top: auto;
  border-top: 1px solid #1e293b;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 1.35rem;
  font-weight: 800;
  color: white;
}

.footer-text {
  font-size: 0.9rem;
  line-height: 1.6;
  max-width: 320px;
}

.footer-heading {
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.footer-links a {
  color: #94a3b8;
  font-size: 0.875rem;
  transition: color 0.15s;
}

.footer-links a:hover {
  color: white;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid #1e293b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
}

.footer-legal-links {
  display: flex;
  gap: 1.5rem;
}

.footer-legal-links a {
  color: #94a3b8;
}

.footer-legal-links a:hover {
  color: white;
}

/* Live Search Modal */
.search-modal {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  padding: 3rem 1rem;
}

.search-modal.open {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.search-modal-box {
  background: white;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 620px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border: 1px solid var(--border-light);
}

.search-modal-header {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-light);
  gap: 0.75rem;
}

.search-modal-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.1rem;
  font-family: inherit;
  color: var(--text-main);
}

.search-modal-results {
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  color: inherit;
  transition: background-color 0.15s;
}

.search-result-item:hover, .search-result-item.selected {
  background-color: var(--bg-subtle);
}

.search-result-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.search-result-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--secondary);
}

.search-result-cat {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Canvas / Image Preview Workspace */
.canvas-wrapper {
  max-width: 100%;
  overflow: auto;
  text-align: center;
  margin: 1rem 0;
  background: repeating-conic-gradient(#f1f5f9 0% 25%, #ffffff 0% 50%) 50% / 20px 20px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1rem;
}

.canvas-wrapper canvas, .canvas-wrapper img {
  max-width: 100%;
  height: auto;
  display: inline-block;
  box-shadow: var(--shadow-sm);
}

/* Tabs */
.tabs-nav {
  display: flex;
  border-bottom: 2px solid var(--border-light);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.tab-btn {
  padding: 0.65rem 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.15s;
}

.tab-btn:hover {
  color: var(--primary);
}

.tab-btn.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.tab-pane {
  display: none;
}

.tab-pane.active {
  display: block;
}

/* Responsive adjustments */
@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .header-actions .search-shortcut-badge {
    display: none;
  }
  .nav-links {
    display: none;
  }
  .menu-toggle {
    display: block;
  }
  .hero-title {
    font-size: 2rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .form-grid-2, .form-grid-3 {
    grid-template-columns: 1fr;
  }
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
  .tool-workspace {
    padding: 1.25rem;
  }
  .content-block {
    padding: 1.25rem;
  }
}
`;
};
