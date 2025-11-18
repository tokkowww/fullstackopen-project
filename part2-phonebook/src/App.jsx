import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newNotification, setNotification] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className='success'>
        {message}
      </div>
    )
  }

  const handleAdd = ({ name, number }) => {
    const n = (name || '').trim().toLowerCase()
    const num = (number || '').trim()
    if (!n) return alert('Please enter a name')
    if (!num) return alert('Please enter a number')

    const exist = persons.find(prev => prev.name.trim().toLowerCase() === n)

    if (exist) {
      if (persons.some(p => (p.number || '').trim() === num))
        return alert(`${exist.name} is already added to phonebook`)
      
      const ok = window.confirm(`${exist.name} is already added to phonebook. Replace the old number with a new one?`)
      if (!ok) return

      const updated = { ...exist, number: num }
      personService
        .update(exist.id, updated)
        .then(response => {
          setPersons(prev => 
            prev.map(p => p.id === exist.id ? response.data : p))
            return response.data
        }
        )
        .then(res => {
          setNotification(`The number of ${res.name} is updated to ${res.number}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }
        )
        .catch(error => {
          setNotification(`information of  ${exist.name} has already been removed from server`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }
        )
        


      return
    }
      

    const person = {
      name: n,
      number: num
    }
    
    personService
      .create(person)
      .then(response => {
          setPersons(persons.concat(response.data))
          return response.data
      }
      )
      .then(res => {
          setNotification(`Added ${res.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
      }
      )
 
    }
 
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const searchPerson = () => {
    const s = newFilter.trim().toLowerCase()

    if(!s) {return persons}
    
    return persons.filter(n => 
      (n.name ?? '').toLowerCase().includes(s))
    }

  const deletePersonOf = id => {
    personService
      .delete(id)
      .then(() => {
        setPersons(n => n.filter(p => p.id != id))
      })
  }

  console.log('render', persons.length, 'persons')
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={newNotification} />

      <Filter text='Filter shown with:' value={newFilter} onChange={handleFilterChange} />
      
      <h2>Add a new</h2>
      
      <PersonForm onAdd={handleAdd} />

      <h2>Numbers</h2>
      
      <div>{searchPerson().map(person => 
        <Persons key={person.id} person={person} deletePerson={() => deletePersonOf(person.id)} />
      )}</div>
    </div>
  )
}

export default App