const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        }
    ],
    totalAmount: { type: Number, required: true },
    customer: {
        name: String,
        email: String,
        address: String
    },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
