const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
    meeting_id: {
        // TODO: generate unique meeting id
        type: Number,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    time: {
        type: Date,
    },
    timezone: {
        // TODO: validate timezone
        type: String,
    },
});

const Test = mongoose.model("Test", schema);

module.exports = Test;
