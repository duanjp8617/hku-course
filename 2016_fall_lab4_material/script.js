function start(){
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // 3.1 TODO: 1. When the response is received, the inner HTML of the 
      //              <div id="content"> element is replaced by the HTTP response text 
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
      // 3.3 TODO: 3. When the response is received, the inner HTML of the 
      //              <div id="content"> element is replaced by the HTTP response text

      a=document.getElementById("content");
      a.innerHTML=xmlhttp.responseText;
    }
  }

  // 3.3 TODO: 1. Please retrive the input user name and password from the
  //              corresponding input element. Please check the handleLogin.php
  //              for the id of the 2 input elements.

  // 3.3 TODO: 2. Please send an HTTP GET method to handleLogin.php, it should contain 2 
  //              pameters, which are "userName" and "password". 
}

function updateProfile(){
  // 3.4 TODO: 1. Retrieve the user name from the division element with 
  //              "userNameIdentifier" as the id. Note that the user name
  //              is stored in the "name" attribute.
  
  // 3.4 TODO: 2. Retrive the nick name, gender and brief introduction
  //              from the input element with id "nickNameInputBox", 
  //              "genderInputBox" and "briefIntroInputBox". The instant input 
  //              value of an input element could be trieved from the .value field
  //              of the input element.

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


  // 3.4 TODO: 3. Generate the HTTP GET method, carrying 4 parameters, which are
  //              "userName", "nickName", "gender" and "briefIntro"
}

function logout(){
  // 3.6 TODO: 1. Implement the logout function. It should generate an HTTP
  //              GET method to handleLogout.php, without any parameters. 
  //              It should replace inner HTML of the  <div id="content"> element 
  //              with the HTTP response text 
}

function inputCheck(){
  genderElem = document.getElementById("genderInputBox");
  gender = genderElem.value;

  if((gender != "M")&&(gender != "F")&&(gender != "")){
    genderElem.value = genderElem.getAttribute("value");
  }
  else{
    // do nothing
  }
}