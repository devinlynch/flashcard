database = require('../db')
// Gets the database object
var db = database.database();

exports.index = function(req, res){
	res.render("index.jade", { title: 'Home' });
};