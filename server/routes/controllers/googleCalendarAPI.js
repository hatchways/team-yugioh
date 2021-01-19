const express = require("express");
const db = require("../../db/models");
const { google } = require("googleapis");
const User = require("../../db/models/User");
const AuthStore = require("../../db/models/AuthenticationStore");
const auth = require("../../middleware/auth");

const router = new express.Router();



// get user's availability from google calendar
router.get("/api/calendar/availability", async (req, res) => {
    const day=req.param('day');
    

});



module.exports = router;
