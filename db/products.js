const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ECommerce',
    password: 'postgres',
    port: 5432,
})

const getProducts = (request, response) => {
    pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createProduct = (request, response) => {
    const { name, description, price, link_img } = request.body

    pool.query('INSERT INTO products (name, description, price, link_img) VALUES ($1, $2, $3, $4) RETURNING id', [name, description, price, link_img], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Product added with ID: ${result.rows[0].id}`)
    })
}

const updateProduct = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, description, price, link_img } = request.body

    pool.query(
        'UPDATE products SET name = $1, description = $2, price = $3, link_img = $4 WHERE id = $5', [name, description, price, link_img, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteProduct = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

const getProduct = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct
}