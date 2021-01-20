const router = require("express").Router();
const stripe = require("stripe").Stripe(process.env.STRIPE_SECRET);

const dbSubscription = require("../db/models/Subscription");
const auth = require("../middleware/auth");

router.get("/api/pre-checkout", auth, async (req, res) => {
  //check if the user is already subscribed
  const user = await dbSubscription.findOne({
    user_id: req.userId,
  });
  if (user) {
    res.status(400).send("User has already paid for subscription");
  } else {
    res.status(200).send("OK");
  }
});

router.get("/api/checkout", async (req, res) => {
  // Starts a payment intent and send back the transaction ID (aptly named clientSecret)
  // It is the front end's responsibility to make sure precheckout has been run
  // In the event that payment failed, the clientSecret would be discarded.
  const amount = 120;
  const currency = "cad";
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  });
  res.status(200).json({ clientSecret: paymentIntent.client_secret, amount });
});

router.post("/api/post-checkout", auth, async (req, res) => {
  try {
    //insert a new document into Subscription model with the user_id. There is a chance
    //for duplication error if pre-checkout wasn't run
    const clientSecret = req.body.clientSecret || undefined;
    if (!clientSecret) {
      res.status(400).send("Client secret not included in request body");
    }
    await dbSubscription.create({
      user_id: req.userId,
      clientSecret,
    });
    res.status(200).send("OK");
  } catch (error) {
    res.status(400).send("Error occurred in /api/post-checkout\n", error);
  }
});

router.get("/api/checkout/test-database", async (req, res) => {
  //this is for testing purpose
  const user = await dbSubscription.findOne({
    _id: "60073b42110ac1321c6b18b5",
  });
  if (user && user.subscribed) {
    res.status(400).send("User has already paid for subscription");
  } else {
    res.status(200).send("OK");
  }
});

module.exports = router;
