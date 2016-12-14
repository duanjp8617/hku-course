var ialbum_app = angular.module('ialbum', []);

ialbum_app.controller('ialbumController', function($scope, $http){

  $scope.loginErrorMsg = "iAlbum";

  $scope.notLogin = true;

  $scope.logButtonString = "log in";

  $scope.noCurrentUser = true;

  $scope.currentUser = {'username':'', '_id':''};

  $scope.selectedUserId = '-1';

  $scope.friends = [];

  $scope.showBigPhoto = false;

  $scope.userPhotos = [];

  $scope.photoBeingDisplayed = {'_id':'', 'url':'', 'friendListString':'', 'likedby':[]};

  $scope.isCurrentUser = false;

  $scope.pageLoad = function(){
    $http.get("/init").then(function(response){
      if(response.data === ""){
        $scope.noCurrentUser = true;
        $scope.friends = [];

        $scope.userPhotos = [];
        $scope.isCurrentUser=false;
      }
      else{
		  if (response.data.the_user){
	        $scope.notLogin = false;
	        $scope.logButtonString = "log out";

	        $scope.noCurrentUser = false;
	        $scope.currentUser.username = response.data.the_user;
	        $scope.currentUser._id = '0';
	        $scope.friends = response.data.friend_list;

	        $scope.userPhotos = [];
	        $scope.isCurrentUser = false;
	      }
		  else{
		  	  alert(response.data);
		  }
      }
    }, function(response){
      alert("Error getting initial page.");
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

            $scope.userPhotos = [];
            $scope.isCurrentUser=false;
          }
          else{
			if(response.data.friend_list){
	            $scope.loginErrorMsg = 'iAlbum';
	            $scope.notLogin = false;
	            $scope.logButtonString = "log out";

	            $scope.noCurrentUser = false;
	            $scope.currentUser.username = $scope.userInput.username;
	            $scope.currentUser._id = '0';
	            $scope.friends = response.data.friend_list;

	            $scope.userPhotos = [];
	            $scope.isCurrentUser = false;
			}
			else{
				alert(response.data);
			}
          }
        }, function(response){
          alert("Error login.");
        });
      }
    }
    else{
      $http.get("/logout").then(function(response){
		if(response.data === ""){
	        $scope.notLogin = true;
	        $scope.logButtonString = "log in";

	        $scope.noCurrentUser = true;
	        $scope.friends = [];

	        $scope.userPhotos = [];
	        $scope.isCurrentUser=false;

	        $scope.showBigPhoto = false;

	        $scope.userInput.username = "";
	        $scope.userInput.password = "";
		}		
      }, function(response){
        alert("Error logout.");
      });
    }
  }

  $scope.showUserPhotos = function(user){
    if(user._id == '0'){
      $scope.isCurrentUser = true;
    }
    else{
      $scope.isCurrentUser = false;
    }
    $scope.showBigPhoto = false;
    $scope.selectedUserId = user._id;

    $http.get("/getalbum/"+user._id).then(function(response){
      if (response.data.photo_list){
		  $scope.userPhotos = [];
	      for(var index in response.data.photo_list){
	        var photo = response.data.photo_list[index];
	        var displayString = (photo.likedby.length == 0) ? "" : (photo.likedby.join(', ')+" liked this photo!");
	        $scope.userPhotos.push({'_id':photo._id, 'url':photo.url, 'likedby':photo.likedby,'friendListString':displayString});
	      }
	  }
	  else{
		  alert(response.data);
	  }
    }, function(response){
      alert("Error getting photos for current user.");
    });
  };

  $scope.uploadFile = function(){

    var f = document.getElementById('imgFile').files[0];

	if (f)
    {
    	$http.post("/uploadphoto", f).then(function(response){
			if (response.data._id){
		        $scope.userPhotos.push({'_id':response.data._id, 'url':response.data.url, 'likedby':[], 'friendListString':""});
		  	  	document.getElementById('imgFile').value = null;	
			}
			else{
				alert(response.data);
			}        
	    }, function(response){
	      alert("Error uploading file.")
	    });
	}
  };
  
  $scope.deletePhoto = function(photo){
    var confirmation = confirm('Are you sure you want to delete this photo?');
    if(confirmation == true){
      $http.delete('/deletephoto/'+photo._id).then(function(response){
		if (response.data === ""){
	        var splice_index = 0;
	        for(var index in $scope.userPhotos){
	          if($scope.userPhotos[index]._id == photo._id){
	            splice_index = index;
	          }
	        }

	        $scope.userPhotos.splice(splice_index, 1);

	        if($scope.showBigPhoto == true){
	          $scope.goToSmallPhotos();
	        }
		}
		else
		{
			alert(response.data);
		}
      }, function(response){
        alert("Error deleting photo.");
      });
    }
  };

  $scope.likePhoto = function(photo){
    if(photo.likedby.indexOf($scope.currentUser.username)==-1){
      $http.put('/updatelike/'+photo._id).then(function(response){
		  if(response.data.like_list){
        	  photo.friendListString = response.data.like_list.join(', ')+" liked this photo!";
        	  photo.likedby = response.data.like_list;
		  }
		  else{
			  alert(response.data);
		  }
      }, function(response){
        alert("Error like photo.");
      });
    }
  };

  $scope.goToBigPhoto = function(photo){
    $scope.showBigPhoto = true;
    $scope.photoBeingDisplayed = photo;
  }

  $scope.goToSmallPhotos = function(){
    $scope.showBigPhoto = false;
    $scope.photoBeingDisplayed = {'_id':'', 'url':'', 'friendListString':'', 'likeby':[]};
  }
});
