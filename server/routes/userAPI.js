const express = require("express");
const db = require("../../db/models");

const router = express.Router();

// GET whether id is unique
router.get("/api/user/:id/is_unique", (req, res) => {
    db.User.find({ url: req.query.url })
        .then((data) => {
            if (data.length > 0) {
                res.status(400).send(new Error("URL is already taken."));
            } else {
                res.status(200).send("URL is available!");
            }
        })
        .catch((error) => {
            console.log(error.message);
            res.status(500).send(error);
        });
});

// UPDATE user information
router.post("/api/user/:id", (req, res) => {
    // TODO read authentication

    db.User.updateOne({ user_id: req.params.id }, { $set: req.body })
        .then((response) => res.send(response))
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
});

module.exports = router;
