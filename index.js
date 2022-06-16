const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

morgan.token('body', (req,res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {skip: (req, res) => req.method !== 'POST'}))
app.use(morgan('tiny', {skip: (req) => req.method === 'POST'}))
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const generateId = () => {
    return Math.round(Math.random()*1000000);
}

app.get('/api/persons', (req, res) => {
    res.json(persons);
})
app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
         <p>${Date()}</p>`
         );
})
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person =>  person.id === id);
    if(!person) {
        return res.status(404).end();
    }
    res.json(person);
})
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});
app.post('/api/persons', (req, res) => {
    const { name, number} = req.body;
    if (!name){
        return res.status(400).send({error:"Name cannot be empty"})
    }
    if (!number) {
        return res.status(400).send({error:"Number cannot be empty"})
    }
    const isNameSame = persons.find(person => person.name === name)
    if (isNameSame)
    {
        return res.status(400).send({error:"Name must be unique"})
    }
    const person = {
        id:generateId(),
        ...req.body};
    persons.push(person);
    res.send(person);
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})