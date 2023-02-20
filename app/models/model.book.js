// book.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = require('./model.category');
const authorSchema = require('./model.author');

const bookSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: String },
    category: {
        title: { type: String, required: true },
    },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true }
});


module.exports = mongoose.model('Book', bookSchema);