import fs from 'fs';

const urls = [
  'https://www.socinga.africa/about/tsekane-tshabalala',
  'https://www.socinga.africa/about/jabulile-dladla',
  'https://www.socinga.africa/about/whitemore-ngwira',
  'https://www.socinga.africa/about/michael-dotsey',
  'https://www.socinga.africa/about/sondia-viljoen',
  'https://www.socinga.africa/about/olwethu-mlokoti',
  'https://www.socinga.africa/about/patience-ngwira',
  'https://www.socinga.africa/about/bongiwe-selane',
  'https://www.socinga.africa/about/david-papenfus',
  'https://www.socinga.africa/about/shingirai-muyenda',
  'https://www.socinga.africa/about/thea-aboud'
];

async function run() {
  const data = [];
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      
      const titleMatch = html.match(/<title>(.*?) — (.*?) \|/);
      let name = titleMatch ? titleMatch[1] : '';
      let title = titleMatch ? titleMatch[2] : '';
      
      // Look for the first paragraph in the executive profile section.
      // Often it follows a heading with their name.
      // Let's use a non-greedy regex to find the first paragraph after "Executive Profile"
      const execProfileMatch = html.match(/Executive Profile.*?<p[^>]*>(.*?)<\/p>/is);
      let bio = execProfileMatch ? execProfileMatch[1].replace(/<[^>]*>?/gm, '') : '';
      
      const slug = url.split('/').pop();
      const photoUrl = `https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/2026/04/staff/${slug}.jpg`;
      
      data.push({ name, title, bio, photoUrl, slug });
    } catch (e) {
      console.error(e);
    }
  }
  fs.writeFileSync('bios.json', JSON.stringify(data, null, 2));
}

run();
