const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true, //Since we are reusing the user_id, there is a chance we duplicate document
  },
  clientSecret: {
    type: String, //this is used as the ID for the transaction, Stripe names it clientSecret
  },
  //To keep things simple for now, the presence of a user in this model indicates that they are subscribed
});

const Subscription = mongoose.model("subscription", schema);

module.exports = Subscription;
