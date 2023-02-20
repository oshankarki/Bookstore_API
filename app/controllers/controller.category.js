const Category = require('../models/model.category');


require('dotenv').config();

// @desc    Get all categories
// @route   GET /api/v1/category
exports.list = async(req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            count: categories.length,
            message: "",
            data: categories,
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
        const { title } = req.body;

        const category = await Category.create({
            title,
        });
        res.status(200).json({
            success: true,
            message: "Category created successfully",
            data: category
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
        await Category.deleteOne({ id });
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}