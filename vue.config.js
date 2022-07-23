const isProduction = process.env.NODE_ENV === 'production'

// 配置文件
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    productionSourceMap: false,

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                'src/styles/*.less'
            ]
        }
    },

    // devServer:{
    //     open: true,
    //     proxy: {
    //         '/api': {
    //             target: `authz-dashboard/api`, //请求后台接口
    //             changeOrigin: true,
    //             ws: true,
    //             secure: false,
    //             logLevel: 'debug',
    //             pathRewrite: {
    //                 '^/api': '',
    //             },
    //         },
    //     }
    // }
}
