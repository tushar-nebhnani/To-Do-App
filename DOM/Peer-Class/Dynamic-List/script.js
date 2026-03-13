const addButton = document.getElementById("addBtn")
const input = document.getElementById("itemInput")
const list = document.getElementById("list")

addButton.addEventListener("click", () => {
    const text = input.value // form element doesn't have any text content
    
    if (text.trim() == "") {
        alert("Please enter the task")
        return
    }

    const li = document.createElement("li")
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    deleteButton.classList.add("delete")

    li.textContent = text
    li.append(deleteButton)

    deleteButton.addEventListener("click", () => {
        li.remove()
    })

    li.addEventListener("dblclick", () => {
        const updateText = prompt("Enter the updated value: ")
        li.innerText = updateText

        li.append(deleteButton)
    })

    list.append(li)
    input.value = ""
})