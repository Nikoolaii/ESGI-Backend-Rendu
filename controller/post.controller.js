const User = require("../model/user.model.js");
const Post = require("../model/post.model.js");
require("dotenv").config();

exports.createPost = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.token._id });
        if (!user) {
            return res.status(404).json({ error: "L'utilisateur n'existe pas" });
        }
    
        if (!req.body.text) {
            return res.status(400).json({ message: "Veuillez saisir un texte pour le post." })
        };
    
        let imageUrl = null;
        if (req.file) {
            imageUrl = req.file.filename;
        }
    
        let post = await Post.create({
            text: req.body.text,
            imageUrl: imageUrl,
            userId: req.token._id
        });
    
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
    }
}

exports.editPost = async (req, res) => {
    res.status(200).json({ 'success': 'ok' });
}

exports.deletePost = async (req, res) => {
    res.status(200).json({ 'success': 'ok' });
}