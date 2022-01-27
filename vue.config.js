const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');
const fs = require('fs');

const rootPath = path.resolve(__dirname, 'frontend');

fs.rmSync(path.join(__dirname, 'public'), { recursive: true, force: true });

module.exports = {
  publicPath: "/",
  outputDir: "./public",
  lintOnSave: false,
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        // 'chart.js': 'chart.js/dist/Chart.js'
        './src': rootPath,
      },
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      }),
      new copyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'frontend/tr.mjs'),
            to: path.join(__dirname, 'public'),
          },
        ],
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
    sourceMap: process.env.NODE_ENV !== 'production',
  }
};
