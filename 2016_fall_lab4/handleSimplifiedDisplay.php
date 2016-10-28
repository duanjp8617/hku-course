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
	
    $query = 'select * from notes';
	
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));

    $json = array();
	
    while($row=mysqli_fetch_array($result)) {
        $json[]=array('id'=>$row['id'], 'title'=>$row['title'],'simplifiedContent'=>extract_simplified_contents($row['content'], " ", 10));
    }

    print json_encode(array('simplifiedNotes'=>$json));

?>