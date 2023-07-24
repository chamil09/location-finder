const axios = require('axios');
const constants = require('../utils/constants');

const getWeatherData = async (lat, lon, exclude, apiKey) => {
  try {
    const response = await axios.get(constants.OPEN_WEATHER.URL, {
      params: {
        lat,
        lon,
        exclude,
        appid: apiKey,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getWeatherData,
};
