$(document).ready(init);

function init() {
  console.log("In Init");
  $("#addTaskButton").on("click", addNewTask);
  $("#task_list").on("click", ".js_delete_btn", clickDelete);
  $("#task_list").on("click", ".js_complete_btn", clickComplete);
  getTasks();
} // end init function

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
} // end addNewTask Function

function clickComplete(event) {
  const taskId = event.target.dataset.id;
  const completedTask = { complete: "Yes" };
  console.log(taskId);
  completeTask(taskId, completedTask);
} // end clickComplete Function

function clickDelete(event) {
  console.log(this);

  const taskId = event.target.dataset.id;
  console.log("taskId:", taskId);

  deleteTask(taskId);
} // end clickDelete function

// API CALLS
function completeTask(taskId, completedTask) {
  console.log("In completeTask", taskId, completedTask);

  $.ajax({
    method: "PUT",
    url: `/tasks/${taskId}`,
    data: completedTask,
  })
    .then((response) => {
      console.log("UPDATED", response);
      getTasks();
    })
    .catch((err) => {
      console.log("ERROR:", err);
      alert("There was an error updating your task.");
    });
}

function deleteTask(taskId) {
  console.log("In delete Task", taskId);
  $.ajax({
    method: "DELETE",
    url: `/tasks/${taskId}`,
  })
    .then((response) => {
      console.log("DELETE", response);
      getTasks();
    })
    .catch((err) => {
      console.log("ERROR", err);
      alert("There was an error deleting your task.");
    });
} // end deleteTask function

function getTasks() {
  // ajax call to server to get tasks
  $.ajax({
    method: "GET",
    url: "/tasks",
  })
    .then((result) => {
      console.log(result);
      render(result);
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
function render(taskList) {
  console.log("In render");
  $("#task_list").empty();

  for (let taskItem of taskList) {
    if (taskItem.task_completed == "No") {
      $("#task_list").append(`
      <tr>
        <td class="task_name">
          ${taskItem.username}
        </td>
        <td class="task_task">
          ${taskItem.task}
        </td>
        <td class="task_completed">
          <button class="js_complete_btn" data-id="${taskItem.id}">Complete</button>
        </td>
        <td>
          <button class="js_delete_btn btn" data-id="${taskItem.id}">DELETE</button>
        </td>
      </tr>
    `);
    } else {
      $("#task_list").append(`
      <tr style = "background-color: green;">
        <td class="task_name">
          ${taskItem.username}
        </td>
        <td class="task_task">
          ${taskItem.task}
        </td>
        <td class="task_completed" style="color: red;">
          Complete!
        </td>
        <td>
          <button class="js_delete_btn btn" data-id="${taskItem.id}">DELETE</button>
        </td>
      </tr>
    `);
    } // end if else
  } // end for loop
} // end render function
