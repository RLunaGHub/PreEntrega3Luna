class Producto {
  constructor(producto) {
    this.id = producto.id;
    this.nombre = producto.nombre;
    this.desc = producto.desc;
    this.precio = producto.precio;
    this.cantidad = producto.cantidad;
    this.precioTotal = producto.precio;
  }
  agregarProducto() {
    this.cantidad++;
  }
  quitarProducto() {
    this.cantidad--;
  }
  precioActualizado() {
    this.precioTotal = this.precio * this.cantidad;
  }
}
//Llamo al div contenedor de cards a crear
const verProductos = (array) => {
  let contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  // Recorre el array e imprime cards
  for (const product of array) {
    let card = document.createElement("div");

    card.innerHTML = `
      <div class="card text-center mx-2 my-2" style="width: 18rem;">
          <div class="card-body">
              <img src="${product.img}" id="img${product.id}" class="card-img-top img-fluid" alt="${product.descripcion}">
              <h2 class="card-title">${product.nombre}</h2>
              <h5 class="card-subtitle mb-2 text-muted">${product.desc}</h5>
              <p class="card-text">$${product.precio}</p>

              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                  <button id="add${product.nombre}${product.id}" type="button" class="btn btn-success"> Comprar </button>
              </div>
          </div>
      </div>      
      `;

    contenedor.appendChild(card);

    let boton = document.getElementById(`add${product.nombre}${product.id}`);
    boton.addEventListener("click", () => agregarCarrito(product));
  }
};

//Verificar storage, devolver lo almacenado de ser el caso
const verificarCarrito = () => {
  let contenidoStorage = JSON.parse(localStorage.getItem("storageCarrito"));

  if (contenidoStorage) {
    let array = [];

    for (const objeto of contenidoStorage) {
      let producto = new Producto(objeto);
      producto.precioActualizado();
      array.push(producto);
    }

    imprimirTabla(array);
    //actualiza datos recuperados del array
    return array;
  } else return [];
};

//Agregar productos al carro
const agregarCarrito = (producto) => {
  let index = carrito.findIndex((element) => element.id === producto.id);
  console.log({ index });
  if (index != -1) {
    carrito[index].agregarProducto();
    carrito[index].precioActualizado();
  } else {
    let nombre = new Producto(producto);
    nombre.cantidad = 1;
    carrito.push(nombre);
  }

  //Actualiza storage y tabla interactiva
  localStorage.setItem("storageCarrito", JSON.stringify(carrito));
  imprimirTabla(carrito);
};
//Elimina producto del carrito
const eliminarDelCarrito = (id) => {
  let index = carrito.findIndex((element) => element.id === id);
  if (carrito[index].cantidad > 1) {
    carrito[index].quitarProducto();
    carrito[index].precioActualizado();
  } else {
    carrito.splice(index, 1);
  }
  localStorage.setItem("storageCarrito", JSON.stringify(carrito));
  imprimirTabla(carrito);
};

//Vaciar carrito
const vaciarCarrito = () => {
  carrito = [];
  localStorage.removeItem("storageCarrito");
  document.getElementById("table-carrito").innerHTML = "";
  document.getElementById("action-carrito").innerHTML = "";
};

//Concretar la compra
const comprarCarrito = () => {
  carrito = [];
  localStorage.removeItem("storageCarrito");
  document.getElementById("table-carrito").innerHTML = "";
  document.getElementById("action-carrito").innerHTML = "";
};

const precioTotalCompra = (array) => {
  return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
};

const imprimirTabla = (array) => {
  let contenedor = document.getElementById("table-carrito");
  contenedor.innerHTML = "";

  //Div tabla interactiva
  let table = document.createElement("div");
  table.innerHTML = `
      <table id="tableCarrito" class="table table-striped table-hover">
          <thead>         
              <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Agregar Producto</th>
                  <th>Eliminar Producto</th>
              </tr>
          </thead>

          <tbody id="bodyTable">

          </tbody>
      </table>
  `;

  contenedor.appendChild(table);

  //Cuerpo que recibe datos del array
  let bodyTable = document.getElementById("bodyTable");

  for (let product of array) {
    let data = document.createElement("tr");
    data.innerHTML = `
            <td>${product.nombre}</td>
            <td>${product.cantidad}</td>
            <td>$${product.precioTotal}</td>
            <td><button id="agregar${product.id}" class="btn btn-success">Agregar</button></td>
            <td><button id="eliminar${product.id}" class="btn btn-warning">Eliminar</button></td>
  `;

    bodyTable.appendChild(data);

    let botonAgregar = document.getElementById(`agregar${product.id}`);
    botonAgregar.addEventListener("click", () => agregarCarrito(product));
    let botonEliminar = document.getElementById(`eliminar${product.id}`);
    botonEliminar.addEventListener("click", () =>
      eliminarDelCarrito(product.id)
    );
  }

  let precioTotal = precioTotalCompra(array);
  let actionCarrito = document.getElementById("action-carrito");
  actionCarrito.innerHTML = `
<div class="d-grid gap-2 d-md-block">
        <h4 class="w-100 text-left"> PrecioTotal: $${precioTotal}</h4>
        <button id="comprarCarrito" onclick="comprarCarrito()" class="btn btn-primary">Confirmar compra</button>
        <button id="vaciarCarrito" onclick="vaciarCarrito()" class="btn btn-danger me-md-2">Vaciar Carrito</button>
    </div>
`;
};

//Lista de productos - array de objetos
const productos = [
  {
    id: 1,
    nombre: "Chocotorta",
    desc: "Capas de galletitas chocolinas, dulce de leche y queso crema. Cobertura: trocitos de galletitas y rulos de chocolate",
    precio: 4600,
    img: "./img/chocotorta.jpg",
  },
  {
    id: 2,
    nombre: "Lemon Pie",
    desc: "Base de masa sablée, crema de limón. Cobertura: merengue italiano",
    precio: 4600,
    img: "./img/lemonpie.jpg",
  },
  {
    id: 3,
    nombre: "Rogel",
    desc: "Capas de masa crocante de alfajor santafesino, abundante dulce de leche y merengue italiano",
    precio: 4600,
    img: "./img/rogel.jpg",
  },
  {
    id: 4,
    nombre: "Straciatella",
    desc: "Masa húmeda combinada de chocolate y mousse de dulce de leche granizado",
    precio: 4200,
    img: "./img/straciatella.jpg",
  },
  {
    id: 5,
    nombre: "Tiramisú",
    desc: "Pionono de café bien húmedo, batido de queso, crema y salsa inglesa. Cobertura: cacao en polvo",
    precio: 4200,
    img: "./img/tiramisu.jpg",
  },
  {
    id: 6,
    nombre: "Toffi",
    desc: "Base de masa frola de chocolate con castañas de cajú y dulce de leche. Cobertura: ganache y rulos de chocolate",
    precio: 4200,
    img: "./img/toffi.jpg",
  },
];

verProductos(productos);

//Verifica storage
let carrito = verificarCarrito();
