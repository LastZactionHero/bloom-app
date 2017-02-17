var webpackCfg = require('./webpack.config');

// Set node environment to testing
process.env.NODE_ENV = 'test';

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [ 'PhantomJS' ],
    files: [
      'test/loadtests.js',
      {
        pattern: 'test/fixtures/**/*'
      }
    ],
    port: 8000,
    captureTimeout: 60000,
    frameworks: [ 'mocha', 'chai', 'sinon-chai', 'fixture' ],
    client: {
      chai: {
        includeStack: true
      },
      mocha: {}
    },
    singleRun: true,
    reporters: [ 'mocha', 'coverage' ],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-sinon-chai',
      'karma-fixture',
      'karma-json-fixtures-preprocessor'
      // 'karma-sourcemap-loader',
      // 'karmawebpack'
    ],
    preprocessors: {
      'test/loadtests.js': [ 'webpack', 'sourcemap' ],
      '**/*.json'        : [ 'json_fixtures' ]
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' }
      ]
    },
    jsonFixturesPreprocessor: {
      variableName: '__json__'
    }
  });
};
