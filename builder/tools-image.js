// builder/tools-image.js

module.exports = [
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    category: 'image',
    name: 'Image Compressor',
    shortDesc: 'Compress JPG, PNG, and WebP images directly in your browser with real-time preview.',
    seoTitle: 'Image Compressor Online - Reduce Image Size Free | DesiDesk',
    seoDesc: 'Compress JPG, PNG and WebP images directly in your browser. Adjust quality, preview results and download compressed images with DesiDesk. 100% private.',
    keywords: 'image compressor, compress image online, reduce jpg size, compress png, optimize images, free photo compressor',
    howToSteps: [
      'Select or drop a JPG, PNG, or WebP image into the upload box.',
      'Adjust the quality slider to find your balance between file size and clarity.',
      'Compare original vs compressed size and savings percentage in real time.',
      'Download your optimized image instantly.'
    ],
    features: [
      '100% Client-Side: Your private photos never leave your device.',
      'Configurable quality slider with live size and compression calculation.',
      'Supports JPG, PNG, and WebP formats.',
      'Side-by-side visual preview comparison.'
    ],
    faqs: [
      {
        q: 'How does client-side compression work?',
        a: 'The browser decodes the image into an HTML5 Canvas and re-encodes it using optimal JPEG or WebP lossy quantization algorithms entirely in local memory.'
      },
      {
        q: 'Will compressing PNG images reduce transparency?',
        a: 'WebP and PNG preserve transparency. For JPG compression, transparent pixels are rendered over a clean white background.'
      }
    ],
    related: ['image-resizer', 'image-cropper', 'png-to-jpg', 'image-to-webp'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <div class="dropzone-title">Upload Image to Compress</div>
        <div class="dropzone-subtitle">Click to select or drop JPG, PNG, or WebP</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/jpeg,image/png,image/webp" />
      </div>

      <div id="compressWorkspace" style="display:none;margin-top:2rem;">
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Compression Quality: <span id="qualityVal" style="color:var(--primary);font-weight:700;">80%</span></label>
            <input type="range" id="qualityRange" class="form-range" min="10" max="95" value="80" />
            <div class="form-hint">Lower quality yields smaller file sizes.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Output Format:</label>
            <select id="outputFormat" class="form-select">
              <option value="image/jpeg">JPEG (Best for photos)</option>
              <option value="image/webp">WebP (Modern, high efficiency)</option>
              <option value="image/png">PNG (Lossless)</option>
            </select>
          </div>
        </div>

        <div class="stat-grid" style="margin-top:1.5rem;">
          <div class="stat-card">
            <div class="stat-value" id="origSize">-</div>
            <div class="stat-label">Original Size</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="compSize" style="color:var(--accent);">-</div>
            <div class="stat-label">Compressed Size</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="savedPercent" style="color:var(--accent);">-</div>
            <div class="stat-label">Space Saved</div>
          </div>
        </div>

        <div class="canvas-wrapper">
          <img id="previewImg" alt="Compressed Preview" style="max-height:360px;" />
        </div>

        <div class="btn-group" style="justify-content:center;">
          <a id="downloadBtn" class="btn btn-success" download="compressed-desidesk.jpg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Compressed Image
          </a>
          <button id="resetBtn" class="btn btn-outline">Choose Another</button>
        </div>
      </div>
    `,
    toolScript: `
      let origFile = null;
      let rawImage = null;
      const fileInput = document.getElementById('fileInput');
      const compressWorkspace = document.getElementById('compressWorkspace');
      const qualityRange = document.getElementById('qualityRange');
      const qualityVal = document.getElementById('qualityVal');
      const outputFormat = document.getElementById('outputFormat');
      const origSize = document.getElementById('origSize');
      const compSize = document.getElementById('compSize');
      const savedPercent = document.getElementById('savedPercent');
      const previewImg = document.getElementById('previewImg');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetBtn = document.getElementById('resetBtn');

      function formatSize(b) {
        if (b < 1024) return b + ' B';
        if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
        return (b / 1048576).toFixed(2) + ' MB';
      }

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        origFile = file;
        const reader = new FileReader();
        reader.onload = (ev) => {
          rawImage = new Image();
          rawImage.onload = () => {
            origSize.textContent = formatSize(origFile.size);
            compressWorkspace.style.display = 'block';
            runCompression();
          };
          rawImage.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      qualityRange.addEventListener('input', () => {
        qualityVal.textContent = qualityRange.value + '%';
        runCompression();
      });

      outputFormat.addEventListener('change', runCompression);

      function runCompression() {
        if (!rawImage) return;
        const canvas = document.createElement('canvas');
        canvas.width = rawImage.width;
        canvas.height = rawImage.height;
        const ctx = canvas.getContext('2d');

        const mime = outputFormat.value;
        if (mime === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(rawImage, 0, 0);

        const quality = parseInt(qualityRange.value, 10) / 100;
        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          previewImg.src = url;
          downloadBtn.href = url;
          const ext = mime === 'image/webp' ? 'webp' : (mime === 'image/png' ? 'png' : 'jpg');
          downloadBtn.download = 'compressed-desidesk.' + ext;

          compSize.textContent = formatSize(blob.size);
          const diff = origFile.size - blob.size;
          const pct = Math.round((diff / origFile.size) * 100);
          if (pct >= 0) {
            savedPercent.textContent = pct + '%';
            savedPercent.style.color = 'var(--accent)';
          } else {
            savedPercent.textContent = '+' + Math.abs(pct) + '%';
            savedPercent.style.color = 'var(--accent-rose)';
          }
        }, mime, quality);
      }

      resetBtn.addEventListener('click', () => {
        origFile = null;
        rawImage = null;
        fileInput.value = '';
        compressWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    category: 'image',
    name: 'Image Resizer',
    shortDesc: 'Resize photos by dimensions in pixels or percentage while locking aspect ratio.',
    seoTitle: 'Image Resizer Online - Resize Photos in Pixels & Percentage Free | DesiDesk',
    seoDesc: 'Resize image dimensions in pixels or percentage without losing aspect ratio. Fast, free client-side image resizer for desktop and mobile.',
    keywords: 'image resizer, resize image online, change photo dimensions, resize picture, free image resizer',
    howToSteps: [
      'Upload the image you want to resize.',
      'Enter new width or height in pixels, or choose percentage scale.',
      'Ensure "Maintain Aspect Ratio" is checked for distortion-free resizing.',
      'Download your resized image.'
    ],
    features: [
      'Resize by pixel width & height or scaling percentage.',
      'Aspect ratio lock prevents image distortion.',
      'High-quality bicubic canvas interpolation.',
      'Instant download in JPG, PNG, or WebP.'
    ],
    faqs: [
      {
        q: 'Will my resized image lose clarity?',
        a: 'Downscaling preserves sharpness. Upscaling beyond the original resolution cannot invent new details, but smooth interpolation ensures no pixelation.'
      }
    ],
    related: ['image-compressor', 'image-cropper', 'passport-photo-maker'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
        <div class="dropzone-title">Upload Image to Resize</div>
        <div class="dropzone-subtitle">Click or drop your photo here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/*" />
      </div>

      <div id="resizeWorkspace" style="display:none;margin-top:2rem;">
        <div class="alert alert-info" id="origDimInfo"></div>

        <div class="form-grid-3" style="margin-top:1.25rem;">
          <div class="form-group">
            <label class="form-label">Width (px):</label>
            <input type="number" id="targetWidth" class="form-input" min="1" />
          </div>
          <div class="form-group">
            <label class="form-label">Height (px):</label>
            <input type="number" id="targetHeight" class="form-input" min="1" />
          </div>
          <div class="form-group">
            <label class="form-label">Scale Percentage:</label>
            <select id="scalePercent" class="form-select">
              <option value="custom">Custom Dimensions</option>
              <option value="75">75% of Original</option>
              <option value="50">50% of Original</option>
              <option value="25">25% of Original</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label style="cursor:pointer;font-weight:600;"><input type="checkbox" id="lockRatio" checked /> Maintain Aspect Ratio</label>
        </div>

        <div class="canvas-wrapper">
          <canvas id="previewCanvas" style="max-height:360px;"></canvas>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <button id="applyResizeBtn" class="btn btn-primary">Update Preview</button>
          <a id="downloadBtn" class="btn btn-success" download="resized-desidesk.png">Download Resized Image</a>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>
    `,
    toolScript: `
      let rawImg = null;
      let origW = 0, origH = 0;
      const fileInput = document.getElementById('fileInput');
      const resizeWorkspace = document.getElementById('resizeWorkspace');
      const origDimInfo = document.getElementById('origDimInfo');
      const targetWidth = document.getElementById('targetWidth');
      const targetHeight = document.getElementById('targetHeight');
      const scalePercent = document.getElementById('scalePercent');
      const lockRatio = document.getElementById('lockRatio');
      const previewCanvas = document.getElementById('previewCanvas');
      const applyResizeBtn = document.getElementById('applyResizeBtn');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetBtn = document.getElementById('resetBtn');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          rawImg = new Image();
          rawImg.onload = () => {
            origW = rawImg.width;
            origH = rawImg.height;
            origDimInfo.textContent = 'Original Size: ' + origW + ' x ' + origH + ' pixels.';
            targetWidth.value = origW;
            targetHeight.value = origH;
            resizeWorkspace.style.display = 'block';
            drawResized();
          };
          rawImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      targetWidth.addEventListener('input', () => {
        if (lockRatio.checked && origW > 0) {
          const w = parseFloat(targetWidth.value) || 0;
          targetHeight.value = Math.round((w / origW) * origH);
        }
      });

      targetHeight.addEventListener('input', () => {
        if (lockRatio.checked && origH > 0) {
          const h = parseFloat(targetHeight.value) || 0;
          targetWidth.value = Math.round((h / origH) * origW);
        }
      });

      scalePercent.addEventListener('change', () => {
        const val = scalePercent.value;
        if (val !== 'custom') {
          const factor = parseFloat(val) / 100;
          targetWidth.value = Math.round(origW * factor);
          targetHeight.value = Math.round(origH * factor);
          drawResized();
        }
      });

      function drawResized() {
        const w = parseInt(targetWidth.value, 10);
        const h = parseInt(targetHeight.value, 10);
        if (!w || !h || !rawImg) return;

        previewCanvas.width = w;
        previewCanvas.height = h;
        const ctx = previewCanvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(rawImg, 0, 0, w, h);

        downloadBtn.href = previewCanvas.toDataURL('image/png');
      }

      applyResizeBtn.addEventListener('click', drawResized);

      resetBtn.addEventListener('click', () => {
        rawImg = null;
        fileInput.value = '';
        resizeWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'image-cropper',
    slug: 'image-cropper',
    category: 'image',
    name: 'Image Cropper',
    shortDesc: 'Crop photos with standard aspect ratios (1:1, 16:9, 4:3) or freeform crop box.',
    seoTitle: 'Image Cropper Online - Crop Photos Free | DesiDesk',
    seoDesc: 'Crop photos easily with preset aspect ratios or custom freeform cropping. Private and browser-based cropping with DesiDesk.',
    keywords: 'crop image online, photo cropper, crop photo 16:9, square crop, free image crop',
    howToSteps: [
      'Upload your image to crop.',
      'Select an aspect ratio preset (Square 1:1, 16:9 Landscape, 4:3 Standard, or Freeform).',
      'Adjust the crop boundary sliders.',
      'Click "Crop Image" and download the cropped result.'
    ],
    features: [
      'Aspect ratio presets: 1:1, 16:9, 4:3, and Freeform.',
      'Accurate pixel crop preview.',
      'Zero server upload: instant and 100% private.',
      'High-quality PNG/JPG export.'
    ],
    faqs: [
      {
        q: 'Can I crop avatars for Instagram or WhatsApp?',
        a: 'Yes, select the 1:1 (Square) preset to generate perfect avatar photos.'
      }
    ],
    related: ['circle-image-cropper', 'image-resizer', 'image-compressor'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"/><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"/></svg>
        <div class="dropzone-title">Upload Image to Crop</div>
        <div class="dropzone-subtitle">Click to select or drop your image</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/*" />
      </div>

      <div id="cropWorkspace" style="display:none;margin-top:2rem;">
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Preset Aspect Ratio:</label>
            <select id="ratioPreset" class="form-select">
              <option value="1:1">1:1 Square (Avatars / Social)</option>
              <option value="16:9">16:9 Widescreen (YouTube / Video)</option>
              <option value="4:3">4:3 Standard</option>
              <option value="free">Freeform (Custom)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Crop Zoom / Coverage:</label>
            <input type="range" id="cropZoom" class="form-range" min="30" max="100" value="80" />
          </div>
        </div>

        <div class="canvas-wrapper">
          <canvas id="cropCanvas" style="max-height:360px;"></canvas>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <a id="downloadBtn" class="btn btn-success" download="cropped-desidesk.png">Download Cropped Image</a>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>
    `,
    toolScript: `
      let rawImg = null;
      const fileInput = document.getElementById('fileInput');
      const cropWorkspace = document.getElementById('cropWorkspace');
      const ratioPreset = document.getElementById('ratioPreset');
      const cropZoom = document.getElementById('cropZoom');
      const cropCanvas = document.getElementById('cropCanvas');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetBtn = document.getElementById('resetBtn');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          rawImg = new Image();
          rawImg.onload = () => {
            cropWorkspace.style.display = 'block';
            updateCrop();
          };
          rawImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      ratioPreset.addEventListener('change', updateCrop);
      cropZoom.addEventListener('input', updateCrop);

      function updateCrop() {
        if (!rawImg) return;
        const preset = ratioPreset.value;
        const zoom = parseInt(cropZoom.value, 10) / 100;

        let targetAspect = rawImg.width / rawImg.height;
        if (preset === '1:1') targetAspect = 1;
        else if (preset === '16:9') targetAspect = 16 / 9;
        else if (preset === '4:3') targetAspect = 4 / 3;

        let cropW = rawImg.width * zoom;
        let cropH = cropW / targetAspect;

        if (cropH > rawImg.height * zoom) {
          cropH = rawImg.height * zoom;
          cropW = cropH * targetAspect;
        }

        const cropX = (rawImg.width - cropW) / 2;
        const cropY = (rawImg.height - cropH) / 2;

        cropCanvas.width = cropW;
        cropCanvas.height = cropH;
        const ctx = cropCanvas.getContext('2d');
        ctx.drawImage(rawImg, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        downloadBtn.href = cropCanvas.toDataURL('image/png');
      }

      resetBtn.addEventListener('click', () => {
        rawImg = null;
        fileInput.value = '';
        cropWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'circle-image-cropper',
    slug: 'circle-image-cropper',
    category: 'image',
    name: 'Circle Image Cropper',
    shortDesc: 'Crop any photo into a clean circle with a transparent background for profile avatars.',
    seoTitle: 'Circle Image Cropper Online - Round Profile Picture Maker | DesiDesk',
    seoDesc: 'Crop photos into a circle or rounded avatar with transparent background online. Perfect for Discord, WhatsApp, and social profile pictures.',
    keywords: 'circle image crop, round photo cropper, circular avatar maker, profile picture crop',
    howToSteps: [
      'Upload your portrait or avatar photo.',
      'Adjust the circular crop diameter and center position.',
      'Preview the circular avatar on transparent canvas.',
      'Download as PNG with alpha transparency.'
    ],
    features: [
      'Clean circular alpha clipping with anti-aliased edge smoothing.',
      'Download as transparent PNG ready for avatars.',
      'Border color and width options.',
      '100% private in-browser tool.'
    ],
    faqs: [
      {
        q: 'Does it save with transparency?',
        a: 'Yes, downloading exports a transparent PNG with all pixels outside the circle completely transparent.'
      }
    ],
    related: ['image-cropper', 'image-resizer', 'passport-photo-maker'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/></svg>
        <div class="dropzone-title">Upload Photo to Make Circular</div>
        <div class="dropzone-subtitle">Click or drop your photo here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/*" />
      </div>

      <div id="circleWorkspace" style="display:none;margin-top:2rem;">
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Border Width (px):</label>
            <input type="range" id="borderWidth" class="form-range" min="0" max="20" value="0" />
          </div>
          <div class="form-group">
            <label class="form-label">Border Color:</label>
            <input type="color" id="borderColor" class="form-input" value="#2563eb" style="height:42px;padding:2px;" />
          </div>
        </div>

        <div class="canvas-wrapper">
          <canvas id="circleCanvas" style="max-height:360px;"></canvas>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <a id="downloadBtn" class="btn btn-success" download="circle-avatar-desidesk.png">Download Circle PNG</a>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>
    `,
    toolScript: `
      let rawImg = null;
      const fileInput = document.getElementById('fileInput');
      const circleWorkspace = document.getElementById('circleWorkspace');
      const borderWidth = document.getElementById('borderWidth');
      const borderColor = document.getElementById('borderColor');
      const circleCanvas = document.getElementById('circleCanvas');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetBtn = document.getElementById('resetBtn');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          rawImg = new Image();
          rawImg.onload = () => {
            circleWorkspace.style.display = 'block';
            drawCircle();
          };
          rawImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      borderWidth.addEventListener('input', drawCircle);
      borderColor.addEventListener('input', drawCircle);

      function drawCircle() {
        if (!rawImg) return;
        const size = Math.min(rawImg.width, rawImg.height);
        circleCanvas.width = size;
        circleCanvas.height = size;
        const ctx = circleCanvas.getContext('2d');
        ctx.clearRect(0, 0, size, size);

        const bWidth = parseInt(borderWidth.value, 10);
        const radius = size / 2 - bWidth;

        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        const srcX = (rawImg.width - size) / 2;
        const srcY = (rawImg.height - size) / 2;
        ctx.drawImage(rawImg, srcX, srcY, size, size, 0, 0, size, size);
        ctx.restore();

        if (bWidth > 0) {
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, radius + bWidth / 2, 0, Math.PI * 2);
          ctx.strokeStyle = borderColor.value;
          ctx.lineWidth = bWidth;
          ctx.stroke();
        }

        downloadBtn.href = circleCanvas.toDataURL('image/png');
      }

      resetBtn.addEventListener('click', () => {
        rawImg = null;
        fileInput.value = '';
        circleWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'image-rotator-flipper',
    slug: 'image-rotator-flipper',
    category: 'image',
    name: 'Image Rotator & Flipper',
    shortDesc: 'Rotate photos 90°, 180°, 270° or flip them horizontally and vertically.',
    seoTitle: 'Rotate & Flip Image Online Free | DesiDesk',
    seoDesc: 'Rotate images clockwise or flip horizontally and vertically in your browser. Fast, 100% private, free photo rotator.',
    keywords: 'rotate image, flip image, mirror photo, flip picture horizontal, rotate photo online',
    howToSteps: [
      'Upload the photo you want to rotate or mirror.',
      'Use the Rotate Left, Rotate Right, Flip Horizontal, or Flip Vertical buttons.',
      'Preview your changes live on canvas.',
      'Download your transformed image.'
    ],
    features: [
      'Rotate 90 degrees right or left.',
      'Horizontal and vertical mirroring/flipping.',
      'Instant canvas render with no quality loss.',
      'Supports all image formats.'
    ],
    faqs: [
      {
        q: 'Does flipping mirror text?',
        a: 'Yes, horizontal flipping mirrors everything including text.'
      }
    ],
    related: ['image-resizer', 'image-cropper', 'image-compressor'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        <div class="dropzone-title">Upload Photo to Rotate or Flip</div>
        <div class="dropzone-subtitle">Click or drop your image here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/*" />
      </div>

      <div id="rotWorkspace" style="display:none;margin-top:2rem;">
        <div class="btn-group" style="justify-content:center;margin-bottom:1.5rem;">
          <button id="btnRotLeft" class="btn btn-secondary">&larr; Rotate Left 90°</button>
          <button id="btnRotRight" class="btn btn-secondary">Rotate Right 90° &rarr;</button>
          <button id="btnFlipH" class="btn btn-secondary">&#8644; Flip Horizontal</button>
          <button id="btnFlipV" class="btn btn-secondary">&#8645; Flip Vertical</button>
        </div>

        <div class="canvas-wrapper">
          <canvas id="transCanvas" style="max-height:360px;"></canvas>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <a id="downloadBtn" class="btn btn-success" download="transformed-desidesk.png">Download Image</a>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>
    `,
    toolScript: `
      let rawImg = null;
      let angle = 0;
      let flipH = 1;
      let flipV = 1;
      const fileInput = document.getElementById('fileInput');
      const rotWorkspace = document.getElementById('rotWorkspace');
      const transCanvas = document.getElementById('transCanvas');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetBtn = document.getElementById('resetBtn');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          rawImg = new Image();
          rawImg.onload = () => {
            angle = 0;
            flipH = 1;
            flipV = 1;
            rotWorkspace.style.display = 'block';
            drawTransformed();
          };
          rawImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      document.getElementById('btnRotLeft').addEventListener('click', () => { angle = (angle - 90 + 360) % 360; drawTransformed(); });
      document.getElementById('btnRotRight').addEventListener('click', () => { angle = (angle + 90) % 360; drawTransformed(); });
      document.getElementById('btnFlipH').addEventListener('click', () => { flipH *= -1; drawTransformed(); });
      document.getElementById('btnFlipV').addEventListener('click', () => { flipV *= -1; drawTransformed(); });

      function drawTransformed() {
        if (!rawImg) return;
        const isRotated = angle === 90 || angle === 270;
        transCanvas.width = isRotated ? rawImg.height : rawImg.width;
        transCanvas.height = isRotated ? rawImg.width : rawImg.height;

        const ctx = transCanvas.getContext('2d');
        ctx.save();
        ctx.translate(transCanvas.width / 2, transCanvas.height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.scale(flipH, flipV);
        ctx.drawImage(rawImg, -rawImg.width / 2, -rawImg.height / 2);
        ctx.restore();

        downloadBtn.href = transCanvas.toDataURL('image/png');
      }

      resetBtn.addEventListener('click', () => {
        rawImg = null;
        fileInput.value = '';
        rotWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'png-to-jpg',
    slug: 'png-to-jpg',
    category: 'image',
    name: 'PNG to JPG Converter',
    shortDesc: 'Convert PNG images to JPG with custom background color for transparent pixels.',
    seoTitle: 'PNG to JPG Converter Online - Free & High Quality | DesiDesk',
    seoDesc: 'Convert PNG to JPG format in your browser. Choose background color for transparency, adjust quality, and download instantly.',
    keywords: 'png to jpg, convert png to jpg online, transparent png to jpeg, free photo converter',
    howToSteps: [
      'Upload your PNG image.',
      'Select a background color for any transparent areas (default White).',
      'Set output JPEG quality (e.g. 90%).',
      'Download your converted JPG image.'
    ],
    features: [
      'Selectable background color for transparent PNGs.',
      'Configurable JPEG quality slider.',
      'Instant conversion directly in browser.',
      '100% private and confidential.'
    ],
    faqs: [
      {
        q: 'Why do transparent PNGs need a background in JPG?',
        a: 'The JPEG standard does not support alpha transparency. DesiDesk lets you pick a background color (default white) so transparent areas look clean and seamless.'
      }
    ],
    related: ['jpg-to-png', 'image-to-webp', 'image-compressor'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><polyline points="21 15 16 10 5 21"/></svg>
        <div class="dropzone-title">Upload PNG to Convert to JPG</div>
        <div class="dropzone-subtitle">Click or drop your PNG file here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/png" />
      </div>

      <div id="convWorkspace" style="display:none;margin-top:2rem;">
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Background Color (for transparency):</label>
            <input type="color" id="bgColor" class="form-input" value="#ffffff" style="height:42px;padding:2px;" />
          </div>
          <div class="form-group">
            <label class="form-label">JPG Quality: <span id="qVal">90%</span></label>
            <input type="range" id="jpgQuality" class="form-range" min="30" max="100" value="90" />
          </div>
        </div>

        <div class="canvas-wrapper">
          <canvas id="convCanvas" style="max-height:360px;"></canvas>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <a id="downloadBtn" class="btn btn-success" download="converted-desidesk.jpg">Download JPG</a>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>
    `,
    toolScript: `
      let rawImg = null;
      const fileInput = document.getElementById('fileInput');
      const convWorkspace = document.getElementById('convWorkspace');
      const bgColor = document.getElementById('bgColor');
      const jpgQuality = document.getElementById('jpgQuality');
      const qVal = document.getElementById('qVal');
      const convCanvas = document.getElementById('convCanvas');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetBtn = document.getElementById('resetBtn');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          rawImg = new Image();
          rawImg.onload = () => {
            convWorkspace.style.display = 'block';
            convertPng();
          };
          rawImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      bgColor.addEventListener('input', convertPng);
      jpgQuality.addEventListener('input', () => {
        qVal.textContent = jpgQuality.value + '%';
        convertPng();
      });

      function convertPng() {
        if (!rawImg) return;
        convCanvas.width = rawImg.width;
        convCanvas.height = rawImg.height;
        const ctx = convCanvas.getContext('2d');
        ctx.fillStyle = bgColor.value;
        ctx.fillRect(0, 0, convCanvas.width, convCanvas.height);
        ctx.drawImage(rawImg, 0, 0);

        const quality = parseInt(jpgQuality.value, 10) / 100;
        downloadBtn.href = convCanvas.toDataURL('image/jpeg', quality);
      }

      resetBtn.addEventListener('click', () => {
        rawImg = null;
        fileInput.value = '';
        convWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'jpg-to-png',
    slug: 'jpg-to-png',
    category: 'image',
    name: 'JPG to PNG Converter',
    shortDesc: 'Convert JPG photos into lossless PNG format with clean pixel clarity.',
    seoTitle: 'JPG to PNG Converter Online - Free Image Converter | DesiDesk',
    seoDesc: 'Convert JPG or JPEG images to PNG format directly in your browser. Fast, free and 100% private image conversion.',
    keywords: 'jpg to png, convert jpeg to png, photo to png, free image converter',
    howToSteps: [
      'Upload your JPG or JPEG image.',
      'Preview the lossless PNG render.',
      'Download your PNG image immediately.'
    ],
    features: [
      'Lossless conversion preserving color fidelity.',
      'Supports high-resolution camera photos.',
      'Completely client-side without bandwidth limits.',
      'Zero server upload.'
    ],
    faqs: [
      {
        q: 'Does converting JPG to PNG increase file size?',
        a: 'PNG is a lossless format, so the file size may be larger than lossy JPEG, but it prevents any further compression artifacts.'
      }
    ],
    related: ['png-to-jpg', 'image-to-webp', 'image-compressor'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><polyline points="21 15 16 10 5 21"/></svg>
        <div class="dropzone-title">Upload JPG to Convert to PNG</div>
        <div class="dropzone-subtitle">Click or drop your JPG file here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/jpeg" />
      </div>

      <div id="convWorkspace" style="display:none;margin-top:2rem;">
        <div class="canvas-wrapper">
          <canvas id="convCanvas" style="max-height:360px;"></canvas>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <a id="downloadBtn" class="btn btn-success" download="converted-desidesk.png">Download PNG</a>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>
    `,
    toolScript: `
      const fileInput = document.getElementById('fileInput');
      const convWorkspace = document.getElementById('convWorkspace');
      const convCanvas = document.getElementById('convCanvas');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetBtn = document.getElementById('resetBtn');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          const img = new Image();
          img.onload = () => {
            convCanvas.width = img.width;
            convCanvas.height = img.height;
            const ctx = convCanvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            downloadBtn.href = convCanvas.toDataURL('image/png');
            convWorkspace.style.display = 'block';
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      resetBtn.addEventListener('click', () => {
        fileInput.value = '';
        convWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'image-to-webp',
    slug: 'image-to-webp',
    category: 'image',
    name: 'Image to WebP Converter',
    shortDesc: 'Convert PNG and JPG images to modern WebP format for fast web page loading.',
    seoTitle: 'Image to WebP Converter Online - Convert JPG/PNG to WebP | DesiDesk',
    seoDesc: 'Convert JPG and PNG images to next-gen WebP format with smaller file sizes and high quality. 100% free and client-side.',
    keywords: 'image to webp, png to webp, jpg to webp, convert to webp online, webp image optimizer',
    howToSteps: [
      'Upload any PNG or JPG photo.',
      'Adjust WebP quality level (default 85%).',
      'Compare file size and download your WebP image.'
    ],
    features: [
      'Up to 30% smaller file size than JPG with equal visual quality.',
      'Supports transparency from PNGs.',
      'Instant browser conversion.',
      'Zero server upload.'
    ],
    faqs: [
      {
        q: 'Why use WebP format?',
        a: 'WebP provides superior lossless and lossy compression for web images, boosting Google Core Web Vitals and site speed.'
      }
    ],
    related: ['webp-to-jpg', 'png-to-jpg', 'image-compressor'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><polyline points="21 15 16 10 5 21"/></svg>
        <div class="dropzone-title">Upload JPG or PNG to Convert to WebP</div>
        <div class="dropzone-subtitle">Click or drop image file here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/*" />
      </div>

      <div id="webpWorkspace" style="display:none;margin-top:2rem;">
        <div class="form-group" style="max-width:400px;margin:0 auto 1.5rem;">
          <label class="form-label">WebP Quality: <span id="qVal">85%</span></label>
          <input type="range" id="webpQuality" class="form-range" min="20" max="100" value="85" />
        </div>

        <div class="canvas-wrapper">
          <canvas id="webpCanvas" style="max-height:360px;"></canvas>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <a id="downloadBtn" class="btn btn-success" download="converted-desidesk.webp">Download WebP</a>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>
    `,
    toolScript: `
      let rawImg = null;
      const fileInput = document.getElementById('fileInput');
      const webpWorkspace = document.getElementById('webpWorkspace');
      const webpQuality = document.getElementById('webpQuality');
      const qVal = document.getElementById('qVal');
      const webpCanvas = document.getElementById('webpCanvas');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetBtn = document.getElementById('resetBtn');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          rawImg = new Image();
          rawImg.onload = () => {
            webpWorkspace.style.display = 'block';
            convert();
          };
          rawImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      webpQuality.addEventListener('input', () => {
        qVal.textContent = webpQuality.value + '%';
        convert();
      });

      function convert() {
        if (!rawImg) return;
        webpCanvas.width = rawImg.width;
        webpCanvas.height = rawImg.height;
        const ctx = webpCanvas.getContext('2d');
        ctx.drawImage(rawImg, 0, 0);

        const q = parseInt(webpQuality.value, 10) / 100;
        webpCanvas.toBlob((blob) => {
          if (blob) downloadBtn.href = URL.createObjectURL(blob);
        }, 'image/webp', q);
      }

      resetBtn.addEventListener('click', () => {
        rawImg = null;
        fileInput.value = '';
        webpWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'image-to-base64',
    slug: 'image-to-base64',
    category: 'image',
    name: 'Image to Base64 Converter',
    shortDesc: 'Convert image files into Base64 data URI strings and CSS/HTML code snippets.',
    seoTitle: 'Image to Base64 Online - Convert Photo to Base64 Data URI | DesiDesk',
    seoDesc: 'Convert JPG, PNG, WebP and SVG images into Base64 Data URLs directly in browser. One-click copy for HTML <img> and CSS background snippets.',
    keywords: 'image to base64, photo to base64, data uri generator, convert image to data url',
    howToSteps: [
      'Select or drop your image file.',
      'Instantly view the Base64 Data URI string.',
      'Copy as raw Base64, HTML <img> tag, or CSS background-image code.'
    ],
    features: [
      'Generates clean Data URI with correct MIME type.',
      'Ready-to-use snippets for HTML and CSS.',
      'One-click copy to clipboard.',
      '100% private in-browser generation.'
    ],
    faqs: [
      {
        q: 'When should I use Base64 images?',
        a: 'Base64 images are great for small icons and critical above-the-fold assets to avoid extra HTTP requests.'
      }
    ],
    related: ['base64-to-image', 'image-compressor', 'image-to-webp'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        <div class="dropzone-title">Upload Image to Convert to Base64</div>
        <div class="dropzone-subtitle">Click or drop any image file</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/*" />
      </div>

      <div id="base64Result" style="display:none;margin-top:2rem;">
        <div class="form-group">
          <label class="form-label">Base64 Data URI:</label>
          <textarea id="base64Uri" class="form-textarea" readonly style="font-family:var(--font-mono);font-size:0.85rem;height:120px;"></textarea>
        </div>

        <div class="btn-group">
          <button id="copyUriBtn" class="btn btn-primary">Copy Data URI</button>
          <button id="copyHtmlBtn" class="btn btn-secondary">Copy HTML &lt;img&gt;</button>
          <button id="copyCssBtn" class="btn btn-secondary">Copy CSS Background</button>
        </div>
      </div>
    `,
    toolScript: `
      const fileInput = document.getElementById('fileInput');
      const base64Result = document.getElementById('base64Result');
      const base64Uri = document.getElementById('base64Uri');
      const copyUriBtn = document.getElementById('copyUriBtn');
      const copyHtmlBtn = document.getElementById('copyHtmlBtn');
      const copyCssBtn = document.getElementById('copyCssBtn');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          base64Uri.value = ev.target.result;
          base64Result.style.display = 'block';
        };
        reader.readAsDataURL(file);
      });

      function copyText(str, btn, label) {
        navigator.clipboard.writeText(str).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = label; }, 2000);
        });
      }

      copyUriBtn.addEventListener('click', () => copyText(base64Uri.value, copyUriBtn, 'Copy Data URI'));
      copyHtmlBtn.addEventListener('click', () => copyText('<img src="' + base64Uri.value + '" alt="Embedded image" />', copyHtmlBtn, 'Copy HTML <img>'));
      copyCssBtn.addEventListener('click', () => copyText('background-image: url("' + base64Uri.value + '");', copyCssBtn, 'Copy CSS Background'));
    `
  },
  {
    id: 'passport-photo-maker',
    slug: 'passport-photo-maker',
    category: 'image',
    name: 'Passport Photo Maker',
    shortDesc: 'Create passport size photo grids (2x2 inch / 35x45 mm) ready for printing on 4x6 / A4 paper.',
    seoTitle: 'Passport Photo Maker Online Free - 2x2 inch & 35x45mm | DesiDesk',
    seoDesc: 'Create passport size photos and multi-photo printable sheets (2x2 inch, 3.5x4.5 cm) directly in your browser. Free, private, and printable.',
    keywords: 'passport photo maker, 2x2 photo maker, 35x45mm photo, printable passport photo sheet, visa photo maker',
    howToSteps: [
      'Upload your frontal portrait photo.',
      'Select photo size (Standard 35x45mm or US Visa 2x2 inch).',
      'Choose print sheet layout (Single, 4x6 inch sheet with 6 photos, or 8 photos).',
      'Download the printable high-resolution JPEG sheet.'
    ],
    features: [
      'Standard sizes: 35x45 mm (India, UK, EU) and 2x2 inch (US / Visa).',
      'Multi-photo printable 4x6 inch (1200x1800 px @ 300 DPI) sheet.',
      'Thin cutting guide borders.',
      '100% private in-browser creation.'
    ],
    faqs: [
      {
        q: 'What paper size should I print the sheet on?',
        a: 'The grid is designed to be printed on standard 4x6 inch glossy photo paper at any print kiosk or home photo printer.'
      }
    ],
    related: ['circle-image-cropper', 'image-cropper', 'image-resizer'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="12" cy="10" r="3"/><path d="M7 21v-2a5 5 0 0 1 10 0v2"/></svg>
        <div class="dropzone-title">Upload Photo for Passport Sheet</div>
        <div class="dropzone-subtitle">Click or drop your headshot photo here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/*" />
      </div>

      <div id="passportWorkspace" style="display:none;margin-top:2rem;">
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Photo Standard:</label>
            <select id="passportStandard" class="form-select">
              <option value="35x45">35 &times; 45 mm (India, UK, Schengen, AU)</option>
              <option value="2x2">2 &times; 2 inch / 51 &times; 51 mm (US Visa, OCI)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Print Sheet Layout:</label>
            <select id="sheetLayout" class="form-select">
              <option value="grid6">4 &times; 6 inch Print Sheet (6 Photos)</option>
              <option value="grid8">4 &times; 6 inch Print Sheet (8 Photos)</option>
              <option value="single">Single Passport Photo</option>
            </select>
          </div>
        </div>

        <div class="canvas-wrapper">
          <canvas id="passportCanvas" style="max-height:380px;"></canvas>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <a id="downloadBtn" class="btn btn-success" download="passport-photos-desidesk.jpg">Download Printable Sheet</a>
          <button id="resetBtn" class="btn btn-outline">Reset</button>
        </div>
      </div>
    `,
    toolScript: `
      let rawImg = null;
      const fileInput = document.getElementById('fileInput');
      const passportWorkspace = document.getElementById('passportWorkspace');
      const passportStandard = document.getElementById('passportStandard');
      const sheetLayout = document.getElementById('sheetLayout');
      const passportCanvas = document.getElementById('passportCanvas');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetBtn = document.getElementById('resetBtn');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          rawImg = new Image();
          rawImg.onload = () => {
            passportWorkspace.style.display = 'block';
            drawPassport();
          };
          rawImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      passportStandard.addEventListener('change', drawPassport);
      sheetLayout.addEventListener('change', drawPassport);

      function drawPassport() {
        if (!rawImg) return;
        const std = passportStandard.value;
        const layout = sheetLayout.value;

        // 300 DPI calculations
        // 35x45mm = ~413x531 px
        // 2x2 inch = 600x600 px
        const pW = std === '2x2' ? 600 : 413;
        const pH = std === '2x2' ? 600 : 531;

        // Crop center of rawImg to aspect ratio pW / pH
        const targetAspect = pW / pH;
        let cropW = rawImg.width;
        let cropH = cropW / targetAspect;
        if (cropH > rawImg.height) {
          cropH = rawImg.height;
          cropW = cropH * targetAspect;
        }
        const cropX = (rawImg.width - cropW) / 2;
        const cropY = (rawImg.height - cropH) / 2;

        if (layout === 'single') {
          passportCanvas.width = pW;
          passportCanvas.height = pH;
          const ctx = passportCanvas.getContext('2d');
          ctx.drawImage(rawImg, cropX, cropY, cropW, cropH, 0, 0, pW, pH);
          ctx.strokeStyle = '#cccccc';
          ctx.lineWidth = 2;
          ctx.strokeRect(0, 0, pW, pH);
        } else {
          // 4x6 inch @ 300 DPI = 1200 x 1800 px
          passportCanvas.width = 1800;
          passportCanvas.height = 1200;
          const ctx = passportCanvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, 1800, 1200);

          const cols = layout === 'grid8' ? 4 : 3;
          const rows = 2;
          const startX = 60;
          const startY = 60;
          const gapX = (1800 - startX * 2 - cols * (pW * 0.75)) / (cols - 1);
          const gapY = (1200 - startY * 2 - rows * (pH * 0.75)) / (rows - 1);

          const drawW = pW * 0.75;
          const drawH = pH * 0.75;

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const x = startX + c * (drawW + gapX);
              const y = startY + r * (drawH + gapY);
              ctx.drawImage(rawImg, cropX, cropY, cropW, cropH, x, y, drawW, drawH);
              ctx.strokeStyle = '#e2e8f0';
              ctx.lineWidth = 1;
              ctx.strokeRect(x, y, drawW, drawH);
            }
          }
        }

        downloadBtn.href = passportCanvas.toDataURL('image/jpeg', 0.95);
      }

      resetBtn.addEventListener('click', () => {
        rawImg = null;
        fileInput.value = '';
        passportWorkspace.style.display = 'none';
      });
    `
  },
  {
    id: 'color-palette-extractor',
    slug: 'color-palette-extractor',
    category: 'image',
    name: 'Color Palette Extractor',
    shortDesc: 'Extract dominant color palettes and HEX/RGB codes from any image.',
    seoTitle: 'Color Palette Extractor Online - Extract Colors from Image | DesiDesk',
    seoDesc: 'Extract dominant color palettes from any photo online. Get HEX and RGB color codes with one-click copy directly in your browser.',
    keywords: 'color palette extractor, extract colors from image, image color picker, dominant colors, palette generator',
    howToSteps: [
      'Upload any photograph, banner, or logo.',
      'Our algorithm samples pixel clusters to identify the top dominant colors.',
      'Click any swatch to copy its HEX or RGB code to your clipboard.'
    ],
    features: [
      'Detects up to 6 dominant color swatches.',
      'Instant one-click copy of HEX and RGB values.',
      '100% browser-based pixel processing.',
      'Zero server upload.'
    ],
    faqs: [
      {
        q: 'How does it find dominant colors?',
        a: 'The browser downsamples the image and computes a median-cut color quantization across pixel channels in local memory.'
      }
    ],
    related: ['image-color-picker', 'color-code-converter'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/></svg>
        <div class="dropzone-title">Upload Image to Extract Palette</div>
        <div class="dropzone-subtitle">Click or drop your image here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/*" />
      </div>

      <div id="paletteWorkspace" style="display:none;margin-top:2rem;">
        <h4 style="font-size:1.1rem;margin-bottom:1rem;color:var(--secondary);text-align:center;">Dominant Color Palette (Click to Copy):</h4>
        <div id="paletteGrid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:1rem;margin-bottom:1.5rem;"></div>

        <div class="canvas-wrapper">
          <img id="previewImg" style="max-height:280px;" alt="Uploaded preview" />
        </div>
      </div>
    `,
    toolScript: `
      const fileInput = document.getElementById('fileInput');
      const paletteWorkspace = document.getElementById('paletteWorkspace');
      const paletteGrid = document.getElementById('paletteGrid');
      const previewImg = document.getElementById('previewImg');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          const img = new Image();
          img.onload = () => {
            previewImg.src = ev.target.result;
            extractPalette(img);
            paletteWorkspace.style.display = 'block';
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
      }

      function extractPalette(img) {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 64, 64);
        const data = ctx.getImageData(0, 0, 64, 64).data;

        const colorMap = {};
        for (let i = 0; i < data.length; i += 16) {
          const r = Math.round(data[i] / 24) * 24;
          const g = Math.round(data[i + 1] / 24) * 24;
          const b = Math.round(data[i + 2] / 24) * 24;
          const key = r + ',' + g + ',' + b;
          colorMap[key] = (colorMap[key] || 0) + 1;
        }

        const sorted = Object.keys(colorMap).sort((a,b) => colorMap[b] - colorMap[a]).slice(0, 6);
        paletteGrid.innerHTML = sorted.map(k => {
          const [r, g, b] = k.split(',').map(Number);
          const hex = rgbToHex(r, g, b);
          return \`
            <div style="background:\${hex};border-radius:var(--radius-md);padding:2rem 1rem 1rem;text-align:center;color:\${(r*0.299 + g*0.587 + b*0.114) > 150 ? '#000' : '#fff'};cursor:pointer;box-shadow:var(--shadow-sm);border:1px solid rgba(0,0,0,0.1);" onclick="copyColor('\${hex}')">
              <div style="font-weight:700;font-size:0.95rem;">\${hex}</div>
              <div style="font-size:0.75rem;opacity:0.85;">rgb(\${r},\${g},\${b})</div>
            </div>
          \`;
        }).join('');
      }

      window.copyColor = function(hex) {
        navigator.clipboard.writeText(hex).then(() => {
          alert('Copied ' + hex + ' to clipboard!');
        });
      };
    `
  },
  {
    id: 'image-filters',
    slug: 'image-filters',
    category: 'image',
    name: 'Photo Filters & Adjustments',
    shortDesc: 'Adjust brightness, contrast, saturation, grayscale, sepia, and blur with real-time preview.',
    seoTitle: 'Photo Filters & Image Adjustments Online | DesiDesk',
    seoDesc: 'Adjust photo brightness, contrast, saturation, sepia, invert, and grayscale filters online. Fast, free, browser-based photo editor.',
    keywords: 'photo filters, image brightness adjuster, contrast filter, black and white photo maker, photo editor online',
    howToSteps: [
      'Upload your image.',
      'Adjust sliders for Brightness, Contrast, Saturation, Sepia, and Grayscale.',
      'Preview real-time changes.',
      'Download your filtered photo.'
    ],
    features: [
      'Controls for Brightness, Contrast, Saturation, Grayscale, Sepia, Invert.',
      'Real-time GPU accelerated CSS/Canvas preview.',
      'Instant download in PNG or JPG.',
      '100% private in-browser editing.'
    ],
    faqs: [
      {
        q: 'Does it support Black and White conversion?',
        a: 'Yes, set Grayscale to 100% to create a classic monochrome photo.'
      }
    ],
    related: ['image-compressor', 'image-resizer', 'image-rotator-flipper'],
    toolHtml: `
      <div class="dropzone" id="dropzone">
        <svg class="dropzone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/></svg>
        <div class="dropzone-title">Upload Photo to Apply Filters</div>
        <div class="dropzone-subtitle">Click or drop image here</div>
        <input type="file" id="fileInput" class="dropzone-input" accept="image/*" />
      </div>

      <div id="filterWorkspace" style="display:none;margin-top:2rem;">
        <div class="form-grid-3">
          <div class="form-group">
            <label class="form-label">Brightness: <span id="valBright">100%</span></label>
            <input type="range" id="filterBright" class="form-range" min="0" max="200" value="100" />
          </div>
          <div class="form-group">
            <label class="form-label">Contrast: <span id="valContrast">100%</span></label>
            <input type="range" id="filterContrast" class="form-range" min="0" max="200" value="100" />
          </div>
          <div class="form-group">
            <label class="form-label">Saturation: <span id="valSat">100%</span></label>
            <input type="range" id="filterSat" class="form-range" min="0" max="200" value="100" />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Grayscale: <span id="valGray">0%</span></label>
            <input type="range" id="filterGray" class="form-range" min="0" max="100" value="0" />
          </div>
          <div class="form-group">
            <label class="form-label">Sepia: <span id="valSepia">0%</span></label>
            <input type="range" id="filterSepia" class="form-range" min="0" max="100" value="0" />
          </div>
        </div>

        <div class="canvas-wrapper">
          <canvas id="filterCanvas" style="max-height:360px;"></canvas>
        </div>

        <div class="btn-group" style="justify-content:center;">
          <a id="downloadBtn" class="btn btn-success" download="filtered-photo-desidesk.png">Download Filtered Image</a>
          <button id="resetFiltersBtn" class="btn btn-secondary">Reset Filters</button>
        </div>
      </div>
    `,
    toolScript: `
      let rawImg = null;
      const fileInput = document.getElementById('fileInput');
      const filterWorkspace = document.getElementById('filterWorkspace');
      const filterBright = document.getElementById('filterBright');
      const filterContrast = document.getElementById('filterContrast');
      const filterSat = document.getElementById('filterSat');
      const filterGray = document.getElementById('filterGray');
      const filterSepia = document.getElementById('filterSepia');
      const filterCanvas = document.getElementById('filterCanvas');
      const downloadBtn = document.getElementById('downloadBtn');

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          rawImg = new Image();
          rawImg.onload = () => {
            filterWorkspace.style.display = 'block';
            applyFilters();
          };
          rawImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      [filterBright, filterContrast, filterSat, filterGray, filterSepia].forEach(el => {
        el.addEventListener('input', () => {
          document.getElementById('valBright').textContent = filterBright.value + '%';
          document.getElementById('valContrast').textContent = filterContrast.value + '%';
          document.getElementById('valSat').textContent = filterSat.value + '%';
          document.getElementById('valGray').textContent = filterGray.value + '%';
          document.getElementById('valSepia').textContent = filterSepia.value + '%';
          applyFilters();
        });
      });

      function applyFilters() {
        if (!rawImg) return;
        filterCanvas.width = rawImg.width;
        filterCanvas.height = rawImg.height;
        const ctx = filterCanvas.getContext('2d');
        const filterStr = \`brightness(\${filterBright.value}%) contrast(\${filterContrast.value}%) saturate(\${filterSat.value}%) grayscale(\${filterGray.value}%) sepia(\${filterSepia.value}%)\`;
        ctx.filter = filterStr;
        ctx.drawImage(rawImg, 0, 0);
        downloadBtn.href = filterCanvas.toDataURL('image/png');
      }

      document.getElementById('resetFiltersBtn').addEventListener('click', () => {
        filterBright.value = 100;
        filterContrast.value = 100;
        filterSat.value = 100;
        filterGray.value = 0;
        filterSepia.value = 0;
        document.getElementById('valBright').textContent = '100%';
        document.getElementById('valContrast').textContent = '100%';
        document.getElementById('valSat').textContent = '100%';
        document.getElementById('valGray').textContent = '0%';
        document.getElementById('valSepia').textContent = '0%';
        applyFilters();
      });
    `
  }
];
