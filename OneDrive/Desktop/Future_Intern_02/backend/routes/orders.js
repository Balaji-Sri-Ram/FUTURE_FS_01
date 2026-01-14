const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders
router.post('/', async (req, res) => {
    const { items, totalAmount, customer } = req.body;
    try {
        const newOrder = new Order({ items, totalAmount, customer });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
