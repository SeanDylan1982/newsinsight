import { useState, useEffect } from 'react';
import { Article, FilterOptions } from '../types';

// Mock data - will be replaced with API calls
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Digital Connectivity Trends Show Unexpected Social Benefits',
    excerpt: 'New research reveals how modern digital platforms are reshaping human connections in ways experts didn\'t anticipate...',
    content: 'Full article content here...',
    author: 'Dr. Sarah Mitchell',
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    tags: ['digital-trends', 'technology', 'social-research'],
    category: 'Technology',
    isArchived: false,
    views: 15420,
    likes: 892,
    shares: 234,
    comments: 156,
    engagementScore: 8.5,
    priorityScore: 9.2,
    slug: 'digital-connectivity-social-benefits',
    featuredImage: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
    isFeatured: true,
    isBreaking: false
  },
  {
    id: '2',
    title: 'Workplace Innovation Patterns in Remote vs Office Environments',
    excerpt: 'Comprehensive analysis reveals significant differences in creative output between remote and traditional office settings...',
    content: 'Full article content here...',
    author: 'Prof. Marcus Chen',
    publishedAt: new Date('2024-01-14'),
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    tags: ['workplace-research', 'productivity', 'business-analysis'],
    category: 'Business',
    isArchived: false,
    views: 12890,
    likes: 567,
    shares: 189,
    comments: 234,
    engagementScore: 9.1,
    priorityScore: 8.7,
    slug: 'workplace-innovation-remote-office-analysis',
    isBreaking: true
  },
  {
    id: '3',
    title: 'Generational Perspectives: Understanding Modern Workplace Values',
    excerpt: 'Research into generational differences reveals important insights about evolving workplace priorities and social values...',
    content: 'Full article content here...',
    author: 'Dr. Alex Rivera',
    publishedAt: new Date('2024-01-13'),
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    tags: ['generational-studies', 'workplace-culture', 'social-research'],
    category: 'Society',
    isArchived: false,
    views: 18750,
    likes: 1234,
    shares: 345,
    comments: 567,
    engagementScore: 8.8,
    priorityScore: 9.5,
    slug: 'generational-workplace-values-analysis',
    isFeatured: true
  }
];

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    sortBy: 'featured',
    timeRange: 'all'
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filteredArticles = [...mockArticles];
      
      // Apply filters
      if (filters.category !== 'all') {
        filteredArticles = filteredArticles.filter(article => 
          article.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

      // Apply sorting
      switch (filters.sortBy) {
        case 'newest':
          filteredArticles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
          break;
        case 'featured':
          filteredArticles.sort((a, b) => b.priorityScore - a.priorityScore);
          break;
        case 'breaking':
          filteredArticles.sort((a, b) => (b.isBreaking ? 1 : 0) - (a.isBreaking ? 1 : 0));
          break;
        case 'popular':
          filteredArticles.sort((a, b) => b.views - a.views);
          break;
      }

      setArticles(filteredArticles);
      setLoading(false);
    }, 500);
  }, [filters]);

  return { articles, loading, filters, setFilters };
};