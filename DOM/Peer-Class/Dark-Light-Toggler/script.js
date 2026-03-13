const toggleBtn = document.getElementById("toggleButton")

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    
    if (document.body.classList.contains("dark")) {
        toggleBtn.textContent = "Toggle Light Mode."
    } else {
        toggleBtn.textContent = "Toggle Dark Mode."
    }
})


