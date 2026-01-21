
import React, { useState, useMemo } from 'react';
import { MemoryRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { BottomNav } from './components/BottomNav';
import { InstallPrompt } from './components/InstallPrompt';
import { AIChatBot } from './components/AIChatBot';
import { CartItem, Product } from './types';
import { ShoppingBag, Search, User, Menu, X, ArrowLeft } from 'lucide-react';
import { HERO_PRODUCTS } from './constants';

const MainLayout: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const showNavbar = !['/checkout'].includes(location.pathname);

  // Search logic
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return HERO_PRODUCTS;
    const lowerQuery = searchQuery.toLowerCase();
    return HERO_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Universal Desktop/Mobile Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl h-16 flex items-center justify-between px-4 md:px-12 z-[100] border-b border-gray-100 transition-all">
        <div className="flex items-center gap-2 lg:gap-4">
          <button className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-indigo-600">
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 h-9 w-9 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <ShoppingBag size={20} />
            </div>
            <span className="font-black text-xl md:text-2xl tracking-tighter text-gray-900">BazaarGo</span>
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden lg:flex flex-1 max-w-md mx-12">
           <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search premium gadgets..." 
                className="w-full bg-gray-100 rounded-2xl py-2.5 pl-12 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
           </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
           <Link to="/search" className="p-2 text-gray-400 hover:text-indigo-600 transition-colors hidden md:block">
              <Search size={22} />
           </Link>
           <Link to="/cart" className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors">
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
           </Link>
           <Link to="/profile" className="bg-gray-50 p-1.5 rounded-2xl border border-gray-100 flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="h-7 w-7 rounded-lg bg-indigo-100 overflow-hidden shrink-0">
                <img src="https://picsum.photos/seed/user/100/100" alt="user" />
              </div>
              <span className="hidden md:block text-xs font-black text-gray-700 pr-2">Tanvir R.</span>
           </Link>
        </div>
      </div>

      <InstallPrompt />
      <AIChatBot />
      
      <main className="transition-all duration-300">
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} customFilteredProducts={filteredProducts} />} />
          <Route path="/product/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart items={cart} onUpdateQty={updateCartQty} onRemove={removeFromCart} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={
            <div className="pt-24 px-4 max-w-7xl mx-auto">
               <div className="lg:hidden mb-6">
                 <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Find gadgets, home decor..." 
                      className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                 </div>
               </div>
               <Home onAddToCart={handleAddToCart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} customFilteredProducts={filteredProducts} hideHero />
            </div>
          } />
          <Route path="/profile" element={
            <div className="pt-24 pb-24 px-6 max-w-lg mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="p-2 -ml-2 text-gray-400"><ArrowLeft size={24} /></Link>
                <h1 className="text-3xl font-black">Your Profile</h1>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mb-8 text-center">
                <div className="relative inline-block mb-6">
                  <img src="https://picsum.photos/seed/user/200/200" className="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-xl" />
                  <div className="absolute bottom-0 right-0 h-8 w-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white border-4 border-white">
                    <User size={14} />
                  </div>
                </div>
                <h2 className="text-xl font-black text-gray-900">Tanvir Rahman</h2>
                <p className="text-sm font-bold text-indigo-500 mt-1 uppercase tracking-widest">Premium Member</p>
                
                <div className="grid grid-cols-3 gap-2 mt-8">
                  <div className="bg-gray-50 p-3 rounded-2xl">
                    <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-tighter">Orders</p>
                    <p className="text-lg font-black text-gray-900">12</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl">
                    <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-tighter">Points</p>
                    <p className="text-lg font-black text-gray-900">450</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl">
                    <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-tighter">Saved</p>
                    <p className="text-lg font-black text-gray-900">8</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Order History', count: '12' },
                  { name: 'Shipping Addresses', count: '2' },
                  { name: 'Payment Methods', count: 'bKash' },
                  { name: 'Notification Settings', count: 'On' },
                  { name: 'Help & Support', count: '' }
                ].map((item) => (
                  <button key={item.name} className="w-full text-left p-5 bg-white rounded-3xl font-black text-sm flex items-center justify-between group hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                    <div className="flex flex-col">
                       <span>{item.name}</span>
                       {item.count && <span className="text-[10px] text-gray-400 font-bold uppercase group-hover:text-indigo-200">{item.count}</span>}
                    </div>
                    <div className="h-8 w-8 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-indigo-500">
                      <ShoppingBag size={14} />
                    </div>
                  </button>
                ))}
              </div>
              <Link 
                to="/"
                className="block text-center w-full mt-12 py-4 text-red-500 font-black border-2 border-red-50 rounded-2xl hover:bg-red-50 transition-colors"
              >
                Logout
              </Link>
            </div>
          } />
        </Routes>
      </main>

      {/* Mobile Only Bottom Nav */}
      <div className="lg:hidden">
        {showNavbar && <BottomNav cartCount={totalItems} />}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

export default App;
