const mongoose = require('mongoose')

const weatherSchema = mongoose.Schema(
    {
        lat: {
            type: String,
            required: true
        },
        lon: {
            type: String,
            required: true
        },
        
    }
)

const WeatherModel = mongoose.model("Weather", weatherSchema);

module.exports = WeatherModel;