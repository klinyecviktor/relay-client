/* eslint-disable */
require('dotenv').config({path: './configs/.env'})

const { resolve } = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.CLIENT_PORT

console.log('port', port)

module.exports = {

    // Best way to learn all webpack options: https://github.com/webpack/webpack/blob/v1.13.3/lib/WebpackOptionsApply.js

    // Use target = web to optimize the bundle for web sites
    target: 'web',

    // Use devtool to enhance the debugging process.
    // More info: https://webpack.js.org/configuration/devtool/
    // and https://webpack.github.io/docs/build-performance.html#sourcemaps
    devtool: 'inline-source-map',
    entry: {
        'bundle': [
            // activate HMR for React
            'react-hot-loader/patch',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint
            `webpack-dev-server/client?http://localhost:${port}`,
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates
            'webpack/hot/only-dev-server',
            // Our app main entry
            './src/app.js',
        ],
    },
    output: {
        path: resolve(__dirname, '../build'),
        filename: '[name].js',
        // necessary for HMR to know where to load the hot update chunks
        publicPath: '/',
    },

    devServer: {
        // All options here: https://webpack.js.org/configuration/dev-server/

        // enable HMR on the server
        hot: true,
        // match the output path
        contentBase: resolve(__dirname, '../build'),
        // match the output `publicPath`
        publicPath: '/',

        port: port,

        historyApiFallback: true,

        // All the stats options here: https://webpack.js.org/configuration/stats/
        stats: {
            colors: true, // color is life
            chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
            'errors-only': true,
        },
    },

    context: resolve(__dirname, '../'),

    plugins: [
        // See full list: https://github.com/webpack/docs/wiki/list-of-plugins

        /**
         * This is where the magic happens! You need this to enable Hot Module Replacement!
         */
        new WebpackShellPlugin({
            onBuildStart:['relay-compiler --src ./src --schema ./configs/schema.graphql --watch']
        }),
        new webpack.HotModuleReplacementPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin(),
        new Dotenv({
            path: './configs/.env', // Path to .env file (this is the default)
        }),
        new HtmlWebpackPlugin({
            template: './configs/index.ejs'
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
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            minimize: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
}