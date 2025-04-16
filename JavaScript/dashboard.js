document.addEventListener("DOMContentLoaded", function () {
  //Navigation Functionality
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const hamburger = document.querySelectorAll(".hamburger");
  const navMenu = document.querySelectorAll(".nav-menu");

  //Toggling Navigation menu on mobile
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  //Handling Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      //Removing active class from all links and sections
      navLinks.forEach((item) => item.classList.remove("active"));
      sections.forEach((section) => section.classList.remove("active-section"));

      //Adding active class to clicked link
      this.classList.add("active");

      //show corresponding section
      const page = this.getAttribute("data-page");
      document
        .getElementById(`${page}-section`)
        .classList.add("active-section");

      //Close mobile menu
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  //To-do list functionality
  const todoInput = document.getElementById("todo-input");
  const addTodoBtn = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");
  let todos = [];
  let editingIndex = -1;

  //Add todo
  addTodoBtn.addEventListener("click", function () {
    const todoText = todoInput.value.trim();

    if (todoText === "") return;

    if (editingIndex >= 0) {
      //Update existing todo
      todos[editingIndex] = todoText;
      editingIndex = -1;
      addTodoBtn.textContent = "Add task";
    } else {
      //Add new todo
      todos.push(todoText);
    }

    todoInput.value = "";
    renderTodos();
  });

  //Render todos
  function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = "todo - item";

      const todoText = document.createElement("span");
      todoText.textContent = todo;

      const actions = document.createElement("div");
      actions.className = "todo-actions";

      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => {
        todoInput.value = todo;
        editingIndex = index;
        addTodoBtn.textContent = "Update Task";
        todoInput.focus();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        renderTodos();
      });

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(todoText);
      li.appendChild(actions);

      todoList.appendChild(li);
    });
  }
});
