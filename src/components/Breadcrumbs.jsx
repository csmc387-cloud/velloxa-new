"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({
  items = [
    { label: 'Home', href: '#hero-section' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'AI & Web Engineering', href: '#ai-integration' },
    { label: 'Consultation', href: '#contact' },
  ],
  className = '',
}) {
  const [activeHref, setActiveHref] = useState('#solutions');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.querySelector(items[i].href);
        if (el && el.offsetTop <= scrollPos) {
          setActiveHref(items[i].href);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveHref(href);
      if (window.history?.pushState) {
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <nav
      aria-label="Breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
      className={`w-full flex items-center justify-center my-6 ${className}`}
    >
      <ol className="inline-flex items-center space-x-1 sm:space-x-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-xs sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = activeHref === item.href;

          return (
            <li
              key={item.href}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="inline-flex items-center"
            >
              {index > 0 && (
                <ChevronRight
                  className="w-3.5 h-3.5 text-white/30 mx-1 sm:mx-1.5 flex-shrink-0"
                  aria-hidden="true"
                />
              )}

              <a
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                itemProp="item"
                className={`inline-flex items-center gap-1.5 font-medium transition-all duration-200 rounded-md px-2 py-1 ${
                  isActive
                    ? 'text-lime font-semibold bg-lime/10 shadow-[0_0_12px_rgba(186,255,122,0.2)]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                {index === 0 && <Home className="w-3.5 h-3.5 text-cyan" />}
                <span itemProp="name">{item.label}</span>
              </a>
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
