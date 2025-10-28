import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const JournalPage: React.FC = () => {
  const contentHubs = [
    {
      title: 'Featured Articles',
      description: 'The latest in grooming, skincare, and lifestyle expertise',
      link: '/articles',
      cta: 'Read All Articles',
      icon: '📚'
    },
    {
      title: 'Product Reviews',
      description: 'In-depth analysis of premium products tested by our team',
      link: '/articles?type=review',
      cta: 'View All Reviews',
      icon: '⭐'
    },
    {
      title: 'Buying Guides',
      description: 'Expert recommendations and comprehensive buying guides',
      link: '/articles?type=guide',
      cta: 'Explore Guides',
      icon: '🎯'
    },
    {
      title: 'Comparisons',
      description: 'Side-by-side comparisons of premium products',
      link: '/category/grooming',
      cta: 'Compare Products',
      icon: '⚖️'
    }
  ];

  const topics = [
    'Grooming Tips',
    'Skincare Science',
    'Fragrance Guides',
    'Product Reviews',
    'Buying Guides',
    'How-To Tutorials',
    'Expert Interviews',
    'Trend Reports',
    'Travel Tips',
    'Weekly Finds',
    'Brand Spotlights',
    'Best Of'
  ];

  const latestArticles = [
    {
      title: 'The Complete Guide to Premium Electric Shavers',
      category: 'Guides',
      readTime: '12 min',
      date: 'Oct 28, 2025',
      image: '🪒'
    },
    {
      title: 'Wireless Earbuds Showdown: Apple vs Sony vs Bose',
      category: 'Reviews',
      readTime: '15 min',
      date: 'Oct 25, 2025',
      image: '🎧'
    },
    {
      title: '5 Skincare Mistakes That Age You 10 Years',
      category: 'Tips',
      readTime: '8 min',
      date: 'Oct 22, 2025',
      image: '✨'
    },
    {
      title: 'Fragrance 101: Finding Your Signature Scent',
      category: 'Guides',
      readTime: '10 min',
      date: 'Oct 20, 2025',
      image: '🌸'
    }
  ];

  return (
    <main className="bg-charcoal text-off-white">
      {/* Hero Section */}
      <section className="border-b border-off-white/10 bg-gradient-to-br from-charcoal via-black/60 to-charcoal">
        <div className="container space-y-8 py-24">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.45em] text-champagne/80">Editorial</p>
            <h1 className="font-display text-5xl leading-snug sm:text-6xl">
              The Journal
            </h1>
            <p className="max-w-2xl text-lg text-off-white/70">
              Expert-curated articles, in-depth reviews, and practical guides for the modern gentleman. From grooming rituals to lifestyle excellence.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link 
              to="/articles" 
              className="inline-flex items-center justify-center rounded-full bg-champagne px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-charcoal transition hover:bg-champagne/80 hover:shadow-lg"
            >
              All Articles
            </Link>
            <a 
              href="#latest" 
              className="inline-flex items-center justify-center rounded-full border border-champagne px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-champagne transition hover:bg-champagne/10"
            >
              Latest Content
            </a>
          </div>
        </div>
      </section>

      {/* Content Hub Grid */}
      <section className="border-b border-off-white/10 py-24">
        <div className="container space-y-12">
          <div className="space-y-3">
            <h2 className="font-display text-3xl">Content Hubs</h2>
            <p className="text-off-white/70">Explore our editorial collections</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {contentHubs.map((hub, idx) => (
              <Link
                key={idx}
                to={hub.link}
                className="group flex flex-col gap-6 rounded-3xl border border-off-white/10 bg-black/40 p-10 transition hover:border-champagne/70 hover:bg-black/60 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-off-white group-hover:text-champagne transition">{hub.title}</h3>
                    <p className="mt-3 text-base text-off-white/70 group-hover:text-off-white/80 transition">{hub.description}</p>
                  </div>
                  <span className="text-3xl">{hub.icon}</span>
                </div>
                
                <div className="mt-auto flex items-center gap-2 text-champagne text-sm font-semibold opacity-0 group-hover:opacity-100 transition">
                  {hub.cta} <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Topic */}
      <section className="border-b border-off-white/10 py-24 bg-black/40">
        <div className="container space-y-12">
          <div className="space-y-3">
            <h2 className="font-display text-3xl">Browse by Topic</h2>
            <p className="text-off-white/70">Find content by subject matter</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {topics.map((topic) => (
              <button
                key={topic}
                className="inline-flex items-center justify-center rounded-full border border-off-white/20 bg-charcoal/50 px-6 py-3 text-sm font-semibold text-off-white transition hover:border-champagne hover:bg-champagne/10 hover:text-champagne"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Content Preview */}
      <section id="latest" className="py-24">
        <div className="container space-y-12">
          <div className="space-y-3">
            <h2 className="font-display text-3xl">Latest Updates</h2>
            <p className="text-off-white/70">Fresh editorial every week</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {latestArticles.map((article, idx) => (
              <article 
                key={idx}
                className="group rounded-2xl border border-off-white/10 bg-black/40 overflow-hidden transition hover:border-champagne/70 hover:shadow-lg"
              >
                <div className="h-24 bg-gradient-to-br from-champagne/20 to-transparent flex items-center justify-center text-4xl">
                  {article.image}
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-champagne font-semibold uppercase tracking-wider">{article.category}</span>
                    <span className="text-off-white/50">·</span>
                    <span className="text-off-white/60 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-base text-off-white group-hover:text-champagne transition line-clamp-2">{article.title}</h3>
                  <p className="text-xs text-off-white/50 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {article.date}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center">
            <Link 
              to="/articles" 
              className="inline-flex items-center justify-center rounded-full border border-off-white/20 bg-black/40 px-8 py-3 text-sm font-semibold text-off-white transition hover:border-champagne hover:bg-champagne/10 hover:text-champagne"
            >
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-off-white/10 bg-black/40 py-20">
        <div className="container text-center space-y-6">
          <h2 className="font-display text-3xl">Stay Updated with SwankyBoyz</h2>
          <p className="max-w-2xl mx-auto text-off-white/70">Get weekly articles, expert reviews, and buying guides delivered to your inbox. Join 50,000+ gentlemen who rely on SwankyBoyz for style & substance.</p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-off-white/20 bg-charcoal px-5 py-3 text-sm text-off-white placeholder:text-off-white/40 focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/40 transition"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-champagne px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-charcoal transition hover:bg-champagne/80 hover:shadow-lg"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-off-white/50">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>
    </main>
  );
};

export default JournalPage;
