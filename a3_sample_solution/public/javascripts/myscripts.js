var ialbum_app = angular.module('ialbum', []);

ialbum_app.controller('ialbumController', function($scope, $http){

  $scope.loginErrorMsg = "iAlbum"

  $scope.notLogin = true;

  $scope.logButtonString = "log in";

  $scope.noCurrentUser = true;

  $scope.currentUser = {'username':'', '_id':''};

  $scope.selectedUserId = '-1';

  $scope.friends = [];

  $scope.showBigAlbum = false;

  $scope.userAlbums = [];

  $scope.albumBeingDisplayed = {'_id':'', 'url':'', 'friendListString':'', 'likedby':[]};

  $scope.isCurrentUser = false;

  $scope.imgFileName = "no file selected";

  $scope.pageLoad = function(){
    $http.get("/init").then(function(response){
      if(response.data === ""){
        $scope.noCurrentUser = true;
        $scope.friends = [];

        $scope.userAlbums = [];
        $scope.isCurrentUser=false;
      }
      else{
        $scope.notLogin = false;
        $scope.logButtonString = "log out";

        $scope.noCurrentUser = false;
        $scope.currentUser.username = response.data.the_user.username;
        $scope.currentUser._id = '0';
        $scope.friends = response.data.friend_list;

        $scope.userAlbums = [];
        $scope.isCurrentUser = false;
      }
    }, function(response){
      alert("Error getting contacts.");
    });
  };

  $scope.handleLoginLogout = function(){
    if($scope.notLogin == true){
      if(($scope.userInput.username=="")||($scope.userInput.password=="")){
        alert("You must enter username and password");
      }
      else{
        $http.post("/login", {'username':$scope.userInput.username, 'password':$scope.userInput.password}).then(function(response){
          if(response.data === "Login failure"){

            $scope.loginErrorMsg = response.data;
            $scope.notLogin = true;
            $scope.logButtonString = "log in";

            $scope.noCurrentUser = true;
            $scope.friends = [];

            $scope.userAlbums = [];
            $scope.isCurrentUser=false;
          }
          else{
            $scope.loginErrorMsg = 'iAlbum';
            $scope.notLogin = false;
            $scope.logButtonString = "log out";

            $scope.noCurrentUser = false;
            $scope.currentUser.username = $scope.userInput.username;
            $scope.currentUser._id = '0';
            $scope.friends = response.data.friend_list;

            $scope.userAlbums = [];
            $scope.isCurrentUser = false;
          }
        }, function(response){
          alert("Error login.");
        });
      }
    }
    else{
      $http.get("/logout").then(function(response){
        $scope.notLogin = true;
        $scope.logButtonString = "log in";

        $scope.noCurrentUser = true;
        $scope.friends = [];

        $scope.userAlbums = [];
        $scope.isCurrentUser=false;

        $scope.showBigAlbum = false;

        $scope.userInput.username = "";
        $scope.userInput.password = "";
      }, function(response){
        alert("Error logout.");
      });
    }
  }

  $scope.showUserAlbums = function(user){
    if(user._id == '0'){
      $scope.isCurrentUser = true;
    }
    else{
      $scope.isCurrentUser = false;
    }
    $scope.showBigAlbum = false;
    $scope.selectedUserId = user._id;

    $http.get("/getalbum/"+user._id).then(function(response){
      $scope.userAlbums = [];
      for(var index in response.data){
        var album = response.data[index];
        var displayString = (album.likedby.length == 0) ? "" : (album.likedby.join(', ')+" liked this photo!");
        $scope.userAlbums.push({'_id':album._id, 'url':album.url, 'likedby':album.likedby,'friendListString':displayString});
      }
    }, function(response){
      alert("Error getting albums for current user.");
    });
  };

  $scope.deleteAlbum = function(album){
    var confirmation = confirm('Are you sure you want to delete this album?');
    if(confirmation == true){
      $http.delete('/deletephoto/'+album._id).then(function(response){
        var splice_index = 0;
        for(var index in $scope.userAlbums){
          if($scope.userAlbums[index]._id == album._id){
            splice_index = index;
          }
        }

        $scope.userAlbums.splice(splice_index, 1);

        if($scope.showBigAlbum == true){
          $scope.goToSmallAlbums();
        }

      }, function(response){
        alert("Error deleting albums.");
      });
    }
  };

  $scope.likeAlbum = function(album){
    if(album.likedby.indexOf($scope.currentUser.username)==-1){
      $http.put('/updatelike/'+album._id).then(function(response){
        album.friendListString = response.data.join(', ')+" liked this photo!";
        album.likedby = response.data;
      }, function(response){
        alert("Error like album.");
      });
    }
  };

  $scope.uploadFile = function(){

    var f = document.getElementById('imgFile').files[0];

    $http({url:"/uploadphoto", method: "POST", data: f, headers: {'Content-Type': undefined}}).then(function(response){
      $scope.userAlbums.push({'_id':response.data._id, 'url':response.data.url, 'likedby':[], 'friendListString':""});
    }, function(response){
      alert("Error uploading file.")
    });
  };

  $scope.goToBigAlbum = function(album){
    $scope.showBigAlbum = true;
    $scope.albumBeingDisplayed = album;
  }

  $scope.goToSmallAlbums = function(){
    $scope.showBigAlbum = false;
    $scope.albumBeingDisplayed = {'_id':'', 'url':'', 'friendListString':'', 'likeby':[]};
  }
});
