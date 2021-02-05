const express = require("express");
const db = require("../db/models");
const { google } = require("googleapis");
const User = require("../db/models/User");
const AuthStore = require("../db/models/AuthenticationStore");
const auth = require("../middleware/auth");
const jwt = require("njwt");
const { generateAuthUrl, getAccessToken } = require("../utils/googleAuthUtils");

const router = new express.Router();

const oAuthClient = new google.auth.OAuth2(
  process.env.AUTH_CREDENTIALS,
  process.env.AUTH_SECRET,
  process.env.AUTH_REDIRECT_PATH
);

// login with googleAuth
router.post("/api/authentication/google", async (req, res) => {
  const { code } = req.body;
  oAuthClient.getToken(code, async (err, token) => {
    if (err) {
      console.log(err);
      res.status(500).send("Authentication error.");
      return;
    }
    const accessToken = {
      token: token.access_token,
      exp: token.expiry_date,
    };
    const tokens = {
      id_token: token.id_token,
      access_token: accessToken,
      refresh_token: token.refresh_token,
    };

    const userInfo = await oAuthClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.AUTH_CREDENTIALS,
    });

    const email = userInfo.payload.email;

    //check if google id_token is valid
    if (!userInfo.payload.email_verified || !userInfo) {
      res.status(401).send({ error: "Authentication error" });
      return;
    }

    const appUser = await User.find({ email: userInfo.payload.email });
    let claims = null;
    if (appUser.length > 0) {
      claims = { userId: appUser[0]._id, email };
    } else {
      const newUser = new User({
        email: userInfo.payload.email,
        name: userInfo.payload.name,
      });
      try {
        await newUser.save();
        claims = { userId: newUser._id, email };
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
        return;
      }
    }
    //create JWT token for route auth
    const jwtToken = jwt.create(claims, process.env.JWT_SECRET);
    //token valid for 24h
    jwtToken.setExpiration(new Date().getTime() + 24 * 60 * 60 * 1000);
    const jwtCompact = jwtToken.compact();

    //check if authentication record exists in db if it does update it
    const authRecord = await AuthStore.find({
      email: userInfo.payload.email,
    });
    if (authRecord.length > 0) {
      res.cookie("app_auth_token", jwtCompact, { httpOnly: true });
      res.status(201).send(jwtCompact);
      return;
    }
    //save authentication tokens
    const newAuthStore = new AuthStore({
      email: userInfo.payload.email,
      googleAuthToken: token,
    });

    try {
      await newAuthStore.save();
    } catch (err) {
      res.status(400).send(err);
      return;
    }

    res.cookie("app_auth_token", jwtCompact, { httpOnly: true });
    res.status(201).send(jwtCompact);
  });
});

router.get("/api/authentication/test", auth, (req, res) => {
  res.status(200).send("successfull auth");
});

router.get("/api/authentication/geturl", (req, res) => {
  const url = generateAuthUrl();

  res.status(200).send({ url });
});

router.get("/api/authentication/logout", (req, res) => {
  try {
    res.cookie("app_auth_token", "", { httpOnly: true, maxAge: 100 });
    res.status(200).send("logged out");
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/authentication/checkemail", async (req, res) => {
  const email = req.query.email;
  try {
    const userWemail = await User.find({ email: email });
    if (userWemail.length > 0) res.status(200).send();
    else res.status(400).send();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
