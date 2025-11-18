import { useState } from 'react'

const ShowDetails = ({ country, showAll, onClick, text }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
      {showAll && (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital: {Array.isArray(country.capital) ? country.capital.join(', ') : (country.capital ?? 'N/A')}</p>
          <p>region: {country.region ?? 'N/A'}</p>
          <p>area: {country.area ?? 'N/A'}</p>
          <p>flag: {country.flag ?? '🏳️'}</p>
          {country.maps?.googleMaps && (
            <a href={country.maps.googleMaps} target='_blank' rel='noreferrer'>Google map</a>
          )}
        </div>
      )}
    </div>
  )
}

const ShowCountry = ({ country }) => {

  if (!Array.isArray(country) || country.length === 0)
    return <div>No matches</div>


  if (country.length > 10)
    return <div>Too many matches, specify another filter</div>


  if (country.length === 1) {
    const [open, setOpen] = useState(true)
    const c = country[0]
    return (
      <ShowDetails
        country={c}
        showAll={open}
        onClick={() => setOpen(o => !o)}
        text={null}
      />
    )
  }

  const [expanded, setExpanded] = useState(() => new Set())

  const toggle = id => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <ul>
      {country.map(c => {
        const isOpen = expanded.has(c.cca3)
        return (
          <li key={c.cca3}>
            {c.name.common}
            <ShowDetails
              country={c}
              showAll={isOpen}
              onClick={() => toggle(c.cca3)}
              text={isOpen ? 'hide' : 'show'}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default ShowCountry
