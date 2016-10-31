<?php
    function extract_simplified_contents($content, $delimiter, $length){
        $string_array = explode($delimiter, $content);
        $simplified_content = "";

        $word_counter = 0;
        $pos = 0;
        while(($word_counter<$length)&&($pos<sizeof($string_array))){
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

        if($pos<(sizeof($string_array)-1)){
            $simplified_content=$simplified_content."......";
        }
        
        return $simplified_content;
    }

    $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));
    mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));

    $query = "select * from news where headline like '%".$_GET["searchString"]."%'";
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    $totalEntryNum = mysqli_num_rows($result);

    $startingIndex = intval($totalEntryNum)-intval($_GET["pageIndex"])*5;
    $query = "";

    if($startingIndex<0){
        $num = 5+$startingIndex;
        $query = "select * from news where headline like '%".$_GET["searchString"]."%' limit 0, ".$num;
    }
    else{
        $query = "select * from news where headline like '%".$_GET["searchString"]."%' limit ".$startingIndex.", 5";
    }
    
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    $json = array();
    while($row=mysqli_fetch_array($result)) {
        $json[]=array('newsID'=>$row['newsID'], 'headline'=>$row['headline'],'simplifiedContent'=>extract_simplified_contents($row['content'], " ", 10), 'time'=>$row['time']);
    }

    $loginStatus = 0;
    if(!isset($_COOKIE["userID"])){
        $loginStatus = 0;
    }
    else{
        $loginStatus = 1;
    }
    
    print json_encode(array('newsEntries'=>$json, 'totalEntryNum'=>$totalEntryNum, 'loginStatus'=>$loginStatus));

?>