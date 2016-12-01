var express = require('express');
var router = express.Router();

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
        // of the current user. Now we made a query to get
        // all the users from the collection.
        user_list_collection.find({}, {}, function(error, users){
          if(error === null){
            for(var index in users){
              if(friend_name_list.indexOf(users[index].username)!=-1){
                // the user.username is present in the friend_name_list,
                // we should put user into friend_list
                friend_list.push({'username':users[index].username, '_id':users[index]._id});
              }
            }
            res.json({'the_user':{'username':the_user[0].username}, 'friend_list':friend_list});
          }
          else{
            res.send("Database operation failure.");
          }
        });
      }
      else{
        // an query error happens
        res.send("Database operation failure");
      }
    });
  }
  else{
    res.send("");
  }
});

router.post('/login', function(req, res) {

  var db = req.db;
  var user_list_collection = db.get("userList");

  user_list_collection.find({'username':req.body.username}, {}, function(error, login_user){
    if(error === null){
      if((login_user.length>0)&&(login_user[0].password==req.body.password)){
        // the username and password parameter matches that stored in the database
        // we should set up the cookie for the user
        var milliseconds = 60 * 1000;
        res.cookie('userID', login_user[0]._id, { maxAge: milliseconds });

        // continue to get the friend list for this user
        var friend_list = [];

        var user_list_collection = req.db.get("userList");

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
            res.send("Database operation failure");
          }
        });
      }
      else{
        res.send("Login failure");
      }
    }
    else{
      res.send("Database operation failure");
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

  photo_list_collection.find({'userid':id}, {}, function(error, docs){
    if(error === null){
      res.json(docs);
    }
    else{
      res.send("Database operation failure");
    }
  });
});

router.post('/uploadphoto', function(req, res) {
  //var obj = req.body.imgData;
  //var arr = Object.keys(obj).map(function (key) { return obj[key]; });
  //res.send(arr.length.toString());
  var fs = require('fs');

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var random_num_str = getRandomInt(10000000, 90000000).toString();
  var path = "./public/uploads/"+random_num_str+".jpg";
  req.pipe(fs.createWriteStream(path));

  var db = req.db;
  var photo_list_collection = db.get("photoList");

  photo_list_collection.insert({'url':'uploads/'+random_num_str+".jpg", 'userid':req.cookies.userID, 'likedby':[]}, function(error, result){
    res.send(
        (error === null) ? {'_id':result._id, 'url':result.url} : "Database operation failure"
    );
  })
});

router.delete('/deletephoto/:photoid', function(req, res) {

  var db = req.db;
  var photo_list_collection = db.get("photoList");
  var photo_id = req.params.photoid;

  photo_list_collection.find({'_id':photo_id}, {}, function(error, result){
    if(error === null){
      var photo_name = result[0].url.substring(8);
      photo_list_collection.remove({'_id':photo_id}, function(error, result){
        if(error === null){
          // continue to remove the file from the disk
          var file_path = "./public/uploads/"+photo_name;
          var fs = require('fs');
          fs.unlink(file_path,function(err){
            if(err){
              res.send("Error deleting album file.");
            }
            else{
              res.send("");
            }
          });
        }
        else{
          res.send("Database operation failure");
        }
      });
    }
    else{
      res.send("Database operation failure");
    }
  });
});

router.put('/updatelike/:photoid', function(req, res) {
  var db = req.db;
  var photo_list_collection = db.get("photoList");
  var photo_id = req.params.photoid;

  photo_list_collection.find({'_id':photo_id}, {}, function(error, the_photo){
    if(error === null){
      var like_list = the_photo[0].likedby;
      var user_list_collection = db.get("userList");

      user_list_collection.find({'_id':req.cookies.userID}, {}, function(error, the_user){
        if(error === null){
          var user_name = the_user[0].username;
          like_list.push(user_name);
          photo_list_collection.update({'_id':photo_id}, {'url':the_photo[0].url, 'likedby':like_list, 'userid':the_photo[0].userid}, function(error, result){
            if(error === null){
              res.send(like_list);
            }
            else{
              res.send("Database operation failure");
            }
          });
        }
        else{
          res.send("Database operation failure");
        }
      })
    }
    else{
      res.send("Database operation failure");
    }
  });
});

module.exports = router;
