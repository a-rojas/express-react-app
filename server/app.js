const express = require('express');
const logger = require('morgan');
const cors = require('cors');
let data = require('./data.js');

const app = express();

app.use(cors('localhost'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* Implement your routes here */

app.get('/animals', (req, res) => {
    res.json(data);
});

app.post('/animal', (req, res) => {
    const id = data.length + 1;

    const animal = {
        id,
        name: req.body.name,
        species: req.body.species,
        age: req.body.age
    };

    data.push(animal);

    res.sendStatus(200)
});

app.put('/animal', (req, res) => {

    const updatedAnimal = {
        id: req.body.id,
        name: req.body.name,
        species: req.body.species,
        age: req.body.age
    };

    index = data.findIndex((item => item.id === updatedAnimal.id));
    data[index] = updatedAnimal;

    res.sendStatus(200)
});

app.delete('/animal', (req, res) => {
    data = data.filter((item) => {
        return item.id !== req.body.id
    });

    res.sendStatus(200)
});

module.exports = app;
