import BackgroundStars from "@/components/BackgroundStars";
export default function AboutPage() {
  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-[#181e33] via-[#232952] to-[#3d1f56] relative overflow-hidden">
    <BackgroundStars/>
    <div className="flex justify-center items-start py-16 min-h-screen relative z-10">
    <div className="w-full max-w-4xl bg-[#1a1f2e]/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-12 min-h-[700px]">
        {/* 標題 */}
        <h1 className="text-3xl font-bold mb-2">Hi, I'm Roku!</h1>
        <p className="text-gray-400 mb-6">
          一個甚麼都想摸一點的人，希望可以繼續進步 ((꜆꜄꜆ ˙꒳˙)꜆꜄꜆ｵﾗｵﾗｵﾗｵﾗ
        </p>
        {/* 一段 */}
        <h2 className="font-bold text-xl mb-3">關於我</h2>
        <p className="mb-8 text-gray-300">
        你好，我是 Roku ，目前於臺師大資工系在學中！<br />
        <a
          href="https://www.youtube.com/@officialhigedandism"
          className="text-sky-400 underline hover:text-sky-300 transition"
          target="_blank"
          rel="noopener noreferrer"
        >Official髭男dism </a>
        的忠實粉絲，夢想是聽到之後的每場演唱會<br />
        プロセカ與明日方舟玩家，被這些遊戲綁架<br />
        偶爾畫點小圖和彈點吉他🎸，也喜歡密室逃脫跟劇本殺！
        </p>
        {/* 技能 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-2">CS Skills</h3>

          {/* Programming */}
          <div className="mt-4">
            <span className="font-bold text-white">Programming</span>
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>Python</li>
              <li>C/C++</li>
              <li>JavaScript / TypeScript</li>
              <li>HTML / CSS</li>
            </ul>
          </div>

          {/* Frontend */}
          <div className="mt-4">
            <span className="font-bold text-white">Frontend</span>
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>React</li>
              <li>Next.js</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          {/* Backend & Database */}
          <div className="mt-4">
            <span className="font-bold text-white">Backend & Database</span>
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>Django</li>
              <li>Flask</li>
              <li>MySQL</li>
            </ul>
          </div>

          {/* Tools */}
          <div className="mt-4">
            <span className="font-bold text-white">Tools</span>
            <ul className="list-disc ml-6 text-gray-300 space-y-1">
              <li>Git</li>
              <li>Linux</li>
            </ul>
          </div>
        </div>
        {/* 經歷 */}
        <div className="mb-8">
        <h3 className="text-lg font-bold mb-2">求學經歷</h3>
        <ul className="list-disc ml-6 text-gray-300 space-y-1">
            <li>國立臺灣師範大學 資訊工程學系</li>
            <li>市立臺中女子高級中等學校</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">其他經歷</h3>
        <ul className="list-disc ml-6 text-gray-300 space-y-1">
            <li>...</li>
        </ul>
      </div>

  </div>
  </div>
</div>

  );
}
