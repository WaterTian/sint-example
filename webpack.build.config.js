const pkg = require('./package.json');
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    mode: 'production',
    // devtool: 'source-map',
    entry: './src/app.js',
    output: {
        path: __dirname + "/build",
        filename: 'app.js',
        libraryTarget: "umd",
        umdNamedDefine: true,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJSPlugin({
                include: 'app.js',
                parallel: true,
                // sourceMap: true,
                extractComments:false,
                uglifyOptions: {
                    compress: true,
                    ie8: false,
                    ecma: 5,
                    warnings: false
                }
            })
        ]
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [path.resolve(__dirname, 'src')],
            exclude: /node_modules/
        }, {
            test: /\.(glsl|frag|vert)$/,
            loader: 'raw-loader',
            exclude: /node_modules/
        }, {
            test: /\.(glsl|frag|vert)$/,
            loader: 'glslify-loader',
            exclude: /node_modules/
        }, ]
    }


};