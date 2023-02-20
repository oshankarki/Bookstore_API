const { string } = require('joi');
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    expire_date: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    discount_percent: {
        type: String,
        required: true
    },
    max_amount: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Coupon', couponSchema);