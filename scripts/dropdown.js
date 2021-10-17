const dropdownbtns = document.querySelectorAll(".dropdown-btn")
const categoryDropdownMenu = document.getElementById("categoryDropdownMenu")

dropdownbtns.forEach(dropdownbtn => {
    dropdownbtn.addEventListener("click", function () {
        dropbtn = this;
        this.nextElementSibling.classList.toggle("show")
        setTimeout(function () {
            softShow(dropbtn);
        }, 0);

        this.classList.toggle("open-dropdown-bgr");
        this.querySelector(".dropdown-arrow").classList.toggle("rotate")
    })
});


window.onclick = function (event) {
    console.log(event.target)
    if (!event.target.matches('.dropdown-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                openDropdown.classList.remove('showEl');
                openDropdown.previousElementSibling.classList.remove("open-dropdown-bgr")
                openDropdown.previousElementSibling.querySelector(".dropdown-arrow").classList.toggle("rotate")
            }
        }
    }
}

categoryDropdownMenu.addEventListener("click", function (e) {
    document.querySelector(".category-picker .category-text").innerText = e.target.innerText;
})

function softShow(el) {
    el.nextElementSibling.classList.toggle("showEl")
}