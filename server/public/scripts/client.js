$(document).ready(init);

function init() {
  console.log("In Init");
  $("#addTaskButton").on("click", addNewTask);
  getTasks();
}

function addNewTask() {
  const newTask = {
    name: $("#nameIn").val(),
    task: $("#taskIn").val(),
    complete: $("#isCompleted").val(),
  };

  $("#nameIn").val("");
  $("#taskIn").val("");
  $("#isCompleted").val("");

  saveTask(newTask);
}

// API CALLS
function getTasks() {
  // ajax call to server to get tasks
  $.ajax({
    method: "GET",
    url: "/tasks",
  })
    .then((result) => {
      console.log(result);
      render();
    })
    .catch((err) => {
      console.log("Error in GET tasks:", err);
    });
} // end getTasks Function

function saveTask(newTask) {
  console.log("in saveTask", newTask);
  // ajax call to server to save task
  $.ajax({
    method: "POST",
    url: "/tasks",
    data: newTask,
  })
    .then((response) => {
      console.log("saveTask:", response);
      getTasks();
    })
    .catch((err) => {
      console.log("error saveTask:", err);
    });
} // end saveTask Function

// DISPLAY TO DOM
function render() {
  console.log("In render");
}
