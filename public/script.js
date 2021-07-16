let btn = document.getElementById('btn-send');
btn.addEventListener('click', () => {
    const place = document.getElementById('search').value;
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            place: place
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
})