// getting all required elements
const searchWrapper = document.querySelector(".search-input")
const inputBox = searchWrapper.querySelector("input")
const suggBox = searchWrapper.querySelector(".autocom-box")
const icon = searchWrapper.querySelector(".icon")
let  res = [];

// if user press any key and release
inputBox.onkeyup = (e) =>{
    let userData = e.target.value; //user enetered data
    if( !!userData ){
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
                res = await response.json();
                let listRes = [];
                listRes = res.map(data => {
                    return data = `<li>${data.name}</li>`;
                })
                searchWrapper.classList.add("active"); //show autocomplete box
                suggBox.innerHTML = `<ul>${listRes.join('')}</ul>`;
                
                let allList = suggBox.querySelectorAll("li");
                for (let i = 0; i < allList.length; i++) {
                    allList[i].setAttribute("onclick", "select(this)");
                }

            }catch(error){
                console.log(error);
            }
        }
        postData('/weather', {place: userData})
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent
    inputBox.value = selectData
    icon.onclick = () => {
        let currentPlace = res.filter( element => element.name === selectData )
        console.log(currentPlace)
    }
    searchWrapper.classList.remove("active");
}