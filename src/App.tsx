import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Homepage from './components/pages/Homepage';
import CategoryPage from './components/pages/CategoryPage';
import ArticlePage from './components/pages/ArticlePage';
import AdminDashboard from './components/admin/AdminDashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { ContentProvider } from './contexts/ContentContext';
import { AffiliateProvider } from './contexts/AffiliateContext';

function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <AffiliateProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/category/:categorySlug" element={<CategoryPage />} />
                  <Route path="/article/:articleSlug" element={<ArticlePage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
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