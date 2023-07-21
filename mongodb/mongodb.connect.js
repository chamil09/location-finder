const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB(){
    try {
        await mongoose.connect(process.env.DB_URL).then(() => {console.log("Connected to MongoDB");})
    } catch (err) {
        console.error("Error connecting to mongodb");
        console.error(err)
    }
}

module.exports = { connectDB };