<?php
  if(isset($_COOKIE["userName"])){
    $userName = $_COOKIE["userName"];
    setcookie("userName", $userName, time()-3600);

    print '<h3>You have successfully logged out.</h3>';
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
?>
