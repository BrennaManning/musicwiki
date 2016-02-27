var mongoose = require('mongoose');   

// define model =================
var pageSchema = mongoose.Schema({
  name: String,
  text : String,
});

module.exports = mongoose.model("page", pageSchema); 