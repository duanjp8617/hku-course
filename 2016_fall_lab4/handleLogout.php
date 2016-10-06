<?php
  if(isset($_COOKIE["userName"])){
    $userName = $_COOKIE["userName"];
    setcookie("userName", $userName, time()-3600);

    print '<h3>You have successfully logged out.</h3>';
    print '<form class="loginForm">';
    print '<fieldset>';
    print '<legend>User Name</legend>';
    print '<input type="text" id="loginUserName">';
    print '</fieldset>';
    print '<fieldset>';
    print '<legend>Password</legend>';
    print '<input type="text" id="loginPassword">';
    print '</fieldset>';
    print '<button onclick="login()">Log In</button>';
    print '</form>';
  }
?>
