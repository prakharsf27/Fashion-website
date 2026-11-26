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
    <header className="sticky top-0 z-40 bg-atelier-50/95 backdrop-blur-md border-b border-[#E8DEC9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Golden & Elegant */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer group flex flex-col justify-center"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-widest text-[#8C6D31] group-hover:text-[#684E1C] font-normal transition-colors uppercase">
            The Camerino
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#A68342] font-semibold -mt-0.5">
            Virtual Dressing Room
          </span>
        </div>

        {/* Desktop Navigation Links - Rich Golden Tone */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs uppercase tracking-widest transition-all py-1.5 relative font-semibold ${
                  isActive 
                    ? 'text-[#5E471C] font-bold' 
                    : 'text-[#8C6D31] hover:text-[#5E471C]'
                }`}
              >
                <span className="flex items-center space-x-1.5">
                  {item.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B88E3E] animate-pulse"></span>
                  )}
                  <span>{item.label}</span>
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#9E7B35]"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button - Golden Luxury Accent */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => handleNavClick('tryon')}
            className="px-5 py-2.5 bg-[#FAF6EE] hover:bg-[#F3EADB] border border-[#C5A059] text-[#7A5B20] hover:text-[#523A10] text-xs uppercase tracking-widest font-bold transition-all flex items-center space-x-2 shadow-sm rounded-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B88E3E]" />
            <span>Try Your Look</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={() => handleNavClick('tryon')}
            className="px-3.5 py-1.5 bg-[#FAF6EE] border border-[#C5A059] text-[#7A5B20] text-xs font-bold uppercase tracking-wider"
          >
            Try-On
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#8C6D31] hover:text-[#5E471C] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E8DEC9] px-6 py-5 space-y-4 animate-fade-in shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left text-xs uppercase tracking-widest py-2 font-semibold ${
                activeView === item.id 
                  ? 'text-[#5E471C] font-bold border-l-2 border-[#9E7B35] pl-2' 
                  : 'text-[#8C6D31] hover:text-[#5E471C]'
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
