const {
  override,
  addWebpackModuleRule,
  addWebpackAlias,
} = require("customize-cra");

const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@/": path.resolve(__dirname, "./src/"),
    "builder": path.resolve(__dirname, "./src/builder"),
    "shared": path.resolve(__dirname, "./src/shared"),
  }),
  addWebpackModuleRule({
    test: /\.(jpg|png|gif|ico|cur)$/,
    use: [{ loader: "url-loader", options: { esModule: false } }],
  })
);
