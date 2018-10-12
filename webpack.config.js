const path = require('path');
const fse = require('fs-extra');
const version = require('./package.json').version;

const devOutputPath = path.resolve('./dist-dev');

const targetDevOutputPaths = [
    path.resolve('./examples/demo/bin/tape'),
];

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
    plugins: [{
        // auto copy
        apply: (compiler) => {
            compiler.hooks.afterEmit.tap('CopyToDevOutputPaths', () => {
                // copy results
                targetDevOutputPaths.forEach((target) => {
                    try {
                        fse.emptyDirSync(target);
                        fse.emptyDirSync(`${target}/include/`);
                        // fse.copyFileSync(devOutputPath, target);
                        Object.keys(config.entry).forEach(name => {
                            fse.copyFileSync(`${devOutputPath}/${name}.js`, `${target}/${name}.js`);
                            fse.copyFileSync(`${devOutputPath}/${name}.js.map`, `${target}/${name}.js.map`);
                            fse.copyFileSync(`${devOutputPath}/../include/${name.toLowerCase()}.d.ts`, `${target}/include/${name.toLowerCase()}.d.ts`);
                        });
                        console.log(`build output copied to - ${target}`);
                    } catch (err) {
                        console.error(err);
                    }
                });

            });
        }
    }],
    devtool: 'source-map',
    mode: 'development',
};

module.exports = config;
