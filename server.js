var express = require('express');
var livereload = require('./watch');
var path = {
	public:'../game/build/'
};

module.exports.start = function(){
var app = express();
	app.use('/', express.static(path.public));
	app.get("/", function(req, res){
		res.sendfile(path.public+'index.html');
	});

app.listen('8080',function(){
	//livereload.run();
});
};