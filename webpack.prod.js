const path = require('path');
const devConfig = require('./webpack.dev.js');

const config = Object.assign({}, devConfig, {
    plugins: [
    ],
    devtool: 'source-map',
    mode: 'production',
});

config.output.path = path.resolve('./dist');


module.exports = config;
