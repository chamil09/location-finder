const axios = require('axios');
const redis = require('redis');
require('dotenv').config();
const constants = require('../utils/constants');

const apiKey = constants.OPEN_WEATHER.KEY;
const exclude = 'hourly,daily,minutely';


const client = redis.createClient();

exports.getWeather = async (req, res) => {
  await client.connect();
  try {
    const lat = req.body.lat;
    const lon = req.body.lon;
    const cacheKey = lat + '_' + lon;
    const value = await client.get(cacheKey);
    if (value){
      return res.status(200).json(JSON.parse(value));
    } 
    const response = await axios.get(constants.OPEN_WEATHER.URL, {
      params: {
        lat,
        lon,
        exclude,
        appid: apiKey,
      },
    });
    const weatherData = {
      temp: (response.data.current.temp - 273.15).toFixed(2),
      humidity: response.data.current.humidity,
      desc: response.data.current.weather[0].description
    }
    await client.set(cacheKey, JSON.stringify(weatherData));
    await client.expire(cacheKey, 3600);
    res.status(200).json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving weather data');
  } finally {
    await client.quit();
  }
};



