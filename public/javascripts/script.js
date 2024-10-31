document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('#todo_input');
    const addButton = document.querySelector('#add_button');
    addButton.addEventListener('click', async function() {
        console.log('add item:', input.value);
        await addTodo(input.value);
        await updateList();
    });

    const todoList = document.querySelectorAll('#todo_list li');
    todoList.forEach(li => {
        li.addEventListener('click', onTodoClick);
    });

    getTodos();
});

async function updateList() {
    const updatedList = await getTodos();
    const todoList = document.querySelector('#todo_list');
    todoList.innerHTML = '';
    updatedList.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.title;
        if (todo.completed) {
            li.setAttribute('data-completed', 'true');
        }
        li.addEventListener('click', onTodoClick);
        todoList.appendChild(li);
    });
}

async function onTodoClick(event) {
    const li = event.target;
    const title = li.textContent;
    const completed = li.getAttribute('data-completed') === 'true';
    await updateTodo(title, !completed);
    await updateList();
}

async function getTodos() {
    const response = await fetch('/todos');
    const data = await response.json();
    return data;
}

async function addTodo(title) {
    const response = await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            completed: false
        })
    });
    return response;
}

async function updateTodo(title, completed) {
    const response = await fetch('/todos', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            completed: completed
        })
    });
    return response;
}
