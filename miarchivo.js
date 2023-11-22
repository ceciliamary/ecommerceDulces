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

document.addEventListener("DOMContentLoaded", () => {
  dibujarCarrito()
})

let carrito = JSON.parse(sessionStorage.getItem("carrito")) || []

const listaCarrito = document.getElementById("items")

const footCarrito = document.getElementById("totales")

const btnVerCarritoCompras = document.getElementById("btnVerCarritoCompras")

const carritoTable = document.getElementById("carrito")

btnVerCarritoCompras.addEventListener("click", () => {
  //dibujarCarrito()
  if(carritoTable.style.display === "block"){
    carritoTable.style.display = "none"
  } else{
    carritoTable.style.display = "block"
    dibujarCarrito()
  }
})

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
    //carrito.push(nuevoProductoCarrito)
    
    sessionStorage.setItem("carrito", JSON.stringify(carrito) )
    }else{
        const indexProductoCarrito = carrito.findIndex((producto) => producto.id === idProducto)

        carrito[indexProductoCarrito].cantidad++
        carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad

        sessionStorage.setItem("carrito", JSON.stringify(carrito))
    }
    carrito = JSON.parse(sessionStorage.getItem("carrito"))

  Swal.fire({
    title: 'Desea agregarlo al carrito?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
    customClass: {
      actions: 'my-actions',
      cancelButton: 'order-1 right-gap',
      confirmButton: 'order-2',
      denyButton: 'order-3',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      carrito.push(producto)
      Swal.fire('Producto agregado al carrito!', '', 'success')
      
    } else if (result.isDenied) {
      Swal.fire('Producto no agregado', '', 'info')
    }
  })
}

function seguirComprando(){
  Swal.fire({
    title: 'Desea seguir comprando?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
    customClass: {
      actions: 'my-actions',
      cancelButton: 'order-1 right-gap',
      confirmButton: 'order-2',
      denyButton: 'order-3',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      comprarProducto()
    } else
      if (carrito.length > 0){
          totalCarrito()
      } else if (result.isDenied) {
        Swal.fire('Producto no agregado', '', 'info')
      }
    })
  }

const dibujarCarrito = () => {
  listaCarrito.innerHTML = ''
  carrito.forEach(producto => {
    const {img, nombre, cantidad, precio, id} = producto

  let body = document.createElement("tr")

body.className = "producto === carrito"

body.innerHTML = `
<th><img id="fotoProductoCarrito" src= "${img}" class="fotoProductoCarrito"</th>
<td>${nombre}</td>
<td>${cantidad}</td>
<td>${precio / cantidad}</td>
<td>${precio}</td>
<td>
<button id="+${id}">+</button>
<button id="-${id}">-</button>
</td>
`

listaCarrito.append(body)
const btnAgregar = document.getElementById(`+${id}`)
const btnRestar = document.getElementById(`-${id}`)

btnAgregar.addEventListener("click", () => aumentarCantidad(id))
btnRestar.addEventListener("click", () => restarCantidad(id))
 });

dibujarFooter()
}

const dibujarFooter = () => {
  if(carrito.length >0){
    footCarrito.innerHTML = ""

    let footer = document.createElement("tr")

    footer.innerHTML = `
    <th><b>Totales:</b></th>
    <td></td>
    <td>${generarTotales().cantidadTotal}</td>
    <td></td>
    <td>${generarTotales().costoTotal}</td>
    `

    footCarrito.append(footer)
  }else{
    footCarrito.innerHTML = "<h3>No hay productos en el carrito</h3>"
  }
}

const generarTotales = () => {
  const costoTotal = carrito.reduce((total, {precio}) => total + precio, 0)
  const cantidadTotal = carrito.reduce((total, {cantidad})=>
  total + cantidad, 0)
  return {
    costoTotal: costoTotal, 
    cantidadTotal: cantidadTotal
  }
}

const aumentarCantidad = (id) => {
  const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
  const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

  carrito[indexProductoCarrito].cantidad++
  carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

  sessionStorage.setItem("carrito", JSON.stringify(carrito))
 dibujarCarrito()

}

const restarCantidad = (id) => {
  const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
  const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

  carrito[indexProductoCarrito].cantidad--
  carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

  if(carrito[indexProductoCarrito].cantidad === 0){
      carrito.splice(indexProductoCarrito, 1)
  }

  sessionStorage.setItem("carrito", JSON.stringify(carrito))
  dibujarCarrito()

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

  let encontrado = productos.find((producto) => producto.nombre === result.value);  
   if(encontrado) {
    Swal.fire({
      title: `Detalles del producto`,
      html: `
      Nombre: ${encontrado.nombre}
      <br>
      Precio: $${encontrado.precio}
      <br>
      Cantidad: ${encontrado.cantidad}
      <br>
      Categoria: ${encontrado.categoria}
      `,
      });
    } else {
      Swal.fire({
        title: `Producto no encontrado`,
        icon: `error`,
        });  
    }
  }
})
}) 


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
