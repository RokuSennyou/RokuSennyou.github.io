import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

export default function SocialBar() {
  const iconStyle =
    "w-7 h-7 text-gray-400 hover:text-white transition-colors duration-300";

  return (
    <div className="flex space-x-4">
      <a href="https://github.com/RokuSennyou" target="_blank" rel="noopener noreferrer">
        <FaGithub className={iconStyle} />
      </a>
      <a href="mailto:rokusenn.liao@gmail.com">
        <FiMail className={iconStyle} />
      </a>
    </div>
  );
}
