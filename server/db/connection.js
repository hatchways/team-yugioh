require("dotenv").config();
const mongoose = require("mongoose");
const db = require("./models");

try {
    mongoose.connect(
        "mongodb+srv://Lil_Kuriboh:[PASSWORD]@cluster0.wghil.mongodb.net/calendly?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => {
            console.log("mongo connected");

            // links to tests collection
            // db.Test.create({ id: Math.random() * 10, name: "nellie" }).then(
            //     () => {
            //         db.Test.find().then((data) => console.log(data));
            //     }
            // );
        }
    );
} catch (error) {
    console.log("could not connect");
}
