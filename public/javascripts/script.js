document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('#todo_input');
    const addButton = document.querySelector('#add_button');
    addButton.addEventListener('click', async function() {
        console.log('add item:', input.value);
        await addTodo(input.value);
        await updateList();
        input.value = '';
    });

    const todoListItems = document.querySelectorAll('#todo_list li .item');
    todoListItems.forEach(li => {
        li.addEventListener('click', onTodoClick);
    });

    const deleteButtons = document.querySelectorAll('#todo_list li .delete_button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async function(event) {
            const li = event.target.parentElement;
            const id = li.getAttribute('data-id');
            await deleteTodo(id);
            await updateList();
        });
    });

    getTodos();
});

async function updateList() {
    const updatedList = await getTodos();
    const todoList = document.querySelector('#todo_list');
    todoList.innerHTML = '';
    updatedList.forEach(todo => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.classList.add('item');
        span.textContent = todo.title;
        li.appendChild(span);
        li.setAttribute('data-id', todo.id);
        if (todo.completed) {
            li.setAttribute('data-completed', 'true');
        }
        li.addEventListener('click', onTodoClick);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete_button');
        deleteButton.addEventListener('click', async function(event) {
            event.stopPropagation();
            await deleteTodo(todo.id);
            await updateList();
        });
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

async function onTodoClick(event) {
    const li = event.target;
    const id = li.getAttribute('data-id');
    const completed = li.getAttribute('data-completed') === 'true';
    await updateTodo(id, !completed);
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

async function updateTodo(id, completed) {
    const response = await fetch('/todos/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            completed: completed
        })
    });
    return response;
}

async function deleteTodo(id) {
    const response = await fetch('/todos/' + id, {
        method: 'DELETE'
    });
    return response;
}
