const axios = require('axios');
const constants = require('../utils/constants');

const apiInstance = axios.create({
	baseURL: constants.OPEN_WEATHER.BASE_URL,
	timeout: 8000,
	headers: {},
});

module.exports = apiInstance;
