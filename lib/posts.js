import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const summary = matterResult.data.summary;

    // Ensure that date and title are always present in the returned data
    return {
        id,
        date: matterResult.data.date || '', // Provide a default empty string if date is missing
        title: matterResult.data.title || '', // Provide a default empty string if title is missing
        ...(matterResult.data.tags && { tags: matterResult.data.tags }), // Only include tags if it exists
        summary: summary || '', // Provide a default empty string if summary is missing
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
