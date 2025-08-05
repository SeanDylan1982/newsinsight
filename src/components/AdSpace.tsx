import React from 'react';
import { AdSpace as AdSpaceType } from '../types';

interface AdSpaceProps {
  position: AdSpaceType['position'];
  type: AdSpaceType['type'];
  className?: string;
}

export const AdSpace: React.FC<AdSpaceProps> = ({ position, type, className = '' }) => {
  const getAdDimensions = () => {
    switch (type) {
      case 'banner':
        return 'h-24 md:h-32';
      case 'square':
        return 'h-64 w-64';
      case 'skyscraper':
        return 'h-96 w-32';
      case 'native':
        return 'h-40';
      default:
        return 'h-24';
    }
  };

  const getAdContent = () => {
    switch (position) {
      case 'header':
        return 'Header Advertisement Space';
      case 'sidebar':
        return 'Sidebar Ad';
      case 'between-articles':
        return 'Sponsored Content';
      case 'in-article':
        return 'Advertisement';
      case 'footer':
        return 'Footer Ad Space';
      default:
        return 'Advertisement';
    }
  };

  return (
    <div className={`
      bg-gradient-to-r from-gray-100 to-gray-200 
      border-2 border-dashed border-gray-300
      rounded-lg
      flex items-center justify-center
      transition-all duration-300 hover:border-gray-400
      ${getAdDimensions()}
      ${className}
    `}>
      <div className="text-center">
        <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
          {getAdContent()}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {type} • {position}
        </div>
      </div>
    </div>
  );
};