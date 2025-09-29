import React, { useState } from 'react';
import { Zap, Image, FileText, Wand2, Download } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const AIContentGenerator: React.FC = () => {
  const { generateArticle, addArticle, categories } = useContent();
  const [topic, setTopic] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const handleGenerateArticle = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    try {
      const article = await generateArticle(topic, selectedCategory);
      setGeneratedContent(article);
    } catch (error) {
      console.error('Failed to generate article:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishArticle = () => {
    if (generatedContent) {
      addArticle(generatedContent);
      setGeneratedContent(null);
      setTopic('');
      alert('Article published successfully!');
    }
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AIContentGenerator;