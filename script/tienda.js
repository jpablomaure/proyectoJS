
const productos = [
    { id: 1, titulo: "Aromatizador", precio: 1500, stock:10 },
    { id: 2, titulo: "Sillón", precio: 35000, stock:32 },
    { id: 3, titulo: "Lámpara", precio: 11300, stock:2 },
    { id: 4, titulo: "Perchero", precio: 6500, stock: 56 },
    { id: 5, titulo: "Sillón", precio: 28500, stock: 15 },
    { id: 6, titulo: "Velas", precio: 1300, stock: 20 },
    { id: 7, titulo: "Macetero simple", precio: 2500, stock: 22 },
    { id: 8, titulo: "Macetero Doble", precio: 4000, stock: 22 },
    { id: 9, titulo: "Espejo", precio: 3250, stock: 70 },
    { id: 10, titulo: "Almohadon", precio: 6800, stock: 33 },
    { id: 11, titulo: "Bordados", precio: 1000, stock: 22 },
    { id: 12, titulo: "Almohadon especial", precio: 9800 , stock: 26 },
];

// Recupero y grabación del carrito de compras

const carrito = getStorage();

function getStorage() {
    let storage = JSON.parse(localStorage.getItem("carrito")) || [];
    return storage;
};

function setStorage(array) {
    localStorage.setItem("carrito", JSON.stringify(array));
};

// Cantidad del carrito

document.getElementById("cantidad-prod").innerHTML = carrito.reduce((accum, element) => accum + Number(element.cantidad), 0);

// Para agregar al carrito de compras

fetch('data.json')
    .then((res) => res.json())
    .then((data) => generarCards(data))

const agregarAlCarrito = (idProducto) => {

    const valorDeCantidad = document.getElementById(
        `cantidad-${idProducto}`
    ).value;

    const productosAgregados = productos.find(producto => producto.id === idProducto);

    const indice = carrito.findIndex(producto => producto.id === idProducto);

    // Buscar producto en carrito y agregarle la cantidad elegida en la tienda

    if (indice !== -1) {
        carrito[indice].cantidad = Number(carrito[indice].cantidad) + Number(valorDeCantidad);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        // Agregando al carrito
        carrito.push({
            ...productosAgregados,
            cantidad: Number(valorDeCantidad)
        });
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    // Mensaje flotante de agregado al carrito 
    Toastify({
        text: `Agregaste ${productosAgregados.titulo} al carrito`,
        duration: 3000,
        destination: "./detalle.html",
        newWindow: false,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #6b705c, #eaeaea)",
        },
        onClick: function () {} // Callback after click
    }).showToast();

    // Actualizando el storage del carrito
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizando el html

    document.getElementById("cantidad-prod").innerHTML = document.getElementById("cantidad-prod").innerHTML = carrito.reduce((accum, element) => accum + Number(element.cantidad), 0);
};

// Generación de listado de productos

generarCards(productos);

function generarCards(productosAMostrar) {
    let acumuladorDeCards = ``;
    productosAMostrar.forEach((elementoDelArray) => {
        acumuladorDeCards += `<div class="producto">
        <p>${elementoDelArray.titulo}</p>
        <div class="producto--prod${elementoDelArray.id}"> </div>
        <p>$${elementoDelArray.precio}</p>
        Cantidad: <input value="1" min="1" max="${elementoDelArray.stock}" id="cantidad-${elementoDelArray.id}" type="number" style="max-width: 3rem" placeholder="cantidad"> 
        <button onclick='agregarAlCarrito(${elementoDelArray.id});'>Agregar al Carrito</button>
        
    </div>`;

    });

    mostrarCardsEnElHTML(acumuladorDeCards);
}

function mostrarCardsEnElHTML(cards) {
    document.getElementById("product").innerHTML = cards;
};

// Botón de busqueda de productos 

function buscarProducto() {
    const tecla = document.getElementById("buscarProducto");

    tecla.addEventListener('keyup', function (event) {

        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("botonBuscar").click();
        }
    });

    const nombreProductoBuscado = document.getElementById("buscarProducto").value.toUpperCase().trim();

    const productosEncontrados = productos.filter((producto) => {
        return producto.titulo.toUpperCase().match(nombreProductoBuscado);
    });

    generarCards(productosEncontrados);
};