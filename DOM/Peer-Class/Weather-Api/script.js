const searchBtn = document.getElementById("search-btn")
const cityInput = document.getElementById("city-input")
const cityName = document.getElementById("city-name")
const weatherInfo = document.getElementById("weather-info")
const temp = document.getElementById("temp")
const feelsLike = document.getElementById("feels-like")
const minTemp = document.getElementById("temp-min")
const maxTemp = document.getElementById("temp-max")
const humidity = document.getElementById("humidity")
const windSpeed = document.getElementById("wind")

async function getWeatherData(url) {
    try {
        const response = await fetch(url)

        if(!response.ok) {
            throw new Error(`Response not fetched successfully. Status Code: ${response.status}`)
        }

        const data = await response.json()
        console.log(data);
        
        return data
    } catch {
        console.log("Unable to fetch API data.");
    } 
}

searchBtn.addEventListener("click", async () => {
    if (cityInput.value.trim() === "") {
        alert("Please enter the city name.")
    }
    const API_KEY = ""
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${API_KEY}`

    const respone = await getWeatherData(URL)

    if(respone) {
        weatherInfo.classList.remove("hidden")

        cityName.innerHTML = respone.name
        temp.innerText = respone.main.temp
        feelsLike.innerText = respone.main.feels_like
        maxTemp.innerText = respone.main.temp_max
        minTemp.innerText = respone.main.temp_max
        windSpeed.innerText = `${respone.wind["speed"]} m/s`
        humidity.innerText = respone.main.humidity
    } else {
        alert("Invalid City Name.")
    }

    
})  
