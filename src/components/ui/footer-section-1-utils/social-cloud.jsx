import React from "react";
import { motion } from "framer-motion";
import InstagramIcon from "../../InstagramIcon";
import MailSendIcon from "../../MailSendIcon";
import PhoneIcon from "../../PhoneIcon";

const socialItems = [
  {
    name: "Instagram",
    icon: InstagramIcon,
    href: "https://instagram.com/veloxa.ai",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    name: "Email",
    icon: MailSendIcon,
    href: "mailto:hello@veloxa.ai",
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
  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      {socialItems.map((social) => {
        const IconComponent = social.icon;
        return (
          <motion.a
            key={social.name}
            href={social.href}
            target={social.target}
            rel={social.rel}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-3.5 rounded-full bg-white/5 hover:bg-lime/10 border border-white/10 hover:border-lime/50 text-gray-300 hover:text-lime transition-all duration-300 shadow-md group flex items-center justify-center"
            aria-label={social.name}
            title={social.name}
          >
            <IconComponent size={22} className="group-hover:text-lime transition-colors" />
          </motion.a>
        );
      })}
    </div>
  );
}

export default SocialCloud;
