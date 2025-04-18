const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const UserController = require("../controllers/user.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js")
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 character long"),
    body("password")
      .isStrongPassword()
      .withMessage("Password is not strong enough"),
  ],
  UserController.registerUser
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  UserController.loginUser
);
router.get("/profile",authMiddleware.authUser, UserController.getUserProfile);
router.post("/logout",authMiddleware.authUser,UserController.logoutUser)
module.exports = router;
