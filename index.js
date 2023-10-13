const app = require('express')()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamls = require('yamljs');
const swaggerDocument = yamls.load('./docs/swagger.yaml');

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
    return res.status(404).send({error: "Book not found"})
    }

    res.send(books[req.params.id - 1])
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})
