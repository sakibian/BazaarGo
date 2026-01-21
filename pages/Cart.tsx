
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onUpdateQty, onRemove }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
        <div className="bg-gray-100 p-8 rounded-full mb-6">
          <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <h2 className="text-xl font-black mb-2">Your cart is empty</h2>
        <p className="text-gray-500 text-sm mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/"
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold w-full text-center"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-40 pt-20 px-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-black mb-6">Shopping Cart</h2>
      
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 shadow-sm">
            <img src={item.image} className="w-20 h-20 rounded-xl object-cover shrink-0" alt={item.name} />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-gray-800 leading-tight">{item.name}</h3>
                <button onClick={() => onRemove(item.id)} className="text-gray-300">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-indigo-600 font-bold text-sm mt-1">৳{item.price.toLocaleString()}</p>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded-lg">
                  <button onClick={() => onUpdateQty(item.id, -1)} className="p-1"><Minus size={14} /></button>
                  <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)} className="p-1"><Plus size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 space-y-3 pb-20">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Subtotal</span>
          <span className="font-bold">৳{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Delivery Fee</span>
          <span className="font-bold text-green-600">FREE</span>
        </div>
        <div className="border-t border-dashed pt-3 mt-3 flex justify-between">
          <span className="font-black text-lg">Total</span>
          <span className="font-black text-lg text-indigo-600">৳{subtotal.toLocaleString()}</span>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-4 max-w-lg mx-auto z-40 pb-safe">
        <Link 
          to="/checkout"
          className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-transform"
        >
          Proceed to Checkout
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};
