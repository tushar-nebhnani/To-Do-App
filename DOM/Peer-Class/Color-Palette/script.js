const formatSelect = document.getElementById("format")
const toneSelect = document.getElementById("tone")
const generateBtn = document.getElementById("generateBtn")
const pallete = document.getElementById("palette")

// rgb ki value kam -> darker shade
function randomRgb(tone) {
    let min = 0
    let max = 255
    if (toneSelect === "dark") {
        min = 0
        max = 150
    } else {
        min = 150
        max = 255
    }

    const r = Math.floor((Math.random() * (max - min)) + min)
    const g = Math.floor((Math.random() * (max - min)) + min)
    const b = Math.floor((Math.random() * (max - min)) + min)
    
    return {r, g, b}
}

function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map((x) => {
        x.toString(16).padStart(2, "0").join("")
    })
}

function generatePalette() {
    pallete.innerHTML = ""

    for(let i = 0; i < 5; i++) {
        const {r, g, b} = randomRgb(toneSelect.value)

        let color;
        if (formatSelect === "hex") {
            // todo: rgbToHex
            color = rgbToHex(r,b,g)
        } else {
            // rgb
            color = `rgb(${r}, ${g}, ${b})`
        }

        const div = document.createElement("div")
        const copyBtn = document.createElement("button")
        copyBtn.classList.add("btn-copy")
        copyBtn.innerText = "Copy"
        copyBtn.style.background = "black"
        div.classList.add("color")
        
        div.style.background = `rgb(${r}, ${g}, ${b})`
        div.textContent = color
        
        copyBtn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(color)
                copyBtn.innerText = "Copied"

                setTimeout(() => {
                    copyBtn.innerText = "copy"
                }, 1000)
            } catch (error) {
                alert("access denied")
            }
            
        })
        
        div.appendChild(copyBtn)
        pallete.appendChild(div)
    }
}

generateBtn.addEventListener("click", generatePalette)

generatePalette()