const { google } = require("googleapis");
require("dotenv").config();

//ensures that user has been authenticated by google
const auth = async (req, res, next) => {
  const authorization = req.header("Authorization").split(" ");

  const oAuthClient = new google.auth.OAuth2(
    process.env.AUTH_CREDENTIALS,
    process.env.AUTH_SECRET,
    process.env.AUTH_REDIRECT_PATH
  );

  try {
    const userInfo = await oAuthClient.verifyIdToken({
      idToken: authorization[1],
      audience:
        "294753578980-nbeunl8bovad0pp6t4ve8p5vso2hiahg.apps.googleusercontent.com"
    });

    console.log(userInfo)

    if (!userInfo.payload.email_verified || !userInfo)
      res.status(401).send({ error: "Authentication error" });

    next();
  } catch (err) {
    res.status(401).send();
  }
};

module.exports = auth;
