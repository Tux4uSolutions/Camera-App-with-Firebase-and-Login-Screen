   

// Initialize Firebase------------------------------------------------
  var config = {
    apiKey: "AIzaSyDw1siPYACk2TsY4e79KiZ5UBVpw7yrecM",
    authDomain: "photobooth-12ca0.firebaseapp.com",
    databaseURL: "https://photobooth-12ca0.firebaseio.com",
    projectId: "photobooth-12ca0",
    storageBucket: "photobooth-12ca0.appspot.com",
    messagingSenderId: "697333141564"
  };
  firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("hero-image").style.display = "none";

	window.location = "main.html";
	
    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // if No user is signed in.
	
	
    
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("hero-image").style.display = "block";
	
	
  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
  window.location = "index.html";
}

