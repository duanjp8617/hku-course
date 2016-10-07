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
      // 3.2 TODO: 3. When the response is received, the inner HTML of the 
      //              <div id="content"> element is replaced by the HTTP response text

      a=document.getElementById("content");
      a.innerHTML=xmlhttp.responseText;
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

function logout(){
  // 3.6 TODO: 1. Implement the logout function. It should generate an HTTP
  //              GET method to handleLogout.php, without carrying any parameters. 
  //              It should replace inner HTML of the  <div id="content"> element 
  //              with the HTTP response text. 
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