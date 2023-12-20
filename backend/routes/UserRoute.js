const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const UserController = require("../controller/UserController");

router.use(auth)
router.get("/", UserController.getCurrent);
router.post("/pending", UserController.pending);

router.post("/verified", adminAuth, UserController.getVerified);
router.post("/refused", adminAuth, UserController.refuseVerified);
router.get("/pendingUsers", adminAuth, UserController.getPendingUsers);

module.exports = router
