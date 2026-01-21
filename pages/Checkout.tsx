
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { PAYMENT_METHODS } from '../constants';
import { motion } from 'framer-motion';
import { findNearbyPickups } from '../lib/gemini';

export const Checkout: React.FC = () => {
  const [payment, setPayment] = useState('bkash');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [nearbyHubs, setNearbyHubs] = useState<{ text: string; sources: any[] } | null>(null);
  const [loadingHubs, setLoadingHubs] = useState(false);

  useEffect(() => {
    const locateHubs = async () => {
      setLoadingHubs(true);
      try {
        // Mock coordinates for Uttara, Dhaka
        const insight = await findNearbyPickups(23.8759, 90.3795);
        setNearbyHubs(insight);
      } catch (e) {
        console.error("Hub location failed", e);
      } finally {
        setLoadingHubs(false);
      }
    };
    locateHubs();
  }, []);

  const handlePay = () => {
    setStatus('processing');
    setTimeout(() => setStatus('success'), 3000);
  };

  if (status === 'success') {
    return (
      <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center px-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-green-100 p-8 rounded-full mb-8"
        >
          <CheckCircle2 size={64} className="text-green-600" />
        </motion.div>
        <h1 className="text-2xl font-black mb-4">Order Placed!</h1>
        <p className="text-gray-500 mb-10">Your package will arrive within 24-48 hours. Thank you for shopping with BazaarGo.</p>
        <Link 
          to="/"
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center justify-center"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-32 pt-20 px-4 max-w-lg mx-auto">
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur px-4 h-16 flex items-center gap-4 z-40 max-w-lg mx-auto">
        <Link to="/cart" className="p-2 -ml-2 text-gray-400">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-black">Checkout</h1>
      </div>

      <div className="mb-8">
        <h2 className="text-sm font-black uppercase text-gray-400 mb-4 tracking-widest">Delivery Address</h2>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 mb-4">
          <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="font-bold text-sm">Tanvir Rahman</p>
            <p className="text-xs text-gray-500 mt-0.5">Uttara Sector 7, Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* AI Pick up hubs */}
        <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
           <div className="flex items-center gap-2 mb-3">
             <MapPin size={16} className="text-indigo-600" />
             <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-1.5">
               AI Hub Finder <Sparkles size={10} />
             </h3>
           </div>
           
           {loadingHubs ? (
              <div className="flex items-center gap-2 py-2">
                <Loader2 size={14} className="animate-spin text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-400 italic">Finding nearest points...</span>
              </div>
           ) : (
             <>
               <p className="text-[11px] font-medium text-indigo-700 leading-relaxed mb-3">
                 {nearbyHubs?.text || "Searching for pickup locations..."}
               </p>
               <div className="flex flex-wrap gap-2">
                  {nearbyHubs?.sources?.map((chunk: any, i: number) => chunk.maps && (
                    <a key={i} href={chunk.maps.uri} target="_blank" rel="noopener noreferrer" className="text-[9px] font-black bg-white text-indigo-600 py-1 px-3 rounded-full flex items-center gap-1">
                      Hub {i+1} <ExternalLink size={8} />
                    </a>
                  ))}
               </div>
             </>
           )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-sm font-black uppercase text-gray-400 mb-4 tracking-widest">Payment Method</h2>
        <div className="grid grid-cols-2 gap-3">
          {PAYMENT_METHODS.map(pm => (
            <button
              key={pm.id}
              onClick={() => setPayment(pm.id)}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col gap-2 items-center justify-center ${
                payment === pm.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100'
              }`}
            >
              <div className={`${pm.color} text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shadow-sm`}>
                {pm.icon}
              </div>
              <span className="text-xs font-bold text-gray-800">{pm.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 max-w-lg mx-auto z-50 pb-safe">
        <button 
          disabled={status === 'processing'}
          onClick={handlePay}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all disabled:opacity-70"
        >
          {status === 'processing' ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            `Pay with ${PAYMENT_METHODS.find(p => p.id === payment)?.name}`
          )}
        </button>
      </div>
    </div>
  );
};
