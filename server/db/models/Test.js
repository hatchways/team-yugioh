const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
});

const Test = mongoose.model("Test", schema);

module.exports = Test;
