const express = require("express");
const validator = require("../validator");
const router = express.Router();
const postController = require("../controller/post");

router.get("/", postController.getPost);
console.log("check3");
router.post("/post", validator.createPostValidator, postController.createPost);
module.exports = router;
