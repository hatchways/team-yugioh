require("dotenv").config();
const mongoose = require("mongoose");

try {
    mongoose.connect(
        process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => {
            console.log("mongo connected");
        }
    );
} catch (error) {
    console.log("could not connect");
}
