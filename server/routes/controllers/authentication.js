const express = require("express");
const db = require("../../db/models");

const router = new express.Router();

// login with googleAuth
router.post("/api/authentication", (req, res) => {
    console.log("hello");
    console.log("request",req.body);
    res.status(202).send();
    
});



module.exports = router;
