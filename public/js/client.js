$(function () {
  getTasks();
  $('form').on('submit', addTask);
  // $('.todo').on('click', '.complete', completeTask);
  // $('todo').on('click', '.delete', deleteTask);
});

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/task',
    success: displayTasks,
  });
}

function displayTasks(data) {
  $('#todo').empty();
  $('#complete').empty();
  data.forEach(function (task) {
    if (task.complete == false) {
      var $task = $('<tr class="info"></tr>');
      $task.append('<td><h3 class="">' + task.task + '</h3></td>');
      $task.append('<td><h5 class="">' + task.discription + '</h5></td>');
      var $td = $('<td></td>');
      $td.append($('<button class="btn btn-success complete">Complete</button>').data('id', task.id));
      $td.append($('<button class="btn btn-danger delete">Delete</button>').data('id', task.id));
      $task.append($td);
      $('#todo').append($task);
    } else {
      var $task = $('<tr class="success"></tr>');
      $task.append('<td><h3 class="">' + task.task + '</h3></td>');
      $task.append('<td><h5 class="">' + task.discription + '</h5></td>');
      $('#complete').append($task);
    }
  });
}

function addTask(event) {
  event.preventDefault();
  var task = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: '/task',
    data: task,
    success: getTasks,
  });
}
