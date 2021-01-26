const express = require('express');
const db = require('../db/models');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

const router = express.Router();

// GET whether id is unique
router.get('/api/user/is_unique', auth, (req, res) => {
  db.User.find({ URL: req.query.URL })
    .then((data) => {
      if (data.length > 0) {
        res.status(400).send(new Error('URL is already taken.'));
      } else {
        res.status(200).send('URL is available!');
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).send(error);
    });
});

// UPDATE user information
router.post('/api/user/', auth, (req, res) => {
  db.User.updateOne({ _id: req.userId }, { $set: req.body })
    .then((response) => res.send(response))
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

// GET user data from DB
router.get('/api/user/data', auth, (req, res) => {
  db.User.findOne({ _id: req.userId })
    .then((response) => {
      console.log(response)
      res.send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = router;
