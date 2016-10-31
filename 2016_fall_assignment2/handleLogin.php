<?php
  if(isset($_COOKIE["userID"])){
    print "login success";
  }
  else{
    $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));
    mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));

    $query = "select * from users where name='".$_GET["username"]."'";
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    
    $row=mysqli_fetch_array($result);
      
    if(array_key_exists("password", $row)&&($row["password"]===$_GET["password"])){
      setcookie("userID", $row["userID"], time()+3600);
      print "login success";
    }
    else{
      if(!array_key_exists("password", $row)){
        print "Username is incorrect";
      }
      else{
        print "Password is incorrect";
      }
    }
  }
?>