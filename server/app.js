const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const authenticationRout = require("./routes/controllers/authentication");

const cors = require("cors");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const { json, urlencoded } = express;

const connection = require("./db/connection");

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

//Mount route handlers
app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use(require("./routes/controllers/AppointmentAPI"));
app.use(require("./routes/controllers/eventAPI"));
app.use(authenticationRout);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
