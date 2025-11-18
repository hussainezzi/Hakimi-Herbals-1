import React, { useRef } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedCarouselProps {
  products: Product[];
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ products }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Approximately one card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group px-4">
      {/* Navigation Buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-100 p-3 rounded-full shadow-lg text-hakimi-text opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-0 hover:bg-hakimi-aqua hover:text-white -ml-2 md:-ml-6"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-100 p-3 rounded-full shadow-lg text-hakimi-text opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-0 hover:bg-hakimi-aqua hover:text-white -mr-2 md:-mr-6"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 px-2 no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {products.map(product => (
          <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-center">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;