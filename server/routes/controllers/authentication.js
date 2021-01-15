const express = require("express");
const db = require("../../db/models");
//const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const User = require("../../db/models/User");
const auth = require("../../middleware/auth");

const router = new express.Router();

const oAuthClient = new google.auth.OAuth2(
  process.env.AUTH_CREDENTIALS,
  process.env.AUTH_SECRET,
  process.env.AUTH_REDIRECT_PATH
);

// login with googleAuth
router.post("/api/authentication/google", async (req, res) => {
  //code from google auth, email=user email, variant=type of authentication [login vs signup]
  const { code, email, variant } = req.body;
  oAuthClient.getToken(code, async (err, token) => {
    if (err) {
      console.log(err);
      res.status(500).send("Authentication error.", err);
    }
    const tokens = {
      id_token: token.id_token,
      access_token: token.access_token
    };
    // const id_token = token.id_token;
    // const access_token = token.access_token;

    if (variant === "signup") {
      const userInfo = await oAuthClient.verifyIdToken({
        idToken: tokens.id_token,
        audience:
          "294753578980-nbeunl8bovad0pp6t4ve8p5vso2hiahg.apps.googleusercontent.com"
      });

      const newUser = new User({
        email: userInfo.payload.email,
        name: userInfo.payload.name,
        googleCredentials: id_token
      });
      try {
        await newUser.save();

        res.status(201).send(tokens);
      } catch (err) {
        res.status(400).send(err);
      }
    }
    if (variant === "login") {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(500).send("No such email registerd!");
      }

      res.status(201).send(JSON.stringify(tokens));
    }
  });
});

router.get("/api/authentication/test", auth, (req, res) => {
  res.status(200).send("successfull auth");
});

module.exports = router;
