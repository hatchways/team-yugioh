const stripe = require("stripe")(process.env.STRIPE_SECRET);
const router = require("express").Router();
const dbUser = require("../db/models/User");
const auth = require("../middleware/auth");

router.get("/api/subscription/check", auth, async (req, res) => {
  const userId = req.userId;

  const result = await dbUser.findOne({ _id: userId });

  const subscribed = result.subscribed;

  res.status(200).send({ subscribed });
});

router.post("/api/subscription/create-customer", auth, async (req, res) => {
  const userId = req.userId;
  const user = await dbUser.findOne({ _id: userId });

  const email = user.email;
  const name = user.name;
  const customer = await stripe.customers.create({ email, name });
  await dbUser.updateOne({ _id: userId }, { stripeId: customer.id }); //no need to wait, but just in case
  res.status(200).send({ customer });
});

router.post("/api/subscription/create-subscription", auth, async (req, res) => {
  // I don't really understand this API tbh
  const paymentMethod = await stripe.paymentMethods.attach(
    req.body.paymentMethodId,
    { customer: req.body.customerId }
  );

  const updateCustomerDefaultPaymentMethod = await stripe.customers.update(
    req.body.customerId,
    {
      invoice_settings: {
        default_payment_method: paymentMethod.id,
      },
    }
  );

  const subscription = await stripe.subscriptions.create({
    customer: req.body.customerId,
    items: [{ price: req.body.priceId }],
    expand: ["latest_invoice.payment_intent"],
  });

  await dbUser.updateOne(
    { _id: req.userId },
    { subscribed: true, subscriptionId: subscription.id }
  );
  res.send(subscription);
});

router.get("/api/subscription/cancel", auth, async (req, res) => {
  const subscriptionId = (await dbUser.findOne({ _id: req.userId }))
    .subscriptionId;
  const subscription = await stripe.subscriptions.del(subscriptionId);
  await dbUser.updateOne(
    { _id: req.userId },
    { subscribed: false, subscriptionId: "" }
  );
  res.status(200).send("Subscription cancelled");
});

module.exports = router;
