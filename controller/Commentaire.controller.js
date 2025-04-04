const Comment = require("../model/Commentaire.js");
const User = require("./../model/user.model.js");


exports.addComment = async (req, res) => {
  try {
    const text = req.body.text;
    const userId = req.body.userId;
    const postId = req.params.postId;
    let newComment = Comment.create({
      userId: userId,
      postId: postId,
      test: text
    });
    return res.status(201).json({ message: "Commentaire ajouté avec succès", comment: newComment });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: "Erreur lors de l'ajout du commentaire" });
  }
};

exports.updateComment = async (req, res) => {
    try {
      const commentId = req.params;
      const text = req.body.text;
         const comment = await Comment.findById(commentId);
      if (!comment) {
     return res.status(404).json({ error: "Commentaire non trouvé" });
      }
     comment.text = text;
      await comment.save();
      return res.status(201).json({ message: "Commentaire modifié avec succès", comment });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Erreur lors de la modification du commentaire" });
    }
  };

  exports.deleteComment = async (req, res) => {
    try {
      const commentId = req.params;
       const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: "Commentaire non trouvé" });
      }
      await Comment.findByIdAndDelete(commentId);
      return res.status(201).json({ message: "Commentaire supprimé " });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Erreur pendant de la suppression du commentaire" });
    }
  };

