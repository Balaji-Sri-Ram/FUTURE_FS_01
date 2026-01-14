import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity } = useStore();
    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const navigate = useNavigate();

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l border-white/10 z-50 p-6 shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-display font-bold">Your Cart</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                                    <span className="text-6xl">🛒</span>
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                cart.map(({ product, quantity }) => (
                                    <motion.div
                                        layout
                                        key={product._id}
                                        className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"
                                    >
                                        <div
                                            className="w-20 h-20 rounded-xl flex items-center justify-center"
                                            style={{ background: `linear-gradient(135deg, ${product.color}20 0%, transparent 100%)` }}
                                        >
                                            <div
                                                className="w-10 h-10 rounded-full opacity-80"
                                                style={{ backgroundColor: product.color }}
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold truncate">{product.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(product._id)}
                                                    className="text-gray-400 hover:text-accent transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                <p className="font-mono text-primary">${product.price}</p>
                                                <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(product._id, Math.max(1, quantity - 1))}
                                                        className="text-gray-400 hover:text-white"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="text-sm font-bold w-4 text-center">{quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(product._id, quantity + 1)}
                                                        className="text-gray-400 hover:text-white"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="font-mono text-primary">${total.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={cart.length === 0}
                                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
                            >
                                Checkout
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
