const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Read the SVG file
  const svgPath = path.join(__dirname, '..', 'public', 'icon.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf8');

  // Create an HTML page with the SVG
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
          }
          svg {
            display: block;
          }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
    </html>
  `;

  await page.setContent(html);

  // Generate 192x192 icon
  await page.setViewportSize({ width: 192, height: 192 });
  await page.screenshot({
    path: path.join(__dirname, '..', 'public', 'icon-192.png'),
    omitBackground: false,
  });
  console.log('✓ Generated icon-192.png');

  // Generate 512x512 icon
  await page.setViewportSize({ width: 512, height: 512 });
  await page.screenshot({
    path: path.join(__dirname, '..', 'public', 'icon-512.png'),
    omitBackground: false,
  });
  console.log('✓ Generated icon-512.png');

  // Generate apple touch icon (180x180)
  await page.setViewportSize({ width: 180, height: 180 });
  await page.screenshot({
    path: path.join(__dirname, '..', 'public', 'apple-touch-icon.png'),
    omitBackground: false,
  });
  console.log('✓ Generated apple-touch-icon.png');

  await browser.close();
  console.log('\n✅ All icons generated successfully!');
}

generateIcons().catch(console.error);
