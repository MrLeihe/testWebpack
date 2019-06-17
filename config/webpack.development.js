const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const config = merge(baseConfig, {
    module: {
        rules: [
            {
                test: /\.less?/,
                include: [path.resolve(__dirname, '../src')],
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        host: '0.0.0.0',
        port: '8080',
        hot: true,
        before(app) {
            app.get('/api/test.json', (req, res) => {
                res.json({
                    code: '200',
                    message: 'hello world!'
                })
            })
        }
    },
})

module.exports = config