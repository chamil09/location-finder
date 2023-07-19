const express = require("express");
const router = express.Router();
const locationController = require("../controllers/location.controllers");
const weatherController = require("../controllers/weather.controllers");

router.post("/", locationController.addLocation);
router.get("/", locationController.getLocation);
router.get("/weather", weatherController.getWeather);
router.get("/:locationId", locationController.getLocationById);
router.put("/:locationId", locationController.updateLocation);
router.delete("/:locationId", locationController.deleteLocation);

module.exports = router;
