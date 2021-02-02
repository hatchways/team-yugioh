const db = require("../db/models");

// Returns a promise that resolves to an object containing the details of the
// event. This function can be optimized by hooking it onto a cache object
const getEventDetailViaId = async (eventId) => {
  const eventDetails = await db.EventType.findOne({ _id: eventId });
  return {
    ...eventDetails.toObject(),
    eventName: eventDetails.name,
  };
};

module.exports = getEventDetailViaId;
