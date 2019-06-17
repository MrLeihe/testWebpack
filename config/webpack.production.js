const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractLESS = new ExtractTextPlugin('index.css')

const config = merge(baseConfig, {
    module: {
        rules: [
            {
                test: /\.less?/,
                include: [path.resolve(__dirname, '../src')],
                use: extractLESS.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    }, 'less-loader']
                })
            }
        ]
    },
    plugins: [
        // 清空dist
        new CleanWebpackPlugin(),
        extractLESS
    ]
})

module.exports = config