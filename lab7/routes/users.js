var express = require('express');
var router = express.Router();

/*
 * GET studentList.
 */
router.get('/studentList', function(req, res) {
    var db = req.db;
    var collection = db.get('studentList');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to addstudent.
 */
router.post('/addstudent', function(req, res) {
    var db = req.db;
    var collection = db.get('studentList');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deletestudent.
 */
router.delete('/deletestudent/:id', function(req, res) {
    var db = req.db;
    var studentID = req.params.id;
    var collection = db.get('studentList');
    collection.remove({'_id':studentID}, function(err, result){
    	res.send((err === null)?{msg:''}:{msg:err});
    });
});


module.exports = router;