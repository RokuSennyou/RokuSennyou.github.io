import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

type PostMeta = {
  title: string;
  date: string;
  tags?: string[];
};

async function getPostData(id: string): Promise<PostMeta & { id: string; contentHtml: string }> {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as PostMeta), 
  };
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

  return (
    <main className="max-w-2xl mx-auto p-8 text-left">
      <h1 className="text-3xl font-bold mb-2">{postData.title}</h1>
      <div className="mb-4 text-gray-400 text-sm">{postData.date}</div>
      <div className="mb-6 flex gap-2">
        {postData.tags?.map((tag: string) => (
          <span key={tag} className="bg-[#373e5b] text-xs text-blue-300 rounded px-2 py-1">#{tag}</span>
        ))}
      </div>
      <article
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
      <div className="mt-12">
        <a href="/" className="text-blue-400 hover:underline">← 回首頁</a>
      </div>
    </main>
  );
}
