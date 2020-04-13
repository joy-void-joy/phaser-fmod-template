const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CompressionPlugin({
      threshold: 8192,
      minRatio: 0.8,
    }),
    new CopyPlugin([
      { from: 'public', to: '.' },
    ]),
  ],
  externals: {
    phaser: {
      root: "phaser",
      commonjs2: "phaser",
    },
  },
  performance: {
    maxEntrypointSize: 4500000,
    maxAssetSize: 4500000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    },
  },
});
