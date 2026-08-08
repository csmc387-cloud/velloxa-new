import React from "react";
import { motion } from "framer-motion";
import InstagramIcon from "../../InstagramIcon";
import MailSendIcon from "../../MailSendIcon";
import PhoneIcon from "../../PhoneIcon";

const socialItems = [
  {
    name: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/velloxa.agency/?utm_source=ig_web_button_share_sheet",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    name: "Email",
    icon: MailSendIcon,
    href: "mailto:velloxa.agency@gmail.com",
    target: "_self",
    rel: "",
  },
  {
    name: "Phone 1",
    icon: PhoneIcon,
    href: "tel:+919266544745",
    target: "_self",
    rel: "",
  },
  {
    name: "Phone 2",
    icon: PhoneIcon,
    href: "tel:+919711886700",
    target: "_self",
    rel: "",
  },
];

export function SocialCloud({ className = "" }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    const email = "velloxa.agency@gmail.com";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      {socialItems.map((social) => {
        const IconComponent = social.icon;
        const isEmail = social.name === "Email";
        return (
          <div key={social.name} className="relative">
            <motion.a
              href={social.href}
              onClick={isEmail ? handleCopyEmail : undefined}
              target={isEmail ? undefined : social.target}
              rel={isEmail ? undefined : social.rel}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-3.5 rounded-full bg-white/5 hover:bg-lime/10 border border-white/10 hover:border-lime/50 text-gray-300 hover:text-lime transition-all duration-300 shadow-md group flex items-center justify-center"
              aria-label={social.name}
              title={isEmail ? "Click to copy velloxa.agency@gmail.com" : social.name}
            >
              <IconComponent size={22} className="group-hover:text-lime transition-colors" />
            </motion.a>
            {isEmail && copied && (
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-lime text-charcoal text-[10px] font-mono font-bold whitespace-nowrap shadow-lg">
                Copied velloxa.agency@gmail.com!
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SocialCloud;
