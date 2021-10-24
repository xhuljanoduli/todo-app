function drag(li) {
    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragover', handleDragOver);
    li.addEventListener('dragenter', handleDragEnter);
    li.addEventListener('dragleave', handleDragLeave);
    li.addEventListener('dragend', handleDragEnd);
    li.addEventListener('drop', handleDrop);
}



function handleDragStart(e) {
    this.style.opacity = '0.2';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    this.classList.remove('over');
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
    console.log("dragsource", dragSrcEl, "this", this)


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


