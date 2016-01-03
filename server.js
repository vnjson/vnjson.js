var express = require('express');
var path = {
	public:'dev_game_tpl/'
};

module.exports.start = function(){
var app = express();
	app.use('/', express.static(path.public));
	app.get("/", function(req, res){
		res.sendfile(path.public+'index.html');
	});

app.listen('8080');
};