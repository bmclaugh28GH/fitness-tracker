
// **********************************************
// globals
// **********************************************
const workoutListElem = $("#workoutList"); 
const submitBtnElem = $("#submitBtn"); 
var workoutNameElem = $("#workoutName"); 
var caloriesBurnedElem = $("#caloriesBurned"); 
var ctx = $("#myChart");
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
        <a href="#" class="btn btn-primary deleteButton" data-id="${data[i]._id}">Delete</a>
      </div>
    </div>
    <br>
    <hr>`
//        <a href="#" class="btn btn-primary updateButton" data-id="${data[i]._id}">Update</a>

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

      var myLabels = [];
      data.forEach(el => myLabels.push(el.workoutName));
      console.log (myLabels); 

      var myData = [];
      data.forEach(el => myData.push(el.caloriesBurned));
      console.log (myData); 

      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: 'Calories Burned',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      }); // end chart
      myChart.config.data.labels = myLabels;
      myChart.config.data.datasets[0].data = myData;
      myChart.update();
      console.log (myChart); 

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
