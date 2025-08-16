// src/app/api/search/route.js
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
        
        // 檢查標題是否符合
        const titleMatch = data.title && data.title.toLowerCase().includes(searchTerm);
        
        // 檢查內容是否符合
        const contentMatch = content.toLowerCase().includes(searchTerm);
        
        // 檢查標籤是否符合
        const tagMatch = data.tags && data.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm)
        );
        
        if (titleMatch || contentMatch || tagMatch) {
          // 提取符合的內容片段
          let snippet = '';
          if (contentMatch) {
            const contentIndex = content.toLowerCase().indexOf(searchTerm);
            const start = Math.max(0, contentIndex - 50);
            const end = Math.min(content.length, contentIndex + searchTerm.length + 50);
            snippet = content.slice(start, end).trim();
            if (start > 0) snippet = '...' + snippet;
            if (end < content.length) snippet = snippet + '...';
          }
          
          // 建立文章 slug (從檔名)
          const slug = fileName.replace(/\.mdx?$/, '');
          
          searchResults.push({
            id: slug,
            title: data.title || fileName,
            summary: data.summary || '',
            snippet: snippet,
            date: data.date,
            tags: data.tags || [],
            url: `/blog/${slug}`, // 根據你的路由結構調整
            matchType: titleMatch ? 'title' : (tagMatch ? 'tag' : 'content')
          });
        }
      } catch (error) {
        console.error(`Error parsing ${fileName}:`, error);
      }
    }
    
    // 按相關性排序：標題匹配 > 標籤匹配 > 內容匹配
    searchResults.sort((a, b) => {
      const order = { title: 0, tag: 1, content: 2 };
      return order[a.matchType] - order[b.matchType];
    });
    
    // 限制結果數量
    return NextResponse.json(searchResults.slice(0, 10));
    
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json([], { status: 500 });
  }
}