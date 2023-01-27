const inputTodo = document.querySelector("#todo");
const todoList = document.querySelectorAll(".form-group")[1];
const search = document.querySelector("#search");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const containerDiv = document.querySelector(".container");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

window.addEventListener("load", () => {
  laodAllTodosToUI();
  search.addEventListener("keyup", filterTodos);
});

function laodAllTodosToUI() {
  todos.forEach((newTodo) => {
    addList(newTodo);
  });
}
document.getElementById("clear").addEventListener("click", (e) => {
  e.preventDefault();
  search.value = "";
  filterTodos();
});
containerDiv.addEventListener("click", (e) => {
  // ! addtodo button event
  if (e.target.classList.contains("addTodo")) {
    if (!inputTodo.value) {
      showAlert("danger", "Please enter a todo");
    } else {
      showAlert("success", "Your todo successfully added !");
      const newTodoObject = {
        id: ID(),
        isDone: false,
        content: inputTodo.value,
      };

      todos.push(newTodoObject);

      //?todos dizisinin son halini localStorage'e sakla
      localStorage.setItem("todos", JSON.stringify(todos));
      addList(newTodoObject);
      inputTodo.value = "";
      // !============================================

      // addTodoToStorage(newTodo);
    }
    e.preventDefault();
    // ! remove all todos
  } else if (e.target.classList.contains("fa-remove")) {
    const id = e.target.closest("li").getAttribute("id");
    //? Dizinin ilgili elementini sildi
    if (e.target.closest("li").classList.contains("checked")) {
      todos = todos.filter((newTodo) => newTodo.id != id);
      e.target.closest("li").remove();
      let content = e.target.closest("li").textContent;
      localStorage.setItem("todos", JSON.stringify(todos));
      showAlert("success", `${content} removed`);
    } else {
      showAlert("danger", "Please complete the todo");
    }
  } else if (e.target.classList.contains("fa-check")) {
    const id = e.target.closest("li").getAttribute("id");
    // todos dizisindeki ilgili elementin isDone kismini güncelle
    todos.map((newTodo, index) => {
      if (newTodo.id == id) {
        todos[index].isDone = !todos[index].isDone;
      }
    });

    //?todos dizisinin son halini localStorage'e sakla
    localStorage.setItem("todos", JSON.stringify(todos));
    if (e.target.parentElement.classList.contains("checked")) {
      console.log(e.target.parentElement.classList.contains("checked"));
      console.log(e.target.parentElement);
      e.target.parentElement.classList.remove("checked");
    } else {
      //? ilgili li elementinde checked adinda bir class yoksa ekle
      e.target.parentElement.classList.add("checked");
    }
    // ! Bütün childları silme
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
  }
});

// ! element oluşturma

function addList(newTodo) {
  //? her bir todo objesini destructure yaptık
  const { id, content, isDone } = newTodo;
  todoList.innerHTML += `
   <li class="form-group-item d-flex justify-content-between ${
     isDone ? "checked" : ""
   } " id=${id} >
   <i class="fa-solid fa-check"></i>
       <p>${content}</p>
       <a href="#" class="delete-item"><i class="fa fa-remove "></i></a>
     </li>`;
}

// ! filter todos
function filterTodos() {
  const filterValue = search.value.toLocaleLowerCase();
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

//  ! id function
function ID() {
  return "_" + Math.random().toString(36).substr(2, 9);
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
