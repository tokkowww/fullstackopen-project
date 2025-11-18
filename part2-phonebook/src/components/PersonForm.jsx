import { useState } from 'react'

const Input = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    {label} <input name={name} value={value} onChange={onChange} type={type} />
  </div>
)

export default function PersonForm({ onAdd }) {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd?.({ name: newName, number: newNumber })
    setNewName('')
    setNewNumber('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label='Name:'
        name='name'
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Input
        label='Number:'
        name='number'
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
      />
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}
