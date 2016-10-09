function start(){
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // 3.1 TODO: 1. If the response text is not "firstLogin", then the user has logged in before.
      //              The response text contains the profile update webpage. We should replace
      //              the inner HTML of the  <div id="content"> element with the response text 
    }
  }

  // 3.1 TODO: 2. When index.html is loaded, start() function sends
  //              an HTTP GET method to handleLogin.php. The GET method
  //              does not have any parameters.
}

function login(){
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // 3.2 TODO: 3. If the response text is "invalidUserNamePassword", then we should notify
      //              the user. We replace the innerHTML of the <div id="loginError"> element with
      //              "<h3>Invalid user name or password.</h3>".

      // 3.2 TODO: 4. If the reponse text is not "invalidUserNamePassword", then the login is successful.
      //              We should replace the innerHTML of <div id="content"> element with the response text.
    }
  }

  // 3.2 TODO: 1. Please retrive the input user name and password from the
  //              corresponding input elements with id "loginUserName" and "loginPassword". 
  //              You can use the .value field of the input element to obtain the instant
  //              user input.

  // 3.2 TODO: 2. Please send an HTTP GET method to handleLogin.php, it should contain 2 
  //              pameters, which are "userName" and "password". 
}

function updateProfile(){
  
  // 3.4 TODO: 1. Retrive the nick name, gender and brief introduction
  //              from the input elements with id "nickNameInputBox", 
  //              "genderInputBox" and "briefIntroInputBox". The instant input 
  //              You can use the .value field of the input element to obtain the instant
  //              user input.

  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // 3.4 TODO: 4. generate an alert, the alert contains the 
      //              HTTP response text.

      // 3.4 TODO: 5. Set the value attribute of the 3 input elements
      //              to the updated value.
    }
  }


  // 3.4 TODO: 3. Generate the HTTP GET method, carrying 3 parameters, which are
  //              "nickName", "gender" and "briefIntro"
}

function inputCheck(){
  // This function ensures that only "F" and "M" could be accepted 
  // as valid input value.

  genderElem = document.getElementById("genderInputBox");
  gender = genderElem.value;

  if((gender != "M")&&(gender != "F")&&(gender != "")){
    genderElem.value = genderElem.getAttribute("value");
  }
  else{
    // do nothing
  }
}