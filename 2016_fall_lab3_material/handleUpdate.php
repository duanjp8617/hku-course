<?php
  //fill in your MySQL username and password in the following line
  $conn=mysqli_connect('sophia.cs.hku.hk', username, password) or die ('Failed to Connect! '.mysqli_error($conn));
  
  //fill in your database name in the following line
  mysqli_select_db($conn, dbname) or die ('Failed to Access DB! '.mysqli_error($conn));

  // TODO: 1. Store all the useful information contained in 
  //          the cookie and the parameters of the HTTP GET request 
  //          to the following local variables.
  //          Substitute "?"  with correct value.
  $userName = ?;
  $nickName = ?;
  $gender = ?;
  $briefIntro = ?;

  // TODO: 2. Construct a query to update the user profile information in profiles table. 
  //          Substitute  "?"  with correct value.
  $query = "update profiles set nickName='".?."',gender='".?."',briefIntro='".?."' where userName='".?."'";
  mysqli_query($conn,$query) or die ('Query Error! '. mysqli_error($conn));
  
  print "Your profile has been successfully updated.";
?>