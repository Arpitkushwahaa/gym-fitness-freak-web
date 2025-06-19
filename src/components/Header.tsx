import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell, Folder } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Exercises', href: '#exercises' },
    { name: 'Diet Plans', href: '#diet' },
    { name: 'Programs', href: '#programs' },
    { name: 'Tools', href: '#tools' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-orange-600 p-2 rounded-lg">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              FitZone
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-medium transition-all duration-200 hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#exercises"
              onClick={() => window.dispatchEvent(new CustomEvent('showRoutines'))}
              className={`font-medium transition-all duration-200 hover:scale-105 flex items-center gap-1.5 ${
                isScrolled 
                  ? 'text-blue-600 hover:text-blue-700' 
                  : 'text-orange-300 hover:text-orange-200'
              }`}
            >
              <Folder className="h-4 w-4" />
              My Routines
            </a>
            <button className="bg-gradient-to-r from-blue-600 to-orange-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg">
            <nav className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="#exercises"
                className="block text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-1.5"
                onClick={(e) => {
                  window.dispatchEvent(new CustomEvent('showRoutines'));
                  setIsMenuOpen(false);
                }}
              >
                <Folder className="h-4 w-4" />
                My Routines
              </a>
              <button className="w-full bg-gradient-to-r from-blue-600 to-orange-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200">
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;