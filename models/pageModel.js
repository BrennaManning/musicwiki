var mongoose = require('mongoose');   

// define model =================
var pageSchema = mongoose.Schema({
  name: String,
  text : String,
  author: { type: String, default: "None" },
  lasteditedby: { type: String, default: "None" }
});

module.exports = mongoose.model("page", pageSchema); 