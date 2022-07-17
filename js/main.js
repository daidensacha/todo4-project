// Store localStorage object in variable
let todos = JSON.parse(localStorage.getItem('todos')) || [];

const form = document.querySelector('#form');

// Form submit event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Show alert on submit if input is empty
  const alertMsg = document.querySelector('#alert');
  const showAlert = () => alertMsg.innerHTML = '';

  if (!e.target.firstElementChild.value) {
    alertMsg.innerHTML = 'Please enter a todo';
    return setTimeout(showAlert, 3000);
  }

  // Get form values and add to the new todo item
  const todo = {
    todoContent: e.target.elements.todocontent.value,
    completed: false,
    createdAt: new Date().getTime(),
  };

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));

  e.target.reset();

  addNewTodo();

});

addNewTodo();

// Add todo list elements
function addNewTodo() {
  const todoList = document.querySelector('#todo-list');

  //  Empty list
  todoList.innerHTML = '';

  // For each loop to run for each todo
  // SOrt items - newest first
  todos.sort((a, b) => b.createdAt - a.createdAt).forEach(todo => {
    // Create elements
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const content = document.createElement('input');
    const editBtn = document.createElement('span');
    const deleteBtn = document.createElement('span');
    // const editBtn = document.createElement('button');
    // const deleteBtn = document.createElement('button');

    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    content.type = 'text';

    content.setAttribute('readonly', true);

    // Add classList
    listItem.classList += 'list-item';
    checkbox.classList += 'check';
    content.classList += 'content';
    editBtn.classList += 'far fa-edit edit btn btn-edit';
    deleteBtn.classList += 'far fa-times-circle delete btn btn-delete';


    // Append elements -
    todoList.appendChild(listItem);
    listItem.appendChild(checkbox);
    listItem.appendChild(content);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);

    // Add todo content to the created item input
    // const addTodoInput = document.querySelector('#todocontent');
    content.value = todo.todoContent;
    form.reset();

    document.querySelector('#todocontent').value = '';

    // DELETE EVENT LISTENER
    deleteBtn.addEventListener('click', (e) => {
      // Use filter to remove the item from the array
      todos = todos.filter(t => t != todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      addNewTodo();
    });

    // EDIT EVENT LISTENER
    editBtn.addEventListener('click', (e) => {
      const input = e.target.previousElementSibling;
      // console.log(input);
      // console.log(input.readOnly);
      // console.log(input.value);
      const editButton = e.target;

      if (input.readOnly) {
        input.removeAttribute('readonly');
        input.focus();
        editButton.classList.remove('far','fa-edit','edit','btn-edit');
        editButton.classList.add('far','fa-check-circle','edit','btn-save');
      } else {
        input.setAttribute('readonly', true);
        editButton.classList.remove('far','fa-check-circle','edit','btn-save');
        editButton.classList.add('far','fa-edit','edit','btn-edit');
      }
      todo.todoContent = input.value;
      localStorage.setItem('todos', JSON.stringify(todos));

    });

    // CHECKBOX EVENT LISTENER
    checkbox.addEventListener('change', (e) => {
      const input = e.target.nextElementSibling;
      todo.completed = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));
      if (!todo.completed) {
        input.classList.remove('completed');
      } else {
        input.classList.add('completed');
      }
      // localStorage.setItem('todos', JSON.stringify(todos));
    });

  });

}

// Toggle dark theme

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); //add this
    }
}

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}