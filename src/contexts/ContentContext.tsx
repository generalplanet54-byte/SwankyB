import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { supabase, SUPABASE_CONFIGURED, Article as DBArticle } from '../lib/supabase';
import { launchArticles } from '../data/launchArticles';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
  category: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  affiliateProducts: AffiliateProduct[];
}

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  affiliateUrl: string;
  rating: number;
  provider: 'amazon' | 'cjdropshipping' | 'aliexpress';
  category: string;
}

interface ContentContextType {
  articles: Article[];
  categories: string[];
  loading: boolean;
  addArticle: (article: Omit<Article, 'id' | 'publishedAt' | 'updatedAt'>) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  generateArticle: (topic: string, category: string) => Promise<Article>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);

      // Try server-side public endpoint first (Cloudflare Pages function)
      try {
        const res = await fetch('/api/content', {
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          const json = await res.json();
          const articlesData = json.articles || [];
          const articleProductsData = json.article_products || [];

          const formattedArticles: Article[] = (articlesData || []).map((article: DBArticle) => {
            const relatedProducts = (articleProductsData || [])
              .filter((ap: any) => ap.article_id === article.id)
              .map((ap: any) => {
                const product = ap.products;
                return {
                  id: product.id,
                  name: product.name,
                  description: product.description,
                  price: product.price ? `$${product.price}` : '',
                  originalPrice: product.original_price ? `$${product.original_price}` : undefined,
                  image: product.image_url,
                  affiliateUrl: product.amazon_url,
                  rating: product.rating || 0,
                  provider: 'amazon' as const,
                  category: product.category
                };
              });

            return {
              id: article.id,
              title: article.title,
              slug: article.slug,
              excerpt: article.excerpt,
              content: article.content,
              author: article.author,
              publishedAt: article.published_at,
              updatedAt: article.updated_at,
              featuredImage: article.featured_image,
              category: article.category,
              tags: article.tags || [],
              readTime: article.read_time,
              featured: false,
              seoTitle: article.meta_title || article.title,
              seoDescription: article.meta_description || article.excerpt,
              affiliateProducts: relatedProducts
            };
          });

          setArticles(formattedArticles);
          return;
        }
      } catch (err) {
        // fallback to client-side Supabase if server endpoint unavailable
      }

      // If Supabase wasn't configured at build time (common in Bolt/StackBlitz),
      // fall back to the bundled `launchArticles` so the site still shows content.
      if (!SUPABASE_CONFIGURED) {
        setArticles(launchArticles);
        return;
      }

      const { data: articlesData, error: articlesError } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (articlesError) throw articlesError;

      const { data: articleProductsData, error: articleProductsError } = await supabase
        .from('article_products')
        .select(`
          article_id,
          display_order,
          products (*)
        `)
        .order('display_order', { ascending: true });

      if (articleProductsError) throw articleProductsError;

      const formattedArticles: Article[] = (articlesData || []).map((article: DBArticle) => {
        const relatedProducts = (articleProductsData || [])
          .filter((ap: any) => ap.article_id === article.id)
          .map((ap: any) => {
            const product = ap.products;
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              price: product.price ? `$${product.price}` : '',
              originalPrice: product.original_price ? `$${product.original_price}` : undefined,
              image: product.image_url,
              affiliateUrl: product.amazon_url,
              rating: product.rating || 0,
              provider: 'amazon' as const,
              category: product.category
            };
          });

        return {
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          author: article.author,
          publishedAt: article.published_at,
          updatedAt: article.updated_at,
          featuredImage: article.featured_image,
          category: article.category,
          tags: article.tags || [],
          readTime: article.read_time,
          featured: false,
          seoTitle: article.meta_title || article.title,
          seoDescription: article.meta_description || article.excerpt,
          affiliateProducts: relatedProducts
        };
      });

      setArticles(formattedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      // If Supabase query fails for any reason, fall back to bundled launchArticles
      // so the UI remains populated. This mirrors behavior on StackBlitz/Bolt.
      setArticles(launchArticles);
    } finally {
      setLoading(false);
    }
  };
  
  const categories = useMemo(() => [
    'Footwear',
    'Smartphones',
    'Laptops',
    'Audio Equipment',
    'Wearables',
    'Technology',
    'Health & Wellness'
  ], []);

  const addArticle = useCallback((articleData: Omit<Article, 'id' | 'publishedAt' | 'updatedAt'>) => {
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setArticles(prev => [newArticle, ...prev]);
  }, []);

  const updateArticle = useCallback((id: string, updates: Partial<Article>) => {
    setArticles(prev => prev.map(article => 
      article.id === id 
        ? { ...article, ...updates, updatedAt: new Date().toISOString() }
        : article
    ));
  }, []);

  const deleteArticle = useCallback((id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  }, []);

  const generateArticle = useCallback(async (topic: string, category: string): Promise<Article> => {
    // Simulate AI content generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const readTime = Math.floor(Math.random() * 8) + 3 + ' min read';
    
    const newArticle: Article = {
      id: Date.now().toString(),
      title: `The Ultimate Guide to ${topic}`,
      slug,
      excerpt: `Discover everything you need to know about ${topic} in this comprehensive guide. We've tested, reviewed, and curated the best options to help you make informed decisions.`,
      content: generateArticleContent(topic, category),
      author: 'SwankyBoyz Team',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      featuredImage: generateRelevantImage(topic, category),
      category,
      tags: [topic.toLowerCase(), category.toLowerCase(), 'review', 'guide'],
      readTime,
      featured: Math.random() > 0.5,
      seoTitle: `${topic} - Complete Guide & Reviews | SwankyBoyz`,
      seoDescription: `Find the best ${topic} products with our expert reviews and buying guide. Compare features, prices, and get exclusive deals.`,
      affiliateProducts: []
    };

    return newArticle;
  }, []);

  const generateRelevantImage = useCallback((topic: string, category: string): string => {
    const imageMap: Record<string, string[]> = {
      'Footwear': [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      'Smartphones': [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      'Audio Equipment': [
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      'Technology': [
        'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      'Grooming': [
        'https://images.unsplash.com/photo-1493673272479-a20888bcee10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      'default': [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ]
    };

    const categoryImages = imageMap[category] || imageMap['default'];
    return categoryImages[Math.floor(Math.random() * categoryImages.length)];
  }, []);

  const generateArticleContent = useCallback((topic: string, category: string): string => {
    return `
<h2>Introduction to ${topic}</h2>
<p>In today's fast-paced world, finding the right ${topic} can make all the difference in your ${category.toLowerCase()} journey. Our team at SwankyBoyz has spent countless hours researching, testing, and reviewing the best options available in the market.</p>

<h2>Why ${topic} Matters</h2>
<p>Whether you're a beginner or an experienced user, choosing the right ${topic} is crucial for achieving your goals. Here's what you need to consider:</p>
<ul>
<li>Quality and durability</li>
<li>Value for money</li>
<li>User experience</li>
<li>Brand reputation</li>
</ul>

<h2>Top Features to Look For</h2>
<p>When selecting the perfect ${topic}, keep these essential features in mind:</p>
<ul>
<li>Performance and reliability</li>
<li>Design and aesthetics</li>
<li>User-friendly interface</li>
<li>Customer support and warranty</li>
</ul>

<h2>Our Recommendations</h2>
<p>After extensive testing and research, we've compiled our top recommendations for ${topic}. Each product has been carefully evaluated based on performance, value, and user satisfaction.</p>

<h2>Buying Guide</h2>
<p>To help you make the best decision, consider your specific needs, budget, and long-term goals. Don't forget to check for seasonal discounts and special offers that can help you save money while getting premium quality.</p>

<h2>Conclusion</h2>
<p>Investing in quality ${topic} is an investment in your ${category.toLowerCase()} success. Take your time to research, compare options, and choose products that align with your specific requirements and budget.</p>
    `.trim();
  }, []);

  const value = useMemo(() => ({
    articles,
    categories,
    loading,
    addArticle,
    updateArticle,
    deleteArticle,
    generateArticle
  }), [articles, categories, loading, addArticle, updateArticle, deleteArticle, generateArticle]);

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};