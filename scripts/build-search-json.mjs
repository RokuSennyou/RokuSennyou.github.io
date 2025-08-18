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

  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') 
    .replace(/`[^`]+`/g, '')        
    .replace(/!\[.*?\]\(.*?\)/g, '') 
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/#{1,6}\s+/g, '')      
    .replace(/\*\*(.*?)\*\*/g, '$1') 
    .replace(/\*(.*?)\*/g, '$1') 
    .replace(/\n+/g, ' ')        
    .replace(/\s+/g, ' ')          
    .trim();

  return {
    id,
    title: data.title || id,
    summary: data.summary || cleanContent.slice(0, 120) + (cleanContent.length > 120 ? '...' : ''),
    snippet: cleanContent.slice(0, 200) + (cleanContent.length > 200 ? '...' : ''),
    date: data.date || '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    url: `/posts/${id}`, 
    matchType: 'content' 
  };
});

const allTags = [...new Set(
  records.flatMap(record => record.tags).filter(Boolean)
)].sort();

const outDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outDir, 'search.json'),
  JSON.stringify(records, null, 2),
  'utf8'
);

fs.writeFileSync(
  path.join(outDir, 'tags.json'),
  JSON.stringify(allTags, null, 2),
  'utf8'
);

console.log(`Generated ${records.length} search items -> public/search.json`);
console.log(`Generated ${allTags.length} tags -> public/tags.json`);
console.log('Available tags:', allTags);