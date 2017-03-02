var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Schema = mongoose.Schema;

var userSchema = new Schema({
	id : Number,
	episode_id : Number,
	number : Number,
	raw_text : String,
	timestamp_in_ms : Number,
	speaking_line : String,
    character_id : Number,
	location_id : Number,
	raw_character_text : String,
	raw_location_text : String,
	spoken_words : Number,
	normalized_text : String,
	word_count: Number
});

mongoose.model('simpson',userSchema);
/* GET users listing. */
router.get('/',function(req,res){
//   alert(req.text);
    mongoose.model('simpson').findOne({},function(err,simpson){
        if(err){
            res.json(err);
        }else{
            console.log("found model");
            res.render('index', {data2:simpson});
        }
    });
    mongoose.model('simpson').count({},function(err,count){
        if(err){
            res.json(err);
        }else{
            console.log("count of simpson data: ",count);
        }
    })
});
module.exports = router;
