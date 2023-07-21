const UserModel = require("../model/user.model");

exports.authenticateUser = async (req, res, next) => {

    try {
        const { userid } = req.headers;
        const user = await UserModel.findOne({ userid });
        if (user) {
            next();
        } else {
            res.status(404).json({ message: 'Authentication failed' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};