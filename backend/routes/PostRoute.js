const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
// Before authentication


// After authentication
router.use(auth);


router.use(adminAuth);
// router.delete(":id")

module.exports = router