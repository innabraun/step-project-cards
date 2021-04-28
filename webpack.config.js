const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("@babel/core").transformSync("code", {
    plugins: ["@babel/plugin-transform-classes"],
});
require("babel-polyfill");


module.exports = {
    mode: 'development',
    entry:
        ["babel-polyfill", "./src/js/index.js",
           ],
    devServer: {
        contentBase: './dist',

        proxy: {
            '/api/v2/cards':{secure: false,target:'https://ajax.test-danit.com'},

        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './src/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },

        ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};
