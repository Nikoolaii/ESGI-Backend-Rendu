const express = require("express");
const router = express.Router();
const commentController = require("../controller/Commentaire.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");

router.post("/:postId", authMiddleware, commentController.addComment);
// router.put("/:commentId", authMiddleware, commentController.updateComment);
// router.delete("/:commentId", authMiddleware, commentController.deleteComment);
// router.get("/:postId", commentController.getCommentsByPost);

module.exports = router;
