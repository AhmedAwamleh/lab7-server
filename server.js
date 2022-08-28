'use strict'
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config();
const app = express();
app.use(cors());
//axios send


const port = process.env.PORT || 3003;
// recived app.get
app.get('/weather', async (req, res) => {
    const searchQuery = req.query.searchQuery;
    const lat = req.query.lat;
    const lon = req.query.lon;
    // const cityArr = weatherData.find(item => item.city_name.toLowerCase() === searchQuery.toLowerCase())

    const cityArr = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`)
    console.log(cityArr.data)
    try {
        const cityData = cityArr.data.data.map(item => new Forecast(item))
        res.status(200).send(cityData)
    } catch (error) {
        errorHandlee(error, res)
    }




    // res.send({ cityArr })
})

app.get('/movies', async (req, res) => {
    const searchQuery = req.query.searchQuery;
    const movieArr = await axios.get(`https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_KEY}&query=${searchQuery}`)

    try {
        const movieData = movieArr.data.results.map(item => new Movie(item))
        res.status(200).send(movieData)
    } catch (error) {
        errorHandlee(error, res)
    }


})



app.get('*', (req, res) => { res.status(404).send('page not found') })


function errorHandlee(error, res) {
    res.status(500).send({ error: 'something went worng' })

}




class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = day.weather.description
    }
}

class Movie {
    constructor(movie) {
        this.title = movie.title
        this.overview = movie.overview
        this.average_votes = movie.vote_average
        this.total_votes = movie.vote_count
        this.image_url = movie.poster_path
        this.popularity = movie.popularity
        this.released_on = movie.released_date
    }
}



app.listen(port, () => {
    console.log(`server work:at ${process.env.PORT}) :) :) :)`)
})