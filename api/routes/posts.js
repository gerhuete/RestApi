const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PostController = require('../controllers/posts');

router.get("/", checkAuth, PostController.get_posts);

router.post("/", checkAuth, PostController.create_post);

router.get("/:postId", checkAuth, PostController.get_post);

router.put("/:postId", checkAuth, PostController.edit_post);

router.delete("/:postId", checkAuth, PostController.delete_post);

module.exports = router;