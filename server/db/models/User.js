const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    profilePic:{
        type:String
    },
    password:{
        type: String,
        trim: true,
    },
    //token used for api access and google auth
    googleCredentials:{
        type: String,
        trim: true,
    },
    //used for email and password authentication [feature not yet added]
    jwtToken:{
        type: String,
        trim: true,
    },
    timezone: {
        // TODO: validate timezone
        type: String,
    },
});

const User = mongoose.model("User", schema);

module.exports = User;
