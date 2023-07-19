const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");

router.post("/", userController.addUser);
router.get("/", userController.getUsers);
router.get("/:userid", userController.getUserById);

module.exports = router;
