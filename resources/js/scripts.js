var data = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList")) // convert json to object
  : {
      todo: [],
      completed: []
    };

var removeIcon = '<i class="fas fa-trash-alt"></i>'; // remove icon 
var completeIcon = '<i class="far fa-calendar-check"></i>'; // comleted icon
renderTodoList();
var btn = document.getElementById("add");
btn.addEventListener("click", function() { // push item to array
  var value = document.getElementById("item").value;
  if (value) {
    addItem(value);
  }
});

document.getElementById("item").addEventListener("keydown", function(e) { // on press enter store data from input
  var value = this.value;
  if (e.code === "Enter" && value) {
    addItem(value);
  }
});

function addItem(value) { 
  addItemTodo(value); // run add item to todo after press enter or clicked to add btn

  document.getElementById("item").value = "";
  data.todo.push(value); // push to todo array
  updateData();
}
function renderTodoList() { // display data from local storage to user
  if (!data.todo.length && !data.completed.length) return;
  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItemTodo(value);
  }
  for (var a = 0; a < data.completed.length; a++) {
    var value = data.completed[a];
    addItemTodo(value, true);
  }
}

function updateData() {
  localStorage.setItem("todoList", JSON.stringify(data)); // save data to local storage
}

function removeItem() { // remove item from array and update current display
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerHTML;
  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  updateData();
  parent.removeChild(item);
}
function completeItem() {  // convert item from todo array to completed array and update current display
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.textContent;
  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }

  updateData();
  var target =
    id === "todo"
      ? document.getElementById("completed")
      : document.getElementById("todo");
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

function addItemTodo(text, completed) { // create elements with data
  var list = completed
    ? document.getElementById("completed")
    : document.getElementById("todo");

  var item = document.createElement("li");
  item.innerText = text;
  var buttons = document.createElement("div");
  buttons.classList.add("btns");

  var remove = document.createElement("button");
  remove.classList.add("delete");
  remove.innerHTML = removeIcon;
  remove.addEventListener("click", removeItem);

  var complete = document.createElement("button");
  complete.classList.add("completed");
  complete.innerHTML = completeIcon;
  complete.addEventListener("click", completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);

  item.appendChild(buttons);
  list.insertBefore(item, list.childNodes[0]);
}
