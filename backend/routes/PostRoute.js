const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const PostController = require("../controller/PostController")

router.get("/", PostController.getAllPosts);

router.use(auth);
router.use(adminAuth);

// For testing the admin auth
// Delete when not needed
router.get("/test", adminAuth, (req, res) => {
    res.send("TESTING TESTING");
})

router.delete("/:postId", adminAuth, PostController.deletePost);

module.exports = router