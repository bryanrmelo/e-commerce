const express = require('express')
const app = express()
const db = require('./db/products')
const port = 3000

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.static('./public/'));

initProductsRouting()

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

function initProductsRouting() {
    app.get('/products', db.getProducts)
    app.post('/products', db.createProduct)
    app.put('/products/:id', db.updateProduct)
    app.delete('/products/:id', db.deleteProduct)
    app.get('/products/:id', db.getProduct)
}