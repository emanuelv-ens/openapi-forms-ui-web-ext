﻿import path from "node:path";
import webpack, { Configuration } from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { createTransformer as createStyledComponentsTransformer } from "typescript-plugin-styled-components";

const outputDirectory = path.resolve(import.meta.dirname, "dist/");

const configuration: Configuration = {
  context: import.meta.dirname,
  entry: {
    app: "./src/pages/app/main.ts",
    options: "./src/pages/options/main.ts",
    background_script: "./src/background_script.ts",
    content_script: "./src/content_script.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [createStyledComponentsTransformer({})],
          }),
        },
      },
      {
        test: /\.css|\.sass$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
      /*{
        test: /manifest\.json/,
        type: "asset/resource",
      },*/
    ],
  },
  output: {
    clean: true,
    filename: "[name].js",
    path: outputDirectory,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_DISABLE_COLORS: "true",
    }),
    new webpack.DefinePlugin({
      "process.browser": JSON.stringify(true),
      "process.platform": JSON.stringify("linux"),
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new CopyWebpackPlugin({
      options: {},
      patterns: [
        { from: "manifest.json", to: "manifest.json" },
        { from: "src/assets/", to: "assets/" },
        /*{
          from: "pages/!**!/!*.html",
          context: path.resolve(import.meta.dirname, "src/"),
        },*/
      ],
    }),
    new HtmlWebpackPlugin({
      chunks: ["options"],
      filename: "options.html",
      template: "src/pages/options/index.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["app"],
      filename: "app.html",
      template: "src/pages/app/index.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["main"],
      filename: "main.html",
      template: "src/pages/main/index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      buffer: "buffer",
      fs: "@zenfs/core",
      http: "stream-http",
      https: "https-browserify",
      path: "path-browserify",
      util: "util",
      url: "url",
    },
  },
  target: ["web"],
};

export default configuration;
