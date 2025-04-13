const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const UserController = require("../controllers/user.controller.js");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 character long"),
    body("password").isStrongPassword()
    .withMessage("Password is not strong enough"),
  ],
  UserController.registerUser
);
module.exports = router;
