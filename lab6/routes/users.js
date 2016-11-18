var express = require('express');
var router = express.Router();

/*
 * GET contactList.
 */
router.get('/contactList', function(req, res) {
    var db = req.db;
    var collection = db.get('contactList');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to addContact.
 */
router.post('/addContact', function(req, res) {
    var db = req.db;
    var collection = db.get('contactList');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteContact.
 */
router.delete('/deleteContact/:id', function(req, res) {
    var db = req.db;
    var contactID = req.params.id;
    var collection = db.get('contactList');
    collection.remove({'_id':contactID}, function(err, result){
    	res.send((err === null)?{msg:''}:{msg:err});
    });
});


module.exports = router;