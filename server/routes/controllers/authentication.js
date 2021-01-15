const express = require("express");
const db = require("../../db/models");
//const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const User = require("../../db/models/User");
const AuthStore = require("../../db/models/AuthenticationStore");
const auth = require("../../middleware/auth");
const jwt = require("njwt");
const {
  generateAuthUrl,
  getAccessToken
} = require("../../utils/googleAuthUtils");

const router = new express.Router();

const oAuthClient = new google.auth.OAuth2(
  process.env.AUTH_CREDENTIALS,
  process.env.AUTH_SECRET,
  process.env.AUTH_REDIRECT_PATH
);

// login with googleAuth
router.post("/api/authentication/google", async (req, res) => {
  //code from google auth, email=user email, variant=type of authentication [login vs signup]
  const { code } = req.body;
  oAuthClient.getToken(code, async (err, token) => {
    if (err) {
      console.log(err);
      res.status(500).send("Authentication error.");
      return;
    }
    console.log(token);
    const accessToken={token:token.access_token, exp:token.expiry_date}
    const tokens = {
      id_token: token.id_token,
      access_token: accessToken,
      refresh_token: token.refresh_token
    };

    const userInfo = await oAuthClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.AUTH_CREDENTIALS
    });

    const email = userInfo.payload.email;

    //check if google id_token is valid
    if (!userInfo.payload.email_verified || !userInfo) {
      res.status(401).send({ error: "Authentication error" });
      return;
    }

    //create JWT token for route auth
    const claims = { type: "route security", app: "calndApp" };
    const jwt_token = jwt.create(claims, process.env.JWT_SECRET);

    console.log("refresh token");
    console.log(tokens.refresh_token);

    //check if authentication record exists in db if it does update it
    const auth_record = await AuthStore.find({ email: userInfo.payload.email });
    if (auth_record) {
      
      await AuthStore.update(
        { email },
        {
          authenticationTokenGoogle: tokens.access_token,
          authorizationToken: jwt_token,
          refreshToken: tokens.refresh_token
        }
      );

      res.status(201).send(JSON.stringify(jwt_token));
      return;
    }
    //save authentication tokens
    const newAuthStore = new AuthStore({
      email: userInfo.payload.email,
      authenticationTokenGoogle: tokens.access_token,
      authorizationToken: jwt_token,
      refreshToken: tokens.refresh_token
    });

    try {
      await newAuthStore.save();
    } catch (err) {
      console.log("error1");
      res.status(400).send(err);
      return;
    }

    console.log(jwt_token);

    const app_user = await User.find({ email: userInfo.payload.email });

    //check if email is already registered if not add user to db
    if (!app_user) {
      const newUser = new User({
        email: userInfo.payload.email,
        name: userInfo.payload.name
      });
      try {
        await newUser.save();
      } catch (err) {
        console.log("error2");
        res.status(400).send(err);
        return;
      }
    }

    res.status(201).send(JSON.stringify(jwt_token));
  });
});

router.get("/api/authentication/test", auth, (req, res) => {
  console.log(req.cookies.app_auth_token111);
  res.status(200).send("successfull auth");
});

router.get("/api/authentication/geturl", (req, res) => {
  const url = generateAuthUrl();
  console.log(url);
  res.status(200).send({ url });
});

module.exports = router;
