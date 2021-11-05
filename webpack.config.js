const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { fstat } = require("fs");

module.exports = (env, args) => {
  const baseFolder =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ""
      ? `${process.env.APPDATA}/ASP.NET/https`
      : `${process.env.HOME}/.aspnet/https`;

  const certificateArg = process.argv
    .map((arg) => arg.match(/--name=(?<value>.+)/i))
    .filter(Boolean)[0];
  const certificateName = certificateArg
    ? certificateArg.groups.value
    : process.env.npm_package_name;

  if (!certificateName) {
    console.error(
      "Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly."
    );
    process.exit(-1);
  }

  const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
  const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

  return {
    entry: {
      app: path.resolve(__dirname, "Server", "App"),
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "Server", "wwwroot", "dist"),
      publicPath: "/dist/",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    cache: {
      type: "filesystem",
      buildDependencies: {
        config: [__filename],
      },
    },
    devtool: "source-map",
    devServer: {
      port: 5002,
      https: {
        key: fs.readFileSync(keyFilePath),
        cert: fs.readFileSync(certFilePath),
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
  };
};
