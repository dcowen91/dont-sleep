const path = require("path");

module.exports = {
  mode:
    process.env.npm_lifecycle_event === "start" ? "development" : "production",
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
