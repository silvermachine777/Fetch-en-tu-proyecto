const filasDeProductosComprados = document.getElementById('filasDeProductos');
let carritoDeCompras = [];


localStorage.getItem('carrito') && (carritoDeCompras = JSON.parse(localStorage.getItem('carrito')));

const mostrarProductos = (carritoDeCompras) => {

    carritoDeCompras.forEach(prod => {
        let crearfilasDeProductosComprados = document.createElement('tr');
        crearfilasDeProductosComprados.innerHTML += `                                                
                                                <tr>
                                                    <td id="nombre-producto">${prod.nombre}</td>
                                                    <td id="cantidad">${prod.cantidad}</td>
                                                    <td id="total-pagar">${prod.precio}</td>
                                                </tr>
                                            `

        filasDeProductosComprados.appendChild(crearfilasDeProductosComprados);
    });
}

mostrarProductos(carritoDeCompras);