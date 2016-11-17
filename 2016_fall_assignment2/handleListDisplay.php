<?php
  // The function takes 3 parameters:
  // $content: the input string.
  // $delimiter: the character that is used to separate different words, which is usually space character.
  // $length: the number of the words that we want to extract.
  function extract_simplified_contents($content, $delimiter, $length){
    // Use explode function to create a string array, each string in this array
    // is a word separated by the $delimiter.
    $string_array = explode($delimiter, $content);
    $simplified_content = "";

    // This counter records number of the words that we extract for the simplified content
    $word_counter = 0;

    // This counter records the position within the $string_array
    $pos = 0;

    while(($word_counter<$length)&&($pos<sizeof($string_array))){

      // We skip "" character and "\r\n" PHP new line character. 
      if(($string_array[$pos]!="")&&($string_array[$pos]!="\r\n")){
        if($word_counter==$length-1){
          $simplified_content = $simplified_content.$string_array[$pos];
        }
        else{
          $simplified_content = $simplified_content.$string_array[$pos]." ";
        }
        $word_counter+=1;
      }

      $pos+=1;
    }
   
    return $simplified_content;
  }

  $conn=mysqli_connect('sophia.cs.hku.hk','username','password') or die ('Failed to Connect '.mysqli_error($conn));
  mysqli_select_db($conn,'dbname') or die ('Failed to Access DB'.mysqli_error($conn));

  // First, we replace "'" in the search string with "\'" to avoid the "'" symbol from affecting
  // the SQL query.
  $searchString = str_replace("'","\'",$_GET["searchString"]);

  // We query the news from the database using the following SQL statement.
  // Note that the headline should contain the $searchString variable.
  $query = "select * from news where headline like '%".$searchString."%'";
  $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));

  // totalEntryNum is the number of rows in the query result
  $totalEntryNum = mysqli_num_rows($result);

  // The starting news is $totalEntryNum - 5*$_GET["pageIndex"].
  $startingIndex = intval($totalEntryNum)-intval($_GET["pageIndex"])*5;
  $query = "";

  if($startingIndex<0){
    // the $startingIndex may be smaller than 0.
    // In that case, we are on the last page where the number of available news
    // is smaller than 5. We do some adjustments to retrieve the correct number of news from
    // the database.
    $num = 5+$startingIndex;
    $query = "select * from news where headline like '%".$searchString."%' limit 0, ".$num;
  }
  else{
    $query = "select * from news where headline like '%".$searchString."%' limit ".$startingIndex.", 5";
  }
  
  // encode the news in the following json string
  $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
  $json = array();
  while($row=mysqli_fetch_array($result)) {
    // We use extract_simplified_contents function to get the first 10 words from the full content.
    $json[]=array('newsID'=>$row['newsID'], 'headline'=>$row['headline'],'simplifiedContent'=>extract_simplified_contents($row['content'], " ", 10), 'time'=>$row['time']);
  }

  $loginStatus = 0;
  if(!isset($_COOKIE["userID"])){
    $loginStatus = 0;
  }
  else{
    $loginStatus = 1;
  }
  
  // send the response json string back to the client.
  print json_encode(array('newsEntries'=>$json, 'totalEntryNum'=>$totalEntryNum, 'loginStatus'=>$loginStatus));

?>