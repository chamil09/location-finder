const express = require('express');
const routes = require("./routes/routes");
const app = express();
const mongodb = require("./mongodb/mongodb.connect");

mongodb.connect();

//middleware
app.use(express.json());

app.use("/api/v1", routes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error" });
})

app.get('/', (req, res) => {
  res.send('Hello World!');
})

module.exports = app;