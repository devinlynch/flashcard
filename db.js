// A function which returns a database object which has numerous
// prototypes for making queries to the database. 
function getDatabase(){
	
	var mysql      = require('mysql');
	var connection = mysql.createConnection({

	});
	
	connection.connect();
	
	// The database object to be returned
	var db = {};

	db.getContent = function(callback) {
		console.log("About to get content");
		var query = 'SELECT * FROM flashcard';
		connection.query(query, function(err, rows, fields) {
		  if (err){ console.log('ERROR CONNECTING TO MYSQL for db.getContent - ' +err); callback(undefined);};
		  console.log("finished getting content");
		  callback(rows);
	
		});
	}


	/**
	Finds the most recent User ID given to a flashcard, adds a random integer to it and then sends it to the 2 callbacks
	*/
	db.getMostRecentIdPlusRandom = function(callback, othercallback){
		var query = 'SELECT * FROM flashcard ORDER BY user DESC LIMIT 1';
		connection.query(query, function(err, rows, fields) {
		  if (err){ console.log('ERROR CONNECTING TO MYSQL for db.getMostRecentUser - ' +err); callback(undefined); othercallback(undefined);};
		  var newId=1;
		  if(rows != undefined && rows.length >0)
		  	newId = rows[0].user + getRandomInt(5,32);
		  callback(newId);
		  othercallback(newId);
		});
	}

	/**
	Creates a Flashcard Game given text to parse
	*/
	db.create = function(text, callback) {
		arrayOfLines = text.match(/[^\r\n]+/g);
		var arr = new Array();
		for(var i =0; i< arrayOfLines.length; i++){
			var begin = arrayOfLines[i].substr(0,arrayOfLines[i].indexOf(':'));
			var end = arrayOfLines[i].substr(arrayOfLines[i].indexOf(':')+1);
			if(begin == undefined || begin =="" || end == undefined || end == ""){ callback(false); return;}
			arr[i] = {};
			arr[i].key = begin;
			arr[i].val = end;
		}

		db.getMostRecentIdPlusRandom(doRest, callback);
		
		function doRest(user){
			var objectsToInsert = [];
			for(var i = 0; i< arr.length; i++){
				objectsToInsert[objectsToInsert.length]= [arr[i].key, arr[i].val, 'default', user];
			}
			db.addFlashCards(objectsToInsert);
		}
	}

	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	db.addFlashCards = function(arr){
		var query = 'INSERT INTO `flashcard` (`key`, `value`, `type`, `user`) VALUES ?';
		connection.query(query, [arr], function(err, rows, fields) {
		  if (err){ console.log('ERROR CONNECTING TO MYSQL for db.addToFlash - ' +err);};
		});
	}

	db.getContentForUser = function(user, callback) {
		var query = 'SELECT * FROM flashcard WHERE user = ' + user;
		connection.query(query, function(err, rows, fields) {
		  if (err){ console.log('ERROR CONNECTING TO MYSQL for db.getContent - ' +err); callback(undefined);};
		  
		  callback(rows);
	
		});
	}
		
	return db;	
}

exports.database = getDatabase;