import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [articles, setArticles] = useState<Article[]>(launchArticles);
  
  const categories = [
    'Tech Gadgets',
    'Lifestyle',
    'Productivity',
    'Fitness',
    'Luxury Accessories'
  ];

  const addArticle = (articleData: Omit<Article, 'id' | 'publishedAt' | 'updatedAt'>) => {
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles(prev => prev.map(article => 
      article.id === id 
        ? { ...article, ...updates, updatedAt: new Date().toISOString() }
        : article
    ));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  const generateArticle = async (topic: string, category: string): Promise<Article> => {
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
      featuredImage: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000) + 1000000}/pexels-photo-${Math.floor(Math.random() * 1000000) + 1000000}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
      category,
      tags: [topic.toLowerCase(), category.toLowerCase(), 'review', 'guide'],
      readTime,
      featured: Math.random() > 0.5,
      seoTitle: `${topic} - Complete Guide & Reviews | SwankyBoyz`,
      seoDescription: `Find the best ${topic} products with our expert reviews and buying guide. Compare features, prices, and get exclusive deals.`,
      affiliateProducts: []
    };

    return newArticle;
  };

  const generateArticleContent = (topic: string, category: string): string => {
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
  };

  return (
    <ContentContext.Provider value={{
      articles,
      categories,
      addArticle,
      updateArticle,
      deleteArticle,
      generateArticle
    }}>
      {children}
    </ContentContext.Provider>
  );
};