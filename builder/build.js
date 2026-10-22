// builder/build.js
const fs = require('fs');
const path = require('path');
const categories = require('./categories');
const tools = require('./master-tools');
const { getIndexHtml, getCategoryPageHtml, getToolPageHtml, getStaticPageHtml } = require('./static-pages');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('=== DesiDesk Build System ===');
console.log(`Loaded ${categories.length} categories.`);
console.log(`Loaded ${tools.length} distinct tools.`);

// 1. Ensure directories exist
const toolFolders = new Set(tools.map(t => t.category));
toolFolders.forEach(folder => {
  const dir = path.join(ROOT_DIR, 'tools', folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});
const catDir = path.join(ROOT_DIR, 'categories');
if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

// 2. Build Homepage (index.html)
const indexPath = path.join(ROOT_DIR, 'index.html');
fs.writeFileSync(indexPath, getIndexHtml(tools), 'utf8');
console.log(`[OK] Generated index.html (${(fs.statSync(indexPath).size / 1024).toFixed(1)} KB)`);

// 3. Build Category Pages
categories.forEach(cat => {
  const catFilePath = path.join(catDir, `${cat.slug}.html`);
  fs.writeFileSync(catFilePath, getCategoryPageHtml(cat, tools), 'utf8');
  console.log(`[OK] Generated categories/${cat.slug}.html`);
});

// 4. Build All Tool Pages
let toolCount = 0;
tools.forEach(tool => {
  const toolFilePath = path.join(ROOT_DIR, 'tools', tool.category, `${tool.slug}.html`);
  fs.writeFileSync(toolFilePath, getToolPageHtml(tool, tools), 'utf8');
  toolCount++;
});
console.log(`[OK] Generated ${toolCount} individual tool HTML pages.`);

// 5. Build Informational & Legal Pages
const staticPages = ['about', 'contact', 'privacy', 'terms', 'disclaimer', '404'];
staticPages.forEach(p => {
  const filename = p === 'privacy' ? 'privacy-policy.html' : `${p}.html`;
  const filePath = path.join(ROOT_DIR, filename);
  fs.writeFileSync(filePath, getStaticPageHtml(p, tools), 'utf8');
  console.log(`[OK] Generated ${filename}`);
});

// 6. Generate XML Sitemap
const today = new Date().toISOString().split('T')[0];
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://desidesk.in/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

categories.forEach(c => {
  sitemapXml += `  <url>
    <loc>https://desidesk.in/categories/${c.slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
});

tools.forEach(t => {
  sitemapXml += `  <url>
    <loc>https://desidesk.in/tools/${t.category}/${t.slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
});

const infoPages = ['about.html', 'privacy-policy.html', 'terms.html', 'disclaimer.html', 'contact.html'];
infoPages.forEach(p => {
  sitemapXml += `  <url>
    <loc>https://desidesk.in/${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>\n`;
});

sitemapXml += `</urlset>`;

fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`[OK] Generated sitemap.xml with ${1 + categories.length + tools.length + infoPages.length} URLs.`);

console.log('\n=== BUILD COMPLETED SUCCESSFULLY! ===');
