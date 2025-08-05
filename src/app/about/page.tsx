export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#181e33] flex justify-center items-start py-8">
  <div className="w-full max-w-4xl bg-[#1a1f2e] rounded-2xl shadow-xl border border-white/10 p-10 min-h-[700px]">
    {/* 標題 */}
    <h1 className="text-3xl font-bold mb-2">Hi, I'm Roku Sennyou</h1>
    <p className="text-gray-400 mb-6">
      測試測試
    </p>
    {/* 一段 */}
    <h2 className="font-bold text-xl mb-3">一個標題</h2>
    <p className="mb-8 text-gray-300">
      一段字
    </p>
    {/* 技能 */}
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-2">CS Skills</h3>
      <ul className="list-disc list-inside text-gray-200 space-y-1">
        <li>Programming
          <ul className="list-disc ml-6 text-gray-400">
            <li>Python</li>
            <li>C/C++</li>
            <li>HTML/CSS/JavaScript, React</li>
          </ul>
        </li>
        <li>Machine Learning</li>
        <li>Front-end UI/UX</li>
      </ul>
    </div>
    {/* 興趣 */}
    <div>
      <h3 className="text-lg font-bold mb-2">阿咧</h3>
      <p className="text-gray-400">阿咧</p>
    </div>
  </div>
</div>

  );
}
