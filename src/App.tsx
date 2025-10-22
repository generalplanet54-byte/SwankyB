import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { ContentProvider } from './contexts/ContentContext';
import { AffiliateProvider } from './contexts/AffiliateContext';

// Lazy load pages for better code splitting
const Homepage = lazy(() => import('./components/pages/Homepage'));
const CategoryPage = lazy(() => import('./components/pages/CategoryPage'));
const ArticlePage = lazy(() => import('./components/pages/ArticlePage'));
const ArticlesListPage = lazy(() => import('./components/pages/ArticlesListPage'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));
const ProtectedAdminRoute = lazy(() => import('./components/admin/ProtectedAdminRoute'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <AffiliateProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Header />
              <main id="main-content" className="flex-grow">
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/articles" element={<ArticlesListPage />} />
                    <Route path="/category/:categorySlug" element={<CategoryPage />} />
                    <Route path="/article/:articleSlug" element={<ArticlePage />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={
                      <ProtectedAdminRoute>
                        <AdminDashboard />
                      </ProtectedAdminRoute>
                    } />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </Router>
        </AffiliateProvider>
      </ContentProvider>
    </ThemeProvider>
  );
}

export default App;