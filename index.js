const app = require('express')()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json');

app.get('/books', (req, res) => {
    const books = ["Eesti Keele Õpik", "Vene Keele Õpik"];
    res.json(books);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})
