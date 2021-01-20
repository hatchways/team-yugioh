const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { json, urlencoded } = express;

require("./db/connection");

const app = express();

//Mount utilities
app.use(logger("dev"));
app.use(json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

//Mount route handlers
app.use(require("./routes/appointmentAPI"));
app.use(require("./routes/eventAPI"));
app.use(require("./routes/authentication"));
app.use(require("./routes/userAPI"));


//Mount utilities
app.use(require("./utils/errorHandler"));
app.use(require("./utils/fourOfourHandler"));

module.exports = app;
