const toDoList = document.querySelector(".todo-list");

function eventListeners() {
    const todos = document.querySelectorAll(".todo-item");
    const deleteTodos = document.querySelectorAll(".delete-todo-item");
    const todoAdd = document.querySelector(".todo-add");
    for (let index = 0; index < todos.length; index++) {
        todos[index].addEventListener("click", toDoEventListener)
    }
    for (let index = 0; index < deleteTodos.length; index++) {
        deleteTodos[index].addEventListener("click", deletetodoEventListener)
    }
    todoAdd.addEventListener("click", newToDo)
}

eventListeners();




function deletetodoEventListener(e) {
    e.stopPropagation();
    const toDo = this.parentElement;
    toDo.remove()
    emptyTodoList()
}


function toDoEventListener() {
    const itemImg = this.querySelector(".todo-image");
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
        itemImg.src = "media/circle.svg";
    } else {
        this.classList.add("completed");
        itemImg.src = "media/check.svg";
    }
}




function emptyTodoList() {
    if (toDoList.innerHTML.trim() == "") {
        toDoList.innerHTML = "<div class='placeholder-content'>You have no tasks for today!</div>"
        toDoList.classList.add("empty")
        return 1;
    }
    return 0;
}

function checkToDoList() {
    if (toDoList.innerHTML == "<div class='placeholder-content'>You have no tasks for today!</div>") {
        return "empty";
    } else {
        return "not empty";
    }
}




function newToDo() {

    const input = document.querySelector(".todo-input")
    if (input.value.trim() != "") {
        const newToDo = { content: input.value, timeCreated: Date(), completed: false }
        todos.push(newToDo)
        input.value = "";
        const li = document.createElement('li');
        li.className = `todo-item data-id='${newToDo.timeCreated}'`
        li.innerHTML = `<div class="todo-item-container">\
                    <div class="img-container">\
                    <img class="todo-image" src="media/circle.svg" alt="">\
                    </div>\
                    <span class="todo-item-content">${newToDo.content}</span>\
                    </div>\
                    <span class="delete-todo-item">&times;</span>`

        if (toDoList.classList.contains("empty")) {
            toDoList.innerHTML = "";
            toDoList.classList.remove("empty")
        }
        toDoList.appendChild(li)
        li.addEventListener("click", toDoEventListener)
        li.querySelector(".delete-todo-item").addEventListener("click", deletetodoEventListener)
        addToLocalStorage(todos);
        console.log(todos)
        console.log(localStorage)
    } else {
        return;
    }
}

function addToLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference)
        renderTodos(todos);
    }
}

function renderTodos(todoList) {
    todoList.forEach(function (item) {
        const completed = item.completed ? "completed" : null;
        const li = document.createElement('li');
        if (completed) {
            li.className = "todo-item completed"
            var imgsrc = "media/check.svg";
        } else {
            li.className = "todo-item"
            var imgsrc = "media/circle.svg";
        }

        li.innerHTML = `<div class="todo-item-container">\
                            <div class="img-container">\
                                <img class="todo-image" src="${imgsrc}" alt="">\
                            </div>\
                            <span class="todo-item-content">${item.content}</span>\
                        </div>\
                        <span class="delete-todo-item">&times;</span>`;
        if (toDoList.classList.contains("empty")) {
            toDoList.innerHTML = "";
            toDoList.classList.remove("empty")
        }
        toDoList.appendChild(li)
        li.addEventListener("click", toDoEventListener)
        li.querySelector(".delete-todo-item").addEventListener("click", deletetodoEventListener)
    })
}



checkToDoList();

getFromLocalStorage();