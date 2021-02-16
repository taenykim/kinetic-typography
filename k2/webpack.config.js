const path = require("path");

module.exports = {
  mode: "development", // ['development', 'production']
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js", // chunk시, [name][hash].js
    libraryTarget: "umd", // ['var', 'this', 'commonjs', 'commonjs2', 'amd', 'umd']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".ts", ".js"],
  },
  externals: {},
  target: "web", // ['web', 'webworker', 'node', async-node', 'electron']
  plugins: [],
  optimization: {},
  // devtool: "cheap-eval-source-map", // 데브서버가 디버깅 해줌.
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    host: "localhost",
    overlay: true,
    port: 8080,
    stats: "errors-only",
  },
};
