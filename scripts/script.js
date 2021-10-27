
const toDoList = document.querySelector(".todo-list");
eventListeners();









// function select(id) {
//     window.getSelection()
//         .selectAllChildren(
//             id
//         );
// }






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
            if (document.querySelector(".selected-category")) {
                let cat = document.querySelector(".selected-category").getAttribute("category");

                noToDoPlaceholder(cat)
            } else {
                emptyTodoList()
            }

        }, 300);
        todoCounters();
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



function todoCounters() {
    let counters = {};
    todos.forEach(item => {
        if (counters[item.category]) {
            counters[item.category] += 1;
        } else {
            counters[item.category] = 1;
        }
    })
    const categories = document.querySelectorAll(".category")
    categories.forEach(category => {
        if (counters[`${category.getAttribute("category")}`]) {
            category.querySelector(".number-of-items").innerHTML = counters[`${category.getAttribute("category")}`]
        } else {
            category.querySelector(".number-of-items").innerHTML = 0;
        }

    })
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
        li.innerHTML = `<div class="todo-item-outter">
                            <div class="img-container">
                                <img class="todo-image" src="${imgsrc}" alt="" width="20px" height="20px">
                            </div>
                            <div class="todo-item-container">
                                <span class="todo-item-content">${item.content}</span>
                                <span class="item-category">${item.category}</span>
                            </div>
                        </div>
                        <span class="delete-todo-item">×</span>`
        if (toDoList.classList.contains("empty")) {
            toDoList.innerHTML = "";
            toDoList.classList.remove("empty")
        }
        drag(li);
        toDoList.appendChild(li)
    })
}



function noToDoPlaceholder(category) {
    if (toDoList.innerHTML.trim() == "") {
        toDoList.innerHTML = `<div class='placeholder-content'>You have no tasks in the "${category}" category.</div>`
        toDoList.classList.add("empty")
    }
}


function renderItemAnimate(item) {
    const completed = item.completed ? "completed" : null;
    const li = document.createElement('li');
    if (completed) {
        li.className = `todo-item todo-animate completed`
        var imgsrc = "media/check.svg";
    } else {
        li.className = `todo-item todo-animate`
        var imgsrc = "media/circle.svg";
    }
    li.setAttribute("data-id", item.timeCreated)
    li.setAttribute("draggable", true)
    li.innerHTML = `<div class="todo-item-outter">
                        <div class="img-container">
                            <img class="todo-image" src="${imgsrc}" alt="" width="20px" height="20px">
                        </div>
                        <div class="todo-item-container">
                            <span class="todo-item-content">${item.content}</span>
                            <span class="item-category">${item.category}</span>
                        </div>
                    </div>
                    <span class="delete-todo-item">×</span>`
    if (toDoList.classList.contains("empty")) {
        toDoList.innerHTML = "";
        toDoList.classList.remove("empty")
    }
    drag(li);
    toDoList.appendChild(li);
    setTimeout(() => {
        li.classList.remove("todo-animate")
    }, 500);

    todoCounters()
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
    li.innerHTML = `<div class="todo-item-outter">
                        <div class="img-container">
                            <img class="todo-image" src="${imgsrc}" alt="" width="20px" height="20px">
                        </div>
                        <div class="todo-item-container">
                            <span class="todo-item-content">${item.content}</span>
                            <span class="item-category">${item.category}</span>
                        </div>
                    </div>
                    <span class="delete-todo-item">×</span>`
    if (toDoList.classList.contains("empty")) {
        toDoList.innerHTML = "";
        toDoList.classList.remove("empty")
    }
    drag(li);
    toDoList.appendChild(li);


    todoCounters()
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

    if (document.querySelector(".selected-category")) {

        let categoryIcon = querySelector(".selected-category .icon-title-container")
        let categoryName = querySelector(".selected-category .category-name")
        let cat = categoryIcon + " " + categoryName
        noToDoPlaceholder(cat)
    }
    emptyTodoList()
}



function emptyTodoList() {
    if (toDoList.innerHTML.trim() == "" || toDoList.classList.contains("empty")) {
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

function isCategorySelected() {
    if (document.querySelector(".selected-category")) {
        const category = document.querySelector(".selected-category").getAttribute("category");
        return category;
    } else {
        const category = "🕓 General"
        return category;
    }
}


function newToDo() {
    const input = document.querySelector(".todo-input")
    const category = isCategorySelected();

    if (input.value.trim() != "") {
        const newToDo = { content: input.value, timeCreated: Date.now(), completed: false, category: category }
        todos.push(newToDo)
        renderItemAnimate(newToDo)
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
        let completedZ = item.classList.contains("completed") ? "completed" : false;
        let categoryZ = item.querySelector(".item-category").innerText.trim();
        const newToDo = { content: todoContent, timeCreated: dataId, completed: completedZ, category: categoryZ }
        toDoListOrder.push(newToDo)
    })
    addToLocalStorage(toDoListOrder)
}

function addToLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

getFromLocalStorage();

checkToDoList();

todoCounters();

