if( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}

const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const GEO_API_KEY = process.env.GEO_API_KEY

const { default: axios } = require('axios')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/location', (req, res) => {
    axios({
        method: 'get',
        url: 'https://weatherapi-com.p.rapidapi.com/search.json',
        params: {q: `${req.body.place}`},
        headers: {
            'x-rapidapi-key': `${GEO_API_KEY}`,
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        },
        responseType: 'json'
    })
    .then( data => res.json(data.data) )
    .catch(function (error) {
        console.error(error);
    });
})

app.post('/weather', (req, res) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${WEATHER_API_KEY}&units=metric`
    axios({
        method: 'get',
        url: url,
        responseType: 'json'
    })
    .then( data => res.json(data.data) )
    .catch(function(error) {
        console.log(error);
    })
})

app.listen(3000, () => {
    console.log('Server started')
})