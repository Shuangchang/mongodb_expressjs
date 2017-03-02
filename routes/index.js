var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
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
},{ strict: false });

mongoose.model('simpsons',userSchema);
var simpson = mongoose.model('simpsons');

/* GET home page. */
router.get('/', function(req,res){
    res.render('index', { title: 'Simpson search', message: 'Hello there!'});
});

router.post('/form',function(req,res){
    var query = req.body.text;
    console.log("query word is: "+query);
    mongoose.model('simpsons').find({"normalized_text":{$regex:query}},function(err,simpsons){
        if(err){
            res.json(err);
        }else{
            console.log("found "+simpson.length+" results.");
            res.render('form', {datas:simpsons});
        }
    });
        mongoose.model('simpsons').count({},function(err,count){
        if(err){
            res.json(err);
        }else{
            console.log("count of simpson: "+ count);
        }
    })
});

//render page
router.get('/form/:id',function(req,res){
    var id = parseInt(req.params.id);
    mongoose.model('simpsons').findOne({"id":id},function(err,simpson){
        if(err){
            res.json(err); 
        }else{
            console.log("found that simpson."+simpson.id);
            console.log(simpson);

            // Ref: The reason I need to de-seralize and seralize the object is:
            // stackoverflow.com/questions/16657064/access-mongoose-non-schema-values-in-jade
            res.render('oneitem', {jsonObj:JSON.parse(JSON.stringify(simpson))});
        }  
    }); 
});


//find the doc in mngodb then save to that doc
router.post('/create/:id',function(req,res){
    var comm = req.body.comment;
    console.log('what is the comment '+ comm);
    var id = req.params.id;
    console.log('what is the id '+ id);
    simpson.findOneAndUpdate({"id":id},{$set:{comment:comm}},function(err,simpson){
        if(err){
            res.json(err);
        }else{
            res.redirect('/');
            console.log("inderted success.");
        }
    }); 
})


module.exports = router;
