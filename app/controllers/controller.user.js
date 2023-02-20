const User = require('../models/model.user');
require('dotenv').config();

// @desc    Get all users
// @route   GET /api/v1/user
exports.list = async (req, res) => {
    try{
        const users = await User.find().select("-password");
        res.status(200).json({
            success: true,
            count: users.length,
            message: "",
            data: users,
        });
    }catch(err)
    {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}

// @desc    Add admin user
// @route   POST /api/v1/user
exports.store = async(req, res) => {
    try{
        const { name, email } = req.body;
        const password = process.env.DEFAULT_PASSWORD || "DEFAULT"
        const user = await User.create({
            name,
            email,
            password,
            role: "admin"
        });
        res.status(200).json({
            success: true,
            message: "Admin created successfully",
            data: user
        });
    }catch(err)
    {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }

}

// @desc    Add normal user
// @route   POST /api/v1/register
exports.register = async(req, res) => {
    try{
        const { name, email, password } = req.body;

        const userExists = await User.countDocuments({email});
        
        if(userExists > 0)
        {
            return res.status(400).json({
                success: false,
                message: "User already exists",
                error: {
                    "email": "Email already exists"
                }
            })
        }

        const user = await User.create({
            name,
            email,
            password,
            role: "user"
        });
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    }catch(err)
    {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}

// @desc    Delete specific user
// @route   DELETE /api/v1/user
exports.destroy = async(req, res) => {
    const { id } = req.params;
    try{
        await User.deleteOne({id});
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }catch(err)
    {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}