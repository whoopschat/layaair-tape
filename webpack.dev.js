const path = require('path');
const version = require('./package.json').version;

const devOutputPath = path.resolve('./dist-dev');

const config = {
    entry: {
        'tape': path.resolve('./src/index.ts'),
    },
    output: {
        path: devOutputPath,
        filename: '[name].js',
        globalObject: 'this',
        libraryTarget: 'umd',
    },
    externals: {
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            loose: true,
                            // debug: true,
                        }],
                    ],
                    plugins: [
                        'transform-class-properties',
                    ],
                },
            },
        }, {
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
            }, {
                loader: 'string-replace-loader',
                options: {
                    search: '\${tape_version}',
                    replace: version,
                }
            }],
        }],
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.jsx', '.tsx'],
    },
    devtool: 'source-map',
    mode: 'development',
};

module.exports = config;
