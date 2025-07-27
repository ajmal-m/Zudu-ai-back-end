const jwt = require('jsonwebtoken');
const User = require('../models/User.model.js');


module.exports.protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;

        if(!token) return res.status(401).json({ message:"Unauthorized - No Token Provided"});
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        if(!decoded){
           return res.status(401).json({message:"Unauthorized - Invalid Token"});
        }
        const user = await User.findById(decoded.user._id).select("-password");

        if(!user){
            return res.status(404).json({ message:"User is not found"})
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message:"Internal Server Error"});
    }
}

module.exports.adminValidation = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;

        if(!token) return res.status(401).json({ message:"Unauthorized - No Token Provided"});
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        if(!decoded){
           return res.status(401).json({message:"Unauthorized - Invalid Token"});
        }
        console.log("Decoded: ", decoded);
        const user = await User.findById(decoded.user._id).select("-password");
        
        if(!user){
            return res.status(404).json({ message:"User is not found"})
        }
        req.user = user;
        if(user.role !== 'admin'){
            return res.status(403).json({ message:"Forbidden - Admin Access Required"});
        }
        next();
    } catch (error) {
        res.status(500).json({ message:"Internal Server Error"});
    }
}