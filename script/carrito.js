const carrito = validarStorageCarrito();

function validarStorageCarrito() {
    if (localStorage.getItem("carrito") != null) {
        storageProductos = JSON.parse(localStorage.getItem("carrito"));
        return storageProductos;
    } else {
        return [];
    }
}

generarCards(carrito);

function generarCards(productosAMostrar) {
    let acumuladorDeCards = ``;
    productosAMostrar.forEach((elementoDelArray) => {
        const totalProducto = elementoDelArray.precio * elementoDelArray.cantidad;
        acumuladorDeCards += `<div class="producto">
        <p>${elementoDelArray.titulo} <button onclick="quitarProducto(${elementoDelArray.id});">[x]</button></p>
        <div class="producto--prod${elementoDelArray.id}"> </div>
        <p>Precio $${elementoDelArray.precio}</p>
        Cantidad: <input value="${elementoDelArray.cantidad}" min="1" id="cantidad-${elementoDelArray.id}" onclick="cambiarCantidadDeProducto(${elementoDelArray.id});" type="number" style="max-width: 3rem" placeholder="cantidad"> 
        <p>$${totalProducto}</p>
    </div>`;

    });
    mostrarCardsEnElHTML(acumuladorDeCards);
    totalCarrito();
}

function mostrarCardsEnElHTML(cards) {
    document.getElementById("mostrarCarrito").innerHTML = cards;
};

// Quitar el producto completo del carrito de compras

function quitarProducto(idProductoAQuitar) {
    const productoAQuitar = carrito.findIndex(producto => producto.id === idProductoAQuitar);
    carrito.splice(productoAQuitar, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    generarCards(carrito);
    totalCarrito();
};

// Cambia la cantidad del producto del carrito, actualiza el precio total del producto, actualiza el carrito y el localStorage

function cambiarCantidadDeProducto(idProductoACambiar) {
    // Identifico el articulo a actualizar
    const idProductoAActualizar = carrito.findIndex(producto => producto.id === idProductoACambiar);
    // Guardo el valor de cantidad del html
    const valorCantidad = document.getElementById(`cantidad-${idProductoACambiar}`).value;
    // Actualizo el carrito con la cantidad nueva
    carrito[idProductoAActualizar].cantidad = valorCantidad;
    // Grabo el storage y genero nuevamente las cards
    localStorage.setItem("carrito", JSON.stringify(carrito));
    generarCards(carrito);
    totalCarrito();
};

// Vaciar el carrito de compras

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    document.getElementById("mostrarCarrito").innerHTML = "Su Carrito se vacío correctamente"
    document.getElementById("totalCarrito").innerHTML = ``;
};

// Total del carrito

function totalCarrito() {
    const totalDelCarrito = carrito.reduce((accum, element) => accum + Number((element.cantidad * element.precio)), 0);
    console.log(totalDelCarrito);
    totalDelCarrito == 0 ? document.getElementById("totalCarrito").innerHTML = "Su Carrito esta vacío" :
        document.getElementById("totalCarrito").innerHTML = `<div><p>El total del carrito es $${totalDelCarrito}<p></div>`;

}