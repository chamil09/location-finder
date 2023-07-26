const LocationModel = require("../model/location.model");
const { getWeather } = require("../services/weather.service");

exports.addLocation = async (req, res) => {
  try {
    const addedLocation = await LocationModel.create(req.body);
    const response = {
      status : 201,
      message: "Location successfully created",
      data: addedLocation
    }
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ 
      status : 400,
      message: 'Error adding location' 
    });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const allLocations = await LocationModel.find({});
    const response = {
      status : 200,
      message: "Locations successfully retrieved",
      data: allLocations
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ 
      status : 400,
      message: 'Error retrieving locations' 
    });
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
    const weatherData = await getWeather(locationData, res);
    const finalResponse = {
      status : 200,
      message: "Current weather data successfully retrieved",
      data: weatherData
    }
    res.status(200).json(finalResponse);
  } catch (error) {
    res.status(400).json({ 
      status : 400,
      message: 'Location not found' 
    });
  }
}

exports.getLocationById = async (req, res) => {
  try {
    const locationData = await LocationModel.findById(req.params.locationId);
    if (locationData) {
      const currentData = {
        id: req.params.locationId,
        lat: locationData.lat,
        lon: locationData.lon
      }
      const currentWeather = await getWeather(currentData, res);
      const response = {
        status : 200,
        message: "Location successfully found",
        data: locationData,
        currentWeather:currentWeather
      }
      res.status(200).json(response);
    } else {
      res.status(404).json({ 
        status : 404,
        message: 'Location not found' });
    }
  } catch (error) {
    res.status(400).json({ 
      status : 400,
      message: 'Error retrieving location' 
    });
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
      const response = {
        status : 200,
        message: "Location successfully updated",
        data: updateLocation
      }
      res.status(200).json(response);
    } else {
      res.status(404).json({ 
        status : 404,
        message: 'Location not found' });
    }
  } catch (error) {
    res.status(400).json({ 
      status : 400,
      message: 'Error updating location' 
    });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const deleteLoc = await LocationModel.findByIdAndDelete(req.params.locationId);

    if (deleteLoc) {
      const response = {
        status : 200,
        message: "Location successfully deleted"
      }
      res.status(200).json(response);
    } else {
      res.status(404).json({ 
        status : 404,
        message: 'Location not found' });
    }
  } catch (error) {
    res.status(400).json({ 
      status : 400,
      message: 'Error deleting location' 
    });
  }
};

