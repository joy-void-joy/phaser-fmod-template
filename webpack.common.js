const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  entry: {
    index: {import: "./src/main.ts", dependOn: ["FMOD"]},
    FMOD: "./src/lib/fmodstudio.js",
  },
  resolve: {
    extensions: ['.mjs', '.tsx', '.ts', '.js' ],
    alias: { "crypto": false, "fs": false }
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      title: 'FMOD Test',
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          useCache: true,
          errorAsWarnings: true,
        },
        exclude: /node_modules/
      },
      {
        test: [/\.scss$/, /\.css$/],
          use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
};
