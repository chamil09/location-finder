const UserModel = require("../model/user.model");
const uniqid = require('uniqid');

exports.addUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ 
        status : 400,
        message: 'Username already exists' });
    }
    const userData = {
      username,
      password,
      userid: uniqid(),
    };
    const addedUser = await UserModel.create(userData);
    const userResponse = {
      username: addedUser.username,
      userid: addedUser.userid
    }
    const response = {
      status : 201,
      message: "User Successfully Created",
      data: userResponse
    }
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json({ 
      status : 400,
      message: 'Error adding user' });
  }
};

  exports.getUsers = async (req, res) => {
    try {
      const allUsers = await UserModel.find({}, '-password');
      if (allUsers) {
        const response = {
          status : 200,
          message: "All users fetched",
          data: allUsers
        }
        res.status(200).json(response);
      } else {
        res.status(404).json({ 
          status : 404,
          message: 'Users not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ 
        status : 400,
        message: 'Error retrieving users' });
    }
  };
  
  exports.getUserById = async (req, res) => {
    try {
      const { userid } = req.params;
      const userById = await UserModel.findOne({ userid }, '-password');
      if (userById) {
        const response = {
          status : 200,
          message: "User Found",
          data: userById
        }
        res.status(200).json(response);
      } else {
        res.status(404).json({ 
          status : 404,
          message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ 
        status : 400,
        message: 'Error retrieving user' });
    }
  };
  