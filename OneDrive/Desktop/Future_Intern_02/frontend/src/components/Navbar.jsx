import React from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ toggleCart }) => {
    const cart = useStore((state) => state.cart);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-background/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    NEON SHOP
                </Link>

                <div className="flex items-center space-x-6">
                    <div className="relative group hidden sm:block">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-surface text-sm px-4 py-2 rounded-full border border-white/10 focus:border-primary focus:outline-none w-64 transition-all"
                        />
                        <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>

                    <ThemeToggle />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleCart}
                        className="relative p-2 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-black/5 rounded-full transition-colors"
                    >
                        <ShoppingCart className="w-6 h-6 text-text" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </motion.button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
