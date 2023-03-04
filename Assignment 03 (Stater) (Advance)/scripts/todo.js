"use strict";

const toDoInput = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
let todoList = document.getElementById("todo-list");
let currentUser;
let todoArr;
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// kiem tra da co currentUser chua
if (getFromStorage("current_user") === null) {
  saveToStorage("current_user", "");
} else {
  currentUser = JSON.parse(getFromStorage("current_user"));
}
// kiem tra todoArr trong localstorage
if (getFromStorage("todo_array") === null) {
  saveToStorage("todo_array", "[]");
} else {
  todoArr = JSON.parse(getFromStorage("todo_array"));
  renderTodoList(todoArr);
}
// su kien add todolist
addBtn.addEventListener("click", function () {
  if (validate(toDoInput)) {
    let todoArrInstance = new Task(toDoInput.value, currentUser, false);
    todoArr.push(todoArrInstance);
    renderTodoList(todoArr);
    saveToStorage("todo_array", JSON.stringify(todoArr));
  }
});
// render todo list
function renderTodoList(arr) {
  todoList.innerHTML = "";
  arr = arr.filter(function (el) {
    if (el.owner.username == currentUser.username) return el;
  });
  for (let i = 0; i < arr.length; i++) {
    let classTask = arr[i].isDone ? "checked" : "";
    todoList.innerHTML += `<li class="${classTask}" onclick="toggleTask('${arr[i].task}', this)"> ${arr[i].task} 
    <span class="close" onclick="deleteBtn('${arr[i].task}')"> x </span></li>`;
  }
}

// validate
function validate(input) {
  if (input.value == "") {
    alert("fill in input");
    return false;
  } else if (existedToDoList(input)) {
    alert("existed list");
    return false;
  } else {
    return true;
  }
}
// kiem tra phan tu da ton tai
function existedToDoList(data) {
  let todoEl = todoArr.filter((el) => {
    if (el.task == data.value) {
      console.log(el.task, data.value);
      return el;
    }
  });
  console.log(todoEl);
  if (todoEl.length > 0) {
    return true;
  } else {
    return false;
  }
}
// delete btn
function deleteBtn(taskname) {
  let index = todoArr.filter((el, i) => {
    if (el.task == taskname) {
      return i;
    }
  });
  todoArr.splice(index[0], 1);
  saveToStorage("todo_array", todoArr);
  renderTodoList(todoArr);
}

// ham toggle task
function toggleTask(taskname, element) {
  let index;
  todoArr.filter((el, i) => {
    if (el.task === taskname) {
      index = i;
      return i;
    }
  });
  console.log(index);
  if (todoArr[index].isDone == true) {
    element.classList.remove("checked");
    todoArr[index].isDone = false;
  } else {
    element.classList.add("checked");
    todoArr[index].isDone = true;
  }

  // console.log(todoArr);
  saveToStorage("todo_array", JSON.stringify(todoArr));
  console.log(element);
}
