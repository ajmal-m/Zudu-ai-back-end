const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports.generateToken = async (userData, res) => {
    try {
        const accessToken = jwt.sign({ user: userData }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ user: userData }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
        return { accessToken };
    } catch (error) {
        console.log(error);
    }
}