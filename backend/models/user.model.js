const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, require: true, },
    email: { type: String, unique: true },
    profession: { type: String, require: true, },
    password: String,
    role: {
        type: String,
        enum: ["User","Donor"],
        default: "User"
    }
});
module.exports = mongoose.model('Users', UserSchema);