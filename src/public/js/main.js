const socket = io();

const addForm = document.getElementById('addProductForm');

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const thumbnail = [];
    const product = { title, category, description, price, code, stock, thumbnail };
    socket.emit('addProduct', product);
})

socket.on("msgAddProduct", (mensaje) => {
    if (mensaje.success) {
        alert("Producto agregado!");
        addForm.reset();
    } else {
        alert("Error");
    }
});

socket.on("msgDeleteProduct", (mensaje) => {
    if (mensaje.success) {
        alert("Producto eliminado!")
    } else {
        alert("Error");
    }
})

socket.on('getProducts', (products) => {
    const prodsFromServer = document.getElementById('productsFromServer')
    prodsFromServer.innerHTML = '';

    products.forEach(product => {
        prodsFromServer.innerHTML +=
            `
        <div>
        <h5>Producto: ${product.title}</h5>
            <p>Categoría: ${product.category}</p>
            <p>Descripción: ${product.description}</p>
            <p>Precio: $${product.price}</p>
            <p>Código: ${product.code}</p>
            <p>Stock: ${product.stock}</p>
            <p>${product.thumbnail}</p>
            <button onclick="deleteProduct('${product.id}')">Eliminar</button>
        </div>
        `
    })
});

deleteProduct = (id) => {
    socket.emit('deleteProduct', id);
}