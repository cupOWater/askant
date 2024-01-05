const express = require("express");
const ProductController = require("../controller/ProductController");
const router = express.Router();

// THIS IS FOR TESTING PURPOSE ONLY, REMOVE IT ONCE SCHEDULE FUNCTION IS IMPLEMENTED
router.get("/scrape", ProductController.scrape);
router.get("/product", ProductController.getAllProducts);

module.exports = router