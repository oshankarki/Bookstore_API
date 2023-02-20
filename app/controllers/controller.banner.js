const Banner = require('../models/model.banner');
const upload = require('../helpers/fileUploadHelper');


require('dotenv').config();

// @desc    Get all banner
// @route   GET /api/v1/banner
exports.list = async(req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({
            success: true,
            count: banners.length,
            message: "",
            data: banners,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}

// @route   POST /api/v1/banner
exports.store = async(req, res) => {
    try {
        const { title, expire_date } = req.body;
        const image = await upload(req.files.image, "banners");

        const banner = await Banner.create({
            title,
            expire_date,
            image,

        });
        res.status(200).json({
            success: true,
            message: "Banner created successfully",
            data: banner
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }

}


// @desc    Delete specific banner
// @route   DELETE /api/v1/banner
exports.destroy = async(req, res) => {
    const { id } = req.params;
    try {
        await Banner.deleteOne({ id });
        res.status(200).json({
            success: true,
            message: "Banner deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}