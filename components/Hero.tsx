import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Pure Cool Water Essence",
    subtitle: "Experience the freshness of nature.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1763398425/1d368fea-45b6-41cf-b700-b43e892b9674_rylld1.jpg",
    cta: "Shop Now",
    targetId: "collection"
  },
  {
    id: 2,
    title: "Skin Nourishments",
    subtitle: "Protect your skin this winter.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1763398424/2cbfec1c-e591-4395-8c36-c86b67468349_qmt6zy.jpg",
    cta: "Discover",
    targetId: "featured"
  },
  {
    id: 3,
    title: "Organic Hair Therapies",
    subtitle: "Root to tip nourishment.",
    image: "https://res.cloudinary.com/de0cllasz/image/upload/v1763398422/484ec726-4493-4ae7-8e24-fa783da93859_h3xu7m.jpg",
    cta: "Explore",
    targetId: "collection"
  }
];

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
          <div className="absolute inset-0 bg-gradient-to-r from-hakimi-text/80 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center container mx-auto px-4 md:px-12">
            <div className="max-w-xl text-white space-y-6 transform translate-x-0 transition-transform duration-700 delay-100">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight drop-shadow-sm">
                {slide.title}
              </h2>
              <p className="text-xl md:text-2xl font-light text-hakimi-green drop-shadow-sm">
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
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