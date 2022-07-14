const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    avatarUrl: {
        type: String
    },
    coverUrl:{
        type: String
    },
    name: {
        type: String,
        minlength: 3,
        require: true
    },
    email: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    class:{
        type: String,
        minlength: 3
    },
    faculty: {
        type: String,
        minlength: 3
    },
    role: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        maxlength: 1024,
        unique: true
    },
    studentCode: {
        type: String,
        length: 8
    },
    gender: {
        type: Boolean //0: female, 1: male
    }
});

userSchema.methods.generateAuthToken = function () {
    const payload = {_id: this._id, role: this.role, name: this.name};
    return jwt.sign(payload, process.env.JWTKEY);
};

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(8).max(255).required(),
        role: Joi.string().required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;