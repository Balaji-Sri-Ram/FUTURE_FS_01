import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, CreditCard, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import axios from 'axios';
import canvasConfetti from 'canvas-confetti';

const Checkout = () => {
    const { cart, clearCart } = useStore();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fireConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            canvasConfetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
            canvasConfetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
            return;
        }

        setLoading(true);
        // Simulate API call and payment processing
        try {
            await axios.post('http://localhost:5000/api/orders', {
                items: cart.map(item => ({ product: item.product._id, quantity: item.quantity })),
                totalAmount: total,
                customer: {
                    name: formData.name,
                    email: formData.email,
                    address: formData.address
                }
            });

            setTimeout(() => {
                setLoading(false);
                setSuccess(true);
                fireConfetti();
                clearCart();
            }, 2000);
        } catch (error) {
            console.error('Checkout failed', error);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/40"
                >
                    <Check className="w-12 h-12 text-white" />
                </motion.div>

                <h1 className="text-4xl font-bold font-display mb-4 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                    Payment Successful!
                </h1>
                <p className="text-gray-400 mb-8 max-w-md">
                    Thank you for your purchase. Your order has been confirmed and will be shipped shortly.
                </p>

                <Link
                    to="/"
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-all"
                >
                    Continue Shopping
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form Section */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-surface p-8 rounded-3xl border border-white/5 shadow-2xl"
                >
                    <div className="flex items-center space-x-4 mb-8">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 1 ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'}`}>1</div>
                        <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-white/10'}`} />
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 2 ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'}`}>2</div>
                    </div>

                    <h1 className="text-3xl font-display font-bold mb-6">
                        {step === 1 ? 'Shipping Details' : 'Payment Method'}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode='wait'>
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                        <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Address</label>
                                        <textarea required name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="123 Future St, Tech City" rows="3" />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Card Holder</label>
                                        <input required name="cardName" value={formData.cardName} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Card Number</label>
                                        <div className="relative">
                                            <input required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="0000 0000 0000 0000" />
                                            <CreditCard className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Expiry Date</label>
                                            <input required name="expiry" value={formData.expiry} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="MM/YY" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">CVC</label>
                                            <input required name="cvc" value={formData.cvc} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="123" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                            ) : (
                                step === 1 ? 'Continue to Payment' : `Pay $${total.toFixed(2)}`
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* Order Summary */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lg:pl-8"
                >
                    <div className="bg-white/5 rounded-3xl p-6 border border-white/10 sticky top-24">
                        <h2 className="text-xl font-bold mb-6 flex items-center">
                            <ShoppingBag className="w-5 h-5 mr-2" /> Order Summary
                        </h2>

                        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                            {cart.map(item => (
                                <div key={item.product._id} className="flex gap-4">
                                    <div
                                        className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: `linear-gradient(135deg, ${item.product.color}20 0%, transparent 100%)` }}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full opacity-80"
                                            style={{ backgroundColor: item.product.color }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm">{item.product.name}</h4>
                                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-mono font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-white/10 space-y-2">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-4 text-white">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Checkout;
