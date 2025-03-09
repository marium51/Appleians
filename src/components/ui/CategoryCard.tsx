
import React from 'react';

interface CategoryCardProps {
  category: string;
  onClick: () => void;
}

export const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  const getCategoryImage = (category: string) => {
    switch (category.toLowerCase()) {
      case 'smartphones':
      case 'phones':
        return 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2942&auto=format&fit=crop';
      case 'laptops':
        return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2942&auto=format&fit=crop';
      case 'tablets':
        return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2944&auto=format&fit=crop';
      case 'accessories':
        return 'https://images.unsplash.com/photo-1600494603989-9650cf6dad51?q=80&w=2942&auto=format&fit=crop';
      case 'wearables':
        return 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2942&auto=format&fit=crop';
      case 'audio':
        return 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2942&auto=format&fit=crop';
      case 'cameras':
        return 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2942&auto=format&fit=crop';
      case 'gaming':
        return 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2942&auto=format&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1573920111312-04f1b25c6b85?q=80&w=2948&auto=format&fit=crop';
    }
  };

  return (
    <div 
      className="relative overflow-hidden rounded-lg group cursor-pointer h-64"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 transition-opacity group-hover:opacity-80 z-10"></div>
      <img 
        src={getCategoryImage(category)} 
        alt={category} 
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{category}</h3>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-transform group-hover:scale-105">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};
