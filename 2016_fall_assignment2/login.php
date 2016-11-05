<html>
  <head>
    <meta charset="utf-8">
    <title>News Feed</title>
    <link rel="stylesheet" type="text/css"  href="style.css">
    <script src="jquery-3.1.1.min.js"></script>
    <script src="script.js"></script>
  </head>

  <body>
    <div id="main">
      <div id="loginPage">
        <h2 id="loginHeading">You can log in here</h2>
        
        <div id="userNameInput">
          <h3>User Name:</h3>
          <input type="text" id="userNameInputBox">
        </div>

        <div id="passwordInput">
          <h3>Password:</h3>
          <input type="text" id="passwordInputBox">
        </div>

        <button id="submitButton" onclick="login()">Submit</button><br>

        <?php
          if(intval($_GET["newsID"])==0){
            print '<a href="index.html">Go back</a>';
          }
          else{
            print '<a href="displayNewsEntry.php?newsID='.$_GET["newsID"].'">Go back</a>';
          }
        ?>
      </div>
    </div>
  </body>

</html>