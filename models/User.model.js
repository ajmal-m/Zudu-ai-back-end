const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new  Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user'
    },
},{
    timestamps:true
});

module.exports = mongoose.model('User', UserSchema);