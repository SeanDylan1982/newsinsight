import React from 'react';
import { TrendingUp, Eye, Heart, Share2, MessageCircle, Clock, AlertCircle } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const getEngagementColor = (score: number) => {
    if (score >= 9) return 'text-blue-600 bg-blue-100';
    if (score >= 7) return 'text-green-600 bg-green-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <article 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
               cursor-pointer transform hover:-translate-y-1 border border-gray-100 overflow-hidden
               group"
    >
      {/* Featured Image */}
      {article.featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.featuredImage} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.isBreaking && (
            <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              BREAKING
            </div>
          )}
          {article.isFeatured && !article.isBreaking && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
              FEATURED
            </div>
          )}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${getEngagementColor(article.engagementScore)}`}>
            📊 {article.engagementScore.toFixed(1)}
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            {article.category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {getTimeAgo(article.publishedAt)}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {article.author.charAt(0)}
          </div>
          <span className="ml-2 text-gray-700 font-medium">{article.author}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {formatNumber(article.views)}
            </span>
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {formatNumber(article.likes)}
            </span>
            <span className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              {formatNumber(article.comments)}
            </span>
          </div>
          <div className="flex items-center text-blue-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="font-semibold">{article.priorityScore.toFixed(1)}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
            >
              #{tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
              +{article.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </article>
  );
};