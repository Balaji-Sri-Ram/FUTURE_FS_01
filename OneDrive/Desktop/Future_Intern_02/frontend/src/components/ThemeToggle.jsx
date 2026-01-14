import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useStore();

    // Initialize theme on mount
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${theme === 'dark'
                    ? 'bg-white/10 text-yellow-400 hover:bg-white/20'
                    : 'bg-black/5 text-orange-500 hover:bg-black/10'
                }`}
        >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>
    );
};

export default ThemeToggle;
