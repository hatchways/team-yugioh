const express = require("express");
const db = require("../../db/models");

const router = express.Router();

// CREATE meeting
router.post("/api/event", (req, res) => {
    // sanitize req data
    if (req.body.user_id && req.body.duration) {
        db.EventType.create(req.body)
            .then((response) => res.send(response))
            .catch((error) => {
                console.log(error);
                res.status(500).send("Unable to create meeting", error);
            });
    } else if (!req.body.user_id) {
        res.status(400).send("User ID is required");
    } else if (!req.body.duration) {
        res.status(400).send("Duration is required");
    }
});

// GET all meetings for user
router.get("/api/event", (req, res) => {
    db.EventType.find({ user_id: req.query.user_id })
        .then((data) => res.send(data))
        .catch((error) => {
            console.log(error);
            res.status(500).send("Unable to get meetings", error);
        });
});

module.exports = router;
