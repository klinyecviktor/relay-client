/* eslint-disable */
const isDevServer = process.argv.find(v => v.includes('webpack-dev-server'));

console.log("RUNNIND DEV SERVER:", !!isDevServer)

module.exports = isDevServer ? require('./webpack.dev') : require('./webpack.prod');