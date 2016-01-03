var livereload = require('livereload');

module.exports.run = function(){

var server = livereload.createServer();
	server.watch([__dirname +"dev_game_tpl/game/*.json5",__dirname +'dev_game_tpl/vendors/*.js',"dev_game_tpl/game/**/*.json5"]);
};