<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="script.js"></script>
</head>
<body>
<div id="content">
<?php
  if(!isset($_COOKIE["userName"])){
    // the user has not logged in 
    print '<div id="loginError"></div>';   
    print '<form class="loginForm">';
    print '<fieldset>';
    print '<legend>User Name</legend>';
    print '<input type="text" id="loginUserName">';
    print '</fieldset>';
    print '<fieldset>';
    print '<legend>Password</legend>';
    print '<input type="text" id="loginPassword">';
    print '</fieldset>';
    print '</form>';
    print '<button onclick="login()">Log In</button>';
  }
  else{
    $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));
    mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));

    // make the query
    $userName = $_COOKIE["userName"];
    $query = "select * from profiles where userName='".$userName."'";
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    $row = mysqli_fetch_array($result);

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

    // the last field is brief introduction, initialized to empty
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
?>
</div>
</body>
</html>