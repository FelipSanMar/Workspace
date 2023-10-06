const express = require('express')
const app = express()
const PORT = 8080
//Traduce a JSON lo proveniente de http
app.use(express.json())

const productsRouter = require('../api/products')
const cartsRouter = require('../api/carts')

app.use('/products', productsRouter)
app.use('/carts', cartsRouter)

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
