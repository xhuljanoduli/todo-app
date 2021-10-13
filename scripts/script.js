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
        toDoList.innerHTML = "You have no tasks for today!"
        return 1;
    }
    return 0;
}




function newToDo() {
    const input = document.querySelector(".todo-input").value
    const newToDo = { content: input, timeCreated: Date() }
    const li = document.createElement('li');
    li.className = "todo-item"
    li.innerHTML = `<div class="todo-item-container">\
                    <div class="img-container">\
                    <img class="todo-image" src="media/circle.svg" alt="">\
                    </div>\
                    <span class="todo-item-content">${newToDo.content}</span>\
                    </div>\
                    <span class="delete-todo-item">&times;</span>`

    toDoList.appendChild(li)
    li.addEventListener("click", toDoEventListener)
    li.querySelector(".delete-todo-item").addEventListener("click", deletetodoEventListener)
}