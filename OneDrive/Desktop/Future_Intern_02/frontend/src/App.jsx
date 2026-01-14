import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './pages/Checkout'; // We'll create this next

// Page Wrappers matching design
const Home = () => (
  <div className="container mx-auto px-6 pt-32 pb-20">
    <div className="text-center mb-16 space-y-4">
      <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Future Retail
        </span>
      </h1>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
        Experience the next generation of shopping with immersive interactive products.
      </p>
    </div>
    <ProductList />
  </div>
);

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-background text-white selection:bg-primary/30">
        <Navbar toggleCart={() => setIsCartOpen(true)} />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
