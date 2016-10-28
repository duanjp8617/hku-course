function login(){
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // TODO: 3. If the response text is "invalidUserNamePassword", then we should notify
      //          the user by replacing the innerHTML of <div id="loginError"> element with
      //          "<h3>Invalid user name or password.</h3>".

      // TODO: 4. If the reponse text is not "invalidUserNamePassword", then the login is successful.
      //          We should replace the innerHTML of <div id="content"> element with responseText.
    }
  }

  // TODO: 1. Retrieve the input user name and password from the
  //          input elements with id "loginUserName" and "loginPassword". 


  // TODO: 2. Send an HTTP GET request to retrieve handleLogin.php, which should carry 2 
  //          key-value pairs corresponding to "userName" and "password". 
}

function updateProfile(){
  
  // TODO: 1. Retrive the nick name, gender and brief introduction
  //          from the input elements with id "nickNameInputBox", 
  //          "genderInputBox" and "briefIntroInputBox", repectively. 

  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // TODO: 3. Replace the innerHTML of the <h3 id="heading"> element 
      //          with responseText. Then set a "style" attribute
      //          in the <h3 id="heading"> element with value of "color:red;".
      //			    Hint: use "setAttribute()" http://www.w3schools.com/jsref/met_element_setattribute.asp
    }
  }


  // TODO: 2. Generate the HTTP GET request, carrying 3 key-value pairs corresponding to
  //          "nickName", "gender" and "briefIntro"
}

function inputCheck(){

  // TODO: Check the input gender value in the input element with ID "genderInputBox":
  //       if the input value is not "F" nor "M" nor "", show an alert box with the message "Gender should be either F or M"
  //	     and refocus the cursor on the gender input box

}