
const vnjson = {
  entry: {
  	'dist/vnjson': './src/vnjson',
   // 'examples/_lib/vnjson': './src/vnjson',
   // '../vnjson-cli/game-tpl/html/vendor/vnjson': './src/vnjson',
  },

  output: {
  	path: __dirname,
  	filename: '[name].js',
  	library: "vnjs",
    libraryTarget: 'var'
  },
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};


module.exports = [ vnjson, /*plugins */]