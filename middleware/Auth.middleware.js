const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


module.exports.protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;

        if(!token) return res.status(401).json({ message:"Unauthorized - No Token Provided"});
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        if(!decoded){
           return res.status(401).json({message:"Unauthorized - Invalid Token"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        
        if(!user){
            return res.status(404).json({ message:"User is not found"})
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message:"Internal Server Error"});
    }
}