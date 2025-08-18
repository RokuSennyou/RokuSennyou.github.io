import ClientHome from "@/components/ClientHome";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getAllPostsData() {
  const postsDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".md"));
  const posts = files.map((f) => {
    const id = f.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDir, f), "utf8");
    const { data } = matter(raw);
    return {
      id,
      date: data.date || "",
      title: data.title || id,
      tags: data.tags || [],
      summary: data.summary || "",
    };
  });
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export default function Page() {
  const allPostsData = getAllPostsData();

  return <ClientHome allPostsData={allPostsData} />;
}