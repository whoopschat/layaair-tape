const path = require('path');
const rules = require('./webpack.rules.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry: path.resolve('./src/rank_wx/index.js'),
    output: {
        path: path.resolve('./tpl/platform/wechat/openDataContext'),
        filename: 'code.js',
        libraryTarget: 'umd',
    },
    externals: {
    },
    module: {
        rules,
    },
    plugins: [
        new UglifyJsPlugin()
    ],
    mode: 'production',
};

module.exports = config;
