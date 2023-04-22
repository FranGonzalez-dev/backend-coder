const express = require('express');
const router = express.Router();


router.get('/', ( req, res ) => {
    try {
        res.render('realtimeProducts', {
            css_file: 'styles',
            title: 'Lista de productos en tiempo real',
        })
    } catch ( error ) {
        console.log( error );
    }
})
/*
router.post('/', (req, res) => {
    try {
        const product = req.body;
        console.log(product);
        socket.on( 'newProduct', data => {
            console.log( data );
        })
    // emitir el evento para actualizar los productos en tiempo real
    // socketIo.emit('updateProducts', manager.getProducts());
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});
*/

module.exports = router;