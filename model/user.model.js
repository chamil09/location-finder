const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        userid: {
            type: String,
            required: false
        }
    }
)

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;