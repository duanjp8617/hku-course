<?php
  if(isset($_COOKIE["userID"])){
  	// unset the cookie.
    setcookie("userID", "", time()-3600);
  }
  print "logout success";
?>