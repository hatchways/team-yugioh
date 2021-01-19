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

<<<<<<< HEAD
//Mount route handlers
app.use(require("./routes/AppointmentAPI"));
app.use(require("./routes/eventAPI"));
app.use(require("./routes/authentication"));
=======
app.use("/", indexRouter);
app.use("/ping", pingRouter);

app.use(require("./routes/controllers/appointmentAPI"));
app.use(require("./routes/controllers/eventAPI"));
app.use(require("./routes/userAPI"));

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
>>>>>>> ae3f4f9... Appointment to appointment

//Mount utilities
app.use(require("./utils/errorHandler"));
app.use(require("./utils/fourOfourHandler"));

module.exports = app;
