// const form = document.querySelector("#todo-form");
// const addBtn = document.getElementById("addTodo");
// const clearBtn = document.querySelector("#clear-todos");
// document.querySelector(".delete-item");
const inputTodo = document.querySelector("#todo");
const todoList = document.querySelectorAll(".form-group")[1];
const search = document.querySelector("#search");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const containerDiv = document.querySelector(".container");

laodAllTodosToUI();

containerDiv.addEventListener("click", (e) => {
  // ! addtodo button event
  if (e.target.classList.contains("addTodo")) {
    const newTodo = inputTodo.value.trim();
    if (newTodo === "") {
      showAlert("danger", "Please enter a todo");
    } else {
      showAlert("success", "Your todo successfully added !");

      addTodoToStorage(newTodo);
      addLI(newTodo);
    }
    // console.log("add todo button clicked");
    e.preventDefault();
  } else if (e.target.classList.contains("btn-danger")) {
    let ul = e.target.previousElementSibling.previousElementSibling;
    // ! ul'nin çocuğu bitene kadar while döngüsü çalışır
    while (ul.firstElementChild != null) {
      ul.removeChild(ul.firstElementChild);
    }
  } else if (e.target.classList.contains("fa-remove")) {
    console.log("deleteeee");
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
  } else {
    console.log("other elemnts clicked");
  }
});

// ! delete storage

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1); // Arrayden değeri silebiliriz.
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

// ! sayfa yüklendiğinde todaları ekleme

function laodAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addLI(todo);
  });
}

//  ! todoları storage ekleme

function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } //
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

// ! alerttttttt ================

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  console.log(alert);
  firstCardBody.append(alert);
  // * set timeout
  setTimeout(function () {
    alert.remove();
  }, 1000);
}

// ! element oluşturma

function addLI(newTodo) {
  const newElement = document.createElement("li");
  const link = document.createElement("a");
  // !============
  newElement.className = "list-group-item d-flex justify-content-between";
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove pe-3'></i>";
  newElement.appendChild(document.createTextNode(newTodo));
  // newElement.appendChild(document.createTextNode(inputTodo.value));
  newElement.appendChild(link);
  todoList.appendChild(newElement);
  //   console.log(todoList);
  inputTodo.value = "";
}

search.addEventListener("keyup", filterTodos);

// ! filter todos
function filterTodos(e) {
  const filterValue = e.target.value.toLocaleLowerCase();
  const listItems = document.querySelectorAll(".form-group-item");

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display : none !important");
    } else {
      listItem.setAttribute("style", "display : block");
    }
  });
}
