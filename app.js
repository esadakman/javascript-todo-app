// const form = document.querySelector("#todo-form");
// const addBtn = document.getElementById("addTodo");
// const clearBtn = document.querySelector("#clear-todos");
// document.querySelector(".delete-item");
const inputTodo = document.querySelector("#todo");
const todoList = document.querySelectorAll(".form-group")[1];
const search = document.querySelector("#search");

search.addEventListener("keyup", filterTodos);

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
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

const containerDiv = document.querySelector(".container");
containerDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("addTodo")) {
    const newTodo = inputTodo.value.trim()
    addLI();
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
  } else {
    console.log("other elemnts clicked");
  }
});

function addLI() {
  const newElement = document.createElement("li");
  const link = document.createElement("a");
  // !============
  newElement.className = "list-group-item d-flex justify-content-between";
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove pe-3'></i>";
  newElement.appendChild(document.createTextNode(inputTodo.value));
  newElement.appendChild(link);
  todoList.appendChild(newElement);
  //   console.log(todoList);
  inputTodo.value = "";
}
