const express = require('express')
const app = express()
const http = require('http')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

app.use(express.json())

let persons = [
    { 
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

morgan.token('postbody', (req, res) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :response-time ms :postbody'))

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id 
  const person = persons.find(p => p.id === id)
  if(person){
    response.json(person)
  } else {
    response.status(404).end()
  }
  
}) 

app.get('/api/info', (request, response) => {
  const total = persons.length
  const now = new Date()
  response.send(
    `<p>Phonebook has info of ${total} people</p>
    <p>${now}</p>`
  )
})

const generateId = () => {
    const id = Math.floor(Math.random() * 1000000)
    return id
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const exist = persons.find(prev => prev.name.trim().toLowerCase() === body.name)

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: [
        !body.name && "name missing",
        !body.number && "number missing"
        ].filter(Boolean).join(' and ')
    })
  } else if (exist) {
      return response.status(400).json({
        error: 'name must be unique'
        })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
    
  }

  persons = persons.concat(person)

  response.status(201).json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
