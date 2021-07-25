// let btn = document.getElementById('btn-send');
// btn.addEventListener('click', () => {
//     const place = document.getElementById('search').value;
//     const postData = async (url, data) => {
//         try{
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });
//             const res = await response.json();
//             //console.log(res);
//             getLatAndLon(res);
//         }catch(error){
//             console.log(error);
//         }
//     }
//     postData('/weather', {place: place})
//     let getLatAndLon = (res) => {
//         console.log(res)
//         let list = []
//         res.forEach(element => {
//             let e = {name: element.name, lat: element.lat, lon: element.lon}
//             list.push(e)
//         });
//     }
// })

// getting all required elements
const searchWrapper = document.querySelector(".search-input")
const inputBox = searchWrapper.querySelector("input")
const suggBox = searchWrapper.querySelector(".autocom-box")
const icon = searchWrapper.querySelector(".icon")
let locations = [];
// let linkTag = searchWrapper.querySelector("a")
// let webLink

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    if(userData){
        const postData = async (url, data) => {
            try{
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const res = await response.json();
                getDataName(res);
            }catch(error){
                console.log(error);
            }
        }
        postData('/weather', {place: userData})
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

let getDataName = (res) => {
    let emptyArray = [];
    res.forEach(element => {
        let e = {name: element.name, lat: element.lat, lon: element.lon}
        locations.push(e)
    });
    emptyArray = locations.map(data=>{
        return data = `<li>${data.name}</li>`;
    });
    searchWrapper.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
        allList[i].setAttribute("onclick", "select(this)");
    }
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        console.log(selectData);
        console.log(locations);
        let currentPlace = locations.filter( element => element.name === selectData );
        console.log(currentPlace)        
    }
    searchWrapper.classList.remove("active");
}