import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks"; 

import BackgroundStars from "@/components/BackgroundStars";

type PostMeta = {
  title: string;
  date: string;
  tags?: string[];
};

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((name) => ({
    id: name.replace(/\.md$/, ""),
  }));
}

async function getPostData(
  id: string
): Promise<PostMeta & { id: string; contentHtml: string }> {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkGfm)   
    .use(remarkBreaks)
    .use(html)
    .process(matterResult.content);

  return {
    id,
    contentHtml: processedContent.toString(),
    ...(matterResult.data as PostMeta),
  };
}

export default async function PostPage({
  params,
}: {
  params: { id: string }; 
}) {
  const { id } = params;
  const postData = await getPostData(id);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#181e33] via-[#232952] to-[#3d1f56] relative overflow-hidden">
      <BackgroundStars/>

      <div className="flex justify-center items-start py-16 min-h-screen">
        <div className="w-full max-w-4xl bg-[#1a1f2e]/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-12">
          {/* 標題 */}
          <h1 className="text-3xl font-bold mb-2">{postData.title}</h1>
          <div className="mb-4 text-gray-400 text-sm">{postData.date}</div>
          {postData.tags?.length ? (
            <div className="mb-6 flex flex-wrap gap-2">
              {postData.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-white/15 px-2 py-0.5 text-xs text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}

          {/* 內文 */}
          <article
            className="prose prose-invert prose-slate max-w-none
                       prose-headings:scroll-mt-24
                       prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline
                       prose-hr:border-white/10
                       prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />

          <div className="mt-12">
            <a href="/" className="text-sky-400 hover:text-sky-300">
              ← 回首頁
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
