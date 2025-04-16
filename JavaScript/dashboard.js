document.addEventListener("DOMContentLoaded", function () {
  // Navigation Functionality
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // Toggling Navigation menu on mobile
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Handling Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Removing active class from all links and sections
      navLinks.forEach((item) => item.classList.remove("active"));
      sections.forEach((section) => section.classList.remove("active-section"));

      // Adding active class to clicked link
      this.classList.add("active");

      // Show corresponding section
      const page = this.getAttribute("data-page");
      document
        .getElementById(`${page}-section`)
        .classList.add("active-section");

      // Close mobile menu
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // To-do list functionality
  const todoInput = document.getElementById("todo-input");
  const addTodoBtn = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");
  let todos = [];
  let editingIndex = -1;

  // Initially disable the Add Task button
  addTodoBtn.disabled = true;

  // Enable/disable Add Task button based on input
  todoInput.addEventListener("input", function () {
    addTodoBtn.disabled = todoInput.value.trim() === "";
  });

  // Add todo
  addTodoBtn.addEventListener("click", addTodo);

  // Allow pressing Enter key to add todo
  todoInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && todoInput.value.trim() !== "") {
      addTodo();
    }
  });

  function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText === "") {
      // Don't add empty tasks
      return;
    }

    if (editingIndex >= 0) {
      // Update existing todo
      todos[editingIndex] = todoText;
      editingIndex = -1;
      addTodoBtn.innerHTML = '<i class="fas fa-plus"></i> Add Task';
    } else {
      // Add new todo
      todos.push(todoText);
    }

    todoInput.value = "";
    addTodoBtn.disabled = true; // Disabling the button after adding task
    renderTodos();
    todoInput.focus();
  }

  // Render todos
  function renderTodos() {
    todoList.innerHTML = "";

    if (todos.length === 0) {
      const emptyMessage = document.createElement("li");
      emptyMessage.className = "empty-todo-message";
      emptyMessage.innerHTML =
        '<i class="fas fa-info-circle"></i> No tasks yet. Add your first task above!';
      todoList.appendChild(emptyMessage);
      return;
    }

    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = "todo-item";

      const todoText = document.createElement("span");
      todoText.textContent = todo;

      const actions = document.createElement("div");
      actions.className = "todo-actions";

      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
      editBtn.addEventListener("click", () => {
        todoInput.value = todo;
        editingIndex = index;
        addTodoBtn.disabled = false; // Enabling the button when editing
        addTodoBtn.innerHTML = '<i class="fas fa-save"></i> Update Task';
        todoInput.focus();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';
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

  // Call renderTodos initially to show the empty state
  renderTodos();
});
