const URL = 'http://localhost:8080/'

document.addEventListener('DOMContentLoaded', () => {

    const loader = document.getElementById('loading');
    loader.style.display = 'block';

    fetch( URL + 'products')
        .then( response => {
            if (!response.ok) throw new Error('No es posible conectarse con el servidor en estos momentos');
            return response.json();
        })
        .then( data => {
    
            loader.style.display = 'none'; // Oculta el loader
            const products = data.data;
            const gridContainer = document.getElementById('products--grid');

            products.forEach( product => {
                const article = document.createElement('article');
                article.className = 'product';
                article.innerHTML = `
                    <img src=${product.thumbnail}>
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                `;
            gridContainer.appendChild(article)
        });
    })
    .catch( error => {
        console.error(error);
        loader.style.display = 'none';
    });
});










/**
 fetch('http://localhost:8080/products')
 .then( response => response.json())
 .then( data => console.log( data ))
 
 * FUNCIONA ^^^^

const getProducts = async () => {
    try {
        const resp = await fetch('http://localhost:8080/products', {mode:'no-cors'})
        const data = await resp.json();
        return data;
    } catch ( error ) {
        console.error( error );
    }
}

function App () {


    const products = async () => {
        const prods = await getProducts();

    }

    


}
App()
function App () {
    const products = getProducts();
    console.log( products );
}

App()
 */