
module.exports = {
  entry: {
  	'dist/vnjson': './src/on',
    'demo/js/vnjson': './src/on'
  },

  output: {
  	path: __dirname,
  	filename: '[name].js',
  	library: 'vnjs',
    libraryTarget: 'var'
  },
  watch: false,
  devtool: 'source-map',
  module:{
  	loaders: [
  		{
  			test: /\.js$/,
  			loader: 'babel-loader'
  		}
  	]
  }
}