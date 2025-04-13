const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const captainSchema = new mongoose.Schema({
  fullname: {
    firstName: {
      type: String,
      required: true,
      minlenght: [3, "First name should be at least 3 characters"],
    },
    lastName: {
      type: String,
      required: true,
      minlenght: [3, "Last name should be at least 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlenght: [3, "Color should be at least 3 characters"],
    },
    plate: {
      type: String,
      required: true,
      minlenght: [3, "Plate should be at least 3 characters"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity should be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});
captainSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};
captainSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
const captainModel = mongoose.model("captain", captainSchema);
module.exports = captainModel;
