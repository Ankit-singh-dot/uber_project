const axios = require("axios");

module.exports.getAddressCordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API; // Replace with your actual API key
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(`Geocoding error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};
module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API; // Replace with your actual API key
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.rows[0].elements[0];
    } else {
      throw new Error(`Distance Matrix error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw error;
  }
};
module.exports.getAutoCompleteSuggestions = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API; // Replace with your actual API key
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error(`Autocomplete error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error.message);
    throw error;
  }
};
