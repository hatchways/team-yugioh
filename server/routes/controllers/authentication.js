const express = require("express");
const db = require("../../db/models");
//const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const User = require("../../db/models/User");

const router = new express.Router();

const oAuthClient = new google.auth.OAuth2(
  "294753578980-nbeunl8bovad0pp6t4ve8p5vso2hiahg.apps.googleusercontent.com",
  "mXf71c1jwjRcO-2AIZMPjrXQ",
  "http://localhost:3000"
);

// login with googleAuth
router.post("/api/authentication/google", async (req, res) => {
  //code from google auth, email=user email, variant=type of authentication [login vs signup]
  const { code, email, variant } = req.body;
  console.log(req.body);
  if (variant === "signup") {
    oAuthClient.getToken(code, async (err, token) => {
      if (err) {
        console.log(err);
        res.status(500).send("Authentication error.", err);
      }
      const id_token = token.id_token;
      const access_token = token.access_token;
      const userInfo=await oAuthClient
        .verifyIdToken({
          idToken: id_token,
          audience:
            "294753578980-nbeunl8bovad0pp6t4ve8p5vso2hiahg.apps.googleusercontent.com"
        })
        
        const newUser = new User({
            email:userInfo.payload.email,
            name:userInfo.payload.name,
            googleCredentials: id_token
              })
      try{
        await newUser.save()
        res.status(201).send({ tokens:{id_token, access_token} });
      }
      catch(err){
          res.status(400).send(err);
      }
      
    });
  }

  if (variant === "login") {
    oAuthClient.getToken(code, (err, token) => {
      if (err) {
        console.log(error);
        res.status(500).send("Authentication error.", error);
      }
      oAuthClient.setCredentials(token);

      res.status(202).send({ token });
    });
  }
});

module.exports = router;
