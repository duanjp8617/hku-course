<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="script.js"></script>
</head>
<body>
<div id="content">
<?php
  // TODO: 1. If the cookie variable "userName" is not set,
  //          we should print the login page for the user.
  //          Please substitute "?" with correct value.
  if(?){
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
    //fill in your MySQL username and password in the following line
    $conn=mysqli_connect('sophia.cs.hku.hk',username,password) or die ('Failed to Connect '.mysqli_error($conn));
   
    //fill in your database name in the following line
    mysqli_select_db($conn,dbname) or die ('Failed to Access DB'.mysqli_error($conn));

    // TODO: 2. Retrive user's old profile information from the profiles table, using
    //          $_COOKIE["userName"] as the key.
    //          Substitute "?" in the following line with correct value.
    $query = "select * from ? where userName='".?."'";
    
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    $row = mysqli_fetch_array($result);

    // Create a heading with id "heading" on the web page. 
    // whose content is to be changed when the user has successfully
    // updated the profile.
    print '<h3 id="heading">You have successfully logged in. You can update your profile as follows:</h3><br>';

    // The input elements are placed in a form.
    print '<form class="userProfileForm">';

    // TODO: 3. The first input element is nickName of the user. 
    //          Its value is initialized to the "nickName" field 
    //          of the query result.
    //          Substitute "?" with correct value.
    print '<fieldset>';
    print '<legend>Nick Name</legend>';
    print '<input type="text" maxlength="20" id="nickNameInputBox" value="'.?.'">';
    print '</fieldset>';

    // TODO: 4. The second input element is the gender of the user. 
    //          Its value is initialized to the "gender" field
    //          of the query result.
    //          Substitute "?" with correct value.
    print '<fieldset>';
    print '<legend>Gender</legend>';
    print '<input type="text" maxlength="1" id="genderInputBox" value="'.?.'" onkeyup="inputCheck()">';
    print '</fieldset>';

    // TODO 5: The last input element is the briefIntro of the user. 
    //         Its value is initialized to the "briefIntro" field
    //         of the query result. 
    //         Substitute "?" with correct value.
    print '<fieldset>';
    print '<legend>Brief Introduction</legend>';
    print '<input type="text" id="briefIntroInputBox" value="'.?.'">';
    print '</fieldset>';

    print '</form>';

    // By clicking this button, the user updates his profile to the database.
    // The click event will be handled by updateProfile() in script.js.
    print '<button onclick="updateProfile()">Update Profile</button>';

    // By clicking the following Log Out button, the user will log out.
    // The click event generates an HTTP GET request for handleLogout.php.
    print '<form class="logoutForm" action="handleLogout.php" method="get">';
    print '<input type="submit" value="Log Out">';
    print '</form>';
  }
?>
</div>
</body>
</html>