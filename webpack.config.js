var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');
var GenerateIndex = require('./web_modules/generateIndex');
var InsertScripts = require('./web_modules/insertScripts');
var CopyAssets = require('./web_modules/copyAssets');

module.exports.scripts = [
  'assets/libs/angular/angular.min.js',
  'assets/libs/angular-cookies/angular-cookies.min.js',
  'assets/libs/angular-resource/angular-resource.min.js',
  'assets/libs/angular-aria/angular-aria.min.js',
  'assets/libs/angular-animate/angular-animate.min.js',
  'assets/libs/angular-material/angular-material.min.js',
  'assets/libs/angular-messages/angular-messages.min.js',
  'assets/libs/angular-ui-router/release/angular-ui-router.min.js'
];

module.exports.styles = [
  'assets/libs/angular-material/angular-material.min.css',
  'assets/libs/animate.css/animate.min.css'
];

module.exports.config = {
  cache: true,
  target: 'web',
  entry: {
    app: './src/app/app.js',
    vendor: ['babel-regenerator-runtime', 'q', 'rxjs']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['syntax-async-functions', 'transform-regenerator']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
      },
      {
        test: /\.html$/,
        loader: 'html?attrs=false'
      }
    ],
  },
  resolve: {
    modulesDirectories: ['node_modules', './src/app/shared', './src/assets/libs', './src/assets'],
    root: [
      path.resolve('./src/app')
    ]
  }
};
