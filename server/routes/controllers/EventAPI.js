const express = require("express");
const connection = require("../../db/connection");
const db = require("../../db/models");

const router = express.Router();

// CREATE meeting
router.post("/api/event", (req, res) => {
    console.log(req.body);
    // sanitize req data
    if (req.body.user_id && req.body.duration) {
        db.EventType.create(req.body).then((response) => res.send(response));
    }
});

// GET all meetings for user
router.get("/api/event", (req, res) => {
    console.log(req.query);
    db.EventType.find({ user_id: req.query.user_id }).then((data) =>
        res.send(data)
    );
});

module.exports = router;
