var { resolve } = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin'); 

const WebpackConcatPlugin = require('webpack-concat-files-plugin');
 
module.exports = {
  watch: false,
  entry: [
    './_src/screens/main.js'
  ],
  output: {
    path: resolve(__dirname, './_dist/app'),
    publicPath: '/_dist/app',
    filename: 'screens.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
   ]
 },
 plugins: [
  new VueLoaderPlugin(),
  new WebpackConcatPlugin({
        bundles: [
          {
            dest: './_dist/app/plugins.js',
            src: './_src/plugins/**/*.js'
          },
        ],
    })   
  ]
}