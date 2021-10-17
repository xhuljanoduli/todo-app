
const toDoList = document.querySelector(".todo-list");
eventListeners();

localStorage.mobile = "mobile"

let todos = [];
toDoList.addEventListener("click", function (e) {
    if (e.target && (e.target.classList.contains("delete-todo-item"))) {
        e.stopPropagation();
        const toDo = e.target.parentElement;
        const itemID = toDo.getAttribute("data-id")
        todos = todos.filter(function (item) {
            return item.timeCreated != itemID;
        })
        addToLocalStorage(todos);
        toDo.classList.add("slide-out-left")
        setTimeout(function () {
            toDo.remove()
            emptyTodoList()
        }, 300);
    } else {

        if (e.target.classList.contains("todo-item")) {
            const itemID = e.target.getAttribute("data-id")
            const itemImg = e.target.querySelector(".todo-image");
            if (e.target.classList.contains("completed")) {
                e.target.classList.remove("completed");
                itemImg.src = "media/circle.svg";
                todos.forEach(function (item) {
                    if (item.timeCreated == itemID) {

                        item.completed = false;
                    }
                });
            } else {
                e.target.classList.add("completed");
                itemImg.src = "media/check.svg";
                var audio = new Audio('media/ding.mp3');
                audio.play();
                todos.forEach(function (item) {
                    if (item.timeCreated == itemID) {
                        item.completed = "completed";
                    }
                });
            }
            addToLocalStorage(todos);
        }

    }
})

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');

    if (reference != "[]" && reference != null) {
        todos = JSON.parse(reference)
        renderTodos(todos);
    } else {
        emptyTodoList()
    }
}


function renderTodos(todos) {
    toDoList.innerHTML = '';

    todos.forEach(function (item) {
        const completed = item.completed ? "completed" : null;
        const li = document.createElement('li');
        if (completed) {
            li.className = `todo-item completed`
            var imgsrc = "media/check.svg";
        } else {
            li.className = `todo-item`
            var imgsrc = "media/circle.svg";
        }
        li.setAttribute("data-id", item.timeCreated)
        li.setAttribute("draggable", true)

        li.innerHTML = `<div class="todo-item-container">\
                            <div class="img-container">\
                                <img class="todo-image" src="${imgsrc}" alt="" width="20px"
                                height="20px">\
                            </div>\
                            <span class="todo-item-content">${item.content}</span>\
                        </div>\
                        <span class="delete-todo-item">&times;</span>`;
        if (toDoList.classList.contains("empty")) {
            toDoList.innerHTML = "";
            toDoList.classList.remove("empty")
        }
        // li.addEventListener("click", toDoEventListener)
        // li.querySelector(".delete-todo-item").addEventListener("click", deletetodoEventListener)
        drag(li);
        toDoList.appendChild(li)
    })
}


function renderItem(item) {
    const completed = item.completed ? "completed" : null;
    const li = document.createElement('li');
    if (completed) {
        li.className = `todo-item completed`
        var imgsrc = "media/check.svg";
    } else {
        li.className = `todo-item`
        var imgsrc = "media/circle.svg";
    }
    li.setAttribute("data-id", item.timeCreated)
    li.setAttribute("draggable", true)
    li.innerHTML = `<div class="todo-item-container">\
                            <div class="img-container">\
                                <img class="todo-image" src="${imgsrc}" alt="" width="20px"
                                height="20px">\
                            </div>\
                            <span class="todo-item-content">${item.content}</span>\
                        </div>\
                        <span class="delete-todo-item">&times;</span>`;
    if (toDoList.classList.contains("empty")) {
        toDoList.innerHTML = "";
        toDoList.classList.remove("empty")
    }
    // li.addEventListener("click", toDoEventListener)
    // li.querySelector(".delete-todo-item").addEventListener("click", deletetodoEventListener)
    drag(li);
    toDoList.appendChild(li)
}


function eventListeners() {
    const todoAdd = document.querySelector(".todo-add");
    todoAdd.addEventListener("click", newToDo)
    let input = document.getElementById("input-box");
    input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("addButton").click();
        }
    });
}






function deletetodoEventListener(e) {
    e.stopPropagation();
    const toDo = this.parentElement;
    const itemID = toDo.getAttribute("data-id")
    todos = todos.filter(function (item) {
        return item.timeCreated != itemID;
    })
    addToLocalStorage(todos);
    toDo.remove()
    emptyTodoList()
}


// function toDoEventListener(e) {
//     console.log("this runs>????")
//     const itemID = this.getAttribute("data-id")
//     const itemImg = this.querySelector(".todo-image");
//     if (this.classList.contains("completed")) {
//         this.classList.remove("completed");
//         itemImg.src = "media/circle.svg";
//         todos.forEach(function (item) {
//             if (item.timeCreated == itemID) {

//                 item.completed = false;
//             }
//         });
//     } else {
//         this.classList.add("completed");
//         itemImg.src = "media/check.svg";
//         
//         todos.forEach(function (item) {
//             if (item.timeCreated == itemID) {
//                 item.completed = "completed";
//             }
//         });
//     }
//     addToLocalStorage(todos);
// }





function emptyTodoList() {
    if (toDoList.innerHTML.trim() == "") {
        toDoList.innerHTML = "<div class='placeholder-content'>You have no tasks for today!</div>"
        toDoList.classList.add("empty")
        return 1;
    }
    return 0;
}

emptyTodoList()

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
        const newToDo = { content: input.value, timeCreated: Date.now(), completed: false }
        todos.push(newToDo)
        renderItem(newToDo)
        addToLocalStorage(todos);
        input.value = "";
    }
}

function reOrderlocalStorage() {
    const toDoListOrder = [];
    const todos = document.querySelectorAll(".todo-item")
    todos.forEach(function (item) {
        let todoContent = item.querySelector(".todo-item-content").innerHTML;
        let dataId = item.getAttribute('data-id');
        let completeds = item.classList.contains("completed") ? "completed" : false;
        const newToDo = { content: todoContent, timeCreated: dataId, completed: completeds }
        toDoListOrder.push(newToDo)
    })
    addToLocalStorage(toDoListOrder)
}

function addToLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
    // renderTodos(todos);
}

getFromLocalStorage();

checkToDoList();



