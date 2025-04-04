const User = require("../model/user.model.js");
const Post = require("../model/post.model.js");
const Comment = require("../model/Commentaire.js");

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
        return res.status(500).json({ error: "Une erreur est survenue." });
    }
}

exports.editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        let post = await Post.findOne({ _id: id });
        if (!post) return res.status(404).json({ error: "Le post n'existe pas" });

        if (post.userId.toString() !== req.token._id) {
            return res.status(403).json({ error: "Ce n'est pas votre post." });
        }

        if (text) post.text = text;

        if (req.file) post.imageUrl = req.file.filename;

        await post.save();

        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue." });
    }
};

// Lorena
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        let post = await Post.findOne({ _id: id });
        if (!post) return res.status(404).json({ error: "Le post n'existe pas" });

        if (post.userId.toString() !== req.token._id) {
            return res.status(403).json({ error: "Ce n'est pas votre post." });
        }

        await Comment.deleteMany({ postId: id });

        await post.deleteOne();

        return res.status(200).json({ success: "Post supprimé." });
    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue." });
    }
};

// Lorena
exports.getPosts = async (req,res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 0;

        const total = await Post.countDocuments();

        let posts;
        if (limit > 0) {
            const skip = (page - 1) * limit;
            posts = await Post.find().skip(skip).limit(limit);
        } else {
            posts = await Post.find();
        }

        res.status(200).json({
            total,
            page,
            limit: limit || total,
            posts
        });
    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue." });
    }
};
