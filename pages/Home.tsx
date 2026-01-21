
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../constants';
import { ProductSkeleton } from '../components/Skeleton';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Sparkles, Zap, ShieldCheck, SearchX, Globe } from 'lucide-react';
import { Product } from '../types';

interface HomeProps {
  onAddToCart: (p: Product) => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  customFilteredProducts?: Product[];
  hideHero?: boolean;
}

export const Home: React.FC<HomeProps> = ({ onAddToCart, searchQuery = '', setSearchQuery, customFilteredProducts, hideHero = false }) => {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const displayedProducts = (customFilteredProducts || []).filter(p => 
    activeCategory === 'All' ? true : p.category === activeCategory
  );

  const getBadgeIcon = (type?: string) => {
    switch(type) {
      case 'Trend': return <Sparkles size={10} />;
      case 'Viral': return <Zap size={10} />;
      case 'Utility': return <ShieldCheck size={10} />;
      default: return null;
    }
  };

  const getBadgeColor = (type?: string) => {
    switch(type) {
      case 'Trend': return 'bg-purple-100 text-purple-600';
      case 'Viral': return 'bg-orange-100 text-orange-600';
      case 'Utility': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className={`pb-24 ${hideHero ? 'pt-4' : 'pt-20'} px-4 md:px-8 max-w-7xl mx-auto`}>
      {/* Hero Header */}
      {!hideHero && !searchQuery && (
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Globe size={10} /> AI Enhanced Experience
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Premium Utility <br/><span className="text-indigo-600">Problem Solvers</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-2 max-w-md">
              Handpicked products that upgrade your daily life. Now with Gemini intelligence to help you choose.
            </p>
          </div>
          
          <div className="hidden lg:flex gap-6 text-sm font-bold text-gray-400">
            <div className="flex flex-col">
              <span className="text-gray-900 text-lg">98%</span>
              <span>Happy Shoppers</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 text-lg">AI</span>
              <span>Powered Search</span>
            </div>
          </div>
        </div>
      )}

      {searchQuery && (
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-500">
              Results for "<span className="text-indigo-600">{searchQuery}</span>"
            </h2>
            <p className="text-xs text-gray-400 font-medium">{displayedProducts.length} items found locally</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-xs font-black hover:bg-indigo-100 transition-all">
            <Sparkles size={14} /> Search Global Trends
          </button>
        </div>
      )}

      {/* Category Slider */}
      <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4 sticky top-16 bg-gray-50/90 backdrop-blur-sm z-30 py-4 transition-all">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-8 py-2.5 rounded-2xl text-xs font-bold transition-all transform active:scale-95 ${
              activeCategory === cat 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 ring-2 ring-indigo-600 ring-offset-2' 
                : 'bg-white text-gray-500 border border-gray-100 hover:border-indigo-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {!loading && displayedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
           <div className="bg-gray-100 p-8 rounded-full mb-6">
              <SearchX size={48} className="text-gray-300" />
           </div>
           <h3 className="text-xl font-black mb-2">No local matches</h3>
           <p className="text-gray-500 text-sm max-w-xs mb-8">We couldn't find it in our warehouse. Let our AI find alternative trends for you.</p>
           <button 
             onClick={() => {setSearchQuery?.(''); setActiveCategory('All');}}
             className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2"
           >
             <Sparkles size={18} /> Ask AI Concierge
           </button>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mt-4">
        {loading ? (
          Array.from({ length: 10 }).map((_, i) => <ProductSkeleton key={i} />)
        ) : (
          displayedProducts.map((product, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              key={product.id}
              className="relative group h-full"
            >
              <Link
                to={`/product/${product.id}`}
                className="bg-white rounded-[2rem] p-3 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-2xl hover:shadow-indigo-50 transition-all cursor-pointer block"
              >
                <div className="aspect-square rounded-2xl overflow-hidden relative mb-4 bg-gray-50 group-hover:scale-[1.02] transition-transform">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {product.badge && (
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${getBadgeColor(product.badge)} shadow-sm`}>
                      {getBadgeIcon(product.badge)}
                      {product.badge}
                    </div>
                  )}
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-gray-400 hover:text-red-500 shadow-sm transition-colors"
                  >
                    <Heart size={16} />
                  </button>
                </div>
                
                <div className="px-2 flex-1 flex flex-col">
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-[11px] font-black text-gray-900">{product.rating}</span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-1 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 line-through">৳{(product.price * 1.2).toFixed(0)}</span>
                      <span className="text-base font-black text-indigo-600">৳{product.price.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="bg-indigo-600 text-white p-2.5 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-90 transition-all"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
