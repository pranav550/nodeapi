const express = require("express");
const validator = require("../validator");
const router = express.Router();
const userController = require("../controller/auth");

//router.get("/", userController.getPost);

router.post("/signup", validator.createUserValidator, userController.signup);
router.post("/signin", userController.signin);
router.get("/signout", userController.signout);

module.exports = router;
