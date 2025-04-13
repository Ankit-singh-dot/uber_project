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
