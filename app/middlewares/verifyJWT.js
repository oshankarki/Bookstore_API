const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/model.user');

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if(authHeader){
        const token = authHeader.split(' ')[1]; //Bearer token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if(err) return res.status(403).send({
                success: false,
                message: 'Invalid token',
                error: err.message
            });
            try{
                user = await User.findById(user.sub);
                req.user = user;
                next();
            }catch(err){
                return res.status(403).send({
                    success: false,
                    message: 'Invalid token',
                    error: err.message
                });
            }
        });
    }else{
        return res.status(401).send({
            success: false,
            message: 'No token provided',
            error: 'Authorization token is missing'
        });
    }
}

module.exports = verifyJWT;
