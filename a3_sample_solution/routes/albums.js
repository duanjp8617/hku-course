var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

router.get('/init', function(req, res) {
  if(req.cookies.userID){
    var db = req.db;
    var user_list_collection = db.get("userList");
    var friend_list = [];

    // first find out the user with userID specified in the cookie
    user_list_collection.find({'_id':req.cookies.userID}, {}, function(error, the_user){
      if(error === null){
        var friend_name_list = the_user[0].friends;

        // the friend_name_list is an array containing all the friend names
        // of the current user. Now we make a query to get
        // all the users from the collection
        user_list_collection.find({}, {}, function(error, users){
          if(error === null){
            for(var index in users){
              if(friend_name_list.indexOf(users[index].username)!=-1){
                // the user.username is present in the friend_name_list,
                // we should put user into friend_list
                friend_list.push({'username':users[index].username, '_id':users[index]._id});
              }
            }
            res.json({'the_user':the_user[0].username, 'friend_list':friend_list});
          }
          else{
            res.send(error);
          }
        });
      }
      else{
        // a query error happens
        res.send(error);
      }
    });
  }
  else{
    res.send("");
  }
});

router.post('/login', bodyParser.json(), function(req, res) {

  var db = req.db;
  var user_list_collection = db.get("userList");

  user_list_collection.find({'username':req.body.username}, {}, function(error, login_user){
    if(error === null){
      if((login_user.length>0)&&(login_user[0].password==req.body.password)){
        // the username and password match those stored in the database
        // we should set up the cookie for the user
        var milliseconds = 3600 * 1000;
        res.cookie('userID', login_user[0]._id, { maxAge: milliseconds });

        // continue to get the friend list for this user
        var friend_list = [];

        user_list_collection.find({}, {}, function(error, users){
          if(error === null){
            for(var index in users){
              if(login_user[0].friends.indexOf(users[index].username)!=-1){
                // the user.username is present in the friend_name_list,
                // we should put user into friend_list
                friend_list.push({'username':users[index].username, '_id':users[index]._id});
              }
            }
            res.json({'friend_list':friend_list});
          }
          else{
            res.clearCookie('userID');
            res.send(error);
          }
        });
      }
      else{
        res.send("Login failure");
      }
    }
    else{
      res.send(error);
    }
  });
});

router.get('/logout', function(req, res) {
  res.clearCookie('userID');
  res.send("");
});

router.get('/getalbum/:userid', function(req, res) {
  var id = req.params.userid;
  var db = req.db;
  var photo_list_collection = db.get("photoList");

  if(id == "0"){
    id = req.cookies.userID;
  }

  // find out all the photos whose userid equals to id variable
  photo_list_collection.find({'userid':id}, {}, function(error, docs){
    if(error === null){
      // encode all the photos in the photo_list and send a proper json message back.
	    var photo_list=[];
      for(var index in docs){
        photo_list.push({'_id':docs[index]._id, 'url':docs[index].url, 'likedby':docs[index].likedby});
      }

      res.json({'photo_list':photo_list});
    }
    else{
        res.send(error);
    }
  });
});

router.post('/uploadphoto', function(req, res) {

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // generate a random number
  var random_num_str = getRandomInt(10000000, 90000000).toString();

  // this is the absolute path for storing the received photo
  var path = "./public/uploads/"+random_num_str+".jpg";

  // call the following function to store the received photo
  req.pipe(fs.createWriteStream(path));

  var db = req.db;
  var photo_list_collection = db.get("photoList");

  // update the database
  photo_list_collection.insert({'url':'uploads/'+random_num_str+".jpg", 'userid':req.cookies.userID, 'likedby':[]}, function(error, result){
    if (error === null)
		  res.json({'_id':result._id, 'url':result.url});
	  else
		  res.send(error);
  })
});

router.delete('/deletephoto/:photoid', function(req, res) {

  var db = req.db;
  var photo_list_collection = db.get("photoList");
  var photo_id = req.params.photoid;

  photo_list_collection.find({'_id':photo_id}, {}, function(error, result){
    if(error === null){
      // if the photo to be deleted exist
      var photo_name = result[0].url;

      // delete the photo from the database
      photo_list_collection.remove({'_id':photo_id}, function(error, result){
        if(error === null){
          // continue to remove the file from the disk
          var file_path = "./public/"+photo_name;
          fs.unlink(file_path,function(err){
            if(err){
              res.send(err);
            }
            else{
              res.send("");
            }
          });
        }
        else{
          res.send(error);
        }
      });
    }
    else{
      res.send(error);
    }
  });
});

router.put('/updatelike/:photoid', function(req, res) {
  var db = req.db;
  var photo_list_collection = db.get("photoList");
  var photo_id = req.params.photoid;

  // findout the photo being liked
  photo_list_collection.find({'_id':photo_id}, {}, function(error, the_photo){
    if(error === null){
      var like_list = the_photo[0].likedby;
      var user_list_collection = db.get("userList");

      // find out the login user
      user_list_collection.find({'_id':req.cookies.userID}, {}, function(error, the_user){
        if(error === null){
          // add the login user to the like_list
          var user_name = the_user[0].username;
          like_list.push(user_name);

          // update the like_list to the database
          photo_list_collection.update({'_id':photo_id}, {'url':the_photo[0].url, 'userid':the_photo[0].userid, 'likedby':like_list}, function(error, result){
            if(error === null){
              res.send({'like_list':like_list});
            }
            else{
              res.send(error);
            }
          });
        }
        else{
          res.send(error);
        }
      })
    }
    else{
      res.send(error);
    }
  });
});

module.exports = router;
