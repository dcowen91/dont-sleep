const path = require("path");

const isDevMode = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDevMode ? "development" : "production",
  devtool: "source-map",
  entry: "./src/App.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "public")
  },
  devServer: {
    contentBase: "./public"
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  }
};
