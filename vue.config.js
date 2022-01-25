const webpack = require('webpack');
const path = require('path');

module.exports = {
  publicPath: "/",
  outputDir: "./public",
  lintOnSave: false,
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        // 'chart.js': 'chart.js/dist/Chart.js'
         './src': path.resolve(__dirname, 'frontend')
      },
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'OTT Dashboard',
    themeColor: '#101022',
    msTileColor: '#101022',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#101022'
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
