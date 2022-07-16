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

  // For each loop to run for each todo line 43 - 113
  todos.forEach(todo => {
    // Create elements
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const content = document.createElement('input');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    content.type = 'text';

    content.setAttribute('readonly', true);

    // Add classList
    listItem.classList += 'list-item';
    checkbox.classList += 'check';
    content.classList += 'content';
    editBtn.classList += 'edit btn-bg-edit';
    deleteBtn.classList += 'delete';

    // Add innerHTML
    editBtn.innerHTML = 'Edit';
    deleteBtn.innerHTML = 'Delete';

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
        editButton.classList.replace('btn-bg-edit', 'btn-bg-save');
        editButton.innerHTML = 'Save';
      } else {
        input.setAttribute('readonly', true);
        editButton.classList.replace('btn-bg-save', 'btn-bg-edit');
        editButton.innerHTML = 'Edit';
      }
      todo.todoContent = input.value;
      localStorage.setItem('todos', JSON.stringify(todos));

    });

    // CHECKBOX EVENT LISTENER
    checkbox.addEventListener('change', (e) => {
      const input = e.target.nextElementSibling;
      todo.completed = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));

      todo.completed ?
        input.classList.remove('completed') :
        input.classList.add('completed');
    });

  });

}