import fs from 'fs';

async function scrape() {
  const headers = { 'User-Agent': 'Mozilla/5.0' };
  
  try {
    const res = await fetch('https://www.socinga.africa/about', { headers });
    const html = await res.text();
    fs.writeFileSync('about.html', html);
    console.log('Saved about.html');
  } catch (e) {
    console.error(e);
  }
}
scrape();
