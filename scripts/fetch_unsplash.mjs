import fs from 'fs';
import path from 'path';

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error('Missing UNSPLASH_ACCESS_KEY env var');
  process.exit(1);
}

const outDir = (sub) => path.join(process.cwd(), 'public', sub);
const ensure = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const mappings = {
  services: [
    { q: 'product engineering', name: 'service-1.jpg' },
    { q: 'ecommerce website', name: 'service-2.jpg' },
    { q: 'platform modernization', name: 'service-3.jpg' },
    { q: 'artificial intelligence integration', name: 'service-4.jpg' },
    { q: 'performance optimization', name: 'service-5.jpg' },
    { q: 'scalable architecture', name: 'service-6.jpg' },
    { q: 'devops ci cd', name: 'service-7.jpg' },
    { q: 'cybersecurity', name: 'service-8.jpg' },
  ],
  projects: [
    { q: 'business website', name: 'project-1.jpg' },
    { q: 'startup product', name: 'project-2.jpg' },
    { q: 'design team', name: 'project-3.jpg' },
  ],
  blog: [
    { q: 'machine learning', name: 'blog-1.jpg' },
    { q: 'cloud computing', name: 'blog-2.jpg' },
    { q: 'nextjs', name: 'blog-3.jpg' },
    { q: 'nodejs', name: 'blog-4.jpg' },
    { q: 'react performance', name: 'blog-5.jpg' },
    { q: 'ecommerce shopify', name: 'blog-6.jpg' },
  ],
};

const fetchJson = async (url) => {
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });
  if (!res.ok) throw new Error(`Unsplash API error ${res.status}`);
  return res.json();
};

const download = async (url, dest) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image download failed ${res.status}`);
  // Node's fetch returns a Web ReadableStream; use arrayBuffer then write
  const ab = await res.arrayBuffer();
  await fs.promises.writeFile(dest, Buffer.from(ab));
};

const runGroup = async (groupName, list) => {
  const dir = outDir(groupName);
  ensure(dir);
  console.log(`Fetching ${list.length} images for ${groupName} -> ${dir}`);
  for (const item of list) {
    try {
      const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(item.q)}&orientation=landscape&content_filter=high`;
      const data = await fetchJson(url);
      // prefer raw with params
      const raw =
        data.urls && (data.urls.raw || data.urls.full || data.urls.regular);
      const downloadUrl =
        raw + (raw.includes('?') ? '&' : '?') + 'w=1200&h=800&fit=crop&fm=jpg';
      const dest = path.join(dir, item.name);
      console.log(`  - ${item.q} -> ${item.name}`);
      await download(downloadUrl, dest);
    } catch (err) {
      console.error('  !', item.q, err.message);
    }
  }
};

const main = async () => {
  await runGroup('services', mappings.services);
  await runGroup('projects', mappings.projects);
  await runGroup('blog', mappings.blog);
  console.log('Done');
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
