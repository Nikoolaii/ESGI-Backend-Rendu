const Comment = require("../model/Commentaire.js");
const User = require("./../model/user.model.js");


exports.addComment = async (req, res) => {
    try {
        const { text } = req.body;
const userId = req.User.id;
    const { postId } = req.params;
         const newComment = new Comment({ userId, postId, text });
            await newComment.save();
        res.status(201).json({ message: "Commentaire ajouté avec succès", comment: newComment });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout du commentaire" });
    }
};