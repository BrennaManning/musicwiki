//Note: I found the following very helpful, and based my app on the code found here:
//https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular

//This app is on Heroku! 

// General comments:
//   - You had not included serve-fvicon in your package.json. To do so please perform the command "npm install --save serve-favicon"
//   - Nice use of commenting through the documents
//   - Remove log statements from the master/prod version of the code..
//   - Your css should not be under "views" directory..
//   - Check inline comments on tour core.js for better architecture suggestions
//   - Remove log statements from production
//   - Please remove un-used code and indent properly both comments and code
//   - You should break down your index.html. It is currently an html document doing "everything". That shouldn't
// 	   be the case. Next time just keep your index file as minimal as possible, i.e. a single ng-view div tag pending 
//     nested in your ng-app and then call other views to populate the view. Let me know if you have any questions on this.

var express  = require('express');
var index = require('./routes/index.js');                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var favicon = require('serve-favicon');


var app = express();

//console.log(process.env['MONGOLAB_URI']);
//mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/pages'); //not created yet!
mongoose.connect('mongodb://localhost/pages');


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
});     // connect to mongoDB database on modulus.io


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(favicon(__dirname + '/public/images/favicon.ico'));


app.get('/api/pages', index);
app.post('/api/pages', index);
app.post('/api/pages/edit', index)


app.get('*', index);

// listen (start app with node server.js) ======================================

var PORT = process.env.PORT || 3000;
app.listen(PORT, function(err) {
    if(err) console.log(err)
});

// app.listen(3000);
// console.log("App listening on port 3000");

module.exports = app;