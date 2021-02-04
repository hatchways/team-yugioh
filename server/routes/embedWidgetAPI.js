const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/assets/widget/:fileName", (req, res) => {
  const options = {
    root: path.join(__dirname, "./assets/widget"),
  };
  res.sendFile(req.params.fileName);
});
