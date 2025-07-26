const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports.generateToken = async (userData, res) => {
    try {
        const token = jwt.sign({user: userData},process.env.JWT_SECRET_KEY, { expiresIn:"7d"});
        return token;
    } catch (error) {
        console.log(error);
    }
}