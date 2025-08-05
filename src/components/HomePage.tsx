import React, { useState } from 'react';
import { useArticles } from '../hooks/useArticles';
import { ArticleCard } from './ArticleCard';
import { ArticleModal } from './ArticleModal';
import { ArticleFilters } from './ArticleFilters';
import { SearchBar } from './SearchBar';
import { AdSpace } from './AdSpace';
import { Article } from '../types';
import { TrendingUp, Flame, Clock, Newspaper, AlertCircle, Star } from 'lucide-react';

interface HomePageProps {
  onAdminAccess: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAdminAccess }) => {
  const { articles, loading, filters, setFilters } = useArticles();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter articles by type
  const breakingArticles = articles.filter(article => article.isBreaking);
  const featuredArticles = articles.filter(article => article.isFeatured && !article.isBreaking);

  const handleCardClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const renderArticleGrid = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-t-xl"></div>
              <div className="bg-white p-6 rounded-b-xl shadow-lg">
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    const regularArticles = articles.filter(article => !article.isBreaking && !article.isFeatured);

    return (
      <div className="space-y-8">
        {/* Breaking News */}
        {breakingArticles.length > 0 && (
          <div>
            <div className="flex items-center mb-6">
              <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Breaking News</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {breakingArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => handleCardClick(article)}
                />
              ))}
            </div>
            <AdSpace position="between-articles" type="banner" className="mb-8" />
          </div>
        )}

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div>
            <div className="flex items-center mb-6">
              <Star className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Analysis</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {featuredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => handleCardClick(article)}
                />
              ))}
            </div>
            <AdSpace position="between-articles" type="banner" className="mb-8" />
          </div>
        )}

        {/* Regular Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article, index) => (
            <React.Fragment key={article.id}>
              <ArticleCard
                article={article}
                onClick={() => handleCardClick(article)}
              />
              {/* Insert ads every 6 articles */}
              {(index + 1) % 6 === 0 && (
                <div className="md:col-span-2 lg:col-span-3">
                  <AdSpace position="between-articles" type="native" className="my-4" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {articles.length === 0 && !loading && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">NewsInsight</h1>
                <p className="text-gray-600">In-depth analysis and breaking news coverage</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={onAdminAccess}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Admin Login
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Archive
              </button>
            </div>
          </div>
          
          <SearchBar />
        </div>
        <AdSpace position="header" type="banner" className="mx-4 mb-4" />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            <ArticleFilters filters={filters} onFiltersChange={setFilters} />
            {renderArticleGrid()}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 space-y-6">
            <AdSpace position="sidebar" type="skyscraper" />
            
            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Trending Analysis</h3>
              </div>
              <div className="space-y-2">
                {['Digital Transformation', 'Economic Policy', 'Healthcare Reform', 'Climate Science', 'Tech Innovation'].map((topic, index) => (
                  <div key={topic} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <span className="text-gray-700">#{topic}</span>
                    <span className="text-sm text-blue-600 font-semibold">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdSpace position="sidebar" type="square" />

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>Dr. Sarah M. published analysis on digital connectivity trends</div>
                <div>Prof. Marcus C. released workplace innovation research</div>
                <div>Dr. Alex R. shared insights on generational workplace values</div>
                <div>Dr. Jamie L. examined AI ethics in modern society</div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <AdSpace position="footer" type="banner" className="mb-8 bg-gray-800 border-gray-700" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Newspaper className="w-6 h-6 text-blue-500" />
                <span className="text-xl font-bold">NewsInsight</span>
              </div>
              <p className="text-gray-400">Trusted source for in-depth news analysis and breaking coverage.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Technology</a></li>
                <li><a href="#" className="hover:text-white">Business</a></li>
                <li><a href="#" className="hover:text-white">Society</a></li>
                <li><a href="#" className="hover:text-white">Politics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Advertise</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">RSS Feed</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NewsInsight. All rights reserved. Trusted journalism since 2024.</p>
          </div>
        </div>
      </footer>

      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedArticle(null);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;