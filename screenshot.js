const { chromium } = require('playwright');

(async () => {
  // Start the server
  const { spawn } = require('child_process');
  const server = spawn('npm', ['run', 'start'], {
    cwd: __dirname,
    stdio: 'inherit'
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 10000));

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Homepage
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: '/tmp/homepage.png', fullPage: true });
  console.log('Screenshot saved: /tmp/homepage.png');
  
  // Work page
  await page.goto('http://localhost:3000/work');
  await page.screenshot({ path: '/tmp/work-page.png', fullPage: true });
  console.log('Screenshot saved: /tmp/work-page.png');
  
  // About page  
  await page.goto('http://localhost:3000/about');
  await page.screenshot({ path: '/tmp/about-page.png', fullPage: true });
  console.log('Screenshot saved: /tmp/about-page.png');
  
  await browser.close();
  server.kill();
  process.exit(0);
})();
