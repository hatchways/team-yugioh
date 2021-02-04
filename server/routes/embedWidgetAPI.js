const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/assets/:fileName", (req, res) => {
  const options = {
    root: path.join(__dirname, "./assets"),
  };
  res.sendFile(req.params.fileName);
});
