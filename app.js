var express = require('express')
  , routes = require('./routes')
  , pages = require('./routes/pages')
  , db = require('./db')
  , http = require('http')
  , path = require('path');
var app = express();

var theDb = db.database();

app.configure(function(){
  app.set('port', process.env.PORT || 4006);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use("/public", express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res, next){
  routes.index(req, res, next);
});

app.get('/id/:user', pages.user);

app.post('/create', function(req, res){
  var text = req.body.text;
  function doOtherStuff(result){
    var returnObj ={};
    if(result != undefined && result != false)
      returnObj.res = result;
    else
      returnObj.res = undefined;
    res.send(returnObj);
  }

  theDb.create(text, function(result) {
    doOtherStuff(result);
  });
});


/**
Uncomment if you want to be able to access all Flashcards
app.post('/getContent', function(req, res){
  if(req.body.startNum != undefined && req.body.endNum != undefined){
    function doOtherStuff(content){
      res.send(content);
    }
    theDb.getContent(function(theContent) {
      doOtherStuff(theContent);
    });
  } else{
    res.send(undefined);
  }
});

app.get('/getContentJson', function(req, res){
  function doOtherStuff(content){
    res.send(JSON.stringify(content));
  }
  theDb.getContent(function(theContent) {
    doOtherStuff(theContent);
  });
});
*/

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

