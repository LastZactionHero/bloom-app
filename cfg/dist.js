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
  entry: ['babel-polyfill', path.join(__dirname, '../src/index')],
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.DefinePlugin({
      API_SEARCH_HOST: JSON.stringify('http://api-search.plantwithbloom.com'),
      API_USER_HOST: JSON.stringify('http://api-user.plantwithbloom.com'),
      STRIPE_PUBLISHABLE_KEY: 'pk_live_PTSEBcUzpw8JEfsLgFwqYfeZ'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),

    new AssetsPlugin({ filename: 'assets_dist.json' }), // Build assets manifest

    // Write the hashed asset filename into index.html
    function() {
      this.plugin('done', function() {
        let manifestFilename = './assets_dist.json';
        let indexFilename = './src/index.html';
        let outputFilename = './dist/index.html';

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
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
