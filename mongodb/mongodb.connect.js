const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0"
        ).then(() => {console.log("Connected to MongoDB");})
    } catch (err) {
        console.error("Error connecting to mongodb");
        console.error(err)
    }
}

module.exports = { connect };