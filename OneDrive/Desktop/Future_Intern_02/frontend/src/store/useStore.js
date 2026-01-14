import { create } from 'zustand';

const useStore = create((set) => ({
    cart: [],
    addToCart: (product) => set((state) => {
        const existing = state.cart.find((item) => item.product._id === product._id);
        if (existing) {
            return {
                cart: state.cart.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };
        }
        return { cart: [...state.cart, { product, quantity: 1 }] };
    }),
    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.product._id !== productId),
    })),
    updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
        ),
    })),
    // Theme State
    theme: 'dark',
    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        return { theme: newTheme };
    }),
}));

export default useStore;
