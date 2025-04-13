const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const CaptainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");
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
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 character long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 character long"),
    body("vehicle.capacity")
      .isNumeric()
      .withMessage("Capacity must be a number")
      .isLength({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isLength({ min: 3 })
      .withMessage("Vehicle type must be at least 3 character long"),
  ],
  CaptainController.registerCaptain
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  CaptainController.loginCaptain
);
router.get(
  "/profile",
  authMiddleware.authCaptain,
  CaptainController.getCaptainProfile
);
router.post(
  "/logout",
  authMiddleware.authCaptain,
  CaptainController.logoutCaptain
);
router.get(
  "/all",
  authMiddleware.authCaptain,
  CaptainController.getAllCaptains
);
module.exports = router;
