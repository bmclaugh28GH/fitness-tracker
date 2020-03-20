// **********************************************
// globals
// **********************************************
const workoutListElem = $("#workoutList"); 
//const workoutDeleteButton = $(".deleteButton"); 

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
        <p class="card-text">${data[i].workoutName}</p>
        <p class="card-text">${data[i].caloriesBurned} calories </p>
        <a href="#" class="btn btn-primary deleteButton" data-id="${data[i]._id}">Delete</a>
      </div>
    </div>
    <br>`

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

workoutListElem.on("click", function(e) {
  event.preventDefault(); 
  element = e.target;
  data_id = element.getAttribute("data-id");
  console.log ("delete id " + data_id); 
  if (data_id){
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
}); // workoutListElem click 

// **********************************************
// init 
// **********************************************

$(document).ready(function() {
   init ();
});
