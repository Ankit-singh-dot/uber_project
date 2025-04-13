const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const captainService = require("../services/captain.service");
module.exports.registerCaptain = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
  const isCaptainExist = await captainModel.findOne({ email });
  if (isCaptainExist) {
    return res.status(400).json({ message: "Captain already exists" });
  }
  const { color, plate, capacity, vehicleType } = vehicle;
  if (!color || !plate || !capacity || !vehicleType) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const hashedPassword = await captainModel.hashPassword(password);
  const captain = await captainService.createCaptain({
    firstName: fullname.firstName,
    lastName: fullname.lastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });
  const token = captain.generateAuthToken();
  res.status(201).json({ token, captain });
};
module.exports.loginCaptain = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email and password" });
  }
  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};
module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};
module.exports.logoutCaptain = async (req, res, next) => {
  res.cookie("token", "", {
    // httpOnly: true,
    maxAge: 0 * 0 * 0 * 0,
  });
  res.send("Logout successfully");
};
module.exports.getAllCaptains = async (req, res, next) => {
  const captains = await captainModel.find();
  res.status(200).json(captains);
};
