
const vnjson = {
  entry: {
  	'dist/vnjson': './src/vnjson',
    'examples/dom/dependencies/vnjson': './src/vnjson',
    'examples/simple/vnjson': './src/vnjson',
    '../vnjson-cli/game-tpl/html/vendor/vnjson': './src/vnjson',
  },

  output: {
  	path: __dirname,
  	filename: '[name].js',
  	library: "vnjs",
    libraryTarget: 'var'
  },
  //watch: true,
  devtool: 'source-map',
  module:{
  	loaders: [
  		{
  			test: /\.js$/,
  			loader: 'babel-loader'
  		}
  	]
  }
};


module.exports = [ vnjson, /*plugins */]