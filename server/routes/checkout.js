const router = require("express").Router();
const stripe = require("stripe").Stripe(process.env.STRIPE_SECRET);

const dbSubscription = require("../db/models/Subscription");
const auth = require("../middleware/auth");

router.get("/api/pre-checkout", auth, async (req, res) => {
  // Check if the user is already subscribed. If so, set askForPayment in the response
  // to false; otherwise set it to true
  const user = await dbSubscription.findOne({
    user_id: req.userId,
  });
  if (user) {
    res.status(200).send({ askForPayment: false });
  } else {
    res.status(200).json({ askForPayment: true });
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

router.get("/api/checkout/reset", async (req, res) => {
  // send a get request here to reset the model that store user subscription info
  // will be deleted down the road but should keep it for development for now
  const result = await dbSubscription.deleteMany();
  res.send("OK");
});

router.get("/api/checkout/view", async (req, res) => {
  // send a get request here to see the model stores user subscription info
  // will be deleted down the road but should keep it for development for now
  const result = await dbSubscription.find();
  console.log(result);
  res.send("OK");
});

module.exports = router;
