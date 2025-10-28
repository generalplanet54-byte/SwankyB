import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Droplets, Wind, Headphones, Watch } from 'lucide-react';

const CategoriesPage: React.FC = () => {
  const categories = [
    {
      id: 'grooming',
      name: 'Grooming',
      description: 'Electric shavers, trimmers, grooming kits, and beard care essentials for the modern gentleman.',
      icon: Sparkles,
      color: 'from-champagne/20 to-amber-500/10',
      link: '/category/grooming'
    },
    {
      id: 'skincare',
      name: 'Skincare',
      description: 'Premium skincare products including moisturizers, serums, and treatments for healthy skin.',
      icon: Droplets,
      color: 'from-blue-400/20 to-cyan-400/10',
      link: '/category/skincare'
    },
    {
      id: 'fragrance',
      name: 'Fragrance',
      description: 'Luxury colognes, eau de parfum, and fragrance collections for distinctive personal style.',
      icon: Wind,
      color: 'from-purple-400/20 to-pink-400/10',
      link: '/category/fragrance'
    },
    {
      id: 'audio',
      name: 'Audio',
      description: 'Premium wireless earbuds, headphones, and audio equipment for the audiophile gentleman.',
      icon: Headphones,
      color: 'from-green-400/20 to-emerald-400/10',
      link: '/category/audio'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Luxury watches, bags, wallets, and lifestyle accessories to complete your collection.',
      icon: Watch,
      color: 'from-rose-400/20 to-red-400/10',
      link: '/category/accessories'
    }
  ];

  const quickLinks = [
    { name: 'All Articles', href: '/articles' },
    { name: 'Product Reviews', href: '/reviews' },
    { name: 'Buying Guides', href: '/articles?topic=guide' },
    { name: 'Comparison Tools', href: '/category/grooming' },
  ];

  return (
    <main className="bg-charcoal text-off-white">
      {/* Hero Section */}
      <section className="border-b border-off-white/10 bg-gradient-to-br from-charcoal via-black/60 to-charcoal">
        <div className="container space-y-8 py-24">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.45em] text-champagne/80">Explore</p>
            <h1 className="font-display text-5xl leading-snug sm:text-6xl">
              All Categories
            </h1>
            <p className="max-w-2xl text-lg text-off-white/70">
              Discover our curated collections of premium products across grooming, skincare, fragrance, audio, and lifestyle accessories.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link 
              to="/articles" 
              className="inline-flex items-center justify-center rounded-full bg-champagne px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-charcoal transition hover:bg-champagne/80 hover:shadow-lg"
            >
              Explore Content
            </Link>
            <Link 
              to="/category/grooming" 
              className="inline-flex items-center justify-center rounded-full border border-champagne px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-champagne transition hover:bg-champagne/10"
            >
              Shop Grooming
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="border-b border-off-white/10 py-24">
        <div className="container space-y-12">
          <div className="space-y-3">
            <h2 className="font-display text-3xl">Browse by Category</h2>
            <p className="text-off-white/70">Find expert recommendations and comparisons in every category</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.id}
                  to={category.link}
                  className="group flex flex-col gap-6 rounded-3xl border border-off-white/10 bg-gradient-to-br from-black/40 to-black/20 p-10 transition hover:border-champagne/70 hover:bg-black/60 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl text-off-white group-hover:text-champagne transition">{category.name}</h3>
                      <p className="mt-3 text-base text-off-white/70 group-hover:text-off-white/80 transition">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-champagne/10 group-hover:bg-champagne/20 transition">
                      <IconComponent className="h-6 w-6 text-champagne" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-champagne text-sm font-semibold opacity-0 group-hover:opacity-100 transition">
                    Explore {category.name} <span>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="border-b border-off-white/10 py-24">
        <div className="container space-y-12">
          <div className="space-y-3">
            <h2 className="font-display text-3xl">Featured Resources</h2>
            <p className="text-off-white/70">Expert content to guide your purchases</p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group flex items-center gap-3 rounded-xl border border-off-white/10 bg-black/40 p-6 transition hover:border-champagne/70 hover:bg-black/60"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-off-white group-hover:text-champagne transition">{link.name}</p>
                </div>
                <span className="text-champagne opacity-0 group-hover:opacity-100 transition">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Browse by Category */}
      <section className="border-b border-off-white/10 py-24 bg-black/40">
        <div className="container space-y-12">
          <div className="space-y-3">
            <h2 className="font-display text-3xl">Why Browse by Category?</h2>
            <p className="text-off-white/70">Our curated categories help you find exactly what you're looking for</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3 rounded-xl border border-off-white/10 bg-charcoal/50 p-6">
              <h3 className="font-display text-lg text-champagne">Expert Curation</h3>
              <p className="text-off-white/70 text-sm">
                Every product is hand-selected by our team of lifestyle experts and tested for quality, value, and fit.
              </p>
            </div>

            <div className="space-y-3 rounded-xl border border-off-white/10 bg-charcoal/50 p-6">
              <h3 className="font-display text-lg text-champagne">Comparison Tools</h3>
              <p className="text-off-white/70 text-sm">
                Compare products side-by-side with detailed specifications, ratings, and affiliate pricing to make informed decisions.
              </p>
            </div>

            <div className="space-y-3 rounded-xl border border-off-white/10 bg-charcoal/50 p-6">
              <h3 className="font-display text-lg text-champagne">In-Depth Reviews</h3>
              <p className="text-off-white/70 text-sm">
                Read comprehensive reviews, buying guides, and recommendations from experts who actually use these products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="font-display text-3xl">Find Your Next Favorite Product</h2>
            <p className="text-lg text-off-white/70 max-w-2xl mx-auto">
              Whether you're looking to upgrade your grooming routine, discover premium skincare, or find the perfect audio gear, we've got expert recommendations for every category.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/category/grooming" 
              className="inline-flex items-center justify-center rounded-full bg-champagne px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-charcoal transition hover:bg-champagne/80 hover:shadow-lg"
            >
              Start Exploring
            </Link>
            <Link 
              to="/articles" 
              className="inline-flex items-center justify-center rounded-full border border-champagne px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-champagne transition hover:bg-champagne/10"
            >
              Read Guides →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoriesPage;
