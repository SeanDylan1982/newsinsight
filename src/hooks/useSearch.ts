import { useState, useEffect } from 'react';
import { SearchResult } from '../types';

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'Digital Connectivity Trends Show Unexpected Social Benefits',
    excerpt: 'New research reveals how modern digital platforms...',
    type: 'article',
    publishedAt: new Date('2024-01-15'),
    category: 'Technology',
    slug: 'digital-connectivity-social-benefits'
  },
  {
    id: '2',
    title: 'Workplace Innovation Patterns in Remote vs Office Environments',
    excerpt: 'Comprehensive analysis reveals significant differences...',
    type: 'article',
    publishedAt: new Date('2024-01-14'),
    category: 'Business',
    slug: 'workplace-innovation-remote-office-analysis'
  }
];

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call with debounce
    const timeoutId = setTimeout(() => {
      const filtered = mockResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setShowSuggestions(true);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowSuggestions(false);
  };

  return {
    query,
    results,
    isSearching,
    showSuggestions,
    setShowSuggestions,
    handleSearch,
    clearSearch
  };
};