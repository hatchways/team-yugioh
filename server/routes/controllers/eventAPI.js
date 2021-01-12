const express = require("express");
const db = require("../../db/models");

const router = express.Router();

// CREATE meeting
router.post("/api/event", (req, res) => {
    // sanitize req data
    if (req.body.user_id && req.body.duration) {
        db.EventType.create(req.body).then((response) => res.send(response));
    }
});

// GET all meetings for user
router.get("/api/event", (req, res) => {
    db.EventType.find({ user_id: req.query.user_id }).then((data) =>
        res.send(data)
    );
});

module.exports = router;
