'use strict'
const express = require('express'),
	open = require('open');
const port = '8089';
const path = {
	public:'../renjs-cli/YAML_tpl/build/www'
};

module.exports.start = function(){
const app = express();
	app.use('/', express.static(path.public));
	app.get("/", function(req, res){
		res.sendfile(path.public+'/index.html');
	});

app.listen(port,function(){
	open(`http://localhost:${port}`,'chrome');
});
};