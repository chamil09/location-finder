const axios = require('axios');
const redis = require('redis');
require('dotenv').config();
const constants = require('../utils/constants');
const { getWeatherData } = require('../services/externalApi.service')

const apiKey = constants.OPEN_WEATHER.KEY;
const exclude = 'hourly,daily,minutely';


const client = redis.createClient();

exports.getWeather = async (req, res) => {
  await client.connect();

  try {
    const lat = req.lat;
    const lon = req.lon;
    const cacheKey = req.id;
    const value = await client.get(cacheKey);
    if (value) {
      const valueRes = JSON.parse(value);
      return valueRes;
    }
    const response = await getWeatherData(lat, lon, exclude, apiKey);
    const weatherData = {
      temp: (response.data.current.temp - 273.15).toFixed(2),
      humidity: response.data.current.humidity,
      desc: response.data.current.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${response.data.current.weather[0].icon}@2x.png`
    }
    await client.set(cacheKey, JSON.stringify(weatherData), 'EX', 3600);
    return weatherData;
  } catch (error) {
    console.error(error);
    res.status(400).send('Error retrieving weather data');
  } finally {
    await client.quit();
  }
};



