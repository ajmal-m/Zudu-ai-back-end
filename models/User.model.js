const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new  Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
},{
    timestamps:true
});

module.exports = mongoose.models.User  ||  mongoose.model('User', UserSchema);