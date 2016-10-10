<?php
  // 3.1 TODO: 1. If the cookie variable "userName" is not set,
  //              we should print the log in web page for the user.
  //              Please substitute the ? symbol with correct value.
  if(?){
    // the user has not logged in 
    print '<html>';
    print '<head>';
    print '<title>Login Page</title>';
    print '<link rel="stylesheet" type="text/css" href="style.css">';
    print '<script src="script.js"></script>';
    print '</head>';
    print '<body>';
    print '<div id="content">';
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
    print '</div>';
    print '</body>';
    print '</html>';
  }
  else{
    $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));
    mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));

    // 3.4 TODO: 1. We need to retrive user's old profile value from the profiles table, using
    //              $_COOKIE["userName"] as the key.
    //              Substitute the "?" symbol in the following line with correct value.
    $query = "select * from ? where userName='${?}'";
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    $row = mysqli_fetch_array($result);

    print '<html>';
    print '<head>';
    print '<title>Login Page</title>';
    print '<link rel="stylesheet" type="text/css" href="style.css">';
    print '<script src="script.js"></script>';
    print '</head>';
    print '<body>';
    print '<div id="content">';

    // Define a header on the web page. The id is set to "heading".
    // This is used to generate an notification when the user successfully
    // updates his profile.
    print '<h3 id="heading">You have successfully logged in. You can update your profile as follows:</h3><br>';

    // The input elements are placed in a form.
    print '<form class="userProfileForm">';

    // 3.4 TODO: 2. The first input element is nickName of the user. 
    //              It's value is initialized to the "nickName" field 
    //              of the query result.
    //              Substitute the "?" symbol with correct value.
    print '<fieldset>';
    print '<legend>Nick Name</legend>';
    print '<input type="text", maxlength="20", id="nickNameInputBox", value="'.?.'">';
    print '</fieldset>';

    // 3.4 TODO: 3. The second input element is the gender of the user. 
    //              It's value is initialized to the "gender" field
    //              of the query result.
    //              Substitute the "?" symbol with correct value.
    print '<fieldset>';
    print '<legend>Gender</legend>';
    print '<input type="text", maxlength="1", id="genderInputBox", value="'.?.'", onkeyup="inputCheck()">';
    print '</fieldset>';

    // 3.4 TODO 4: The last input element is the briefIntro of the user. 
    //             It's value is initialized to the "briefIntro" field
    //             of the query result. 
    //             Substitute the "?" symbol with correct value.
    print '<fieldset>';
    print '<legend>Brief Introduction</legend>';
    print '<input type="text" id="briefIntroInputBox", value="'.?.'">';
    print '</fieldset>';

    print '</form>';

    // By clicking this button, the user updates his profile to the database.
    // The click event will be handled by the updateProfile() function in script.js.
    print '<button onclick="updateProfile()">Update Profile</button>';

    // By clicking the following Log Out button, the user will log out.
    // The click event generates an HTTP GET method, which is handled by
    // handleLogout.php.
    print '<form class="logoutForm" action="handleLogout.php" method="get">';
    print '<input type="submit" value="Log Out">';
    print '</form>';
  }
?>