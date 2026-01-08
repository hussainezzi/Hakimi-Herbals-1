import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import FeaturedCarousel from './components/FeaturedCarousel';
import AdminPanel from './components/AdminPanel';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { fetchProducts } from './store/productsSlice';
import { Loader2, Settings } from 'lucide-react';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading, error } = useSelector((state: RootState) => state.products);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featuredProducts = products.filter(p => p.category === 'Featured');
  const displayFeatured = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hakimi-cream flex-col gap-4">
        <Loader2 className="w-12 h-12 text-hakimi-sage animate-spin" />
        <p className="text-hakimi-forest font-medium animate-pulse">Gathering Wild Harvest...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hakimi-cream flex-col gap-4 px-4 text-center">
        <div className="text-hakimi-terracotta text-4xl mb-2">🌿</div>
        <h2 className="text-2xl font-bold text-hakimi-forest">Nature is Resting</h2>
        <p className="text-gray-600 max-w-md">There was an issue connecting to our herbal inventory. Please check your connection and try again.</p>
        <button 
          onClick={() => dispatch(fetchProducts())}
          className="mt-4 px-6 py-2 bg-hakimi-sage text-white rounded-full font-bold hover:bg-hakimi-forest transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-hakimi-sage selection:text-white bg-hakimi-cream">
      <Navbar />
      <CartSidebar />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Featured Products Section */}
        {displayFeatured.length > 0 && (
          <section id="featured" className="py-16 bg-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1/2 bg-hakimi-sage/5 skew-y-3 transform origin-top-right z-0"></div>
             <div className="container mx-auto px-4 relative z-10">
              <div className="flex items-end justify-between mb-10 px-2">
                <div>
                  <span className="text-hakimi-terracotta font-bold tracking-widest uppercase text-xs md:text-sm">Handpicked Favorites</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-hakimi-forest mt-2">Wild Selection</h2>
                </div>
                <button 
                  onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-hakimi-sage hover:text-hakimi-terracotta font-semibold transition-colors text-sm md:text-base hidden md:block"
                >
                  View Full Collection →
                </button>
              </div>
              <FeaturedCarousel products={displayFeatured} />
             </div>
          </section>
        )}

        {/* All Products Grid Section */}
        <section id="collection" className="py-20 bg-hakimi-cream">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-hakimi-sage font-bold tracking-widest uppercase text-sm">Our Harvest</span>
              <h2 className="text-3xl md:text-4xl font-bold text-hakimi-forest">Traditional Healing</h2>
              <p className="text-gray-600 text-lg">
                Raw, potent, and deeply rooted in nature. Handcrafted remedies for modern wellness.
              </p>
              <div className="w-16 h-1 bg-hakimi-terracotta mx-auto rounded-full mt-6"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* About / Trust Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
             <div className="grid md:grid-cols-3 gap-8 text-center">
               <div className="p-8 bg-hakimi-cream/50 rounded-3xl border border-gray-100 hover:border-hakimi-sage/30 transition-all group">
                 <div className="w-16 h-16 bg-hakimi-sage/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform">🪵</div>
                 <h3 className="text-xl font-bold text-hakimi-forest mb-2">Wild Harvested</h3>
                 <p className="text-gray-600 leading-relaxed">Sourced from untouched landscapes to ensure the raw energy of the earth remains intact.</p>
               </div>
               <div className="p-8 bg-hakimi-cream/50 rounded-3xl border border-gray-100 hover:border-hakimi-sage/30 transition-all group">
                 <div className="w-16 h-16 bg-hakimi-sage/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform">⚗️</div>
                 <h3 className="text-xl font-bold text-hakimi-forest mb-2">Ancient Methods</h3>
                 <p className="text-gray-600 leading-relaxed">We use time-tested extraction processes that respect the plant's natural rhythm.</p>
               </div>
               <div className="p-8 bg-hakimi-cream/50 rounded-3xl border border-gray-100 hover:border-hakimi-sage/30 transition-all group">
                 <div className="w-16 h-16 bg-hakimi-sage/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform">🏺</div>
                 <h3 className="text-xl font-bold text-hakimi-forest mb-2">Batch Crafted</h3>
                 <p className="text-gray-600 leading-relaxed">Every bottle is filled by hand in small batches to maintain potency and purity.</p>
               </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="bg-hakimi-forest text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
             <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-hakimi-cream">
                  <span className="bg-hakimi-terracotta w-2 h-8 rounded-full block"></span>
                  Hakimi Herbals
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Deeply rooted in the wisdom of the earth. We bring the healing power 
                  of the wild directly to your home.
                </p>
                <button 
                  onClick={() => setIsAdminOpen(true)}
                  className="mt-6 text-xs text-gray-500 hover:text-hakimi-sage flex items-center gap-1.5 transition-colors uppercase tracking-widest font-bold"
                >
                  <Settings className="w-3 h-3" /> Owner Portal
                </button>
             </div>
             <div>
               <h3 className="text-lg font-semibold mb-4 text-hakimi-sage">Exploration</h3>
               <ul className="space-y-2 text-gray-400">
                 <li>
                   <button onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-hakimi-cream transition-colors">
                     Full Apothecary
                   </button>
                 </li>
                 <li>
                   <button onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-hakimi-cream transition-colors">
                     Seasonal Picks
                   </button>
                 </li>
                 <li><a href="#" className="hover:text-hakimi-cream transition-colors">Reach Out</a></li>
               </ul>
             </div>
             <div>
               <h3 className="text-lg font-semibold mb-4 text-hakimi-sage">Connection</h3>
               <p className="text-gray-400">Join our community for traditional health wisdom and seasonal updates.</p>
               <div className="mt-4 text-hakimi-terracotta font-bold space-y-1">
                 <div>+92 3336645253</div>
                 <div>+92 3003614552</div>
                 <div>+92 3333699205</div>
               </div>
             </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Hakimi Herbals. Rooted in Nature.</p>
            <p className="flex items-center gap-1">Crafted with <span className="text-hakimi-terracotta">🍂</span> for Life</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;