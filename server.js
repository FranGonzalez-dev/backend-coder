import express from 'express';
import cors from 'cors';
import { ProductManager } from './ProductManager.js';


const app = express();
const manager = new ProductManager();

app.use( cors ({ origin: '*' }));

app.get('/', (req, res) => {
    res.status(200).send('Bienvenido! Accede a /products para ver la lista de productos.')
})

app.get('/products', (req, res) => {
    const limit = req.query.limit;
    const data = manager.getProducts()
    if ( limit ) {
        res.status( 200 ).send({ data: data.slice( 0, limit )});
    } else {
        res.status( 200 ).send({ data })
    }
})

app.get('/products/:id', ( req, res ) => {
    const ID = +req.params.id;
    const product = manager.getProductById( ID );
    res.status( 200 ).send({ product })
})

app.listen( 8080, () => {
    console.log('Server up!')
})