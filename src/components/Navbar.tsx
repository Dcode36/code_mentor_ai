
import React, { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              CodeMentorAI
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-violet-400 font-medium">Features</a>
            <a href="#demo" className="text-gray-300 hover:text-violet-400 font-medium">Demo</a>
            <a href="#pricing" className="text-gray-300 hover:text-violet-400 font-medium">Pricing</a>
            <a href="#faq" className="text-gray-300 hover:text-violet-400 font-medium">FAQ</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-violet-400 font-medium hover:text-violet-300">Login</a>
            <a href="#" className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white px-4 py-2 rounded-md font-medium transition-all">
              Sign Up Free
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <a href="#features" className="block text-gray-300 hover:text-violet-400 font-medium">Features</a>
            <a href="#demo" className="block text-gray-300 hover:text-violet-400 font-medium">Demo</a>
            <a href="#pricing" className="block text-gray-300 hover:text-violet-400 font-medium">Pricing</a>
            <a href="#faq" className="block text-gray-300 hover:text-violet-400 font-medium">FAQ</a>
            <div className="pt-2 flex flex-col space-y-2">
              <a href="#" className="text-violet-400 font-medium hover:text-violet-300">Login</a>
              <a href="#" className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white px-4 py-2 rounded-md font-medium transition-all text-center">
                Sign Up Free
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
