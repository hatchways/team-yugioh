const path = require("path");

module.exports = {
  entry: "./src/widget",
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "widget.bundle.js",
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.(png|svg)$/i, loader: "file-loader" },
    ],
  },
  devServer: {
    contentBase: "./assets",
    port: 3002,
    host: "0.0.0.0",
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
};
