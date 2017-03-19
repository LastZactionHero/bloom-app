'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let fs = require('fs');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.DefinePlugin({
     API_SEARCH_HOST: JSON.stringify('http://dev-api-search.plantwithbloom.com:3000'),
     API_USER_HOST: JSON.stringify('http://dev-api-user.plantwithbloom.com:3001'),
     STRIPE_PUBLISHABLE_KEY: 'pk_test_Q4Vk0WhrdssfjdtHLfG0nzpa'
    }),
    new AssetsPlugin({ filename: 'assets_dev.json' }), // Build assets manifest

    // Write the hashed asset filename into index.html
    function() {
      this.plugin('done', function() {
        let manifestFilename = './assets_dev.json';
        let indexFilename = './src/index.html';
        let outputFilename = './src/index.html';

        let manifest = JSON.parse(fs.readFileSync(manifestFilename, 'utf8'));
        let index = fs.readFileSync(indexFilename, 'utf8');
        index = index.replace(/\/assets\/app[^.]+.js/, manifest.main.js) // replace app.js with filename from manifest

        fs.writeFile(outputFilename, index, function(err) {
            if(err) { return console.log(err); }
        });
      });
    }
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
