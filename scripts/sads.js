function newToDo(completion) {
    const input = document.querySelector(".todo-input")
    if (input.value.trim() != "") {
        const newToDo = { content: input.value, timeCreated: Date(), completed: false }
        todos.push(newToDo)
        console.log(todos)
        input.value = "";
        const li = document.createElement('li');
        if (completion) {
            li.className = "todo-item completed"
        } else {
            li.className = "todo-item"
        }

        li.innerHTML = '<div class="todo-item-container">\
                        <div class="img-container">\
                        <img class="todo-image"';
        if (completion) {
            li.innerHTML += ' src="media/check.svg" alt="">'
        } else {
            li.innerHTML += ' src="media/circle.svg" alt="">'
        }
        li.innerHTML += `</div>\
                        <span class="todo-item-content">${newToDo.content}</span>\
                        </div >\
                        <span class="delete-todo-item">&times;</span>`;

        if (toDoList.classList.contains("empty")) {
            toDoList.innerHTML = "";
            toDoList.classList.remove("empty")
        }
        toDoList.appendChild(li)
        li.addEventListener("click", toDoEventListener)
        li.querySelector(".delete-todo-item").addEventListener("click", deletetodoEventListener)
    } else {
        return
    }
}