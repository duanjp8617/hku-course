var ialbum_app = angular.module('ialbum', []);

ialbum_app.controller('ialbumController', function($scope, $http){

  $scope.loginErrorMsg = "iAlbum"

  $scope.notLogin = true;

  $scope.logButtonString = "log in";

  $scope.noCurrentUser = true;

  $scope.currentUser = {'username':'', '_id':''};

  $scope.friends = [];

  $scope.showBigAlbum = false;

  $scope.userAlbums = [];

  $scope.albumBeingDisplayed = {'_id':'', 'url':'', 'friendListString':''};

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
        $scope.currentUser._id = response.data.the_user._id;
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
            $scope.currentUser.username = response.data.the_user.username;
            $scope.currentUser._id = response.data.the_user._id;
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

        $scope.userInput.username = "";
        $scope.userInput.password = "";
      }, function(response){
        alert("Error logout.");
      });
    }
  }

  $scope.showCurrentUserAlbums = function(){
    $scope.isCurrentUser = true;
    $scope.showBigAlbum = false;

    $http.get("/getalbum/0").then(function(response){
      $scope.userAlbums = [];
      for(var index in response.data){
        var album = response.data[index];
        $scope.userAlbums.push({'_id':album._id, 'url':album.url, 'friendListString':album.likedby.join(', ')});
      }
    }, function(response){
      alert("Error getting albums for current user.");
    });
  };

  $scope.showFriendAlbums = function(friend){
    $scope.isCurrentUser = false;
    $scope.showBigAlbum = false;

    $http.get("/getalbum/"+friend._id).then(function(response){
      $scope.userAlbums = [];
      for(var index in response.data){
        var album = response.data[index];
        $scope.userAlbums.push({'_id':album._id, 'url':album.url, 'friendListString':album.likedby.join(', ')});
      }
    }, function(response){
      alert("Error getting albums for current user.");
    });
  };

  $scope.deleteAlbum = function(album){

  };

  $scope.likeAlbum = function(album){

  };

  $scope.chooseFile = function(){

  };

  $scope.likeFile = function(){

  };
});
