const router = require("express").Router();

const stripe = require("stripe").Stripe(process.env.STRIPE_SECRET);

router.post("/api/checkout", (req, res) => {
  const amount = 1024;
  const currency = "cad";
});
