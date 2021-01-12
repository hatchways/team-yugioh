require("dotenv").config();
const mongoose = require("mongoose");
const db = require("./models");

const { password } = require("./password");

try {
    mongoose.connect(
        `mongodb+srv://Lil_Kuriboh:${password}@cluster0.wghil.mongodb.net/calendly?retryWrites=true&w=majority`,
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

            // testing appointment model
            // db.Appointment.create({
            //     meeting_id: "blue2617",
            //     name: "name string",
            //     email: "nellie@email.com",
            //     time: new Date(),
            //     timezone: "PST",
            // }).then(() => {
            //     db.Appointment.find().then((data) => console.log(data));
            // });

            //testing eventtype
            // db.EventType.create({
            //     user_id: 7289,
            //     duration: 30,
            // }).then(() => {
            //     db.EventType.find().then((data) => console.log(data));
            // });
        }
    );
} catch (error) {
    console.log("could not connect");
}
