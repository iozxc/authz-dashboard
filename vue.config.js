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

  devServer: {
    open: true,
    proxy: {
      '/v1/api': {
        target: `http://localhost:9090/api/authz-dashboard/v1/api`,
        changeOrigin: true,
        ws: true,
        secure: false,
        logLevel: 'debug',
        pathRewrite: {
          '^/v1/api': '',
        },
      },
    }
  }
}
