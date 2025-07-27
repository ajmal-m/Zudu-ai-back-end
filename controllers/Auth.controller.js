const {generateToken} = require('../lib/utils.js');
const User = require('../models/User.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.Register = async (req,res) => {
    const {email, name, password, role} = req.body;
    try {
        if(!email) return res.status(400).json({ message: 'Email is required.'});
        if(!name) return res.status(400).json({ message: "Name is required"});
        if(!password) return res.status(400).json({ message: "Password is required"});
        if(!role) return res.status(400).json({ message: "Role is required"});
        const user = await User.findOne({email});

        if(user) return res.status(400).json({ message:"Email already exists"});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            role
        });

        if(newUser){
            // Generate JWT token here
            const {accessToken} =await  generateToken(newUser, res);
            // Save the user to the database
            await newUser.save();
            res.status(200).json({
                _id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                token: accessToken
            })
        }else{
            res.status(400).json({ message:"Invalid user data."})
        }
    } catch (error) {
        console.log("Error in sign up controller ", error.message);
        res.status(500).json({ message:"Internal server error"});
    }
}


module.exports.LogIn = async (req,res) => {
    const {email, password} = req.body;
    console.log(req.body)
    try {
        if(!email || !password) return res.status(400).json({ success:false, message:"All fields are required."});
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({success:false, message:"Invalid credentials."});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) return res.status(400).json({ success:false, message:"Invalid credentials."});

        const {accessToken} = await generateToken(user, res);

        console.log("Access Token: ", accessToken);

        res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            token: accessToken  
        });
    } catch (error) {
        console.log('Error in Login controller ', error.message);
        res.status(500).json({ message: "Internal server error."})
    }
}



module.exports.Refresh = async(req, res) => {
    try {
        const token = req.cookies.refreshToken;
        console.log(token)
        if (!token) return res.sendStatus(401);

        jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            console.log("User: ", user);
            const newAccessToken = jwt.sign({ user: user }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
            res.json({ accessToken: newAccessToken, user : user?.user});
        });
    } catch (error) {
        console.log('Error in Refresh controller ', error.message);
        res.status(500).json({ message: "Internal server error."})
    }
}

module.exports.Logout = async (req, res) => {
    try {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });

        return res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
        res.status(500).json({ message: "Internal server error."})
    }
}