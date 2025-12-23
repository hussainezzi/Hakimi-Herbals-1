import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';

const slides = MOCK_PRODUCTS.map(product => ({
  id: product.id,
  title: product.name,
  subtitle: product.description,
  image: product.image,
  cta: "Shop Now",
  targetId: "collection"
}));

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const handleCtaClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden bg-gray-100 group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-[10s]"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-hakimi-text/90 via-hakimi-text/40 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center container mx-auto px-4 md:px-12">
            <div className="max-w-xl text-white space-y-6 transform translate-x-0 transition-transform duration-700 delay-100">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl font-light text-hakimi-green drop-shadow-md line-clamp-3">
                {slide.subtitle}
              </p>
              <button 
                onClick={() => handleCtaClick(slide.targetId)}
                className="px-8 py-3 bg-hakimi-aqua hover:bg-white hover:text-hakimi-aqua text-white font-semibold rounded-full transition-all duration-300 shadow-lg flex items-center gap-2 mt-4"
              >
                {slide.cta} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 flex-wrap justify-center px-4 w-full">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-hakimi-aqua w-8' : 'bg-white/50 hover:bg-white w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;