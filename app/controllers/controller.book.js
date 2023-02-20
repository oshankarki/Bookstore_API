const Book = require('../models/model.book');
const upload = require('../helpers/fileUploadHelper');


require('dotenv').config();

// @desc    Get all books
// @route   GET /api/v1/book
exports.list = async(req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            success: true,
            count: books.length,
            message: "",
            data: books,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}

// @route   POST /api/v1/book
exports.store = async(req, res) => {
    try {
        const { title, author, price, discount, category } = req.body;
        const image = await upload(req.files.image, "books");

        const book = new Book({
            title,
            author,
            price,
            discount,
            image,
            category
        });

        await book.save();

        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    } catch (err) {
        console.log(err); // log the error to the console
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}


// @desc    Delete specific book
// @route   DELETE /api/v1/book
exports.destroy = async(req, res) => {
    const { id } = req.params;
    try {
        await Book.deleteOne({ id });
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}