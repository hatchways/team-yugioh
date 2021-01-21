const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE appointment
router.post("/api/appointment", auth, (req, res) => {
  console.log(req.body);

  db.Appointment.create({ ...req.body, email: req.email })
    .then((response) => res.send(response))
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// GET all appointments for user
router.get("/api/appointment", auth, (req, res) => {
  db.Appointment.find({ email: req.query.email })
    .then((data) => res.send(data))
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = router;
