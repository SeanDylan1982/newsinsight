import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ExternalLink, Share2, Heart, Bookmark, TrendingUp } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ 
  article, 
  isOpen, 
  onClose
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleReadFull = () => {
    navigate(`/article/${article.slug}`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              {article.category}
            </span>
            <div className="flex items-center text-blue-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="font-semibold">{article.priorityScore.toFixed(1)}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Featured Image */}
          {article.featuredImage && (
            <div className="relative h-64 bg-gray-100">
              <img 
                src={article.featuredImage} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Author and Date */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {article.author.charAt(0)}
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">{article.author}</div>
                  <div className="text-gray-500 text-sm">
                    {article.publishedAt.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Heart className="w-5 h-5 text-gray-500 hover:text-red-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-500 hover:text-blue-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Share2 className="w-5 h-5 text-gray-500 hover:text-green-500" />
                </button>
              </div>
            </div>

            {/* Excerpt */}
            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 mb-6">
              <div className="flex items-center space-x-6 text-gray-600">
                <span className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  {article.likes.toLocaleString()} likes
                </span>
                <span>{article.views.toLocaleString()} views</span>
                <span>{article.comments} comments</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Engagement Score</div>
                <div className="text-2xl font-bold text-blue-600">{article.engagementScore.toFixed(1)}/10</div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Want to read the full controversial take?
            </div>
            <button
              onClick={handleReadFull}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold 
                       flex items-center space-x-2 transition-colors duration-200"
            >
              <span>Read Full Article</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};