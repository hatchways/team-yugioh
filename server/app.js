const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const authenticationRout = require("./routes/controllers/authentication");

const cors = require("cors");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const { json, urlencoded } = express;

require("./db/connection");

var app = express();

//Mount utilities
app.use(logger("dev"));
app.use(json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

//Mount route handlers
app.use(require("./routes/controllers/AppointmentAPI"));
app.use(require("./routes/controllers/eventAPI"));
app.use(require(".routes/controllers/authentication"));

//Mount utilities
app.use(require("./utils/errorHandler"));
app.use(require("./utils/fourOfourHandler"));

module.exports = app;
