import React, { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit, Trash2, Eye } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { Link } from 'react-router-dom';

const ArticleManager: React.FC = () => {
  const { articles, deleteArticle } = useContent();
  const [adminArticles, setAdminArticles] = useState<any[] | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/articles', { credentials: 'include' });
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json();
          setAdminArticles(data.articles || []);
        }
      } catch (err) {
        // ignore, use client-side articles
      }
    })();
    return () => { mounted = false; };
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Tech Gadgets', 'Lifestyle', 'Productivity', 'Fitness', 'Luxury Accessories'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteArticle = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    (async () => {
      try {
        const res = await fetch('/api/admin/articles', {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        if (res.ok) {
          await res.json().catch(() => null);
          setAdminArticles(prev => (prev || []).filter(a => a.id !== id));
          // also update client-side fallback
          deleteArticle(id);
        } else {
          const err = await res.json().catch(() => ({}));
          alert(err.error || 'Failed to delete');
        }
      } catch (err) {
        alert('Network error while deleting article');
      }
    })();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Article Management
        </h2>
        <button
          onClick={async () => {
            const title = prompt('Title');
            if (!title) return;
            const slug = prompt('Slug (url-friendly)') || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const excerpt = prompt('Excerpt') || '';
            const content = prompt('Content (HTML)') || '';
            const author = prompt('Author', 'Admin') || 'Admin';
            try {
              const res = await fetch('/api/admin/articles', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, slug, excerpt, content, author, category: 'Tech', tags: [], is_published: true })
              });
              if (res.ok) {
                const data = await res.json();
                setAdminArticles(prev => [data.article, ...(prev || [])]);
              } else {
                const err = await res.json().catch(() => ({}));
                alert(err.error || 'Failed to create article');
              }
            } catch (err) { alert('Network error'); }
          }
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="h-5 w-5" />
          <span>New Article</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Articles</p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{articles.length}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">Published</p>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">{articles.length}</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Featured</p>
          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
            {articles.filter(a => a.featured).length}
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">This Month</p>
          <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
            {articles.filter(a => new Date(a.publishedAt).getMonth() === new Date().getMonth()).length}
          </p>
        </div>
      </div>

      {/* Articles Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Title</th>
              <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Category</th>
              <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Author</th>
              <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Date</th>
              <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Status</th>
              <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(adminArticles || filteredArticles).map((article) => (
              <tr key={article.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{article.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{article.readTime}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm text-gray-700 dark:text-gray-300">
                    {article.category}
                  </span>
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{article.author}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 dark:text-green-400">Published</span>
                    {article.featured && (
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded text-xs">
                        Featured
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/article/${article.slug}`}
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                      title="View Article"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={async () => {
                        const newTitle = prompt('Title', article.title) || article.title;
                        const updates = { title: newTitle };
                        try {
                          const res = await fetch('/api/admin/articles', {
                            method: 'PUT',
                            credentials: 'include',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: article.id, updates })
                          });
                          if (res.ok) {
                            const json = await res.json();
                            setAdminArticles(prev => (prev || []).map(a => a.id === article.id ? json.article : a));
                          } else {
                            const err = await res.json().catch(() => ({}));
                            alert(err.error || 'Failed to update');
                          }
                        } catch (err) { alert('Network error'); }
                      }}
                      className="p-1 text-gray-500 hover:text-green-600 transition-colors duration-200"
                      title="Edit Article"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="p-1 text-gray-500 hover:text-red-600 transition-colors duration-200"
                      title="Delete Article"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticleManager;