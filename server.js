const express = require('express');
const app = express();
const book = require('./db')
const bodyParser = require('body-parser');



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/books', (req, res) => {
    res.json(book)
})
app.get('/books/:id', (req, res) => {
    res.json(book.find(book => {
        return book.id === req.params.id;
    }))
})
app.post('/books', (req, res) => {
    book.push(req.body)
    res.status(201).json(req.body)
})

app.put('/books/:id', (req, res) => {
    const updateIndex = book.findIndex(book => {
        return book.id === req.params.id;
    })

    res.json(Object.assign(book[updateIndex], req.body))
})

app.delete('/books/:id', (req, res) => {
    const deletedIndex = book.findIndex(book => {
        return book.id === req.params.id;
    })
    book.splice(deletedIndex, 1)
    res.status(204).send()
})

app.listen(3000, () => console.log("server start"))