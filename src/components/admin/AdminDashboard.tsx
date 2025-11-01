import React, { useState } from 'react';
import { FileText, Package, Settings, BarChart3, Zap } from 'lucide-react';
import ArticleManager from './ArticleManager';
import ProductManager from './ProductManager';
import AIContentGenerator from './AIContentGenerator';
import AnalyticsDashboard from './AnalyticsDashboard';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('articles');

  const tabs = [
    { id: 'articles', name: 'Articles', icon: FileText },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'ai-generator', name: 'AI Generator', icon: Zap },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'articles':
        return <ArticleManager />;
      case 'products':
        return <ProductManager />;
      case 'ai-generator':
        return <AIContentGenerator />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'settings':
        return <div className="p-8">Settings panel coming soon...</div>;
      default:
        return <ArticleManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your content, products, and site analytics
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              {renderActiveTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;