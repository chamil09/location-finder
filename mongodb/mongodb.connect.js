const mongoose = require('mongoose');
const constants = require('../utils/constants')
require('dotenv').config();

async function connectDB(){
    try {
        await mongoose.connect(constants.DB_URL).then(() => {console.log("Connected to MongoDB");})
    } catch (err) {
        console.error("Error connecting to mongodb");
        console.error(err)
    }
}

module.exports = { connectDB };