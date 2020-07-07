var mongoose = require('mongoose');


var FollowSchema = new mongoose.Schema({
    login: {
        type: String,
           },
  
});
var Follow = mongoose.model('Follow', FollowSchema);
module.exports = Follow;