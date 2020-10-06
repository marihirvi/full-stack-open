import React from 'react';

const CountryListItem = ({ country, setSearch }) => {
    return (
        <div>
            {country.name} <button key={country.name} onClick={() => setSearch(country.name)}>Show</button>
        </div>
    )
}

export default CountryListItem