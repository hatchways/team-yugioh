const fourOfourHandler = (req, res, next) => {
  next(createError(404));
};

module.exports = fourOfourHandler;
