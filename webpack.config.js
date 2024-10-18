const path = require('path');
const glob = require('glob');

module.exports = {
    entry: glob.sync('./api/**/*.js'),
    target: 'node',
    mode: 'production',
    resolve: {
        preferRelative: true,
        extensions: ['.mjs', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    externals: {
        'aws-sdk': 'aws-sdk'
    }
};
