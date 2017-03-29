var _ = require('lodash');
var webpack = require('webpack');
var GenerateIndex = require('../web_modules/generateIndex');
var InsertScripts = require('../web_modules/insertScripts');

var global = require("./../webpack.config.js");

var local = {
    output: {
        path: '../src',
        filename: '[name].js',
    },
    plugins: [
        new GenerateIndex(),
        new InsertScripts({
            entry: './src/index-template.html',
            output: './src/index.html',
            scripts: global.scripts,
            styles: global.styles
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            path: '../src',
            filename: 'assets/scripts/commons.js'
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(JSON.parse(`"${process.env.NODE_ENV}"` || '"development"'))
        })
    ]
};

module.exports = _.extend(global.config, local);
