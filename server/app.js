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

app.get('/animals/:id', (req, res) => {
    index = data.findIndex((item => item.id === Number(req.params.id)));

    res.json(data[index]);
});

app.post('/animals/add', (req, res) => {
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

app.put('/animals/:id', (req, res) => {

    const updatedAnimal = {
        id: Number(req.params.id),
        name: req.body.name,
        species: req.body.species,
        age: req.body.age
    };

    index = data.findIndex((item => item.id === updatedAnimal.id));
    data[index] = updatedAnimal;

    res.sendStatus(200)
});

app.delete('/animals/:id', (req, res) => {
    data = data.filter((item) => {
        return item.id !== Number(req.params.id)
    });

    res.sendStatus(200)
});

module.exports = app;
