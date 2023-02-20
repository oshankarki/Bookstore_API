const Author = require('../models/model.author');

require('dotenv').config();

// @desc    Get all authors
// @route   GET /api/v1/author
exports.list = async(req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json({
            success: true,
            message: "",
            data: authors,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}

// @route   POST /api/v1/author
exports.store = async(req, res) => {
    try {
        const { name, address } = req.body;

        const author = await Author.create({
            name,
            address,

        });
        res.status(200).json({
            success: true,
            message: "Author created successfully",
            data: author
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }

}


// @desc    Delete specific author
// @route   DELETE /api/v1/author
exports.destroy = async(req, res) => {
    const { id } = req.params;
    try {
        await Author.deleteOne({ _id: id });
        res.status(200).json({
            success: true,
            message: "Author deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}