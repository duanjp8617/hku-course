<?php
  if(isset($_COOKIE["userID"])){
    setcookie("userID", "", time()-3600);
  }
  print "logout success";
?>