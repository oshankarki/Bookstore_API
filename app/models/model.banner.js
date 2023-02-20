const { string } = require('joi');
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    expire_date: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Banner', bannerSchema);