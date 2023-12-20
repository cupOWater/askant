const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const PostController = require("../controller/PostController")
// Before authentication
router.use("/", PostController.getAllPosts);

// After authentication
router.use(auth);


router.use(adminAuth);
// router.delete(":id")

module.exports = router