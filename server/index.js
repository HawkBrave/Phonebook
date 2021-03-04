require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();
app.use(express.json());
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}));
app.use(cors());
app.use(express.static('build'));


// landing page
app.get('/', (request, response) => {
  const html = `
    <h1>Home</h1>
    <p>To use the API, change the url to /api/persons</p>
  `;
  response.send(html);
});

// info
app.get('/info', (request, response) => {
  const time = new Date();
  const personsCount = persons.reduce((acc, item) => acc + 1, 0);
  const html = `
    <h2>Phonebook has info for ${personsCount} people.</h2>
    <p>Current time: ${time}</p>
  `;
  response.send(html);
});

// API
// serve get all
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons));
});

// serve get one person
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  }).catch(error => next(error));
});

// serve delete
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(person => {
    response.status(204).end();
  }).catch(error => next(error));
});

// serve add person

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (body.name.length >= 25) {
    return response.status(400).json({ error: "Reached max character limit at name." });
  }
  if (body.number.length >= 15) {
    return response.status(400).json({ error: "Reached max character limit at number." });
  }
   
  if (!body.number) {
    return response.status(400).json({
      error: "Number should not be empty."
    });
  }
  // Person.find({ name: body.name }).then(person => {
  //   if (person) {
  //     return response.status(400).send({ error: "name must be unique" });
  //   }
  // });

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(savedPerson => response.json(savedPerson))
    .catch(error => next(error));
});

//error handling
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
}

app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});