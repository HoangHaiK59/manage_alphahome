import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            "react-dom": "@hot-loader/react-dom",
        }
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'https://localhost:44352/api/'
        })
    }
}