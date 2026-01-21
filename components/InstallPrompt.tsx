
import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InstallPrompt: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-4 left-4 right-4 bg-white shadow-2xl rounded-2xl p-4 border border-blue-100 z-[100] flex items-center gap-4"
      >
        <div className="bg-blue-600 h-12 w-12 rounded-xl flex items-center justify-center text-white shrink-0">
          <Download size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900">Install BazaarGo</h3>
          <p className="text-xs text-gray-500">Get a native app experience on your phone.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShow(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold"
          >
            Install
          </button>
          <button 
            onClick={() => setShow(false)}
            className="text-gray-400 p-1"
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
