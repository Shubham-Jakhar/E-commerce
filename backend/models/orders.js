const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        item : { type: mongoose.Schema.Types.ObjectId, ref: 'Items' },
        size: String,
        quantity: Number,
        price: Number,
        status: { type: String, default: 'pending' },
    }],
    totalAmount: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("OrderSchema", ordersSchema);