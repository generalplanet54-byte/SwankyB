import React from 'react';
import { BarChart3, TrendingUp, Users, Eye, MousePointer, DollarSign } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  // Mock analytics data
  const stats = {
    totalViews: 125420,
    uniqueVisitors: 45230,
    affiliateClicks: 2840,
    revenue: 1240.50,
    conversionRate: 3.2,
    avgTimeOnPage: '2:45'
  };

  const _chartData = [
    { month: 'Jan', views: 12000, clicks: 340, revenue: 890 },
    { month: 'Feb', views: 15000, clicks: 420, revenue: 1120 },
    { month: 'Mar', views: 18000, clicks: 510, revenue: 1340 },
    { month: 'Apr', views: 22000, clicks: 640, revenue: 1680 },
    { month: 'May', views: 25000, clicks: 720, revenue: 1890 },
    { month: 'Jun', views: 28000, clicks: 840, revenue: 2200 }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics Dashboard
        </h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Views</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {stats.totalViews.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+15.3%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Unique Visitors</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                {stats.uniqueVisitors.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+8.7%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <MousePointer className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Affiliate Clicks</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {stats.affiliateClicks.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+23.1%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <DollarSign className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            <div>
              <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Revenue</p>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                ${stats.revenue.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+18.4%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <BarChart3 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                {stats.conversionRate}%
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+0.4%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Eye className="h-8 w-8 text-red-600 dark:text-red-400" />
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Avg. Time on Page</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                {stats.avgTimeOnPage}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+12s</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Performance Trends
        </h3>
        
        <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">Interactive Chart Coming Soon</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Real-time analytics visualization will be displayed here
            </p>
          </div>
        </div>
      </div>

      {/* Top Performing Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Top Performing Articles
          </h3>
          <div className="space-y-3">
            {[
              { title: 'Ultimate Guide to Wireless Earbuds', views: 12540, clicks: 340 },
              { title: 'Smart Home Automation Guide', views: 8920, clicks: 280 },
              { title: 'Fitness Tracker Comparison', views: 7650, clicks: 220 },
              { title: 'Productivity Workspace Setup', views: 6430, clicks: 190 },
              { title: 'Luxury for Less Products', views: 5280, clicks: 150 }
            ].map((article, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{article.title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {article.views.toLocaleString()} views • {article.clicks} affiliate clicks
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 dark:text-green-400 font-semibold text-sm">
                    ${(article.clicks * 2.5).toFixed(0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Best Converting Products
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Wireless Headphones Pro', clicks: 450, conversions: 28, revenue: 420 },
              { name: 'Smart Fitness Tracker', clicks: 320, conversions: 19, revenue: 285 },
              { name: 'Luxury Leather Wallet', clicks: 280, conversions: 24, revenue: 360 },
              { name: 'Standing Desk Pro', clicks: 210, conversions: 12, revenue: 180 },
              { name: 'Aromatherapy Diffuser', clicks: 180, conversions: 15, revenue: 225 }
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{product.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {product.clicks} clicks • {product.conversions} conversions
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 dark:text-green-400 font-semibold text-sm">
                    ${product.revenue}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {((product.conversions / product.clicks) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;