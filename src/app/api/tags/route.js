import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), "posts");
    
    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json([]);
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    const markdownFiles = fileNames.filter(name => name.endsWith('.md') || name.endsWith('.mdx'));
    
    const tagsSet = new Set();
    
    for (const fileName of markdownFiles) {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      try {
        const { data } = matter(fileContents);
        
        console.log(`Processing ${fileName}:`, data); // Debug
        
        if (data.tags && Array.isArray(data.tags)) {
          data.tags.forEach(tag => {
            if (tag && typeof tag === 'string') {
              tagsSet.add(tag.trim());
            }
          });
        }
      } catch (error) {
        console.error(`Error parsing ${fileName}:`, error);
      }
    }
    
    console.log('Final tags:', Array.from(tagsSet)); // Debug
    
    const uniqueTags = Array.from(tagsSet).sort();
    
    return NextResponse.json(uniqueTags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json([], { status: 500 });
  }
}