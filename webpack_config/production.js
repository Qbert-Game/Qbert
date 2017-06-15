var _ = require('lodash');
var webpack = require('webpack');
var GenerateIndex = require('../web_modules/generateIndex');
var InsertScripts = require('../web_modules/insertScripts');
var CopyAssets = require('../web_modules/copyAssets');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var global = require("./../webpack.config.js");

var local = {
    output: {
        path: __dirname,
        filename: '../www/[name].js'
    },
    plugins: [
        new GenerateIndex(),
        new InsertScripts({
            entry: './src/index-template.html',
            output: './www/index.html',
            scripts: global.scripts,
            styles: global.styles
        }),
        new CopyAssets({ scripts: global.scripts, styles: global.styles }),
        new CopyWebpackPlugin([{
            from: './src/assets/images', to: '../www/assets/images'
        }, {
            from: './src/assets/fonts', to: '../www/assets/fonts'
        }, {
            from: './src/assets/audio', to: '../www/assets/audio'
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: '../www/assets/scripts/commons.js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            exclude: /\app\.js$/,
            warnings: false
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(JSON.parse(`"${process.env.NODE_ENV}"` || '"production"'))
        })
    ]
};

module.exports = _.extend(global.config, local);
