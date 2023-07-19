const mongoose = require('mongoose')

const LocationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        lon: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        entranceFee: {
            type: Number,
            required: false
        },
        currency: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: true
        }
    }
)

const LocationModel = mongoose.model("Location", LocationSchema);

module.exports = LocationModel;
