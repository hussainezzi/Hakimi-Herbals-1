import React, { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { CustomerDetails, CartItem } from '../types';
import { generateWhatsAppLink } from '../services/whatsapp';
import { submitOrderToSheet } from '../services/googleSheets';
import { useDispatch } from 'react-redux';
import { clearCart, setCartOpen } from '../store/cartSlice';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, total }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<CustomerDetails>({
    name: '',
    whatsapp: '',
    address: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      customer: formData,
      items,
      total,
      date: new Date().toISOString()
    };

    // 1. Submit to Google Sheets
    await submitOrderToSheet(orderData);

    // 2. Generate WhatsApp Link
    const link = generateWhatsAppLink(formData, items, total);

    // 3. Open WhatsApp
    window.open(link, '_blank');

    // 4. Cleanup
    setIsSubmitting(false);
    dispatch(clearCart());
    dispatch(setCartOpen(false));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-hakimi-text/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up transform transition-all">
        <div className="bg-gradient-to-r from-hakimi-aqua to-[#68aead] p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Checkout</h2>
            <p className="text-hakimi-white/90 text-sm">Complete your order</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-hakimi-aqua focus:ring-2 focus:ring-hakimi-aqua/20 outline-none transition-all"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
            <input
              required
              type="tel"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-hakimi-aqua focus:ring-2 focus:ring-hakimi-aqua/20 outline-none transition-all"
              placeholder="e.g. 9876543210"
              value={formData.whatsapp}
              onChange={e => setFormData({...formData, whatsapp: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              required
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-hakimi-aqua focus:ring-2 focus:ring-hakimi-aqua/20 outline-none transition-all"
              placeholder="e.g. john@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
            <textarea
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-hakimi-aqua focus:ring-2 focus:ring-hakimi-aqua/20 outline-none transition-all resize-none"
              placeholder="Full street address..."
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-hakimi-aqua hover:bg-[#68aead] text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 transform active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  Place Order via WhatsApp <Send className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              Order details will be drafted in your WhatsApp.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;