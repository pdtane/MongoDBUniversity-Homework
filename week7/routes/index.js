var errors = require('./errors');

module.exports = function(app) {
	app.get('/', function(req, res){
		res.render('home.jade');
	});
	
	errors(app);
}