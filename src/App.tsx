import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ArticlePage from './components/ArticlePage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'admin-login' | 'admin-dashboard'>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setCurrentView('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentView('home');
  };

  const handleAdminAccess = () => {
    setCurrentView('admin-login');
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage onAdminAccess={handleAdminAccess} />} />
      <Route path="/article/:slug" element={<ArticlePage />} />
      <Route 
        path="/admin" 
        element={
          currentView === 'admin-login' ? (
            <AdminLogin onLogin={handleAdminLogin} />
          ) : currentView === 'admin-dashboard' && isAdminAuthenticated ? (
            <AdminDashboard onLogout={handleAdminLogout} />
          ) : (
            <AdminLogin onLogin={handleAdminLogin} />
          )
        } 
      />
    </Routes>
  );
}

export default App;