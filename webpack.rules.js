const version = require('./package.json').version;

const rules = [{
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    use: [{
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
    }, {
        loader: 'string-replace-loader',
        options: {
            search: '\${version}',
            replace: version,
        }
    }],
}];

module.exports = rules;
