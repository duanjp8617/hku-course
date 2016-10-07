<?php
  // The values of these 2 variables must be correctly set
  // by the conditional code.
  $printLoginPage = True;
  $userName = '';

  if( !isset($_COOKIE["userName"]) && !isset($_GET["userName"]) ){
    // If the HTTP request contains no cookies or GET method, then this
    // is the first time the user starts the index.html web page. Please
    // correctly set the value of $printLoginPage variable. 
    
    // 3.3 TODO: 1. set correct value for $printLoginPage

  }
  elseif( !isset($_COOKIE["userName"]) && isset($_GET["userName"]) ){
    // If the HTTP request only contains GET method, then the user has filled in the 
    // user name and password and tries to log in. We should retrieve the user name and 
    // password from the database and do a comparison to ensure that the user provides
    // correct user name and password.

    // First we create the connection with the database. Please substitute csid and password
    // with your own id and password.
    $conn=mysqli_connect('sophia.cs.hku.hk','csid','password') or die ('Failed to Connect '.mysqli_error($conn));
    mysqli_select_db($conn,'csid') or die ('Failed to Access DB'.mysqli_error($conn));

    // Then we need to retrieve correct user namd and password from the users table.
    
    // 3.3 TODO: 2. Here we need to retrieve user's user name and password stored
    //              in the users table, using the "userName" parameter of the GET
    //              method as the key.
    //              Please substitute the "?" symbol in the following line with 
    //              correct value.
    $query = "select * from users where userName='${?}'";
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    $row = mysqli_fetch_array($result);

    if(array_key_exists("password", $row)&&($row["password"]==$_GET["password"])){
      // If the password retrieved from the database is the same with the password provided by the user,
      // Then the user successfully logs in to the system. We need to set the cookie for this user 
      // and set correct value for $printLoginPage variable and $userName variable.
      
      // 3.3 TODO: 3. set cookie "userName" for the user.
      // 3.3 TODO: 4. set correct values for $printLoginPage and $userName
    }
    else{
      // If the password does not match the password provided by the user, then
      // the login fails. We should notify the user why he can't log in.

      // 3.3 TODO: 5. set correct value for $printLoginPage
      // 3.3 TODO: 6. add "<h3>Invalid user name or password.</h3>" in the HTTP response text. 
    }
  }
  else{
    // If the HTTP request contains the cookie variable, then
    // the user has already logged in. 

    // 3.3 TODO: 7. set correct value for $printLoginPage and $userName
  }


  if($printLoginPage == True){
    // If $printLoginPage equals True, then
    // the user has not logged in. We should return an HTTP
    // response text containing the log in web page.

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
    // If $printLoginPage equals False, then 
    // the user has successfully logged in. We should return 
    // an HTTP response text containing the update profile web page.

    // First, we need to retrive from the profiles table the old profile value for
    // the user.
    // Establish the connection to the database.
    $conn=mysqli_connect('sophia.cs.hku.hk','csid','password') or die ('Failed to Connect '.mysqli_error($conn));
    mysqli_select_db($conn,'csid') or die ('Failed to Access DB'.mysqli_error($conn));

    // 3.3 TODO: 8. We need to retrive user's old profile value from the profiles table, using
    //              $userName as the key.
    //              Substitute the "?" symbol in the following line with correct value.
    $query = "select * from profiles where userName='${?}'";
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    $row = mysqli_fetch_array($result);

    // Define a header on the web page.
    print '<h3>User Profile</h3><br>';

    // The input elements are placed in a form.
    print '<form class="userProfileForm">';

    
    // 3.3 TODO: 9. The first input element is nickName of the user. 
    //              It's value is initialized to the "nickName" field 
    //              of the query result.
    //              Substitute the "?" symbol with correct value.
    print '<fieldset>';
    print '<legend>Nick Name</legend>';
    print '<input type="text", maxlength="20", id="nickNameInputBox", value="'.?.'">';
    print '</fieldset>';

    // 3.3 TODO: 10. The second input element is the gender of the user. 
    //               It's value is initialized to the "gender" field
    //               of the query result.
    //               Substitute the "?" symbol with correct value.
    print '<fieldset>';
    print '<legend>Gender</legend>';
    print '<input type="text", maxlength="1", id="genderInputBox", value="'.?.'", onkeyup="inputCheck()">';
    print '</fieldset>';
    //               (Note that the onkeyup event is handled by inputCheck() function, 
    //                inputCheck() function ensures that only "F" and "M" characters 
    //                can be typed into the input element of gender).

    // 3.3 TODO 11: The last input element is the briefIntro of the user. 
    //              It's value is initialized to the "briefIntro" field
    //              of the query result. 
    //              Substitute the "?" symbol with correct value.
    print '<fieldset>';
    print '<legend>Brief Introduction</legend>';
    print '<input type="text" id="briefIntroInputBox", value="'.?.'">';
    print '</fieldset>';

    print '</form>';

    // By clicking this button, the user updates his profile to the database.
    // The click event will be handled by the updateProfile() function in script.js.
    print '<button onclick="updateProfile()">Update Profile</button>';

    // By clicking this button, the user will log out.
    // The click event will be handled by the logout() function in script.js.
    print '<button onclick="logout()">Log Out</button>';
  }
?>