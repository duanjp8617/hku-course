<?php
  if(isset($_COOKIE["userName"])){
    // 3.7 TODO: 1. unset the cookie associated with the user. 

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
    print '</form>';
    print '<button onclick="login()">Log In</button>';
  }
?>