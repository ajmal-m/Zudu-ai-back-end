const User = require('../models/User.model.js');

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password from the response
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message:"Internal Server Error"});
    }
}

module.exports.updateUserRole = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error"});
    }
}


