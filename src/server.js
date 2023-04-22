const express = require('express')
const handlebars = require('express-handlebars')

const { Server } = require('socket.io');

const path = require('path')

const productsRouter = require('./routes/products.router')
const realtimeProductsRouter = require('./routes/realtimeProducts.router')


const app = express();
const PORT = 8080;
const httpServer = app.listen( PORT, () => console.log(`Server listening on port ${ PORT }`));

const socketServer = new Server( httpServer );


app.engine( 'handlebars', handlebars.engine() )
app.set('views', __dirname+'/views')

app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname+'/public')))
app.use( '/realtimeproducts', realtimeProductsRouter );
app.use( '/products', productsRouter )

const ProductManager = require('./ProductManager')
const manager = new ProductManager()


socketServer.on('connection', ( socketClient ) => {
    console.log(`Nuevo cliente ${ socketClient.id } conectado...`);
    const products = manager.getProducts();
    socketClient.on('newProduct', ( data ) => {
        console.log(`Nuevo producto: ${ data.title }`);
        manager.addProduct( data )
        socketServer.emit('getAllProducts', products)
    })
    socketClient.on('deleteProduct', ( id ) => {
        console.log(`Producto a eliminar: ${ id }`)
        manager.deleteProduct( id )
        socketServer.emit('getAllProducts', products)
    })
    socketServer.emit('getAllProducts', products)
})

