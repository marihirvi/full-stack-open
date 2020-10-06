import React from 'react';
import Weather from './Weather';

const Country = ({country, weather, setWeather}) => {

    return(
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages:</h2>
            <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} width='150px' alt={country.name}/>
            <h2>Weather in {country.capital}</h2>
            <Weather capital={country.capital} />
        </div>
        
    )
}

export default Country;

