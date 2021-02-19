const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { json, urlencoded } = express;

require("./db/connection");

const app = express();

const corsOption = {
  credentials: true,
  origin: true,
};

//Mount utilities
app.use(logger("dev"));
app.use(json());
app.use(cors(corsOption));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(join(__dirname, "public")));

//Mount route handlers
app.use(require("./routes/appointmentAPI"));
app.use(require("./routes/eventAPI"));
app.use(require("./routes/authentication"));
app.use(require("./routes/userAPI"));
app.use(require("./routes/googleCalendarAPI"));
app.use(require("./routes/emailAPI"));
app.use(require("./routes/subscriptionAPI"));
app.use(require("./routes/imageUploaderAPI"));
app.use(require("./routes/teamEventAPI"));
app.use(require("./routes/teamAPI"));
app.use(require("./routes/embedWidgetAPI"));

// Serve the build folder and redirect 404 to index.html
app.use(express.static("../client/build"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use(require("./utils/errorHandler"));
app.use(require("./utils/fourOfourHandler"));

module.exports = app;
