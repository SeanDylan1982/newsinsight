export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  category: string;
  isArchived: boolean;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagementScore: number;
  priorityScore: number;
  slug: string;
  featuredImage?: string;
  isFeatured?: boolean;
  isBreaking?: boolean;
}

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  type: 'article' | 'archive';
  publishedAt: Date;
  category: string;
  slug: string;
}

export interface FilterOptions {
  category: string;
  sortBy: 'newest' | 'featured' | 'popular' | 'breaking';
  timeRange: 'today' | 'week' | 'month' | 'all';
}

export interface AdSpace {
  id: string;
  position: 'header' | 'sidebar' | 'between-articles' | 'in-article' | 'footer';
  type: 'banner' | 'square' | 'skyscraper' | 'native';
  isActive: boolean;
}