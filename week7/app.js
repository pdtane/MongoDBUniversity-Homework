var mongoose = require('mongoose');
var express = require('express');
var routes = require('./routes');

mongoose.connect('mongodb://root:rootPassword@localhost:27017', function(err){
	if(err) throw err;
	
	console.log('connected');
	var app = express();
	
	routes(app);
	
	app.listen(3000, function() {
		console.log('now listening on http://localhost:3000');
	});
});