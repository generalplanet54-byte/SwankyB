import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setEmail('');
    setIsLoading(false);
    
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Mail className="h-12 w-12 text-yellow-400" />
          <h2 className="text-4xl font-bold text-white">
            Stay in the Loop
          </h2>
        </div>
        
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Get the latest product reviews, exclusive deals, and insider tips delivered 
          straight to your inbox. Join over 50,000 smart shoppers!
        </p>

        {isSubscribed ? (
          <div className="flex items-center justify-center space-x-2 bg-green-500 text-white px-6 py-4 rounded-lg max-w-md mx-auto">
            <CheckCircle className="h-6 w-6" />
            <span className="font-semibold">Thanks for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-gray-900 font-bold px-8 py-4 rounded-lg transition-colors duration-200 whitespace-nowrap"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </div>
          </form>
        )}

        <p className="text-sm text-blue-200 mt-4">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;