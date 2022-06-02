const form = document.querySelector("#todo-form");
const inputTodo = document.querySelector("#todo");
const addBtn = document.getElementById("addTodo");
const search = document.querySelector("#search");
const todoList = document.querySelectorAll(".form-group")[1];
const clearBtn = document.querySelector("#clear-todos");

const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const items = document.querySelectorAll(".list-group li");

for (var i = 0; i > items.length; i++) {
  tab.push(items[i].innerHTML);
}

for (var i = 0; i < items.length; i++) {
  var tab = [],
    index;

  items[i].onclick = function () {
    index = tab.indexOf(this.innerHTML);
    console.log(this.innerHTML + " " + index);
  };
}

addBtn.onclick = function () {
  if (!inputTodo.value) {
    alert("Lütfen bir dil giriniz");
  } else {
    addLI();
  }
};
function addLI() {
  // var inputText = document.createTextNode(inputTodo.value);
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

clearBtn.onclick = function () {
  // todoList.innerHTML = "";
  if (confirm("Tümünü silmek istediğinize emin misiniz ?")) {
    // Arayüzden todoları temizleme
    // todoList.innerHTML = ""; // Yavaş
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
};

// addBtn.onclick = function () {
//   if (!inputTodo.value) {
//     alert("Lütfen bir dil giriniz");
//   } else {
//     let newElement = document.createElement("li");
//     const link = document.createElement("a");
//     newElement.className = "form-group-item d-flex justify-content-between";
//     newElement.innerHTML += `${inputTodo.value}<a href="#" class="delete-item">
//   <i class="fa fa-remove pe-3"></i>
//   </a>`;
//     todoList.appendChild(newElement);
//     inputTodo.value = "";
//   }
// };
