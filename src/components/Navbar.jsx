import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-charcoal/90 backdrop-blur-md border-b border-borderDark/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-md bg-surface border border-lime/30 flex items-center justify-center group-hover:border-lime transition-colors group-hover:shadow-limeGlow">
            <Cpu className="w-6 h-6 text-lime group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl font-bold tracking-wider text-white group-hover:text-lime transition-colors">
              VELLOXA<span className="text-cyan">.</span>
            </span>
            <span className="text-[10px] tracking-widest text-muted uppercase font-sans -mt-1">AI & Web Partner</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-sans text-sm font-medium tracking-wide transition-colors relative py-1 ${
                isActive(link.path)
                  ? 'text-lime font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-lime rounded-full shadow-limeGlow" />
              )}
            </Link>
          ))}
        </nav>

        {/* Header Action CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-md bg-lime text-charcoal font-display font-semibold text-sm tracking-wider uppercase hover:bg-[#a6ff5e] transition-all transform hover:-translate-y-0.5 hover:shadow-limeGlow flex items-center space-x-2"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 rounded-md bg-surface border border-borderDark text-gray-300 hover:text-lime focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-6 h-6 text-lime" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-b border-borderDark px-4 pt-4 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-md font-display text-lg tracking-wider ${
                isActive(link.path)
                  ? 'bg-charcoal text-lime border-l-4 border-lime'
                  : 'text-gray-300 hover:bg-charcoal hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center py-3.5 mt-4 rounded-md bg-lime text-charcoal font-display font-bold uppercase tracking-wider shadow-limeGlow"
          >
            Book Free AI Audit
          </Link>
        </div>
      )}
    </header>
  );
}
