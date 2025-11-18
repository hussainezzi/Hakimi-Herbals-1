import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { toggleCart } from '../store/cartSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-hakimi-green/30 h-28 transition-all duration-300">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <img 
            src="https://res.cloudinary.com/de0cllasz/image/upload/v1763403401/Generated_Image_November_17__2025_-_11_14PM-removebg-preview_fzcixa.png" 
            alt="Hakimi Herbals Logo" 
            className="h-24 w-auto object-contain transition-transform group-hover:scale-105 duration-300 drop-shadow-sm"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-bold text-hakimi-text tracking-tight">
              Hakimi Herbals
            </h1>
            <span className="text-xs text-hakimi-aqua font-medium tracking-widest uppercase">Pure • Natural • Healing</span>
          </div>
        </div>

        {/* Navigation & Cart */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => dispatch(toggleCart())}
            className="relative group p-2"
            aria-label="Open cart"
          >
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-hakimi-aqua text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-md transform scale-0 transition-transform duration-200 group-hover:scale-110" style={{ transform: totalItems > 0 ? 'scale(1)' : 'scale(0)' }}>
              {totalItems}
            </div>
            <ShoppingBag className="w-7 h-7 text-hakimi-text transition-colors group-hover:text-hakimi-aqua" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;