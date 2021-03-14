const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    devServer: {
        hotOnly: true,
        inline: true,
        contentBase: "./public",
        port: 5000
    },
    module: {
        rules: [
            {
                test: /\.js/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    }
}