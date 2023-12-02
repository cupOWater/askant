const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const auth = require("../middleware/auth");

router.post('/register', userController.register);
router.post('/login', userController.login);

router.use(auth)
router.get("/test", (req, res) => {res.send(req.user)});


module.exports = router
