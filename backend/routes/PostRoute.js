const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const PostController = require("../controller/PostController")

// No Auth
router.get("/", PostController.getAllPosts);

// User Auth
router.use(auth);
router.post("/create", PostController.createPost);

// Admin Auth
router.use(adminAuth);
router.delete("/:postId", adminAuth, PostController.deletePost);

module.exports = router