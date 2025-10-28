import React, { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const primaryLinks = [
    { name: 'Journal', href: '/articles' },
    { name: 'Reviews', href: '/reviews' }
  ];

  const categories = useMemo(() => [
    { name: 'Skincare', slug: 'skincare' },
    { name: 'Audio', slug: 'audio' },
    { name: 'Accessories', slug: 'accessories' },
    { name: 'Fragrance', slug: 'fragrance' },
    { name: 'Grooming', slug: 'grooming' }
  ], []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  }, [searchQuery, navigate]);

  return (
    <header className="bg-off-white dark:bg-charcoal shadow-lg sticky top-0 z-50 transition-colors duration-300">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-champagne focus:text-charcoal focus:rounded"
      >
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-champagne" />
            <span className="text-2xl font-bold text-charcoal dark:text-off-white">
              Swanky<span className="text-champagne">Boyz</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-charcoal dark:text-off-white hover:text-champagne dark:hover:text-champagne transition-colors duration-200 font-semibold"
              >
                {link.name}
              </Link>
            ))}
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="text-charcoal/70 dark:text-off-white/70 hover:text-champagne dark:hover:text-champagne transition-colors duration-200 font-medium"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Search className="h-5 w-5 text-charcoal/40 dark:text-off-white/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-charcoal/20 dark:border-off-white/20 rounded-lg focus:ring-2 focus:ring-champagne focus:border-transparent bg-off-white dark:bg-charcoal text-charcoal dark:text-off-white placeholder:text-charcoal/50 dark:placeholder:text-off-white/50"
              />
            </div>
          </form>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-lg bg-charcoal/10 dark:bg-off-white/10 hover:bg-charcoal/20 dark:hover:bg-off-white/20 transition-colors duration-200"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-champagne" />
              ) : (
                <Moon className="h-5 w-5 text-charcoal" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="lg:hidden p-2 rounded-lg bg-charcoal/10 dark:bg-off-white/10 hover:bg-charcoal/20 dark:hover:bg-off-white/20 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-charcoal dark:text-off-white" />
              ) : (
                <Menu className="h-6 w-6 text-charcoal dark:text-off-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-charcoal/10 dark:border-off-white/10">
            <nav className="flex flex-col space-y-4">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-charcoal dark:text-off-white hover:text-champagne dark:hover:text-champagne transition-colors duration-200 font-semibold"
                >
                  {link.name}
                </Link>
              ))}
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-charcoal/70 dark:text-off-white/70 hover:text-champagne dark:hover:text-champagne transition-colors duration-200 font-medium"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            
            <form onSubmit={handleSearch} className="mt-4 md:hidden">
              <div className="relative">
                <Search className="h-5 w-5 text-charcoal/40 dark:text-off-white/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-charcoal/20 dark:border-off-white/20 rounded-lg focus:ring-2 focus:ring-champagne focus:border-transparent bg-off-white dark:bg-charcoal text-charcoal dark:text-off-white placeholder:text-charcoal/50 dark:placeholder:text-off-white/50"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;