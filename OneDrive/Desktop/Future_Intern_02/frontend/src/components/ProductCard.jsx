import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import useStore from '../store/useStore';
import ProductIcon from './ProductIcons';

const ProductCard = ({ product }) => {
    const addToCart = useStore((state) => state.addToCart);

    // Determine animation style
    const getAnimation = () => {
        switch (product.animationType) {
            case 'spin': return { rotateY: 360 };
            case 'bounce': return { y: [0, -15, 0] };
            case 'pulse': return { scale: [1, 1.05, 1] };
            case 'float':
            default: return { y: [0, -10, 0] };
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
            viewport={{ once: true }}
            className="group relative bg-surface/50 dark:bg-surface/50 bg-opacity-80 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-3xl p-6 flex flex-col items-center gap-4 transition-all hover:border-primary/50 hover:shadow-2xl perspective-1000 overflow-hidden"
        >
            {/* Glow Effect Background */}
            <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${product.color}20 0%, transparent 70%)`
                }}
            />

            <div className="absolute top-4 right-4 z-20">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-600 dark:text-gray-300">
                    {product.category}
                </span>
            </div>

            <div className="py-8 transform-style-3d relative z-10 w-full flex justify-center">
                <motion.div
                    className="w-48 h-48 relative flex items-center justify-center"
                    animate={getAnimation()}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Icon Render */}
                    <div className="w-40 h-40 filter drop-shadow-2xl transition-all duration-300 group-hover:scale-110">
                        <ProductIcon type={product.iconType} color={product.color} />
                    </div>

                    {/* Floor Reflection/Shadow */}
                    <div className="absolute -bottom-8 w-24 h-4 bg-black/20 rounded-[100%] blur-md group-hover:w-32 transition-all duration-500" />
                </motion.div>
            </div>

            <div className="w-full space-y-2 relative z-10">
                <h3 className="text-xl font-bold font-display text-text group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-text">
                        ${product.price}
                    </span>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(product)}
                        className="p-3 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/80 transition-colors z-20"
                    >
                        <Plus className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
