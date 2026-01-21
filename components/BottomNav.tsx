
import React from 'react';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface BottomNavProps {
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ cartCount }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 pb-safe">
      <Link 
        to="/"
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-indigo-600' : 'text-gray-400'}`}
      >
        <Home size={22} strokeWidth={isActive('/') ? 2.5 : 2} />
        <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
      </Link>
      
      <Link 
        to="/search"
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/search') ? 'text-indigo-600' : 'text-gray-400'}`}
      >
        <Search size={22} strokeWidth={isActive('/search') ? 2.5 : 2} />
        <span className="text-[10px] font-medium uppercase tracking-wider">Search</span>
      </Link>

      <Link 
        to="/cart"
        className={`relative flex flex-col items-center gap-1 transition-colors ${isActive('/cart') ? 'text-indigo-600' : 'text-gray-400'}`}
      >
        <ShoppingBag size={22} strokeWidth={isActive('/cart') ? 2.5 : 2} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-medium uppercase tracking-wider">Cart</span>
      </Link>

      <Link 
        to="/profile"
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/profile') ? 'text-indigo-600' : 'text-gray-400'}`}
      >
        <User size={22} strokeWidth={isActive('/profile') ? 2.5 : 2} />
        <span className="text-[10px] font-medium uppercase tracking-wider">Profile</span>
      </Link>
    </nav>
  );
};
