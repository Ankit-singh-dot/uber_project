const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { query } = require("express-validator");
const mapController = require("../controllers/map.controller");
router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authMiddleware.authUser,mapController.
  getCoordinates
);
router.get(
    "/get-distance-time",
    query("destination").isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistanceTime
)
router.get(
    "/get-auto-complete-suggestions",
    query("address").isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)

module.exports = router;
