import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const records = files.map((filename) => {
  const id = filename.replace(/\.md$/, '');
  const full = path.join(postsDir, filename);
  const raw = fs.readFileSync(full, 'utf8');
  const { data, content } = matter(raw);

  return {
    id,
    title: data.title || id,
    date: data.date || '',
    tags: data.tags || [],
    summary: (data.summary || content.slice(0, 140)).replace(/\n+/g, ' '),
  };
});

const outDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

fs.writeFileSync(
  path.join(outDir, 'search.json'),
  JSON.stringify(records, null, 2),
  'utf8'
);

console.log(`Generated ${records.length} items -> public/search.json`);