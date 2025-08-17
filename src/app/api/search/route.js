import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (!query || query.trim().length === 0) {
    return NextResponse.json([]);
  }

  try {
    const postsDirectory = path.join(process.cwd(), "posts");
    
    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json([]);
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    const markdownFiles = fileNames.filter(name => name.endsWith('.md') || name.endsWith('.mdx'));
    
    const searchResults = [];
    const searchTerm = query.toLowerCase().trim();
    
    for (const fileName of markdownFiles) {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      try {
        const { data, content } = matter(fileContents);
        
        const titleMatch = data.title && data.title.toLowerCase().includes(searchTerm);
        
        const contentMatch = content.toLowerCase().includes(searchTerm);
        
        const tagExactMatch = data.tags && data.tags.some(tag => 
          tag.toLowerCase() === searchTerm
        );
        const tagPartialMatch = data.tags && data.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm)
        );
        
        if (titleMatch || contentMatch || tagExactMatch || tagPartialMatch) {
          let snippet = '';
          if (contentMatch) {
            const contentIndex = content.toLowerCase().indexOf(searchTerm);
            const start = Math.max(0, contentIndex - 50);
            const end = Math.min(content.length, contentIndex + searchTerm.length + 50);
            snippet = content.slice(start, end).trim();
            if (start > 0) snippet = '...' + snippet;
            if (end < content.length) snippet = snippet + '...';
          }
          
          const slug = fileName.replace(/\.mdx?$/, '');
          
          let matchType = 'content';
          if (titleMatch) matchType = 'title';
          else if (tagExactMatch) matchType = 'tag-exact';
          else if (tagPartialMatch) matchType = 'tag';
          
          searchResults.push({
            id: slug,
            title: data.title || fileName,
            summary: data.summary || '',
            snippet: snippet,
            date: data.date,
            tags: data.tags || [],
            url: `/posts/${slug}`,
            matchType: matchType
          });
        }
      } catch (error) {
        console.error(`Error parsing ${fileName}:`, error);
      }
    }
    
    searchResults.sort((a, b) => {
      const order = { title: 0, 'tag-exact': 1, tag: 2, content: 3 };
      return order[a.matchType] - order[b.matchType];
    });
    
    return NextResponse.json(searchResults.slice(0, 10));
    
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json([], { status: 500 });
  }
}