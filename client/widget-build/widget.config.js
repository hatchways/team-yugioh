const path = require("path");

module.exports = {
  entry: "../src/widget",
  output: {
    path: path.resolve(__dirname, "../../server/routes/assets/widget"),
    filename: "widget.bundle.js",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.(png|svg)$/i, loader: "file-loader" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    contentBase: ".",
    port: 3002,
    host: "0.0.0.0",
    publicPath: "/assets/widget/",
  },
};
