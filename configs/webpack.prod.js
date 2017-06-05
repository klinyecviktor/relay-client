/* eslint-disable */
require('dotenv').config({path: './configs/.env'})

const { resolve } = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const API_ENDPOINT = process.env.API_ENDPOINT

console.log('API_ENDPOINT', API_ENDPOINT)

module.exports = {

    // Best way to learn all webpack options: https://github.com/webpack/webpack/blob/v1.13.3/lib/WebpackOptionsApply.js

    // Use target = web to optimize the bundle for web sites
    target: 'web',

    devtool: 'cheap-module-source-map',
    entry: {
        'bundle': [
            // Our app main entry
            '../src/app.js',
        ],
    },
    output: {
        path: resolve(__dirname, '../dist'),
        filename: '[name].[hash].js',
    },

    context: resolve(__dirname, './'),

    plugins: [
        new WebpackShellPlugin({
            onBuildStart:['relay-compiler --src ./src --schema ./configs/schema.graphql']
        }),
        new CleanWebpackPlugin(["dist"], { root: resolve(__dirname, '../')}),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        new ExtractTextPlugin({
            filename: "styles.[hash].css",
            allChunks: true
        }),
        new Dotenv({
            path: './configs/.env', // Path to .env file (this is the default)
        }),
        new HtmlWebpackPlugin({
            template: 'index.ejs'
        })
    ],
    module: {
        // loaders -> rules in webpack 2
        rules: [
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader',               // Use loader instead loaders to be compatible with the next version, webpack 2
                include: resolve(__dirname, '../src'), // Use include instead exclude to improve the build performance
                options: {
                    presets: ['es2015', 'react'],
                    plugins: ["relay"]
                }
            },
            {
                test: /\.scss$/i,
                include: resolve(__dirname, '../src'),  // Use include instead exclude to improve the build performance
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true,
                            sourceMap: false
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: false
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
        ],
    },
}