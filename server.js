if( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}

const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const { default: axios } = require('axios')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.get('/weather', (req, res) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${WEATHER_API_KEY}`
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data))
})

app.listen(3000, () => {
    console.log('Server started')
})