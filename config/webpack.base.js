const path = require('path')
const webpack = require('webpack')
const uglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/index.js')
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },

    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, '../src'),
        ],
        alias: {
            '@/utils': path.resolve(__dirname, '../src/utils')
        },
        extensions: ['.js', '.less', '.css']
    },

    module: {
        rules: [
            {
                test: /\.vue?/,
                include: [
                    path.resolve(__dirname, '../src')
                ],
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                resource: {
                    test: /\.css?/
                },
                use: ['style-loader', 'css-loader']
            },

            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        // 定义全局常量
        new webpack.DefinePlugin({
            NAME: JSON.stringify('stone')
        }),
        // 处理 html
        new HtmlWebpackPlugin({
            title: 'wepack项目',
            filename: 'index.html',
            template: 'public/index.html',
            minify: {
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            }
        }),
        // copy 文件
        new CopyWebpackPlugin(
            [{
                from: '../src/utils/log.js', to: 'log.js'
            }]
        ),
        // 全局定义一个库的名称
        new webpack.ProvidePlugin({
            $: 'moment'
        })
    ]
}
