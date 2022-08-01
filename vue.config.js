// 配置文件
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'authz-dashboard-static',
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
      '/authz-api/v1': {
        target: `http://localhost:9090/api/authz-api/v1`,
        changeOrigin: true,
        ws: true,
        secure: false,
        logLevel: 'debug',
        pathRewrite: {
          '^/authz-api/v1': '',
        },
      },
    }
  }
}
