import React from 'react';
import { Filter, TrendingUp, Clock, Star, Users } from 'lucide-react';
import { FilterOptions } from '../types';

interface ArticleFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export const ArticleFilters: React.FC<ArticleFiltersProps> = ({ 
  filters, 
  onFiltersChange 
}) => {
  const categories = [
    'all',
    'Technology',
    'Business',
    'Society',
    'Politics',
    'Health',
    'Entertainment'
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured', icon: Star },
    { value: 'newest', label: 'Newest', icon: Clock },
    { value: 'breaking', label: 'Breaking News', icon: TrendingUp },
    { value: 'popular', label: 'Most Popular', icon: Users }
  ];

  const timeRanges = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Filter & Sort</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Time Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Range
          </label>
          <select
            value={filters.timeRange}
            onChange={(e) => onFiltersChange({ ...filters, timeRange: e.target.value as FilterOptions['timeRange'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
        {sortOptions.map((option) => {
          const Icon = option.icon;
          const isActive = filters.sortBy === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => onFiltersChange({ ...filters, sortBy: option.value as FilterOptions['sortBy'] })}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};