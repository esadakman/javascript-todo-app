// const form = document.querySelector("#todo-form");
const inputTodo = document.querySelector("#todo");
// const addBtn = document.getElementById("addTodo");
// const search = document.querySelector("#search");
const todoList = document.querySelectorAll(".form-group")[1];
// const clearBtn = document.querySelector("#clear-todos");

// const firstCardBody = document.querySelectorAll(".card-body")[0];
// const secondCardBody = document.querySelectorAll(".card-body")[1];
// const items = document.querySelectorAll(".list-group li");
document.querySelector(".delete-item");
// let containerDiv = document.querySelector(".container");

const containerDiv = document.querySelector(".container");
containerDiv.addEventListener("click", (event) => {
  if (event.target.classList.contains("addTodo")) {
    console.log("add todo button clicked");
    addLI();
  } else if (event.target.classList.contains("btn-danger")) {
    console.log("clearrrrrrrrrrrrrr");
  } else if (event.target.classList.contains("fa-remove")) {
    console.log("deleteeee");
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
  console.log(todoList);
  inputTodo.value = "";
}

// clearBtn.onclick = function () {
//   // todoList.innerHTML = "";
//   if (confirm("Tümünü silmek istediğinize emin misiniz ?")) {
//     // Arayüzden todoları temizleme
//     // todoList.innerHTML = ""; // Yavaş
//     while (todoList.firstElementChild != null) {
//       todoList.removeChild(todoList.firstElementChild);
//     }
//     localStorage.removeItem("todos");
//   }
// };

function clearAll() {
    let todosAll = document.querySelectorAll(".product-line-price")
  if (confirm("Tümünü silmek istediğinize emin misiniz ?")) {
    // Arayüzden todoları temizleme
    // todoList.innerHTML = ""; // Yavaş
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}
