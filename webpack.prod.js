const path = require('path');
const devConfig = require('./webpack.config.js');

const config = Object.assign({}, devConfig, {
    plugins: [
    ],
    devtool: 'source-map',
    mode: 'production',
});

config.output.path = path.resolve('./dist');


module.exports = config;
