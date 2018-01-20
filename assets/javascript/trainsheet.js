   
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDBy4eMBwTV4jUT0BF2NgwlIqYO_9xaxcI",
    authDomain: "train-arrivals.firebaseapp.com",
    databaseURL: "https://train-arrivals.firebaseio.com",
    projectId: "train-arrivals",
    storageBucket: "train-arrivals.appspot.com",
    messagingSenderId: "361790545180"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName= $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
 // alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);

  
  // Calculate the months worked using hardcore math
  // To calculate the minutes

var trainService = moment().diff(moment.unix(trainStart), "minutes") % trainFrequency ;

  console.log(trainService);
  

  // Calculate the total minutes left

var trainArrival = trainFrequency - trainService;
console.log(trainArrival);
   

  //Calculate the train arrival time
  var trainNext = moment().add(trainArrival, "m").format("hh:mm A");


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainNext + "</td><td>" + trainArrival + "</td></tr>");
});
