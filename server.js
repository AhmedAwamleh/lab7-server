'use strict'

const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { handelWeather } = require('./modules/weather')
const { handleMovie } = require('./modules/movies')
require('dotenv').config();
const app = express();
app.use(cors());



//axios send
// recived app.get

const port = process.env.PORT || 3003;
app.get('/movies', handleMovie)
app.get('/weather', handelWeather)

app.get('*', (req, res) => { res.status(404).send('page not found') })


function errorHandlee(error, res) {
    res.status(500).send({ error: 'something went worng' })

}

app.listen(port, () => {
    console.log(`server work at ${process.env.PORT}) :) :) :)`)
})