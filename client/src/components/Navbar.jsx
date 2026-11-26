import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function Navbar() {
  const { activeView, setActiveView } = useTryOn();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'outfits', label: 'Explore Outfits' },
    { id: 'tryon', label: 'Virtual Try-On', highlight: true },
    { id: 'about', label: 'About' },
    { id: 'admin', label: 'Admin' },
  ];

  const handleNavClick = (id) => {
    setActiveView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-atelier-50/95 backdrop-blur-md border-b border-atelier-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer group flex flex-col justify-center"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-widest text-atelier-950 font-light group-hover:text-champagne-700 transition-colors uppercase">
            The Camerino
          </span>
          <span className="text-[10px] tracking-widest uppercase text-atelier-500 font-medium -mt-0.5">
            Virtual Dressing Room
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs uppercase tracking-widest transition-colors py-1 relative font-medium ${
                  isActive 
                    ? 'text-atelier-950 font-semibold' 
                    : 'text-atelier-600 hover:text-atelier-950'
                }`}
              >
                <span className="flex items-center space-x-1.5">
                  {item.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne-500 animate-pulse"></span>
                  )}
                  <span>{item.label}</span>
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-atelier-950"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        {/* <div className="hidden md:flex items-center">
          <button
            onClick={() => handleNavClick('tryon')}
            className="px-5 py-2.5 bg-atelier-950 text-white text-xs uppercase tracking-widest font-semibold hover:bg-atelier-800 transition-all flex items-center space-x-2 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
            <span>Try Your Look</span>
          </button>
        </div> */}

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={() => handleNavClick('tryon')}
            className="px-3.5 py-1.5 bg-atelier-950 text-white text-xs font-semibold uppercase tracking-wider"
          >
            Try-On
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-atelier-800 hover:text-atelier-950 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-atelier-200 px-6 py-5 space-y-4 animate-fade-in shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left text-xs uppercase tracking-widest py-2 ${
                activeView === item.id 
                  ? 'text-atelier-950 font-bold' 
                  : 'text-atelier-600 hover:text-atelier-950'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
