const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
    });

app.get('/', (req, res) => {
    res.send('API is running...');
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
    server.close(() => console.log('Server terminated'));
});
