const list = document.getElementById("todo-list")
const addBtn = document.getElementById("add-btn")
const input = document.getElementById("todo-input")

// Create
function addItem() {
    const text = input.value.trim()
    if(!text) {
        alert("Enter a valid value.");
        return
    }

    const li = document.createElement('li')
    const textSpan = document.createElement('span')
    const btnGrouper = document.createElement("div")
    const editBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')

    textSpan.innerText = text.charAt(0).toUpperCase() + text.slice(1)
    editBtn.innerText = "Edit"
    deleteBtn.innerText = "Delete"

    btnGrouper.className = "button-group";
    editBtn.className = "btn-action edit-btn";
    deleteBtn.className = "btn-action delete-btn";

    btnGrouper.append(editBtn, deleteBtn)  
    
    
    li.append(textSpan, btnGrouper)
    list.append(li)

    deleteBtn.onclick = () => deleteItem(li)
    editBtn.onclick = () => updateItem(textSpan)

    input.value = ""
}

// Update
function updateItem(item) {
    const updatedText = prompt("Enter the updated task: ")
    item.innerText = updatedText
}

// Delete
function deleteItem(item) {
    item.remove()
}

// addBtn.onclick = addItem() This will automatically runs the code, without waiting for the event to happen BUG: 1
addBtn.onclick = () => addItem() // While this waits till the wait has happened, the power of =>