const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/snap/bin/opera',
    headless: false,
  }); // Launch a browser with a visible window

  const page = await browser.newPage();

  await page.goto('https://example.com/');

  // Scroll to the top of the page
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });

  // Slow down scrolling
  await page.evaluate(() => {
    const scrollInterval = setInterval(() => {
      window.scrollBy(0, 10); // Scroll down by 10 pixels
      if (window.scrollY >= document.body.scrollHeight - window.innerHeight) {
        clearInterval(scrollInterval); // Stop scrolling at the bottom
      }
    }, 100); // Scroll every 100 milliseconds
  });

  await new Promise((resolve) => setTimeout(resolve, 20000)); // Wait for 20 seconds

  const lastBlogPostLink = await page.$(
    'h2.blog-entry-title a:last-child, h2.entry-title a:last-child'
  );
  if (lastBlogPostLink) {
    await lastBlogPostLink.click();

    await new Promise((resolve) => setTimeout(resolve, 20000)); // Wait for 20 seconds

    // Scroll within the blog post content
    await page.evaluate(() => {
      const scrollInterval = setInterval(() => {
        window.scrollBy(0, 10); // Scroll down by 10 pixels
        if (window.scrollY >= document.body.scrollHeight - window.innerHeight) {
          clearInterval(scrollInterval); // Stop scrolling at the bottom
        }
      }, 100); // Scroll every 100 milliseconds
    });

    await new Promise((resolve) => setTimeout(resolve, 20000)); // Wait for 20 seconds
  } else {
    console.log('Last blog post link not found.');
  }

  await new Promise((resolve) => setTimeout(resolve, 20000)); // Wait for 20 seconds

  // Keep the browser window open for preview
  // Comment out the following line if you want to close the browser automatically
  await browser.close();
})();
