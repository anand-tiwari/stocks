const path = require('path')
const config = require('./build/config.js')

// You can change the port by the following method:
// port = 9999 npm run dev OR npm run dev --port = 9999
const port = process.env.port

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  chainWebpack (chainConfig) {
    chainConfig.plugins.delete('prefetch')
  },
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  configureWebpack: {
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('node_modules/@blibli/blue-internal')]
      }]
    },
    resolve: {
      alias: require('./aliases.config').webpack
    },
    plugins: [
    ]
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true
  },
  publicPath: '/',
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: { ...config.staging.proxyTable }
  }
}
