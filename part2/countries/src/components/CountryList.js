import React from 'react';
import Country from './Country'
import CountryListItem from './CountryListItem'

const CountryList = ({ countries, search, setSearch }) => {

    const countriesToShow = search === ''
        ? countries
        : countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

    if (countriesToShow.length === 1) {
        return (
            <Country country={countriesToShow[0]} />
        )
    } else if (countriesToShow.length < 11) {
        return (
            <div>
                {countriesToShow.map(country => <CountryListItem key={country.name} country={country} setSearch={setSearch} />)}
            </div>
        )
    } else {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
}

export default CountryList;