const Coupon = require('../models/model.coupon');


require('dotenv').config();

// @desc    Get all categories
// @route   GET /api/v1/category
exports.list = async(req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json({
            success: true,
            count: coupons.length,
            message: "",
            data: coupons,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}

// @route   POST /api/v1/category
exports.store = async(req, res) => {
    try {
        const {
            title,
            code,
            expire_date,
            start_date,
            discount_percent,
            max_amount
        } = req.body;

        const coupon = await Coupon.create({
            title,
            code,
            expire_date,
            start_date,
            discount_percent,
            max_amount

        });
        res.status(200).json({
            success: true,
            message: "Coupon created successfully",
            data: coupon
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }

}


// @desc    Delete specific category
// @route   DELETE /api/v1/category
exports.destroy = async(req, res) => {
    const { id } = req.params;
    try {
        await Coupon.deleteOne({ id });
        res.status(200).json({
            success: true,
            message: "Coupon deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}