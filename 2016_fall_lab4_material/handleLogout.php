<?php
  if(isset($_COOKIE["userName"])){
    // 3.7 TODO: 1. unset the cookie associated with the user. 

    // the header function redirects the user back to index.html
    // again.
    header("Location: index.html");
    print "logoutSucceed";
  }
?>
