import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowUpRight, Shirt, Compass, Info, SlidersHorizontal } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

export default function Navbar() {
  const { activeView, setActiveView } = useTryOn();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'outfits', label: 'Explore Outfits' },
    { id: 'tryon', label: 'Virtual Try-On', highlight: true },
    { id: 'about', label: 'Atelier Philosophy' },
    { id: 'admin', label: 'Atelier Admin' },
  ];

  const handleNavClick = (id) => {
    setActiveView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-atelier-50/90 backdrop-blur-md border-b border-atelier-200/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer group flex flex-col justify-center"
        >
          <div className="flex items-center space-x-2">
            <span className="font-serif text-2xl sm:text-3xl tracking-widest text-atelier-950 font-light group-hover:text-atelier-700 transition-colors uppercase">
              The Fit Room
            </span>
          </div>
          <span className="text-[10px] tracking-atelier uppercase text-atelier-500 font-medium">
            Atelier Virtual Try-On • Paris / New York
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
                className={`text-xs uppercase tracking-widest transition-all duration-200 py-2 relative font-medium ${
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
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-atelier-950"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          {/* <button
            onClick={() => handleNavClick('tryon')}
            className="group relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-white bg-atelier-950 hover:bg-atelier-800 transition-all duration-300 shadow-sm hover:shadow-editorial rounded-none overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-champagne-300" />
              <span>Try Your Look</span>
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-champagne-600 transition-transform duration-500 ease-out -z-0 opacity-20"></div>
          </button> */}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={() => handleNavClick('tryon')}
            className="p-2 text-xs bg-atelier-950 text-white font-medium tracking-wider uppercase px-3"
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
        <div className="md:hidden bg-atelier-100 border-b border-atelier-300/80 px-6 py-6 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm uppercase tracking-widest py-2 flex items-center justify-between border-b border-atelier-200 ${
                  activeView === item.id ? 'text-atelier-950 font-bold' : 'text-atelier-600'
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
