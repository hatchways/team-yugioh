const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: {
        type: mongoose.ObjectId,
    },
    duration: {
        type: Number,
        validate: {
            validator: function (v) {
                return [15, 30, 60].includes(v);
            },
        },
    },
});

const EventType = mongoose.model("EventType", schema);

module.exports = EventType;
