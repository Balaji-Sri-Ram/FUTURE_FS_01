const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce')
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.log(err));

const products = [
    {
        name: "Cyber Sneakers",
        price: 120,
        description: "Anti-gravity soles with neon accents.",
        category: "Footwear",
        color: "#f43f5e",
        iconType: "sneaker",
        animationType: "float"
    },
    {
        name: "Quantum Headset",
        price: 299,
        description: "Immersive audio with holographic display.",
        category: "Electronics",
        color: "#3b82f6",
        iconType: "headset",
        animationType: "pulse"
    },
    {
        name: "Void Watch",
        price: 150,
        description: "Projects time into mid-air.",
        category: "Accessories",
        color: "#8b5cf6",
        iconType: "watch",
        animationType: "spin"
    },
    {
        name: "Plasma Lamp",
        price: 45,
        description: "Interactive energy field for your desk.",
        category: "Home",
        color: "#10b981",
        iconType: "lamp",
        animationType: "float"
    },
    {
        name: "Levitating Speaker",
        price: 180,
        description: "Floating sound system with bass boost.",
        category: "Electronics",
        color: "#f59e0b",
        iconType: "speaker",
        animationType: "bounce"
    },
    {
        name: "Neural Interface",
        price: 999,
        description: "Direct brain-computer connection.",
        category: "Tech",
        color: "#ec4899",
        iconType: "brain",
        animationType: "pulse"
    },
    {
        name: "Stealth Trainers",
        price: 145,
        description: "Silent animated tread for stealth movement.",
        category: "Footwear",
        color: "#6366f1",
        iconType: "sneaker",
        animationType: "float"
    },
    {
        name: "Holo Emitter",
        price: 220,
        description: "Room-scale holographic projection unit.",
        category: "Home",
        color: "#06b6d4",
        iconType: "lamp",
        animationType: "spin"
    }
];

const seedDB = async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Database Seeded!');
    mongoose.disconnect();
};

seedDB();
