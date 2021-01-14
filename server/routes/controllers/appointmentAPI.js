const express = require("express");
const db = require("../../db/models");

const router = express.Router();

// CREATE appointment
router.post("/api/appointment", (req, res) => {
    // sanitize req data
    if (
        req.body.meeting_id &&
        req.body.name &&
        req.body.email &&
        req.body.time &&
        req.body.timezone
    ) {
        db.Appointment.create(req.body)
            .then((response) => res.send(response))
            .catch((error) => {
                console.log(error);
                res.status(500).send("Unable to create appointment", error);
            });
    } else if (!req.body.meeting_id) {
        res.status(400).send("Meeting ID is required");
    } else if (!req.body.name) {
        res.status(400).send("Name is required");
    } else if (!req.body.email) {
        res.status(400).send("Email is required");
    } else if (!req.body.time) {
        res.status(400).send("Time is required");
    } else if (!req.body.timezone) {
        res.status(400).send("Timezone is required");
    }
});

// GET all appointments for user
router.get("/api/appointment", (req, res) => {
    db.Appointment.find({ email: req.query.email })
        .then((data) => res.send(data))
        .catch((error) => {
            console.log(error);
            res.status(500).send("Unable to get appointments", error);
        });
});

module.exports = router;
