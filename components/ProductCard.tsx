import React from 'react';
import { Product } from '../types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Plus, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <div className="relative h-64 overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <div className="bg-white p-2 rounded-full shadow-md">
            <ShoppingCart className="w-5 h-5 text-hakimi-aqua" />
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-hakimi-green/90 backdrop-blur-sm text-hakimi-text text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {product.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-hakimi-text mb-2 group-hover:text-hakimi-aqua transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-hakimi-text">
            Rs. {product.price}
          </span>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-hakimi-aqua hover:bg-hakimi-text text-white px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 active:scale-95 shadow-hakimi-aqua/20 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;