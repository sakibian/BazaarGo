
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HERO_PRODUCTS } from '../constants';
import { ArrowLeft, Star, ShoppingCart, ShieldCheck, Truck, RefreshCcw, CheckCircle, Sparkles, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { getProductInsight } from '../lib/gemini';

interface ProductDetailsProps {
  onAddToCart: (p: Product) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ onAddToCart }) => {
  const { id } = useParams();
  const product = HERO_PRODUCTS.find(p => p.id === id);
  const [aiInsight, setAiInsight] = useState<{ text: string; sources: any[] } | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (product) {
      const fetchInsight = async () => {
        setLoadingAI(true);
        try {
          const insight = await getProductInsight(product.name);
          setAiInsight(insight);
        } catch (e) {
          console.error("AI Insight failed", e);
        } finally {
          setLoadingAI(false);
        }
      };
      fetchInsight();
    }
  }, [product?.id]);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="pb-32 pt-4 px-0 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="px-4 mb-4 flex justify-between items-center fixed top-4 left-0 right-0 z-50 max-w-7xl mx-auto pointer-events-none">
        <Link 
          to="/"
          className="p-3 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 pointer-events-auto active:scale-90 transition-transform flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:px-8 lg:pt-16">
        <div className="lg:w-1/2">
          <div className="aspect-square w-full lg:rounded-[3rem] overflow-hidden shadow-2xl">
            <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
          </div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="px-6 py-8 -mt-10 lg:mt-0 bg-white rounded-t-[40px] lg:rounded-[3rem] lg:w-1/2 relative shadow-2xl lg:shadow-none lg:border lg:border-gray-100"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{product.category}</span>
                {product.badge && <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[10px] font-black uppercase">{product.badge}</span>}
              </div>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">{product.name}</h1>
            </div>
            <div className="flex flex-col items-end">
               <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-xl">
                 <Star size={16} className="fill-yellow-400 text-yellow-400" />
                 <span className="font-black text-yellow-700">{product.rating}</span>
               </div>
               <span className="text-[10px] text-gray-400 mt-2 font-bold uppercase">Community Fav</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-black text-indigo-600">৳{product.price.toLocaleString()}</span>
            <span className="text-lg text-gray-300 line-through">৳{(product.price * 1.2).toFixed(0)}</span>
          </div>

          <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* AI INSIGHT SECTION */}
          <div className="mb-8 p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 text-indigo-200">
               <Sparkles size={40} />
             </div>
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                    <Sparkles size={14} />
                  </div>
                  <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest">Gemini Smart Insight</h3>
                </div>
                
                {loadingAI ? (
                  <div className="flex items-center gap-2 py-2">
                    <Loader2 size={16} className="animate-spin text-indigo-400" />
                    <span className="text-xs font-bold text-indigo-400 italic">Analyzing latest trends...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium text-indigo-800 leading-relaxed">
                      {aiInsight?.text || "BazaarGo AI is gathering data for this product."}
                    </p>
                    {aiInsight?.sources && aiInsight.sources.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {aiInsight.sources.map((chunk: any, i: number) => chunk.web && (
                          <a key={i} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black bg-white/50 text-indigo-600 py-1 px-3 rounded-full flex items-center gap-1 hover:bg-white transition-colors">
                            Source {i + 1} <ExternalLink size={10} />
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <ShieldCheck className="text-indigo-600" size={24} />
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-black">Warranty</p>
                <p className="text-xs font-bold">{product.warranty || '7 Days'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <Truck className="text-indigo-600" size={24} />
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-black">Delivery</p>
                <p className="text-xs font-bold">24-48 Hours</p>
              </div>
            </div>
          </div>

          <div className="lg:mt-12 flex items-center justify-between gap-6">
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 shadow-2xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
            >
              <ShoppingCart size={22} />
              Add to Cart
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
