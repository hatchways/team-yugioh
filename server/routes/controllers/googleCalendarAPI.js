const express = require("express");
const db = require("../../db/models");
const { google } = require("googleapis");
const User = require("../../db/models/User");
const AuthStore = require("../../db/models/AuthenticationStore");
const auth = require("../../middleware/auth");
const getAvailability= require("../../utils/googleCalendarUtils");

const router = new express.Router();



// get user's availability from google calendar
router.get("/api/calendar/availability",auth, async (req, res) => {
    const day=req.param('day');
    const usr=await db.User.findById(req.userId);
    const tokenStore=await db.AuthStore.findOne({email:usr.email});
    const authToken=tokenStore.googleAuthToken;
    await getAvailability(authToken);
    res.send();

});



module.exports = router;
