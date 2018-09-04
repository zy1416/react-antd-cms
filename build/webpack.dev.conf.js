'use strict'
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ApiMocker = require('webpack-api-mocker')
const merge = require('webpack-merge')
const webpack = require('webpack')
const config = require('./config')
const utils = require('./utils')

module.exports = merge(baseWebpackConfig, {
    devtool: config.dev.devtool,
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback:true,
        contentBase: path.resolve(__dirname, 'dist'),
        host: config.dev.host,//指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
        port: config.dev.port,
        open: config.dev.autoOpenBrowser,
        hot: true,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        before(app){
            if(config.dev.mock){
                ApiMocker(app,path.resolve('mock/index.js'))
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development') // 在编译的代码里设置了`process.env.NODE_ENV`变量
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true
        })
    ]
})
