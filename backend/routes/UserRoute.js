const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const UserController = require("../controller/UserController");

router.use(auth)
router.get("/", UserController.getCurrent);


module.exports = router
