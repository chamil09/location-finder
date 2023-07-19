const axios = require('axios');
const redis = require('redis');

const apiKey = '349d291ba59eb3ee9e1e5cad4684c583';
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
    const response = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
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



