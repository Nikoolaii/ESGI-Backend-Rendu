const  { Schema } = require("mongoose");
const mongoose = require("mongoose");

const post = new Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 500
    },
    imageUrl: {
        type: String,
        default: null
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Post = mongoose.model('Post', post);

module.exports = Post;