const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    passwordCheck: {
        type: String,
        required: true,
        minlength: 5
    },
    displayName: {
        type: String
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;