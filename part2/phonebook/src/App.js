import React, { useState, useEffect } from 'react';
import Person from './components/Person.js';
import PersonForm from './components/PersonForm.js';
import Filter from './components/Filter.js';
import personService from './services/persons';
import Notification from './components/Notification';


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterString, setFilter] = useState('')
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
    }, [])

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFiltering = (event) => {
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        if (persons.map(x => x.name.toLowerCase()).includes(newName.toLowerCase())) {
            if (window.confirm(`${newName} is already added to phonebook. Update number?`)) {
                const personToUpdate = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())[0]
                personService
                    .update(personToUpdate.id, { ...personToUpdate, number: newNumber })
                    .then(newPerson => {
                        setPersons(persons.map(p => p.name !== newName ? p : { ...p, number: newNumber }))
                        setMessage(
                            `The number of ${newPerson.name} was successfully updated.`
                        )
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        if (error.response !== undefined) {
                            setErrorMessage(error.response.data.error)
                            setTimeout(() => {
                                setErrorMessage(null)
                            }, 5000)
                        } else {
                            setErrorMessage(
                                `${newName} has already been removed from phonebook`)
                            setTimeout(() => {
                                setErrorMessage(null)
                            }, 5000)
                            setPersons(persons.filter(p => p.name !== newName))
                        }
                    })
            }
        } else {
            personService
                .create(personObject)
                .then(newPerson => {
                    setPersons(persons.concat(newPerson))
                    setMessage(
                        `${newPerson.name} was successfully added to phonebook`
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(error.response.data.error)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
        setNewName('')
        setNewNumber('')
    }

    const handleRemove = (id) => {
        const name = persons.filter(p => p.id === id)[0].name
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .remove(id)
                .then(response => {
                    setPersons(persons.filter(p => p.id !== id))
                    setMessage(
                        `${name} was successfully removed from phonebook`
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(
                        `${name} has already been removed from phonebook`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    setPersons(persons.filter(p => p.id !== id))
                })
        }
    }

    const personsToShow = filterString === ''
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))

    return (
        <div>
            <h1>The Phonebook</h1>
            <Notification message={message} type="success" />
            <Notification message={errorMessage} type="error" />
            <h2>Search by name</h2>
            <Filter filterString={filterString} handleFiltering={handleFiltering} />
            <h3>Add person</h3>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber}
            />
            <h2>Numbers</h2>
            <div>
                {personsToShow.map(person =>
                    <Person key={person.id} person={person} removePerson={() => handleRemove(person.id)} />
                )}
            </div>
        </div>
    )
}

export default App