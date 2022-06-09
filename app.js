const inputTodo = document.querySelector("#todo");
const todoList = document.querySelectorAll(".form-group")[1];
const search = document.querySelector("#search");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const containerDiv = document.querySelector(".container");
const checkboxx = document.querySelector(".form-check-input");
window.addEventListener("load", () => {
  laodAllTodosToUI();
  search.addEventListener("keyup", filterTodos);
});

console.log(todoList.firstChild);

containerDiv.addEventListener("click", (e) => {
  // ! addtodo button event
  if (e.target.classList.contains("addTodo")) {
    // const newTodo = inputTodo.value.trim();
    let newTodo = inputTodo.value;

    // const newTodo = `<p>${inputTodo.value}</p>`;
    if (newTodo === "") {
      showAlert("danger", "Please enter a todo");
    } else {
      showAlert("success", "Your todo successfully added !");
      // addTodoToStorage(newTodo);
      addList(newTodo);
      console.log(object);
      addTodoToStorage(newTodo);
    }
    // console.log(newTodo);
    e.preventDefault();
    // ! remove all todos
  } else if (e.target.classList.contains("btn-danger")) {
    let ul = e.target.previousElementSibling.previousElementSibling;
    if (ul.childElementCount > 0) {
      if (confirm("Are you sure to delete all todos ?")) {
        // ! ul'nin çocuğu bitene kadar while döngüsü çalışır
        while (ul.firstElementChild != null) {
          ul.removeChild(ul.firstElementChild);
          localStorage.removeItem("todos");
        }
      }
    } else {
      // alert("No Todos left to delete");
      showAlert("danger", "No Todos left to delete");
    }
    // ? ==================================
  } else if (e.target.classList.contains("fa-remove")) {
    console.log("deleteeee");
    if (e.target.closest("li").querySelector(".form-check-input").checked) {
      e.target.parentElement.parentElement.remove();
      deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    } else {
      showAlert("danger", "Please complete the todo");
    }
  } else if (e.target.classList.contains("btn-warning")) {
    search.value = "";
    const listItems = document.querySelectorAll(".form-group-item");

    listItems.forEach(function (listItem) {
      listItem.setAttribute("style", "display : block");
    });
    e.preventDefault();
  } else if (e.target.classList.contains("checkbox")) {
    if (e.target.value === "false") {
      e.target.value = "true";
      e.target.parentElement.style = "text-decoration:line-through";
      let content = e.target.parentElement.textContent;
      showAlert("success", `${content} completed`);
    } else {
      e.target.value = "false";
      e.target.parentElement.style = "text-decoration:none";
    }
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
    addList(todo);
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
  // !=================
  // todos.push("check");
  // !=================

  localStorage.setItem("todos", JSON.stringify(todos));
}

// ! alerttttttt ================

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  // console.log(alert);
  firstCardBody.append(alert);
  // * set timeout
  setTimeout(function () {
    alert.remove();
  }, 1000);
}

// ! element oluşturma

function addList(newTodo) {
  const newElement = document.createElement("li");
  const link = document.createElement("a");
  const todoChecker = document.createElement("input");
  // ! elementlere değer atama
  newElement.className = "form-group-item d-flex justify-content-between";
  // console.log(newElement);
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove '></i>";

  todoChecker.className = "checkbox form-check-input";
  todoChecker.type = "checkbox";
  todoChecker.value = "false";

  // console.log(newElement);
  newElement.appendChild(todoChecker);
  newElement.appendChild(document.createTextNode(newTodo));
  newElement.id = ID();

  newElement.appendChild(link);
  todoList.appendChild(newElement);

  // console.log(todoList);
  // console.log(todoList);
  inputTodo.value = "";
}

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

function ID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
