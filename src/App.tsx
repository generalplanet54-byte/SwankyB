import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { ContentProvider } from './contexts/ContentContext';
import { AffiliateProvider } from './contexts/AffiliateContext';
import { initializeWebVitalsMonitoring } from './lib/performanceMonitoring';
import { initializeAdvancedAnalytics } from './lib/advancedAnalytics';
import { 
  StickyCTA, 
  FloatingActionButton
} from './components/ConversionOptimization';

// Lazy load pages for better code splitting
const Homepage = lazy(() => import('./components/pages/Homepage'));
const CategoryPage = lazy(() => import('./components/pages/CategoryPage'));
const ArticlePage = lazy(() => import('./components/pages/ArticlePage'));
const ArticlesListPage = lazy(() => import('./components/pages/ArticlesListPage'));
const CategoriesPage = lazy(() => import('./components/pages/CategoriesPage'));
const JournalPage = lazy(() => import('./components/pages/JournalPage'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));
const ProtectedAdminRoute = lazy(() => import('./components/admin/ProtectedAdminRoute'));
const PrivacyPolicy = lazy(() => import('./components/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/pages/TermsOfService'));
const AffiliateDisclosure = lazy(() => import('./components/pages/AffiliateDisclosure'));
const ContactUs = lazy(() => import('./components/pages/ContactUs'));
const TestDynamicFixes = lazy(() => import('./components/pages/TestDynamicFixes'));
const WirelessEarbudsComparison = lazy(() => import('./pages/comparisons/wireless-earbuds'));
const ElectricShaversComparison = lazy(() => import('./pages/comparisons/electric-shavers'));
const GroomingKitsComparison = lazy(() => import('./pages/comparisons/grooming-kits'));
const SkinCareComparison = lazy(() => import('./pages/comparisons/skincare-products'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize Web Vitals monitoring on app mount
    initializeWebVitalsMonitoring();
    
    // Initialize advanced analytics tracking
    const cleanupAnalytics = initializeAdvancedAnalytics();
    
    // Cleanup on unmount
    return () => {
      if (cleanupAnalytics) cleanupAnalytics();
    };
  }, []);

  return (
    <ThemeProvider>
      <ContentProvider>
        <AffiliateProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Header />
              
              {/* Global Conversion Optimization Components */}
              <StickyCTA 
                title="👉 Compare Premium Options"
                subtitle="Expert picks with exclusive deals"
                ctaText="View Buying Guide"
                ctaUrl="#product-comparison"
                showAfterScroll={30}
              />
              
              <FloatingActionButton
                title="Buying Guide"
                description="Expert recommendations & exclusive deals"
                ctaText="Open Now"
                showAfterScroll={25}
              />
              
              <main id="main-content" className="flex-grow">
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/articles" element={<ArticlesListPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/journal" element={<JournalPage />} />
                    <Route path="/category/:categorySlug" element={<CategoryPage />} />
                    <Route path="/articles/:articleSlug" element={<ArticlePage />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={
                      <ProtectedAdminRoute>
                        <AdminDashboard />
                      </ProtectedAdminRoute>
                    } />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/test-fixes" element={<TestDynamicFixes />} />
                    <Route path="/comparisons/wireless-earbuds" element={<WirelessEarbudsComparison />} />
                    <Route path="/comparisons/electric-shavers" element={<ElectricShaversComparison />} />
                    <Route path="/comparisons/grooming-kits" element={<GroomingKitsComparison />} />
                    <Route path="/comparisons/skincare-products" element={<SkinCareComparison />} />
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