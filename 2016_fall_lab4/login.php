<html>
  <head>
    <title>User Profile</title>
    <link rel="stylesheet" type="text/css"  href="style.css">
    <script src="script.js" type="text/javascript"></script>
  </head>

  <body id="body">
    <?php
      $printLoginPage = True;
      $userName = '';

      if( !isset($_COOKIE["userName"]) && !isset($_POST["userName"]) ){
        // this is the first time that the user logs in to the web page
        print 'The first!';  
        $printLoginPage = True;
      }
      elseif( !isset($_COOKIE["userName"]) && isset($_POST["userName"]) ){
        print 'The second!';  

        // this is when user submits the user name and password to log in

        // first establish the connection
        $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));
        mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));

        // made the query
        $query = "select * from users where userName="."'".$_POST["userName"]."'";
        $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
        $row = mysqli_fetch_array($result);

        if(array_key_exists("password", $row)&&($row["password"]===$_POST["password"])){
          // login succeed
          setcookie("userName", $row["userName"], time()+3600);
          $printLoginPage = False;
          $userName = $_POST["userName"]; 
        }
        else{
          // login fails
          $printLoginPage = True;
          print '<h3>Invalid user name or password.</h3>';
        }
      }
      else{
        print 'The third!';  
        // the cookie is set
        $printLoginPage = False;
        $userName = $_COOKIE["userName"];
      }


      if($printLoginPage == True){
        print '<form class="loginForm" action="login.php" method="post">';
        print '<fieldset>';
        print '<legend>User Name</legend>';
        print '<input type="text" name="userName">';
        print '</fieldset>';
        print '<fieldset>';
        print '<legend>Password</legend>';
        print '<input type="text" name="password">';
        print '</fieldset>';
        print '<input type="submit" value="Log In">';
        print '</form>';
      }
      else{
        $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));
        mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));

        // made the query
        $query = "select * from profiles where userName="."'".$userName."'";
        $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
        $row = mysqli_fetch_array($result);

        // here we render the webpage
        print '<div id="userNameIdentifier", name='.$userName.'></div>';
        print '<h3>User Profile</h3><br>';

        // by clicking this button, the user will log out
        print '<button onclick="logout()">Log Out</button>';

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
        print '<input type="text", maxlength="1", id="genderInputBox", value="'.$row["gender"].'">';
        print '</fieldset>';

        // the last field is brief introduction, initialized to emty
        print '<fieldset>';
        print '<legend>Brief Introduction</legend>';
        print '<input type="text" id="briefIntroInputBox", value="'.$row["briefIntro"].'">';
        print '</fieldset>';

        print '</form>';

        // by clicking this button, the user updates the database
        print '<button onclick="updateProfile()">Update Profile</button>';
      }
    ?>
  </body>
</html>