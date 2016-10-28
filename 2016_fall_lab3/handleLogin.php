<?php
  // first establish the connection
  $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));
  mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));

  // make the query for username and password
  $query = "select * from users where userName='${_GET['userName']}'";
  $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
  $row = mysqli_fetch_array($result);

  if(array_key_exists("password", $row)&&($row["password"]===$_GET["password"])){
    // login succeed
    setcookie("userName", $row["userName"], time()+3600);
  
    // make the query for user profile
    $userName = $_GET["userName"];
    $query = "select * from profiles where userName='".$userName."'";
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    $row = mysqli_fetch_array($result);

    // here we render the webpage
    print '<h3 id="heading">You have successfully logged in. You can update your profile as follows:</h3><br>';

    print '<form class="userProfileForm">';

    // the first field is Nick name, with an empty initial value
    print '<fieldset>';
    print '<legend>Nick Name</legend>';
    print '<input type="text" maxlength="20" id="nickNameInputBox" value="'.$row["nickName"].'">';
    print '</fieldset>';

    // the second field is gender, initialized to male
    print '<fieldset>';
    print '<legend>Gender</legend>';
    print '<input type="text" maxlength="1" id="genderInputBox" value="'.$row["gender"].'" onkeyup="inputCheck()">';
    print '</fieldset>';

    // the last field is brief introduction, initialized to emty
    print '<fieldset>';
    print '<legend>Brief Introduction</legend>';
    print '<input type="text" id="briefIntroInputBox" value="'.$row["briefIntro"].'">';
    print '</fieldset>';

    print '</form>';

    // by clicking this button, the user updates the database
    print '<button onclick="updateProfile()">Update Profile</button>';

    // by clicking this button, the user will log out
    print '<form class="logoutForm" action="handleLogout.php" method="get">';
    print '<input type="submit" value="Log Out">';
    print '</form>';
  }
  else{
    print 'invalidUserNamePassword';
  }
?>