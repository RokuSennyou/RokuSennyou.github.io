import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks"; 

import BackgroundStars from "@/components/BackgroundStars";
import PostAnimationWrapper from "@/components/PostAnimationWrapper";

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

      <div className="py-16 px-4">
        <PostAnimationWrapper>
          <div className="w-full max-w-4xl mx-auto bg-[#1a1f2e]/90 rounded-2xl border border-white/10 p-12 shadow-2xl">
            {/* 標題 */}
            <h1 className="text-4xl font-bold mb-2">{postData.title}</h1>
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
              className="max-w-none text-gray-100 leading-relaxed
                         [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-4 [&_h1]:mt-6
                         [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mb-3 [&_h2]:mt-5
                         [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-white [&_h3]:mb-2 [&_h3]:mt-4
                         [&_h4]:text-base [&_h4]:font-medium [&_h4]:text-white [&_h4]:mb-2 [&_h4]:mt-3
                         [&_h5]:text-sm [&_h5]:font-medium [&_h5]:text-white [&_h5]:mb-1 [&_h5]:mt-3
                         [&_h6]:text-sm [&_h6]:font-medium [&_h6]:text-gray-300 [&_h6]:mb-1 [&_h6]:mt-3
                         [&_p]:mb-4 [&_p]:text-gray-200
                         [&_strong]:font-bold [&_strong]:text-white
                         [&_em]:italic [&_em]:text-gray-300
                         [&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc
                         [&_ol]:mb-4 [&_ol]:ml-6 [&_ol]:list-decimal
                         [&_li]:mb-1 [&_li]:text-gray-200
                         [&_blockquote]:border-l-4 [&_blockquote]:border-sky-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-300 [&_blockquote]:mb-4
                         [&_code]:bg-gray-800 [&_code]:text-sky-300 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
                         [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4
                         [&_a]:text-sky-400 [&_a]:no-underline hover:[&_a]:underline hover:[&_a]:text-sky-300
                         [&_hr]:border-gray-600 [&_hr]:my-6
                         [&_img]:rounded-lg [&_img]:max-w-full [&_img]:h-auto"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />

            <div className="mt-12">
              <a href="/" className="text-sky-400 hover:text-sky-300">
                ← 回首頁
              </a>
            </div>
          </div>
        </PostAnimationWrapper>
      </div>
    </div>
  );
}