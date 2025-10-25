import React, { useState } from 'react';
import { Zap, Image, FileText, Wand2, Download } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { useAffiliate } from '../../contexts/AffiliateContext';

const AIContentGenerator: React.FC = () => {
  const { addArticle, categories } = useContent();
  const { products } = useAffiliate();
  const [topic, setTopic] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [affiliateOverrides, setAffiliateOverrides] = useState<Record<string,string>>({});

  const handleGenerateArticle = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/admin/generate-article', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category: selectedCategory })
      });
      if (res.ok) {
        const json = await res.json();
        const article = json.article;
        // Normalize fields for frontend preview
        const normalized = {
          ...article,
          title: article.title || `The Ultimate Guide to ${topic}`,
          excerpt: article.excerpt || article.seoDescription || '',
          content: article.content || article.html || '',
          readTime: article.readTime || article.read_time || '6 min read',
          seoTitle: article.seoTitle || article.meta_title || '',
          seoDescription: article.seoDescription || article.meta_description || '',
        };
        setGeneratedContent(normalized);
      } else {
        const err = await res.json().catch(() => ({}));
        console.error('Generation error:', err.error || 'Unknown');
        alert('Failed to generate article: ' + (err.error || 'Unknown'));
      }
    } catch (error) {
      console.error('Failed to generate article:', error);
      alert('Failed to generate article: ' + (error as any).message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishArticle = () => {
    if (generatedContent) {
      // Attach selected products and apply affiliate URL overrides
      const affiliateProducts = (selectedProducts || []).map(pid => {
        const prod = products.find(p => p.id === pid);
        if (!prod) return null;
        return {
          id: prod.id,
          name: prod.name,
          description: prod.description,
          price: prod.price,
          originalPrice: prod.originalPrice,
          image: prod.image,
          affiliateUrl: affiliateOverrides[pid] || prod.affiliateUrl,
          rating: prod.rating,
          provider: prod.provider,
          category: prod.category
        };
      }).filter(Boolean);

      const articleToAdd = { ...generatedContent, affiliateProducts };
      addArticle(articleToAdd);
      setGeneratedContent(null);
      setTopic('');
      alert('Article published successfully!');
    }
  };

  const toggleProductSelection = (id: string) => {
    setSelectedProducts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const handleAffiliateOverrideChange = (id: string, url: string) => {
    setAffiliateOverrides(prev => ({ ...prev, [id]: url }));
  };

  const handleGenerateImage = () => {
    // Simulate AI image generation
    alert('AI image generation feature coming soon!');
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Zap className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI Content Generator
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Article Generator */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Generate Article
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Article Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your article topic (e.g., 'Wireless Headphones')"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerateArticle}
              disabled={!topic.trim() || isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  <span>Generate Article</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Image Generator */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Image className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Generate Images
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image Description
              </label>
              <textarea
                placeholder="Describe the image you want to generate (e.g., 'Modern wireless headphones on a wooden desk with soft lighting')"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Style
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>Photorealistic</option>
                <option>Illustration</option>
                <option>Minimalist</option>
                <option>Product Photography</option>
              </select>
            </div>

            <button
              onClick={handleGenerateImage}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Image className="h-5 w-5" />
              <span>Generate Image</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Content Preview */}
      {generatedContent && (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Generated Article Preview
              </h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePublishArticle}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Publish Article
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {generatedContent.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {generatedContent.excerpt}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Category: {generatedContent.category}</span>
                <span>Read Time: {generatedContent.readTime}</span>
                <span>SEO Score: Excellent</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Content Preview (first 200 characters):
              </p>
              <p className="text-gray-800 dark:text-gray-200">
                {generatedContent.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
              </p>
            </div>

            {/* Product selection for affiliate placement */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Select Related Products</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {products.map(prod => (
                  <label key={prod.id} className={`p-3 rounded-lg border ${selectedProducts.includes(prod.id) ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'} flex items-start space-x-3`}>
                    <input type="checkbox" checked={selectedProducts.includes(prod.id)} onChange={() => toggleProductSelection(prod.id)} className="mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{prod.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{prod.category} • {prod.price}</div>
                      <div className="mt-2">
                        <label className="text-xs text-gray-600 dark:text-gray-300">Affiliate URL override (optional)</label>
                        <input
                          value={affiliateOverrides[prod.id] || ''}
                          onChange={(e) => handleAffiliateOverrideChange(prod.id, e.target.value)}
                          placeholder={prod.affiliateUrl}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        />
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIContentGenerator;