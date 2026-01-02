import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import FeaturedCarousel from './components/FeaturedCarousel';
import { MOCK_PRODUCTS } from './constants';

const App: React.FC = () => {
  // Filter featured products. If none marked as featured, use the first 4.
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.category === 'Featured');
  const displayFeatured = featuredProducts.length > 0 ? featuredProducts : MOCK_PRODUCTS.slice(0, 4);
  
  // Rest of the products for the grid
  const gridProducts = MOCK_PRODUCTS;

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-hakimi-aqua selection:text-white">
      <Navbar />
      <CartSidebar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Featured Products Section */}
        <section id="featured" className="py-16 bg-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1/2 bg-hakimi-green/5 skew-y-3 transform origin-top-right z-0"></div>
           <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-end justify-between mb-10 px-2">
              <div>
                <span className="text-hakimi-aqua font-bold tracking-widest uppercase text-xs md:text-sm">Handpicked Favorites</span>
                <h2 className="text-3xl md:text-4xl font-bold text-hakimi-text mt-2">Featured Products</h2>
              </div>
              <button 
                onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-hakimi-text hover:text-hakimi-aqua font-medium transition-colors text-sm md:text-base hidden md:block"
              >
                View Full Collection →
              </button>
            </div>
            <FeaturedCarousel products={displayFeatured} />
           </div>
        </section>

        {/* All Products Grid Section */}
        <section id="collection" className="py-20 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-hakimi-aqua font-bold tracking-widest uppercase text-sm">Our Collection</span>
              <h2 className="text-3xl md:text-4xl font-bold text-hakimi-text">Natural Healing</h2>
              <p className="text-gray-500 text-lg">
                Handcrafted herbal remedies inspired by nature's purity. Designed to heal, rejuvenate, and protect.
              </p>
              <div className="w-16 h-1 bg-hakimi-green mx-auto rounded-full mt-6"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {gridProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* About / Trust Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
             <div className="grid md:grid-cols-3 gap-8 text-center">
               <div className="p-8 bg-white rounded-3xl border border-gray-100 hover:border-hakimi-green/30 transition-all group">
                 <div className="w-16 h-16 bg-hakimi-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform">🌿</div>
                 <h3 className="text-xl font-bold text-hakimi-text mb-2">100% Natural</h3>
                 <p className="text-gray-500 leading-relaxed">Sourced directly from nature, free from harmful chemicals and synthetic additives.</p>
               </div>
               <div className="p-8 bg-white rounded-3xl border border-gray-100 hover:border-hakimi-green/30 transition-all group">
                 <div className="w-16 h-16 bg-hakimi-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform">💧</div>
                 <h3 className="text-xl font-bold text-hakimi-text mb-2">Pure Distillates</h3>
                 <p className="text-gray-500 leading-relaxed">Made using traditional steam distillation processes to retain potency.</p>
               </div>
               <div className="p-8 bg-white rounded-3xl border border-gray-100 hover:border-hakimi-green/30 transition-all group">
                 <div className="w-16 h-16 bg-hakimi-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform">✨</div>
                 <h3 className="text-xl font-bold text-hakimi-text mb-2">Handcrafted</h3>
                 <p className="text-gray-500 leading-relaxed">Made in small batches to ensure premium quality and attention to detail.</p>
               </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="bg-hakimi-text text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
             <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-hakimi-aqua w-2 h-8 rounded-full block"></span>
                  Hakimi Herbals
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Bringing the ancient wisdom of herbal healing to the modern world. 
                  Pure, potent, and personal.
                </p>
             </div>
             <div>
               <h3 className="text-lg font-semibold mb-4 text-hakimi-green">Quick Links</h3>
               <ul className="space-y-2 text-gray-400">
                 <li>
                   <button onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">
                     Shop All
                   </button>
                 </li>
                 <li>
                   <button onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">
                     Featured
                   </button>
                 </li>
                 <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
               </ul>
             </div>
             <div>
               <h3 className="text-lg font-semibold mb-4 text-hakimi-green">Contact</h3>
               <p className="text-gray-400">Have questions? Reach out to us on WhatsApp for personalized consultations.</p>
               <div className="mt-4 text-hakimi-aqua font-bold">
                 +92 333 3699205
               </div>
             </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Hakimi Herbals. All rights reserved.</p>
            <p className="flex items-center gap-1">Made with <span className="text-red-400">♥</span> by Nature</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;