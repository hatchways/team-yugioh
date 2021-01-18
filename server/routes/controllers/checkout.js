const router = require("express").Router();

const stripe = require("stripe").Stripe(process.env.STRIPE_SECRET);

router.get("/api/checkout", async (req, res) => {
  const amount = 1024;
  const currency = "cad";
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "cad",
  });
  res.status(200).json({ clientSecret: paymentIntent.client_secret, amount });
});
