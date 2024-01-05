const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    isVerified: {type: String, enum: ['false', 'pending', 'true'], default: 'false'},
    type: {type: String, enum: ['user', 'admin'], default: 'user'}
})

module.exports = mongoose.model("user", userSchema)