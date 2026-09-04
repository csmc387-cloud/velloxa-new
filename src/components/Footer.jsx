"use client";
import React from "react";
import {
  Instagram,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

import footerIconLogo from "../assets/footer-icon-logo.png";
import footerBgLogo from "../assets/footer-bg-logo.png";

const Link = ({ href = "#", children, className, target, rel, ...props }) => (
  <a href={href} className={className} target={target} rel={rel} {...props}>
    {children}
  </a>
);

const defaultSocialLinks = [
  { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/velloxa.agency/?utm_source=ig_web_button_share_sheet", label: "Instagram" },
  { icon: <Mail className="w-5 h-5" />, href: "mailto:velloxa.agency@gmail.com", label: "Email" },
];

const defaultNavLinks = [];

export const Footer = ({
  brandName = "VELLOXA",
  brandDescription = "Building high-performance AI workflows, web platforms, and growth strategies for modern SMEs.",
  socialLinks = defaultSocialLinks,
  navLinks = defaultNavLinks,
  creatorName = "VELLOXA",
  creatorUrl = "#",
  brandIcon,
  className,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText("velloxa.agency@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-2xl mt-12 relative overflow-hidden safe-bottom">

        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[16rem] sm:min-h-[19rem] md:min-h-[21rem] relative p-4 py-6 sm:py-8 z-10">
          <div className="flex flex-col mb-4 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1 mb-2">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={footerIconLogo?.src || footerIconLogo}
                    alt="VELLOXA Logo"
                    width="150"
                    height="150"
                    loading="lazy"
                    decoding="async"
                    className="h-28 sm:h-36 md:h-44 w-auto object-contain mix-blend-screen hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-white font-semibold text-center w-full max-w-sm sm:w-96 px-4 sm:px-0 text-xs sm:text-sm">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-4 mt-2 gap-4">
                  {socialLinks.map((link, index) => {
                    const isEmail = link.label === "Email";
                    return (
                      <div key={index} className="relative">
                        <Link
                          href={link.href}
                          onClick={isEmail ? handleCopyEmail : undefined}
                          className="text-white hover:text-lime transition-colors"
                          target={isEmail ? undefined : "_blank"}
                          rel={isEmail ? undefined : "noopener noreferrer"}
                        >
                          <div className="w-5 h-5 hover:scale-110 transition-transform duration-300">
                            {link.icon}
                          </div>
                          <span className="sr-only">{link.label}</span>
                        </Link>
                        {isEmail && copied && (
                          <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-lime text-charcoal text-[10px] font-mono font-bold whitespace-nowrap shadow-lg">
                            Copied velloxa.agency@gmail.com!
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm font-medium text-gray-400 max-w-full px-4">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="hover:text-white duration-300 hover:font-semibold"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>


        </div>


      </footer>
    </section>
  );
};

export default Footer;
