import { FaGithub, FaDiscord } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

export default function SocialBar() {
  const iconStyle =
    "w-6 h-6 sm:w-7 sm:h-7 text-gray-400 hover:text-white transition-colors duration-300";

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <a aria-label="GitHub" href="https://github.com/RokuSennyou" target="_blank" rel="noopener noreferrer">
        <FaGithub className={iconStyle} />
      </a>
      <a aria-label="Email" href="mailto:rokusenn.liao@gmail.com">
        <FiMail className={iconStyle} />
      </a>
      <a aria-label="Discord" href="https://discord.com/users/559677851830321155" target="_blank" rel="noopener noreferrer">
        <FaDiscord className={iconStyle} />
      </a>
    </div>
  );
}
