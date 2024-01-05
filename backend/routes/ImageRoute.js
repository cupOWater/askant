const express = require("express");
const ImageController = require("../controller/ImageController");
const router = express.Router();
const multer = require('multer');

const upload = multer({
    dest: __dirname
  });

router.get("/:fileName", ImageController.getImage);
router.post("/upload", upload.single("file"), ImageController.uploadImage);

module.exports = router;