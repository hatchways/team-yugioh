// Returns a promise that resolves to an object containing the details of the
// event. This function can be optimized by hooking it onto a cache object
const getEventDetailViaId = (eventId) => {
  return db.EventTypes.findOne({ _id: eventId });
};

module.exports = getEventDetailViaId;
