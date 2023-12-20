const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const PostController = require("../controller/PostController")

router.use("/", PostController.getAllPosts);

router.use(auth);

router.delete("/:postId", adminAuth, PostController.deletePost);

module.exports = router