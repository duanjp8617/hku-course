var ialbum_app = angular.module('ialbum', []);

ialbum_app.controller('ialbumController', function($scope, $http){

  // loginErrorMsg is used to display both the header and the login error message
  $scope.loginErrorMsg = "iAlbum";

  // a boolean flag indicating whether the user has logged in
  $scope.notLogin = true;

  // the string displayed in the button that is used to login/logout
  $scope.logButtonString = "log in";

  // this variable stores the name and id of the logged-in user
  $scope.currentUser = {'username':'', '_id':''};

  // this variable stores the name and id of the user whose name is clicked in the left division
  $scope.selectedUser = {'username':'', '_id':''};

  // this array variable stores the friends of the logged-in user
  // each element in this array has the same structure with currentUser variable
  $scope.friends = [];

  // this boolean flag controls whether the webpage displays enlarged photo
  $scope.showBigPhoto = false;

  // This variable stores all the photos of a user
  $scope.userPhotos = [];

  // This variable stores basic information about the photo that is enlarged and dislayed
  $scope.photoBeingDisplayed = {'_id':'', 'url':'', 'friendListString':'', 'likedby':[]};

  // This boolean flag indicates whether the logged-in user is cliked in the left division
  $scope.isCurrentUser = false;

  // this function is called when the web page is loaded
  $scope.pageLoad = function(){
    $http.get("/init").then(function(response){
      if(response.data === ""){
        // if the response data is empty, then
        // the user has not logged in. Restore all the
        // variables to their default value.
        $scope.loginErrorMsg = "iAlbum";
        $scope.notLogin = true;
        $scope.logButtonString = "log in";
        $scope.currentUser = {'username':'', '_id':''};
        $scope.selectedUser = {'username':'', '_id':''};
        $scope.friends = [];
        $scope.showBigPhoto = false;
        $scope.userPhotos = [];
        $scope.photoBeingDisplayed = {'_id':'', 'url':'', 'friendListString':'', 'likedby':[]};
        $scope.isCurrentUser = false;
      }
      else{
  		  if (response.data.the_user){
          // The user has logged in, modify the variables to set up the
          // web page displayed in fig. 2 in the hnadout.

          // the notLogin should be set to false
	        $scope.notLogin = false;

          // the string content in the login/logout button should be "log out"
	        $scope.logButtonString = "log out";

          // save the name and id information of the login user to currentUser
	        $scope.currentUser.username = response.data.the_user;
	        $scope.currentUser._id = '0';

          // save the friend list of the login user
	        $scope.friends = response.data.friend_list;

          // clear the userPhotos list
	        $scope.userPhotos = [];
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
        // generate alerts in case that the user doesn't fill in username or password
        alert("You must enter username and password");
      }
      else{
        $http.post("/login", {'username':$scope.userInput.username, 'password':$scope.userInput.password}).then(function(response){
          if(response.data === "Login failure"){
            // if the login fails, display the response message
            // alongside the "iAlbum" header
            $scope.loginErrorMsg = "iAlbum "+response.data;
          }
          else{
			      if(response.data.friend_list){
              // login succeeded

              // change the notLogin flag to false
	            $scope.notLogin = false;

              // change the content of the login/logout button to "log out"
	            $scope.logButtonString = "log out";

              // save the login user name and id to currentUser, the name
              // of the login user could be obtained from the userInput model.
	            $scope.currentUser.username = $scope.userInput.username;
	            $scope.currentUser._id = '0';

              // save the friend list of the login user
	            $scope.friends = response.data.friend_list;
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
          // logout succeeded, restore all the variables to
          // their default values
          $scope.loginErrorMsg = "iAlbum";
          $scope.notLogin = true;
          $scope.logButtonString = "log in";
          $scope.currentUser = {'username':'', '_id':''};
          $scope.selectedUser = {'username':'', '_id':''};
          $scope.friends = [];
          $scope.showBigPhoto = false;
          $scope.userPhotos = [];
          $scope.photoBeingDisplayed = {'_id':'', 'url':'', 'friendListString':'', 'likedby':[]};
          $scope.isCurrentUser = false;

          // set userInput model to empty.
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
      // the login user is clicked. By setting this flag to true
      // we can delete/upload photos
      $scope.isCurrentUser = true;
    }
    else{
      // the friend of the login user is clicked. By setting this flag
      // to false, we can only like this user.
      $scope.isCurrentUser = false;
    }

    // we should not display enlarged photo, set this flag to false
    $scope.showBigPhoto = false;

    // save the clicked user's information to selectedUser
    $scope.selectedUser = user;

    $http.get("/getalbum/"+user._id).then(function(response){
      if (response.data.photo_list){
  		  $scope.userPhotos = [];
	      for(var index in response.data.photo_list){
          // save the information of each photo to the userPhotos list

          var photo = response.data.photo_list[index];

          // generate the string showing who likes this photo.
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
    // obtain the image file selected by the user
    var f = document.getElementById('imgFile').files[0];

	   if (f) {
      // upload the photo to the server
    	$http.post("/uploadphoto", f).then(function(response){
  			if (response.data._id){
          // newly uploaded photo has no likedby and empty friendListring.
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
      // send the id of the deleted photo to the server
      $http.delete('/deletephoto/'+photo._id).then(function(response){
	      if (response.data === ""){
          // the deletion on the server side is successful
          // now find out the index of the deleted photo within the userPhotos list
	        var splice_index = 0;
	        for(var index in $scope.userPhotos){
	          if($scope.userPhotos[index]._id == photo._id){
	            splice_index = index;
	          }
	        }

          // use the built-in splice function of JS array to
          // delete the photo at position splice_index.
	        $scope.userPhotos.splice(splice_index, 1);

	        if($scope.showBigPhoto == true){
            // here, if the deleted photo is the enlarged photo,
            // we need to display small photos.
	          $scope.goToSmallPhotos();
	        }
	      }
	      else {
         alert(response.data);
		    }
      }, function(response){
        alert("Error deleting photo.");
      });
    }
  };

  $scope.likePhoto = function(photo){
    if(photo.likedby.indexOf($scope.currentUser.username)==-1){
      // if the login user has not liked the photo before,
      // generate an http request to the server to update the likedby list
      $http.put('/updatelike/'+photo._id).then(function(response){
  		  if(response.data.like_list){
          // update the friendListString
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
    // when the small photo is clicked, the web page should display
    // enlarged photo. Set showBigPhoto to true and save the photo
    // being displayed to photoBeingDisplayed
    $scope.showBigPhoto = true;
    $scope.photoBeingDisplayed = photo;
  }

  $scope.goToSmallPhotos = function(){
    // When the x image is clicked, small photos should be displayed.
    // set showBigPhoto to false, clear photoBeingDisplayed and then
    // call showUserPhotos to update the small photos.
    $scope.showBigPhoto = false;
    $scope.photoBeingDisplayed = {'_id':'', 'url':'', 'friendListString':'', 'likeby':[]};
    $scope.showUserPhotos($scope.selectedUser);
  }
});
