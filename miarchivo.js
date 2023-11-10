let productosDisponibles = JSON.parse(localStorage.getItem("productos")) || [];

const divProductos = document.getElementById ("productos");

const formularioHaceTuPedido = document.getElementById('formularioHaceTuPedido');

const btnPrincipal = document.getElementById('btnFormulario');


//card productos

document.addEventListener("DOMContentLoaded", () =>{
  generarCardProductos(productosDisponibles)
})

const generarCardProductos = (productos) => {
  divProductos.innerHTML = "";

  productos.forEach(producto => {

    const {img, nombre, cantidad, precio, categoria, id} = producto
    let card = document.createElement("div")
    card.className = "producto"
    card.innerHTML = `
    <div class="card style="width: 18rem;">
    <img class="prod-img" src="${img}"alt="${producto.nombre}">
    <div class="card-body">
    <h5 class="producto-nombre">${nombre}</h5>
    <p class="producto-cantidad">${cantidad}</p>
    <p class="producto-categoria">${categoria}</p>
    <p class="card-text">$${precio}</p>
    

    <button id="comprar${id}" class="btn-compra">COMPRAR</button>
    </div>
    </div>
    `
    divProductos.appendChild(card);

    const btnComprar = document.getElementById(`comprar${id}`)
    btnComprar.addEventListener("click", () => comprarProducto(id))
  });
  };
  
// Carrito

let carrito = JSON.parse(sessionStorage.getItem("carrito")) || []

const comprarProducto = (idProducto) => {

    const producto = productosDisponibles.find((producto) => producto.id === idProducto)

    const { nombre, precio, imagen, id } = producto

    const productoCarrito = carrito.find((producto) => producto.id === idProducto)

    if(productoCarrito === undefined){
        const nuevoProductoCarrito = {
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        }

    carrito.push(nuevoProductoCarrito)
    sessionStorage.setItem("carrito", JSON.stringify(carrito) )
    }else{
        const indexProductoCarrito = carrito.findIndex((producto) => producto.id === idProducto)

        carrito[indexProductoCarrito].cantidad++
        carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad

        sessionStorage.setItem("carrito", JSON.stringify(carrito))
    }
    carrito = JSON.parse(sessionStorage.getItem("carrito"))

    /*alert(`Usted ha comprado: ${nombre}`)*/
    alert(Swal.fire("Usted ha comprado: `${nombre}`"));
    console.log(carrito)
}

//BUSCAR UN PRODUCTO

let btnBuscarProducto = document.getElementById("btnBuscarProducto");

btnBuscarProducto.addEventListener("click", () => {
  Swal.fire({
    title: "Ingrese el nombre del Producto a buscar",
    input: "text",
    showCancelButton: true,
    ConfirmButtonText: "Look up",
  }).then((result) => {
  if(result.isConfirmed){
    let encontrado = productos.find((producto) => producto.nombre === nombre && producto.precio === precio);
    Swal.fire({
        title: `${result.value}`,
    });
    } 
    });
  });
  
/*const buscarProducto = () => { 
let nombre = prompt("Ingrese el nombre del producto a buscar");
while( nombre !="ESC"){
  let encontrado = productos.find((producto) => producto.nombre === nombre);
  if(encontrado){
    alert(`Nombre: ${encontrado.nombre}
    Cantidad: ${encontrado.cantidad}
    Precio: $${encontrado.precio}
    `);
  }else{
alert("Producto no disponible");
    }
  nombre = prompt("Ingrese el nombre del producto a buscar");
  }
};

btnBuscarProducto.addEventListener("click", buscarProducto);
*/



//FORMULARIO PEDIDOS Una vez que confirma la compra, se solicita que cargue sus datos en el formulario, y termine con un ENVIADO

class Pedido {
  constructor(nombreCliente, apellidoCliente, numeroPedido) {
    this.nombreCliente = nombreCliente;
    this.apellidoCliente = apellidoCliente;
    this.numeroPedido = numeroPedido;
  }
}

const pedidos = [];

/*****************************/
//Si el LocalStorage tiene datos, los agrego al Array de Pedidos.

if (localStorage.getItem('pedido')) {
  let pedido = JSON.parse(localStorage.getItem('pedidos'));
  
  for (let i = 0; i < pedido.length; i++) {
    pedidos.push(pedido[i]);
  }
}

/*****************************/

const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  agregarPedido();
});

function agregarPedido() {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const pedido = document.getElementById('pedido').value;

  const nuevoPedido = new Pedido(nombre, apellido, pedido);
  pedidos.push(nuevoPedido);

  //Agrego al LocalStorage:
  
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
  formulario.reset();
}

const contenedorPedidos = document.getElementById('contenedorPedidos');

const verPedidos = document.getElementById('verPedidos');

verPedidos.addEventListener('click', () => {
  mostrarPedidos();
});

function mostrarPedidos() {
  contenedorPedidos.innerHTML = "";
 pedidos.forEach((pedido) => {
    const div = document.createElement('div');
    div.innerHTML = `
                      <div>
                          <p>Nombre del Cliente: ${pedido.nombreCliente}</p>
                          <p>Apellido del Cliente: ${pedido.apellidoCliente}</p>
                          <p>Número Pedido: ${pedido.numeroPedido}</p>
                      </div>
                      `;
    contenedorPedidos.appendChild(div);
  });
}


