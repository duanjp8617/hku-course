<?php
  if(isset($_COOKIE["userID"])){
    // If the userID cookie is set, return "login success".
    print "login success";
  }
  else{
    $conn=mysqli_connect('sophia.cs.hku.hk','username','password') or die ('Failed to Connect '.mysqli_error($conn));
    mysqli_select_db($conn,'dbname') or die ('Failed to Access DB'.mysqli_error($conn));

    // Get the user record from the database
    $query = "select * from users where name='".$_GET["username"]."'";
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    
    $row=mysqli_fetch_array($result);
    
    if(array_key_exists("password", $row)&&($row["password"]===$_GET["password"])){
      // If the user exists and he enters valid password, 
      // set up "userID" cookie for this user and return
      // "login success".
      setcookie("userID", $row["userID"], time()+3600);
      print "login success";
    }
    else{
      if(!array_key_exists("password", $row)){
        // If the user enters an invalid user name, return "Username is incorrect".
        print "Username is incorrect";
      }
      else{
        // If the user enters an invalid password, return "Password is incorrect".
        print "Password is incorrect";
      }
    }
  }
?>