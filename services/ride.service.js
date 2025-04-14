const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");

async function getFare(pickup, destination, vehicleType) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceData = await mapService.getDistanceTime(pickup, destination);
  const { km, timeInMin } = distanceData;

  const pricing = {
    auto: {
      baseFare: 30,
      perKm: 10,
      perMin: 1,
    },
    car: {
      baseFare: 50,
      perKm: 15,
      perMin: 2,
    },
    motorcycle: {
      baseFare: 20,
      perKm: 8,
      perMin: 0.5,
    },
  };

  if (!pricing[vehicleType]) {
    throw new Error("Invalid vehicle type");
  }

  const { baseFare, perKm, perMin } = pricing[vehicleType];
  let fare = baseFare + km * perKm + timeInMin * perMin;

  // Optional: Add surge pricing logic
  const isPeakTime = checkSurge(); // returns true or false
  if (isPeakTime) {
    fare *= 1.5; // 50% surge pricing
  }

  // Optional: Add platform/service fee
  const serviceFee = 10; // flat or percentage
  fare += serviceFee;

  return {
    fare: Math.round(fare),
    km,
    timeInMin,
    surge: isPeakTime,
  };
}

function checkSurge() {
  const hour = new Date().getHours();
  // Surge during morning (8-10 AM) and evening (6-9 PM)
  return (hour >= 8 && hour <= 10) || (hour >= 18 && hour <= 21);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fareDetails = await getFare(pickup, destination, vehicleType);
  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    fare: fareDetails.fare,
    vehicleType,
    distance: fareDetails.km,
    duration: fareDetails.timeInMin,
  });

  return ride;
};
