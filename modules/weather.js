const axios = require('axios')
const weatherCash = {};
async function handelWeather(req, res) {
    const searchQuery = req.query.searchQuery;
    const lat = req.query.lat;
    const lon = req.query.lon;
    console.log(weatherCash)
    if (weatherCash[searchQuery] !== undefined) {
        res.status(200).send(weatherCash[searchQuery])
    } else {

        const cityArr = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`)
        // console.log(cityArr.data)
        try {
            const cityData = cityArr.data.data.map(item => new Forecast(item))
            weatherCash[searchQuery] = cityData

            res.status(200).send(cityData)
        } catch (error) {
            errorHandlee(error, res)
        }
    }

    // const cityArr = weatherData.find(item => item.city_name.toLowerCase() === searchQuery.toLowerCase())


    // res.send({ cityArr })
}

class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = day.weather.description
    }
}

module.exports = { handelWeather }