import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryFilter from './components/CountryFilter'
import ShowCountry from './components/ShowCountry'


const App = () => {
  const [all, setAll] = useState([])
  const [newCountry, setNewCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setAll(response.data))
  }, [])

  const country = (() => {
    const s = newCountry.toLowerCase().trim()
    if (!s) return []
    return all.filter(c => c.name?.common?.toLowerCase().includes(s))
  })()
    
  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
  }
  


  
  

  return(
    <div>
      <CountryFilter value={newCountry} onChange={handleCountryChange} />
      <ul>
        <ShowCountry country={country} />
      </ul>     
    </div>

  )

}

export default App
