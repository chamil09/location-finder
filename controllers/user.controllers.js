const UserModel = require("../model/user.model");
const uniqid = require('uniqid');

exports.addUser = async (req, res) => {
    try {
      const userData = {
        username: req.body.username,
        password: req.body.password,
        userid: uniqid(),
      };
      const addedUser = await UserModel.create(userData);
      res.status(201).json(addedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding user' });
    }
  };
  
  exports.getUsers = async (req, res) => {
    try {
      const allUsers = await UserModel.find({});
      if (allUsers) {
        res.status(200).json(allUsers);
      } else {
        res.status(404).json({ message: 'No Users found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving users' });
    }
  };
  
  exports.getUserById = async (req, res) => {
    try {
      const { userid } = req.params;
      const userById = await UserModel.findOne({ userid });
      if (userById) {
        res.status(200).json(userById);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving user' });
    }
  };
  

// exports.addUser = async (req, res, next) => {
//     try {
//         const userData = {
//             username: req.body.username,
//             password: req.body.password,
//             userid: uniqid(),
//           }
//         const addedUser = await UserModel.create(userData);
//         res.status(201).json(addedUser);
//     } catch (err){
//         next(err);
//     }
    
// };

// exports.getUsers = async (req, res, next) => {
//     try{
//         const allUsers = await UserModel.find({});
//         res.status(200).json(allUsers);
//     } catch (err) {
//         next(err);
//     }
// };

// exports.getUserById = async (req, res, next) => {
//     try {
//         const { userid } = req.params;
//         const UserById = await UserModel.findOne({ userid });
//         if (UserById) {
//             res.status(200).json(UserById);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         } 
//     } catch (err) {
//             next(err);
//     }
// };