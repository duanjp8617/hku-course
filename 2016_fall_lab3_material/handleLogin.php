<?php

  //fill in your MySQL username and password in the following line
  $conn=mysqli_connect('sophia.cs.hku.hk', username, password) or die ('Failed to Connect '.mysqli_error($conn));
  
  //fill in your database name in the following line
  mysqli_select_db($conn,dbname) or die ('Failed to Access DB'.mysqli_error($conn));

  // TODO: 1. Here we need to retrieve user's user name and password stored
  //          in the users table, using $_GET["userName"] as the key.
  //          Please substitute "?" in the following line with 
  //          correct value.
  $query = "select * from users where userName='".?."'";
  $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
  $row = mysqli_fetch_array($result);

  if(array_key_exists("password", $row)&&($row["password"]==$_GET["password"])){
    // The user name and password entered by the user match those in the users table.
    // The user successfully logs in to the system. 

    // TODO: 2. set cookie "userName" for the user.

    // TODO: 3. Retrive user's old profile information from the profiles table, using
    //          $_GET["userName"] as the key.
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

    
    // TODO: 4. The first input element is nickName of the user. 
    //          Its value is initialized to the "nickName" field 
    //          of the query result.
    //          Substitute "?" with correct value.
    print '<fieldset>';
    print '<legend>Nick Name</legend>';
    print '<input type="text" maxlength="20" id="nickNameInputBox" value="'.?.'">';
    print '</fieldset>';

    // TODO: 5. The second input element is the gender of the user. 
    //          Its value is initialized to the "gender" field
    //          of the query result.
    //          Substitute "?" with correct value.
    print '<fieldset>';
    print '<legend>Gender</legend>';
    print '<input type="text" maxlength="1" id="genderInputBox" value="'.?.'", onkeyup="inputCheck()">';
    print '</fieldset>';
    //               (Note that the onkeyup event is handled by inputCheck() function, 
    //                inputCheck() function ensures that only "F" or "M" or "" 
    //                can be typed into the input element of gender).

    // TODO 6: The last input element is the briefIntro of the user. 
    //         Its value is initialized to the "briefIntro" field
    //         of the query result. 
    //         Substitute "?" with correct value.
    print '<fieldset>';
    print '<legend>Brief Introduction</legend>';
    print '<input type="text" id="briefIntroInputBox" value="'.?.'">';
    print '</fieldset>';

    print '</form>';

    // By clicking this button, the user updates profile to the database.
    // The click event will be handled by updateProfile() in script.js.
    print '<button onclick="updateProfile()">Update Profile</button>';

    // By clicking the following Log Out button, the user will log out.
    // The click event generates an HTTP GET request for handleLogout.php.
    print '<form class="logoutForm" action="handleLogout.php" method="get">';
    print '<input type="submit" value="Log Out">';
    print '</form>';
  }
  else{
    // The user name and password entered by the user do not match those in the users table.
    // Login failure. Just respond "invalidUserNamePassword".
    // When login() funcion in script.js receives this reponse, it will replace the innerHTML of
    // <div id="loginError"> with "<h3>Invalid user name or password.</h3>".
    print 'invalidUserNamePassword';
  }
?>