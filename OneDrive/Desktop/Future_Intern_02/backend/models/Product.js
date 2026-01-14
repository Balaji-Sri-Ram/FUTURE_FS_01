const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    color: { type: String, default: '#3b82f6' },
    iconType: { type: String, default: 'sneaker' }, // sneaker, headset, watch, lamp, speaker, brain
    animationType: { type: String, default: 'float' }, // float, spin, pulse
    inStock: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', productSchema);
