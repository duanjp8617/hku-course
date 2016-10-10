<?php
  $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect! '.mysqli_error($conn));
  mysqli_select_db($conn, 'jpduan') or die ('Failed to Access DB! '.mysqli_error($conn));

  // 3.6 TODO: 1. First, we store all the useful information contained in 
  //              the cookie and the parameters of the HTTP GET method 
  //              to the following local variables.
  //              Substitute the "?" symbol with correct value.
  $userName = ?;
  $nickName = ?;
  $gender = ?;
  $briefIntro = ?;

  // 3.6 TODO: 2. We need to update the user profile in profiles table. 
  //              Substitute the "?" symbol with correct value.
  $query = "update profiles set nickName='${?}',gender='${?}',briefIntro='${?}' where userName='${?}'";
  mysqli_query($conn,$query) or die ('Query Error! '. mysqli_error($conn));
  
  print "Update is successful!";
?>