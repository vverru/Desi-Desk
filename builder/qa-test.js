// builder/qa-test.js
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
let errors = 0;
let tests = 0;

function assert(condition, msg) {
  tests++;
  if (!condition) {
    console.error(`[FAIL] ${msg}`);
    errors++;
  }
}

console.log('=== DesiDesk Quality Assurance & Link Verification ===');

// 1. Verify index.html
const indexPath = path.join(ROOT_DIR, 'index.html');
assert(fs.existsSync(indexPath), 'index.html must exist');
const indexHtml = fs.readFileSync(indexPath, 'utf8');
assert(indexHtml.includes('<style>'), 'index.html must have inline <style>');
assert(indexHtml.includes('<script>'), 'index.html must have inline <script>');

// 2. Scan all HTML files
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'builder' && file !== '.git') {
        results = results.concat(getFiles(full));
      }
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = getFiles(ROOT_DIR);
console.log(`Scanning ${htmlFiles.length} HTML files...`);
assert(htmlFiles.length >= 115, `Should have at least 115 HTML files (got ${htmlFiles.length})`);

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT_DIR, file);

  // Check inline CSS & JS rule
  assert(content.includes('<style>'), `${rel} must contain inline <style>`);
  assert(content.includes('</style>'), `${rel} must close </style>`);
  assert(content.includes('<script>'), `${rel} must contain inline <script>`);
  assert(content.includes('</script>'), `${rel} must close </script>`);

  // Check no local external .css or .js link tags
  assert(!content.match(/<link[^>]+rel=["']stylesheet["'][^>]+href=["'][^"']+\.css["']/i), `${rel} must not link to external .css file`);
  
  // Check title & canonical
  assert(content.includes('<title>') && !content.includes('<title></title>'), `${rel} must have non-empty <title>`);
  assert(content.includes('<link rel="canonical"'), `${rel} must have canonical URL tag`);
});

// 3. Verify internal links inside index.html
const toolLinkMatches = indexHtml.match(/href="tools\/[^"]+\.html"/g) || [];
console.log(`Found ${toolLinkMatches.length} tool links on index.html.`);
toolLinkMatches.forEach(m => {
  const target = m.replace('href="', '').replace('"', '');
  const targetFull = path.join(ROOT_DIR, target);
  assert(fs.existsSync(targetFull), `Link on index.html ${target} must exist on disk`);
});

// 4. Verify sitemap.xml
const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'sitemap.xml must exist');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const locMatches = sitemapContent.match(/<loc>https:\/\/desidesk\.in\/([^<]*)<\/loc>/g) || [];
console.log(`Found ${locMatches.length} URLs in sitemap.xml.`);
locMatches.forEach(loc => {
  const urlPath = loc.replace('<loc>https://desidesk.in/', '').replace('</loc>', '');
  if (urlPath === '') {
    assert(fs.existsSync(path.join(ROOT_DIR, 'index.html')), 'Root URL must map to index.html');
  } else {
    assert(fs.existsSync(path.join(ROOT_DIR, urlPath)), `Sitemap URL ${urlPath} must exist on disk`);
  }
});

// 5. Verify robots.txt & webmanifest & favicon.svg
assert(fs.existsSync(path.join(ROOT_DIR, 'robots.txt')), 'robots.txt must exist');
assert(fs.existsSync(path.join(ROOT_DIR, 'manifest.webmanifest')), 'manifest.webmanifest must exist');
assert(fs.existsSync(path.join(ROOT_DIR, 'favicon.svg')), 'favicon.svg must exist');

console.log(`\n=== QA RESULTS: ${tests} tests run, ${errors} failures. ===`);
if (errors === 0) {
  console.log('[SUCCESS] All verification tests passed with 100% compliance!');
} else {
  process.exit(1);
}
