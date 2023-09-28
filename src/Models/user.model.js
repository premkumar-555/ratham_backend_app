const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
user_name : {type: String, required: true},
university_id: {type: String, required: true},
password: {type: String, required: true}
},{
    timestamps: false,
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

user_name : "Premkumar"
university_id: "S001"
password:"PK202"