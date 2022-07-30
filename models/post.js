const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    header: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    createAt: {
        type: Date,
        required: true,
    },
    edit: {
        type: [new mongoose.Schema({
            editAt: Date,
            oldText: String,
        })],
    },
    mediaUrl: {
        type: [String],
    },
    likeNumber: {
        type: Number,
        required: true,
        default: 0,
    }
})

const Post = mongoose.model('Posts', postSchema);

function validatePost(post) {
    const schema = Joi.object({
        header: Joi.string().required(),
        text: Joi.string().required(),
        userId: Joi.string().required(),
        createAt: Joi.string(),
        edit: Joi.array(),
        likeNumber: Joi.number(),
        mediaUrl: Joi.array(),
    });
    return schema.validate(post);
}

exports.Post = Post;
exports.validate = validatePost;