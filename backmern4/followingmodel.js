var mongoose = require('mongoose');


var FollowingSchema = new mongoose.Schema({
    login: {
        type: String,
           },
    
});
var Following = mongoose.model('Following', FollowingSchema);
module.exports = Following;


