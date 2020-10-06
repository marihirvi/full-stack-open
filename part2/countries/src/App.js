import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import CountryList from './components/CountryList.js'
import Search from './components/Search.js'

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      <h1>Country information</h1>
      <Search search={search} handleSearch={handleSearch} />
      <CountryList countries={countries} search={search} setSearch={setSearch} />
    </div>
  );
}

export default App;
