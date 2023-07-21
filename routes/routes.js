const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const locationRoutes = require("./location.routes");
const auth = require("../middleware/auth");

router.use("/users", userRoutes);
router.use("/locations", auth.authenticateUser, locationRoutes);

module.exports = router;
