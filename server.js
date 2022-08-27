'use strict'
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express();
app.use(cors());
const weatherData = require('./data/weather.json')


const port = process.env.PORT || 3003;

app.get('/weather', (req, res) => {
    const searchQuery = req.query.searchQuery;
    const lat = req.query.lat;
    const lon = req.query.lon;
    const cityArr = weatherData.find(item => item.city_name.toLowerCase() === searchQuery.toLowerCase())

    try {
        const cityData = cityArr.data.map(item => new Forecast(item))
        res.status(200).send(cityData)
    } catch (error) {
        errorHandlee(error, res)
    }




    res.send({ cityArr })
})
class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = day.weather.description
    }
}
app.get('*', (res, req) => { res.status(404).send('page not found') })
function errorHandlee(error, res) {
    res.status(500).send({ error: 'something went worng' })
}



app.listen(port, () => {
    console.log(`server work:) :) :) :)`)
})