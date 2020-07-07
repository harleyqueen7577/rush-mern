var mongoose = require('mongoose');


var CommentSchema = new mongoose.Schema({
    login: {
        type: String,
           },
    
    contenu: {
           type: String,
  },
});
var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;