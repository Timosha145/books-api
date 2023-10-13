const express = require('express');
const app = express()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamls = require('yamljs');
const swaggerDocument = yamls.load('./docs/swagger.yaml');

app.use(express.json())

const books = [
    { id: 1, title: "To Kill a Mockingbird", price: 12.99 },
    { id: 2, title: "1984", price: 10.99 },
    { id: 3, title: "Pride and Prejudice", price: 9.99 },
    { id: 4, title: "The Great Gatsby", price: 11.49 },
    { id: 5, title: "The Catcher in the Rye", price: 10.00 },
    { id: 6, title: "Moby-Dick", price: 14.99 },
    { id: 7, title: "War and Peace", price: 18.99 },
    { id: 8, title: "The Hobbit", price: 12.99 },
    { id: 9, title: "Brave New World", price: 11.99 },
    { id: 10, title: "The Lord of the Rings", price: 20.50 }
];

app.get('/books', (req, res) => {
    res.send(books);
});

app.get('/books/:id', (req, res) => {
    if (typeof books[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Book not found" });
    }
    res.send(books[req.params.id - 1]);
});

app.post('/books', (req, res) => {
    if (!req.body.title || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' });
    }

    let book = {
        id: books.length + 1,
        title: req.body.title,
        price: req.body.price
    };

    books.push(book);

    res.status(201)
        .location(`${getBaseUrl(req)}/books/${books.length}`)
        .send(book);
});

app.delete('/books/:id', (req, res) => {
    if (typeof books[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Book not found" });
    }
    books.splice(req.params.id - 1, 1);

    res.status(204).send({ error: "No content" });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
});

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted
        ? 'https' : 'http' + `://${req.headers.host}`;
}
