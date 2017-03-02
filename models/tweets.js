var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	id : Number,
	fromUser : String,
	fromUserId : Number,
	fromUserName : String,
	twitterTweetId : String,
	LanguageCode : String,
    profileImageUrl : String,
	source : String,
	text : String,
	latitude : Number,
	longitude : Number,
	createdAt : String
});

mongoose.model('tweets',userSchema);