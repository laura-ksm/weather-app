// getting all required elements
const searchWrapper = document.querySelector(".search-input")
const inputBox = searchWrapper.querySelector("input")
const suggBox = searchWrapper.querySelector(".autocom-box")
const icon = searchWrapper.querySelector(".icon")
let  locations = [];

// if user press any key and release
inputBox.onkeyup = (e) =>{
    let userData = e.target.value //user enetered data
    if( !!userData ){
        const postDataLocation = async (url, data) => {
            try{
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                locations = await response.json()
                let listRes = []
                listRes = locations.map(data => {
                    return data = `<li>${data.name}</li>`
                })
                searchWrapper.classList.add("active") //show autocomplete box
                suggBox.innerHTML = `<ul>${listRes.join('')}</ul>`
                
                let allList = suggBox.querySelectorAll("li")
                for (let i = 0; i < allList.length; i++) {
                    allList[i].setAttribute("onclick", "handleOption(this)")
                }

            }catch(error){
                console.log(error)
            }
        }
        postDataLocation('/location', {place: userData})
    }else{
        searchWrapper.classList.remove("active") //hide autocomplete box
    }
}

let handleOption = (element) => {
    let selectData = element.textContent
    inputBox.value = selectData
    icon.onclick = () => {
        let currentPlace = locations.filter( element => element.name === selectData )
        handleWeatherData(currentPlace)
    }
    searchWrapper.classList.remove("active")
}

let handleWeatherData = (place) => {
    const postDataWeather = async (url, data) => {
        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const currentWeather = await response.json()
            console.log(currentWeather)
        } catch (error) {
            console.log(error)
        }
    }
    postDataWeather('/weather', {lat: place[0].lat, lon: place[0].lon})
}