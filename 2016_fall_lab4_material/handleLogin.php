<?php

  // First we create the connection with the database. Please substitute csid and password
  // with your own id and password.
  $conn=mysqli_connect('sophia.cs.hku.hk','csid','password') or die ('Failed to Connect '.mysqli_error($conn));
  mysqli_select_db($conn,'csid') or die ('Failed to Access DB'.mysqli_error($conn));

  // Then we need to retrieve correct user namd and password from the users table.

  // 3.3 TODO: 1. Here we need to retrieve user's user name and password stored
  //              in the users table, using $_GET["userName"] as the key.
  //              Please substitute the "?" symbol in the following line with 
  //              correct value.
  //              (Note that we can directly refer a PHP variable in a string using 
  //               "'${variable name}'" syntax.)
  $query = "select * from ? where userName='${?}'";
  $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
  $row = mysqli_fetch_array($result);

  if(array_key_exists("password", $row)&&($row["password"]==$_GET["password"])){
    // The user name and password entered by the user match those in the users table.
    // The user successfully logs in to the system. 

    // 3.3 TODO: 2. set cookie "userName" for the user.

    // 3.3 TODO: 3. We need to retrive user's old profile value from the profiles table, using
    //              $_GET["userName"] as the key.
    //              Substitute the "?" symbol in the following line with correct value.
    $query = "select * from ? where userName='${?}'";
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    $row = mysqli_fetch_array($result);

    // Define a header on the web page. The id is set to "heading".
    // This is used to generate an notification when the user successfully
    // updates his profile.
    print '<h3 id="heading">You have successfully logged in. You can update your profile as follows:</h3><br>';

    // The input elements are placed in a form.
    print '<form class="userProfileForm">';

    
    // 3.3 TODO: 4. The first input element is nickName of the user. 
    //              It's value is initialized to the "nickName" field 
    //              of the query result.
    //              Substitute the "?" symbol with correct value.
    print '<fieldset>';
    print '<legend>Nick Name</legend>';
    print '<input type="text", maxlength="20", id="nickNameInputBox", value="'.?.'">';
    print '</fieldset>';

    // 3.3 TODO: 5. The second input element is the gender of the user. 
    //              It's value is initialized to the "gender" field
    //              of the query result.
    //              Substitute the "?" symbol with correct value.
    print '<fieldset>';
    print '<legend>Gender</legend>';
    print '<input type="text", maxlength="1", id="genderInputBox", value="'.?.'", onkeyup="inputCheck()">';
    print '</fieldset>';
    //               (Note that the onkeyup event is handled by inputCheck() function, 
    //                inputCheck() function ensures that only "F" and "M" characters 
    //                can be typed into the input element of gender).

    // 3.3 TODO 6: The last input element is the briefIntro of the user. 
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
  else{
    // The user name and password entered by the user do not match those in the users table.
    // Log in fail. Just response with "invalidUserNamePassword".
    print 'invalidUserNamePassword';
  }
?>