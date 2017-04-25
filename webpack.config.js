
const vnjson = {
  entry: {
  	'dist/vnjson': './src/vnjson',
    'demo/js/vnjson': './src/vnjson',
    
  },

  output: {
  	path: __dirname,
  	filename: '[name].js',
  	library: "vnjs",
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
};


const plugins = {
  entry: {
    'dist/plugins': './plugins/index',
    'demo/game/plugins/plugins': './plugins/index',
  },

  output: {
    path: __dirname,
    filename: '[name].js',
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
};

module.exports = [ vnjson, plugins ]