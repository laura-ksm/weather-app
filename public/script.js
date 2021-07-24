let btn = document.getElementById('btn-send');
btn.addEventListener('click', () => {
    const place = document.getElementById('search').value;
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
            console.log(res);
        }catch(error){
            console.log(error);
        }
    }
    postData('/weather', {place: place})
})