import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Twitter, Instagram, Youtube, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // In a real implementation, this would integrate with MailerLite/Mailchimp
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/me', { 
          credentials: 'include',
          headers: { 'Accept': 'application/json' }
        });
        if (!mounted) return;
        setIsAdmin(res.ok);
      } catch (err) {
        if (!mounted) return;
        console.warn('Admin authentication API not available in development mode:', err);
        setIsAdmin(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated with the Latest</h3>
          <p className="text-xl text-blue-100 mb-8">
            Get exclusive deals, product reviews, and lifestyle tips delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
            <div className="flex-grow relative">
              <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg border-0 focus:ring-2 focus:ring-yellow-400 text-gray-900"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          
          {isSubscribed && (
            <div className="mt-4 p-3 bg-green-500 text-white rounded-lg max-w-md mx-auto">
              Thanks for subscribing! Check your email for confirmation.
            </div>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">
                Swanky<span className="text-blue-400">Boyz</span>
              </span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Your ultimate destination for discovering the latest tech gadgets, lifestyle products, 
              and luxury accessories. We curate the best products and provide honest reviews to help 
              you make informed purchasing decisions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/swankyboyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="https://instagram.com/swankyboyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://youtube.com/@swankyboyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a 
                href="https://facebook.com/swankyboyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="Like us on Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/category/grooming" className="text-gray-400 hover:text-white transition-colors duration-200">Grooming</Link></li>
              <li><Link to="/category/audio-equipment" className="text-gray-400 hover:text-white transition-colors duration-200">Audio Equipment</Link></li>
              <li><Link to="/category/smartphones" className="text-gray-400 hover:text-white transition-colors duration-200">Smartphones</Link></li>
              <li><Link to="/category/technology" className="text-gray-400 hover:text-white transition-colors duration-200">Technology</Link></li>
              <li><Link to="/articles" className="text-gray-400 hover:text-white transition-colors duration-200">All Articles</Link></li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</Link></li>
              <li><Link to="/affiliate-disclosure" className="text-gray-400 hover:text-white transition-colors duration-200">Affiliate Disclosure</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</Link></li>
              {isAdmin && (
                <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors duration-200">Admin</Link></li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} SwankyBoyz.com. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Affiliate links may earn us a commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;