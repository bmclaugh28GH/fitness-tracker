// **********************************************
// globals
// **********************************************
const workoutListElem = $("#workoutList"); 
const submitBtnElem = $("#submitBtn"); 
var workoutNameElem = $("#workoutName"); 
var caloriesBurnedElem = $("#caloriesBurned"); 
var workoutID; 

// **********************************************
// functions 
// **********************************************

// **********************************************
// **********************************************

function loadWorkouts (data) {

  workoutListElem.empty();
  
  var myHdr = `
    <h2>Workouts</h2>
    <hr>`;
  workoutListElem.append (myHdr); 

  for (i=0;i<data.length;i++){

    console.log (data[i].workoutName); 

    var myCard = `
    <div class="card">
      <h5 class="card-title">You worked out ${data[i].workoutCreated}</h5>
      <div class="card-body"></div>
        <p data-id="${data[i]._id}" class="card-text workoutName">${data[i].workoutName}</p>
        <p data-id="${data[i]._id}" class="card-text caloriesBurned">${data[i].caloriesBurned} calories </p>
        <a href="#" class="btn btn-primary updateButton" data-id="${data[i]._id}">Update</a>
        <a href="#" class="btn btn-primary deleteButton" data-id="${data[i]._id}">Delete</a>
      </div>
    </div>
    <br>
    <hr>`

    workoutListElem.append (myCard); 

  }

}; // loadWorkouts

// **********************************************
// **********************************************

function getWorkouts () {

  fetch("/all")
  .then(function(response) {

    console.log ('here i am'); 
    response.json().then(function(data) {
      console.log (data); 
      loadWorkouts(data); 
    })

  })
}; // getWorkouts

// **********************************************
// **********************************************

function init () {

  getWorkouts (); 

}; // init 

// **********************************************
// listeners 
// **********************************************

// **********************************************
// delete 
// **********************************************

workoutListElem.on("click", function(e) {
  event.preventDefault(); 
  element = e.target;
  data_id = element.getAttribute("data-id");

  if (data_id && element.classList.contains("deleteButton")) {
    console.log ("delete id " + data_id); 
    fetch("/delete/" + data_id, {
      method: "delete"
    })
    .then(function(response) {
      if (response.status !== 200) {
          console.log("Looks like there was a problem. Status Code: " + response.status);
          return;
      }
      else{

        console.log ("reload"); 
        getWorkouts (); 

      }
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
  }

  if (data_id && element.classList.contains("updateButton")) {

    var workoutName;
    var caloriesBurned; 

    console.log ("update " + data_id); 

    myCardTextList = document.querySelectorAll (".card-text.workoutName"); 
    for (let i = 0;i<myCardTextList.length;i++){
      if (myCardTextList[i].getAttribute("data-id") == data_id){
        workoutName = myCardTextList[i].innerHTML; 
      }
    }
    myCardTextList = document.querySelectorAll (".card-text.caloriesBurned"); 
    for (let i = 0;i<myCardTextList.length;i++){
      if (myCardTextList[i].getAttribute("data-id") == data_id){
        caloriesBurned = myCardTextList[i].innerHTML; 
      }
    }
    console.log ("w " + workoutName + " cb " + caloriesBurned); 
    workoutNameElem.val (workoutName); 
    caloriesBurnedElem.val (caloriesBurned); 

  }


}); // workoutListElem click 

// **********************************************
// submit (INSERT or UPDATE)
// **********************************************

submitBtnElem.on("click", function(e) {
  event.preventDefault(); 
  element = e.target;
  console.log ("insert"); 

  var newWorkout = {
    workoutName: workoutNameElem.val().trim(),
    caloriesBurned: caloriesBurnedElem.val().trim()}; 
  $.post("/submit", newWorkout).then(function(dbWorkout){
    console.log("insert ok" + dbWorkout);
    location.reload();
  });
}); // submitBtnElem click 

// **********************************************
// init 
// **********************************************

$(document).ready(function() {
   init ();
});
