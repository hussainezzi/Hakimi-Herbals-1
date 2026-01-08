import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Hero: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const [current, setCurrent] = useState(0);

  // Use the first few products for the hero slider
  const slides = products.slice(0, 5).map(product => ({
    id: product.id,
    title: product.name,
    subtitle: product.description,
    image: product.image,
    cta: "Shop The Harvest",
    targetId: "collection"
  }));

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const handleCtaClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[550px] w-full overflow-hidden bg-hakimi-forest group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-[10s]"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-hakimi-forest/95 via-hakimi-forest/60 to-transparent" />
          
          <div className="absolute inset-0 flex items-center container mx-auto px-4 md:px-12">
            <div className="max-w-xl text-hakimi-cream space-y-6 transform translate-x-0 transition-transform duration-700 delay-100">
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-xl">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl font-light text-hakimi-sage drop-shadow-md line-clamp-3 bg-hakimi-forest/20 backdrop-blur-[2px] inline-block p-1 rounded">
                {slide.subtitle}
              </p>
              <button 
                onClick={() => handleCtaClick(slide.targetId)}
                className="px-10 py-4 bg-hakimi-terracotta hover:bg-white hover:text-hakimi-terracotta text-white font-bold rounded-full transition-all duration-300 shadow-xl flex items-center gap-2 mt-4 transform hover:-translate-y-1"
              >
                {slide.cta} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-hakimi-cream/10 hover:bg-hakimi-cream/30 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-hakimi-cream/10 hover:bg-hakimi-cream/30 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3 flex-wrap justify-center px-4 w-full">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all duration-500 shadow-sm ${
                  idx === current ? 'bg-hakimi-terracotta w-12' : 'bg-hakimi-cream/40 hover:bg-hakimi-cream w-2'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;