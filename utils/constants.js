const OPEN_WEATHER = {
    BASE_URL: process.env.OPEN_WEATHER_BASE_URL,
    KEY: process.env.OPEN_WEATHER_KEY
};

const DB_URL = process.env.DB_URL;

const PORT = process.env.PORT;

module.exports = {
    OPEN_WEATHER,
    DB_URL,
    PORT
};
