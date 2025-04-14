const mapsService = require("../services/maps.service");
const { validationResult } = require("express-validator");
module.exports.getCoordinates = async (req, res, next) => {
    const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { address } = req.query || {};
  if (!address) {
    return res
      .status(400)
      .json({ message: "Address is required in the request body" });
  }
  try {
    const coordinates = await mapsService.getCoordinates(address);
    if (!coordinates) {
      return res.status(404).json({ message: "Coordinates not found" });
    }
    res.status(200).json({ coordinates });
  } catch (error) {
  
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.getDistanceTime = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { origin, destination } = req.query || {};
  if (!origin || !destination) {
    return res
      .status(400)
      .json({ message: "Origin and destination are required" });
  }
  try {
    const distanceTime = await mapsService.getDistanceTime(origin, destination);
    if (!distanceTime) {
      return res.status(404).json({ message: "Distance and time not found" });
    }
    res.status(200).json({ distanceTime });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { address } = req.query || {};
  if (!address) {
    return res
      .status(400)
      .json({ message: "Address is required in the request body" });
  }
  try {
    const suggestions = await mapsService.getAutoCompleteSuggestions(address);
    if (!suggestions) {
      return res.status(404).json({ message: "Suggestions not found" });
    }
    res.status(200).json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}