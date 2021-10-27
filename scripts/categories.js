const categoryContainer = document.querySelector(".categories-editor");
const newCategoryBtn = document.querySelector(".new-category-link");
newCategoryBtn.addEventListener("click", function (e) {
    e.preventDefault()
    createNewCategory()
})
let categories = document.querySelector(".categories-editor")

let categoryArray = [];

// localStorage.removeItem("categories")

function createNewCategory() {
    const category = document.createElement('div');
    category.className = "category unnamed-category"
    category.setAttribute("category", '🔨 Untitled Category')
    category.innerHTML = `
                    <div class="icon-title-container">
                        <span class="category-icon">🔨</span>
                        <span class="category-name"><input type="text" class="category-name-input" onfocus="this.select();" value="Untitled Category" placeholder="Type a category name"></span>
                    </div>
                    <span class="number-of-items">0</span>
                </div>`
    document.querySelector(".categories-editor").appendChild(category)
    const newCat = document.querySelector(".unnamed-category .category-name");
    const inputBox = document.querySelector(".category-name-input")
    inputBox.focus();

    inputBox.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {

            let catValue = document.querySelector(".category-name-input").value;

            event.preventDefault();
            newCat.innerHTML = catValue;
            category.classList.remove("unnamed-category");
            category.setAttribute("category", `🔨 ${catValue}`)
            let newCategoryObject = { category: catValue, categoryIcon: '🔨' }
            categoryArray.push(newCategoryObject)
            localStorage.setItem("categories", JSON.stringify(categoryArray));

        }
    });
}



window.onclick = function (e) {
    if (document.querySelector(".unnamed-category")) {
        if (!(e.target == document.querySelector(".unnamed-category")) && !(e.target == document.querySelector(".new-category")) && !(e.target == document.querySelector(".new-category-link"))) {
            let catValue = document.querySelector(".category-name-input").value;

            let newCat = document.querySelector(".unnamed-category .category-name");
            newCat.innerHTML = catValue;
            let category = document.querySelector(".unnamed-category")
            category.classList.remove("unnamed-category");
            category.setAttribute("category", `🔨 ${catValue}`)
            let newCategoryObject = { category: catValue, categoryIcon: '🔨' }
            categoryArray.push(newCategoryObject)
            localStorage.setItem("categories", JSON.stringify(categoryArray));

        }
    }
}













//render selected category to-dos
categories.addEventListener("click", function (e) {
    if (e.target.classList.contains("selected-category")) {
        e.target.classList.remove("selected-category")
        getFromLocalStorage();
    } else {
        e.target.classList.add("selected-category")
        Array.from(e.target.parentElement.children).forEach(item => {
            if (item != e.target) {
                item.classList.remove("selected-category")
            }
        })
        toDoList.innerHTML = '';
        todos.forEach(todo => {
            if (e.target.getAttribute("category") == todo.category) {
                renderItem(todo)
            }
        })

        noToDoPlaceholder((e.target.querySelector(".category-icon").innerText) + " " + (e.target.querySelector(".category-name").innerText))
    }
})













//Check if local storage reference exists and get it
function getCategoriesFromLocalStorage() {
    const reference = localStorage.getItem('categories');
    if (reference != null) {
        categoryArray = JSON.parse(reference)

        renderAllCategories(categoryArray);
    } else {
        let categories = [];
        localStorage.setItem("categories", JSON.stringify(categories))

    }
}


//Render all the categories from local storage
function renderAllCategories(categories) {
    categoryContainer.innerHTML = "";
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');

        categoryDiv.setAttribute("category", `${category.categoryIcon} ${category.category}`)
        categoryDiv.className = `category`
        categoryDiv.innerHTML = ` <div class="icon-title-container">
                            <span class="category-icon">${category.categoryIcon}</span>
                            <span class="category-name">${category.category}</span>
                        </div>
                        <span class="number-of-items">0</span>`
        categoryContainer.appendChild(categoryDiv)
        todoCounters();
    })

}

function saveCategoriesToLocalStorage() {

}

getCategoriesFromLocalStorage()