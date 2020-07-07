var mongoose = require('mongoose');
Schema = mongoose.Schema
//Set up default mongoose connection
//var mongoDB = 'mongodb://localhost:27042/my_database';
//mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
//var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var UserSchema = new mongoose.Schema({
    login: {
        type: String,
           },
    email: {
            type: String,
              },
    password: {
           type: String,
  },
    type: {
           type: Boolean,
  },
  follows:[{type: Schema.Types.ObjectId, ref:'Follow'}],
  followings:[{type: Schema.Types.ObjectId, ref:'Following'}]
});
var User = mongoose.model('User', UserSchema);
module.exports = User;