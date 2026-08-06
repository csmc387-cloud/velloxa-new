"use client";
import React from "react";
import {
  Twitter,
  Instagram,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { FlickeringGrid } from "./ui/flickering-grid";

import footerIconLogo from "../assets/footer-icon-logo.png";
import footerBgLogo from "../assets/footer-bg-logo.png";

const Link = ({ href = "#", children, className, target, rel, ...props }) => (
  <a href={href} className={className} target={target} rel={rel} {...props}>
    {children}
  </a>
);

const defaultSocialLinks = [
  { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/veloxa.ai", label: "Instagram" },
  { icon: <Mail className="w-5 h-5" />, href: "mailto:hello@veloxa.ai", label: "Email" },
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
  return (
    <section className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-2xl mt-12 relative overflow-hidden">
        {/* Flickering Grid Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-100 [mask-image:radial-gradient(ellipse_90%_90%_at_50%_50%,#000_50%,transparent_100%)]">
          <FlickeringGrid
            squareSize={2}
            gridGap={3}
            flickerChance={0.5}
            color="rgb(255, 255, 255)"
            maxOpacity={0.4}
            className="w-full h-full"
          />
        </div>

        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[16rem] sm:min-h-[19rem] md:min-h-[21rem] relative p-4 py-6 sm:py-8 z-10">
          <div className="flex flex-col mb-4 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1 mb-2">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={footerIconLogo}
                    alt="VELLOXA Logo"
                    className="h-28 sm:h-36 md:h-44 w-auto object-contain mix-blend-screen hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-white font-semibold text-center w-full max-w-sm sm:w-96 px-4 sm:px-0 text-xs sm:text-sm">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-4 mt-2 gap-4">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-5 h-5 hover:scale-110 duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  ))}
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
