database = require('../db')
var db = database.database();


// A page for uploading new content
exports.user = function(req, res){	
	var user = req.params.user;
	doOtherStuff = function(content){
			res.render("userFlash.jade", { title: 'Home', variable:{content: content} });
	};
	// Gets the current user from database
	db.getContentForUser(user, function(content) {
		doOtherStuff(content);
  	});		
};


// An error page
function sendErrorPage(error, res){
	res.render("error.jade", {title: 'Error Page', error: error,  variable:{user: undefined}});
}