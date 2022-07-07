import { getProducts } from "./getProducts.js";

const contenedorProductos = document.getElementById("listaProductos");
const contadorCarrito = document.getElementById("contadorProductos");
const carritoDeCompras = [];

const guardarProductosLocalStorage = (clave, valor) => {
    localStorage.setItem(clave, JSON.stringify(valor));
};

const recuperarProductosLocalStorage = (clave) =>
    JSON.parse(localStorage.getItem(clave));

const mostrarProductos = async() => {
    const stockProductos = await getProducts();
    console.log(stockProductos);
    stockProductos.forEach((element) => {
        let columnaDeProductos = document.createElement("div");
        columnaDeProductos.classList.add("col-md");
        columnaDeProductos.innerHTML += `
                                        <div class="card" style="width: 15rem;">
                                            <img src=${element.img} class="card-img-top">
                                            <div class="card-body"> 
                                                <h5 class="card-title text-center">${element.nombre}</h5>
                                                <p class="card-text mb-4 text-center"><strong>$ </strong>${element.precio}</p>
                                                <button type="button" class="btn btn-success w-100" id="btn-comprar${element.id}">Añadir al carrito</button>
                                            </div>
                                        </div>
                                    `;

        contenedorProductos.appendChild(columnaDeProductos);

        let botonDeComprar = document.getElementById(`btn-comprar${element.id}`);

        botonDeComprar.addEventListener("click", () => {
            Toastify({
                text: "Tu producto fue agregado al carrito",
                duration: 3000,
                style: {
                    background: "#198754",
                },
            }).showToast();

            comprarProducto(element.id);
        });
    });

};

const comprarProducto = async(id) => {
    const stockProductos = await getProducts();
    let producto = stockProductos.find((stockProductos) => stockProductos.id == id);
    carritoDeCompras.push(producto);
    guardarProductosLocalStorage("carrito", carritoDeCompras);
    actualizarCarrito();
};

mostrarProductos();


const actualizarCarrito = () => {
    contadorCarrito.innerText = carritoDeCompras.reduce(
        (acc, el) => acc + el.cantidad,
        0
    );
};