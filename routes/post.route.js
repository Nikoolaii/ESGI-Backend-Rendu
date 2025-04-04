const express = require("express");
const router = express.Router();
const postController = require("../controller/post.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const upload = require("../middleware/multer.middleware.js");

router.post('/', authMiddleware, upload, postController.createPost);
router.get('/', postController.getPosts);
router.put('/:id', authMiddleware, upload, postController.editPost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
