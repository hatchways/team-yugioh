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
        db.Appointment.create(req.body).then((response) => res.send(response));
    }
});

// GET all appointments for user
router.get("/api/appointment", (req, res) => {
    db.Appointment.find({ email: req.query.email }).then((data) =>
        res.send(data)
    );
});

module.exports = router;
