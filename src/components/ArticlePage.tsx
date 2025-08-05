import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Eye, Heart, Share2, MessageCircle, Clock, Bookmark } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import { AdSpace } from './AdSpace';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { articles } = useArticles();

  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to NewsInsight</span>
          </button>
        </div>
      </header>

      {/* Article Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Article */}
            <article className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Featured Image */}
              {article.featuredImage && (
                <div className="relative h-64 md:h-96">
                  <img 
                    src={article.featuredImage} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  {article.isBreaking && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      BREAKING NEWS
                    </div>
                  )}
                  {article.isFeatured && !article.isBreaking && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      FEATURED
                    </div>
                  )}
                </div>
              )}

              <div className="p-8">
                {/* Category and Date */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {article.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.publishedAt.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {article.title}
                </h1>

                {/* Author and Stats */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                      {article.author.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-gray-900">{article.author}</div>
                      <div className="text-gray-500 text-sm flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {getTimeAgo(article.publishedAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-gray-600">
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
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                    {article.excerpt}
                  </p>
                  
                  {/* In-Article Ad */}
                  <div className="my-8">
                    <AdSpace position="in-article" type="banner" />
                  </div>

                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>
                      {article.content}
                    </p>
                    <p>
                      This comprehensive analysis delves deep into the implications and broader context surrounding these developments. Our research team has conducted extensive interviews with industry experts and analyzed multiple data sources to provide you with the most accurate and insightful coverage.
                    </p>
                    <p>
                      The ramifications of these findings extend far beyond what initially meets the eye, potentially reshaping how we understand and approach similar situations in the future. This story continues to develop, and we will provide updates as new information becomes available.
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Social Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>Like ({formatNumber(article.likes)})</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <Bookmark className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Engagement Score</div>
                    <div className="text-xl font-bold text-blue-600">{article.engagementScore.toFixed(1)}/10</div>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-80 space-y-6">
              <AdSpace position="sidebar" type="skyscraper" />
              
              {/* Related Articles */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {articles
                    .filter(a => a.id !== article.id && a.category === article.category)
                    .slice(0, 3)
                    .map((relatedArticle) => (
                      <div 
                        key={relatedArticle.id}
                        onClick={() => navigate(`/article/${relatedArticle.slug}`)}
                        className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                      >
                        <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {relatedArticle.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="w-3 h-3 mr-1" />
                          {relatedArticle.author}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <AdSpace position="sidebar" type="square" />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlePage;