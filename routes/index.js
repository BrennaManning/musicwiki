
var express  = require('express');
var router = express.Router();                             // create our app w/ express
var mongoose = require('mongoose');

var Page = require('../models/pageModel.js')


// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
router.get('/api/pages', function(req, res) {

  // use mongoose to get all todos in the database

  // remember to clean up dead code before submitting -- true throughout the app, I'm going to stop making the change

  Page.find({}, function(err, pages) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      // Better: (true throughout app, I won't keep making the change)
      res.status(500).json(err);
    }
    // remember to clean up debugging mechanisms (e.g. console.logs) before you submit your code!
    res.json(pages); // return all todos in JSON format
  });
});

// create todo and send back all todos after creation
router.post('/api/pages', function(req, res) {

  // create a todo, information comes from AJAX request from Angular
  Page.create({
    name: req.body.name,
    text : req.body.text,
    author: req.body.author,
    imageurl: req.body.imageurl
  }, function(err, page) {
    console.log('createPage')
    if (err) {res.send(err);}

    // get and return all the todos after you create another
    Page.find({}, function(err, pages) {
      if (err) {res.send(err)}
      res.json(pages);
    });
  });

});

// //edit a todo
router.post('/api/pages/edit', function(req, res) {

  // console.log(req)
  Page.update({
    //_id: mongojs.ObjectId(req.body._id)
    _id: req.body._id
  }, {
    name: req.body.name,
    text: req.body.text,
    author: req.body.author,
    lasteditedby: req.body.lasteditedby,
    imageurl: req.body.imageurl
  }, {}, function(err, page) {
    if (err) {res.send(err);}

      // get and return all the todos after you edit
  Page.find(function(err, pages) {
    if (err) {res.send(err); return;}
    res.json(pages);
    });
  });

});

router.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
