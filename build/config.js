'use strict'
const path = require("path")

module.exports={
    dev:{
        autoOpenBrowser:true,
        cssSourceMap:true,
        devtool:'#cheap-module-eval-source-map',
        assetsPublicPath:'/',
        assetsSubDirectory:'static',
        host:'0.0.0.0',
        port:67,
        mock:true,
        proxyTable:{
            '/api/buy-back/buc/amount': {
                target: 'http://192.168.49.196:8080',
                changeOrigin: true
            }
        }
    },
    build:{
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        devtool:'#source-map',
        assetsPublicPath:'/react/',
        assetsSubDirectory:'static',
        productionSourceMap:true,
        bundleAnalyzerReport:true
    }
}