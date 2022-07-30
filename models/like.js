const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    userId: String, //who gives like
    textId: String //post or comment get like
});

const Like = mongoose.model('Likes', likeSchema);

exports.Like = Like;