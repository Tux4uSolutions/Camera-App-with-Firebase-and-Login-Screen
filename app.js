var constraints = { video: { facingMode: "user" }, audio: false };

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

// Define constants

const cameraView = document.querySelector("#camera--view"),
      cameraOutput = document.querySelector("#camera--output"),
      cameraSensor = document.querySelector("#camera--sensor"),
      cameraTrigger = document.querySelector("#camera--trigger")


	 
/* The "cameraStart" function will access the camera and stream the video
 to the camera--view element we created.	 
/*
 This code uses the "getUserMedia" method 
 to access the camera using the constraints we defined.
 We’ll make cameraView the source for the stream.
 We’ll also add a ".catch" to make sure an error 
 is reported if the camera doesn’t work.
*/
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
function camera2Start() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[1];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

/*
 Once we have a video stream to work with, 
 we can program the button to grab a frame
 from the stream that we’ll use as our image 
 output.
*/
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
	cameraOutput.src = cameraSensor.toDataURL("image/png");
	cameraOutput.classList.add("taken");
	//-------------------------------------------------------
    var imageDataURL = cameraSensor.toDataURL("image/png");
    document.querySelector('#camera--trigger').button = imageDataURL;
	//-----------------------------------------------------------
    var x = document.getElementById("upload--trigger");
    if (x.style.display === "none") {
    x.style.display = "";
    } else {
    x.style.display = "none";
    }
};

/*
Last, we’ll need to initiate the "cameraStart function"
when the window is finished loading. That’ll look like this…
*/
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

/*
  Firebase setup
*/
const storage = firebase.storage()
const submitButton = document.getElementById('submitButton');
  //var fileInput = document.getElementById('upload');   
  submitButton.addEventListener('change', (e)=>{
  //let file = $("#upload")[0].files[0]; 
  let file = e.target.files[0];
  var folderName = file.name; // we make a folder for every Uploaded Picture 
  let locationRef = storage.ref('images/' + file.name) // the images will be uploaded to this remote folder 
  let task = locationRef.put(file)
  //---------------------------

  //--------------------------
  task.on('state_changed', 
  function progress(snapshot){ //progress
    let per = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
	let uploader = document.getElementById('progressBar')
    uploader.value = per;
  },
  function error(error){ },
  function complete(){
    console.log('Done') 
	//-- afou to upload oloklirothei me epityxia ----hide the upload "input" field
   //-----------------------------------------------------------------------------
    var x = document.getElementById("filesubmit");
    if (x.style.display === "") {
    x.style.display = "none";
	   //------------------------------------------------------------------------
      //----Run Geolacation Data function----------------------------------------
	  getLocation();
      showPosition(position);
    } else {
    x.style.display = "";
    }
  }
)
})
//--------------------------------------------------------------
var button = document.getElementById('upload--trigger');
button.addEventListener('click', function (e) {
    var dataURL = cameraSensor.toDataURL("image/png");
    button.href = dataURL;
	//-----------------------------------------------------------
    var x = document.getElementById("filesubmit");
    if (x.style.display === "none") {
    x.style.display = "";
	   //----------------------------------------------------------
      //----Run Geolacation Data function--------------------------
	  getLocation();
      showPosition(position);
    } else {
    x.style.display = "none";
    }
});
 //---------------------------------------------------------------
//Get Location data
var x = document.getElementById("coordinates");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}
//--------------------------------------------------------------------

function showPosition2(position) {
  var coordinates = "Lat: " + position.coords.latitude +
  ", Long: " + position.coords.longitude;
}

// filters

function myFunction() { // Greyscale filter
  // Standard syntax
  document.getElementById("camera").style.filter = "grayscale(100%)";

  // Safari 6.0 - 9.0
  document.getElementById("camera").style.WebkitFilter = "grayscale(100%)";  
}

function normal() { // No filter
  // Standard syntax
  document.getElementById("camera").style.filter = "none"; 

  // Safari 6.0 - 9.0
  document.getElementById("camera").style.WebkitFilter = "none";  
}
function blurImage() { // No filter
  // Standard syntax
  document.getElementById("camera").style.filter ="blur(5px)"; 

  // Safari 6.0 - 9.0
  document.getElementById("camera").style.WebkitFilter ="blur(5px)";  
}

function sepiaImage() { // No filter
  // Standard syntax
  document.getElementById("camera").style.filter ="sepia(100%)"; 

  // Safari 6.0 - 9.0
  document.getElementById("camera").style.WebkitFilter ="sepia(100%)";  
}