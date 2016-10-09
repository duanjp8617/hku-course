<?php
  $loginFail = True;
  $userName = '';

  if( !isset($_COOKIE["userName"]) && !isset($_GET["userName"]) ){
    // this is the first time that the user logs in to the web page
    $loginFail = True;
  }
  elseif( !isset($_COOKIE["userName"]) && isset($_GET["userName"]) ){
    // this is when user submits the user name and password to log in

    // first establish the connection
    $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));
    mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));

    // made the query
    $query = "select * from users where userName='${_GET['userName']}'";
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    $row = mysqli_fetch_array($result);

    if(array_key_exists("password", $row)&&($row["password"]===$_GET["password"])){
      // login succeed
      setcookie("userName", $row["userName"], time()+3600);
      $loginFail = False;
      $userName = $_GET["userName"]; 
    }
    else{
      // login fails
      $loginFail = True;
      print '<h3>Invalid user name or password.</h3>';
    }
  }
  else{
    // the cookie is set
    $loginFail = False;
    $userName = $_COOKIE["userName"];
  }


  if($loginFail == True){
    print 'loginFail';
  }
  else{
    $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));
    mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));

    // made the query
    $query = "select * from profiles where userName='${userName}'";
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    $row = mysqli_fetch_array($result);

    // here we render the webpage
    print '<h3 id="heading">User Profile</h3><br>';

    // we only need a simple form here to hold all the elements.
    // things will be done through ajax.
    print '<form class="userProfileForm">';

    // the first field is Nick name, with an empty initial value
    print '<fieldset>';
    print '<legend>Nick Name</legend>';
    print '<input type="text", maxlength="20", id="nickNameInputBox", value="'.$row["nickName"].'">';
    print '</fieldset>';

    // the second field is gender, initialized to male
    print '<fieldset>';
    print '<legend>Gender</legend>';
    print '<input type="text", maxlength="1", id="genderInputBox", value="'.$row["gender"].'", onkeyup="inputCheck()">';
    print '</fieldset>';

    // the last field is brief introduction, initialized to emty
    print '<fieldset>';
    print '<legend>Brief Introduction</legend>';
    print '<input type="text" id="briefIntroInputBox", value="'.$row["briefIntro"].'">';
    print '</fieldset>';

    print '</form>';

    // by clicking this button, the user updates the database
    print '<button onclick="updateProfile()">Update Profile</button>';

    // by clicking this button, the user will log out
    print '<form class="logoutForm" action="handleLogout.php" method="get">';
    //print '<button onclick="logout()">Log Out</button>';
    print '<input type="submit" value="Log Out">';
    print '</form>';
  }
?>