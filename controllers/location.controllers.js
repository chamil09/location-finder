const LocationModel = require("../model/location.model");
const { getWeather } = require("../services/weather.service");
const { logger } = require('../utils/logger');

exports.addLocation = async (req, res) => {
  try {
    const addedLocation = await LocationModel.create(req.body);
    res.status(201).json(addedLocation);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Error adding location' });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const allLocations = await LocationModel.find({});
    res.status(200).json(allLocations);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Error retrieving locations' });
  }
};

exports.getCurrentWeather = async (req, res) => {
  try {
    const currentLocation = await LocationModel.findById(req.params.locationId);
    const locationData = {
      id: req.params.locationId,
      lat: currentLocation.lat,
      lon: currentLocation.lon
    }
    await getWeather(locationData, res);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Location not found' });
  }
}

exports.getLocationById = async (req, res) => {
  try {
    const locationModel = await LocationModel.findById(req.params.locationId);
    if (locationModel) {
      res.status(200).json(locationModel);
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Error retrieving location' });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const updateLocation = await LocationModel.findByIdAndUpdate(
      req.params.locationId,
      req.body,
      {
        new: true,
        useFindAndModify: false
      }
    );
    if (updateLocation) {
      res.status(200).json(updateLocation);
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Error updating location' });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const deleteLoc = await LocationModel.findByIdAndDelete(req.params.locationId);

    if (deleteLoc) {
      res.status(200).json(deleteLoc);
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Error deleting location' });
  }
};

