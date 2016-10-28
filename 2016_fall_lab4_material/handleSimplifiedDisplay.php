<?php
    // extract_simplified_contents extract the first $length words
    // from $content. All the words are separated by $delimiter
    // in $content.
    function extract_simplified_contents($content, $delimiter, $length){
        // The explode function separate all the words in $content using $delimiter as separator.
        // The words are put into a string array and returned as return value of explode function.
        $string_array = explode($delimiter, $content);
        $simplified_content = "";

        // $word_counter records how many words we have put into $simplified_content
        $word_counter = 0;

        // $pos is an index to the $string_array
        $pos = 0;

        // TODO: 1. The loop should continue when:
        //          First, the $word_counter is smaller than $length and
        //          Second, $pos is smaller than the size of $string_array
        while(($word_counter<$length)&&($pos<sizeof($string_array))){

            // TODO: 2. If the current word in $string_array is not "" and "\r\n", 
            //          we add add the current word in $string_array to $simplified_content  
            if(($string_array[$pos]!="")&&($string_array[$pos]!="\r\n")){
                // TODO: 3. If $word_counter == $length-1, we append the current word in $string_array
                //          directly to $simplified_content.
                //          Otherwise, we append the current word in $string_array plus a " "(white space)
                //          to $simplified_content. 

                if($word_counter==$length-1){
                    $simplified_content = $simplified_content.$string_array[$pos];
                }
                else{
                    $simplified_content = $simplified_content.$string_array[$pos]." ";
                }

                // TODO: 4. Increase $word_counter
                $word_counter+=1;
            }

            // TODO: 5. Increase $pos
            $pos+=1;
        }

        // TODO: 6. Append "......" to $simplified_content if $pos is smaller than sizeof($string_array)-1.
        if($pos<(sizeof($string_array)-1)){
             $simplified_content = $simplified_content."......";
        }

        return $simplified_content;
    }
    

    $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));

    mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));
	
    $query = 'select * from notes';
	
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));

    $json = array();
	
    while($row=mysqli_fetch_array($result)) {
        // TODO: 7. Manually create an PHP indexed array, with "id" field set to $row["id"], "title" field set to $row["title"] and
        //          "simplifiedContent" set to extract_simplified_contents($row['content'], " ", 10).
        $json[]=array('id'=>$row['id'], 'title'=>$row['title'],'simplifiedContent'=>extract_simplified_contents($row['content'], " ", 10));
    }

    // call json_encode to encode the array.
    print json_encode(array('simplifiedNotes'=>$json));

?>