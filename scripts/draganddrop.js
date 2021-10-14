
items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('drop', handleDrop);
});


function handleDragStart(e) {
    this.style.opacity = '0.2';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    items.forEach(function (item) {

        item.classList.remove('over');
    });
}

function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    const tempId = dragSrcEl.getAttribute("data-id");
    const tempClassList = dragSrcEl.classList.value

    dragSrcEl.className = this.classList.value;
    dragSrcEl.setAttribute("data-id", this.getAttribute("data-id"))

    this.className = tempClassList;
    this.setAttribute("data-id", tempId)

    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}

function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    return false;
}


function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

