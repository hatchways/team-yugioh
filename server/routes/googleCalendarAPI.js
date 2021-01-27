const express = require("express");
const db = require("../db/models");
const auth = require("../middleware/auth");
const getAvailability= require("../utils/googleCalendarUtils");

const router = new express.Router();



// get user's availability from google calendar
router.get("/api/calendar/availability",auth, async (req, res) => {
    const day=req.param('day');
    try{
    const usr=await db.User.findById(req.userId);
    const tokenStore=await db.AuthStore.findOne({email:usr.email});
    const authToken=tokenStore.googleAuthToken;
    const availability= await getAvailability(authToken, day);
    console.log(availability)
    res.status(200).send({availability});
    }
    catch(err){
        console.log(err)
        res.status(500).send("error getting calendar availability")
    }
   

});



module.exports = router;
