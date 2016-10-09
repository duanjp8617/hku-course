<?php
  if(isset($_COOKIE["userName"])){
    $userName = $_COOKIE["userName"];
    setcookie("userName", $userName, time()-3600);
    header("Location: index.html");
    print "logoutSucceed";
  }
?>
