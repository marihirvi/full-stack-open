import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {

    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {
                setWeather(response.data.current)
            })
      }, [api_key, capital])

    return (
        <div>
            <h3>{weather.weather_descriptions}</h3>
            <img src={weather.weather_icons} alt={capital}></img>
            <p><strong>temperature:</strong> {weather.temperature} degrees Celcius</p>
            <p><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
    )
}

export default Weather