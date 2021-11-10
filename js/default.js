let chileLocale= Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP'
});
class Producto {
  #id;
  #nombre;
  #precio;  
  #cantidad; 
  constructor(id, nombre, precio, cantidad) {
    this.#id = Number(id);
    this.#nombre = nombre;
    this.#precio = Number(precio);
    this.#cantidad = Number(cantidad);
  }
  get id() {
    return this.#id;
  }
  get nombre() {
    return this.#nombre;
  }
  get precio() {
    return this.#precio;
  }
  get cantidad() {
    return this.#cantidad;
  }
  set nombre(nombre) {
    this.#nombre = nombre;
  }
  set precio(precio) {
    this.#precio = Number(precio);
  }
  set cantidad(cantidad) {
    this.#cantidad = Number(cantidad);
  }

}

//todo juntar cuando se suman las cantidades
class Carrito {
  #productos;
  #total;
  constructor() {
    this.#productos = [];
    this.#total = 0;
  }
  addProducto(Producto) {
    for(let i = 0; i < this.#productos.length; i++) {
      if(this.#productos[i].id === Producto.id) {
        this.#productos[i].cantidad += Producto.cantidad;
        this.#total += Producto.precio*Producto.cantidad;
        updatePrecios();
        return;
      }  
    } 
    this.#productos.push(Producto);
    this.#total += Producto.precio*Producto.cantidad;
    updatePrecios();
  }
  nCantidades() {
    let cantidades = 0;
    for (let i = 0; i < this.#productos.length; i++) {
      cantidades += this.#productos[i].cantidad;
    }
    return cantidades;
  }
  getProductos() {
    return this.#productos;
  }
  getTotal() {
    return chileLocale.format(this.#total);
  }
}

function agregar(form) {
  let id = form.id.value;
  let nombre = form.nombre.value;
  let precio = form.precio.value;
  let cantidad = form.cantidad.value;
  let producto = new Producto(id, nombre, precio, cantidad);
  carrito.addProducto(producto);
  openCart();
}

function updatePrecios(){
  let productos = carrito.getProductos();
  let total = 0;
  for (let i = 0; i < productos.length; i++) {
    total += productos[i].precio*productos[i].cantidad;
  }
  //document.getElementById("totall").innerHTML = chileLocale.format(total);
  document.getElementById("cart-total").innerHTML = chileLocale.format(total);

}




//Generar HTML de productos en Carrito
const tbody = document.getElementById("cart-items");
function openCart() {
  let productos = carrito.getProductos();
  let total = carrito.getTotal();
  let html = "";
  for (let i = 0; i < productos.length; i++) {
    let temp= chileLocale.format(productos[i].precio*productos[i].cantidad); //Conseguir precio total en formato pesos chilenos
    html += `
    <tr>
      <th>${productos[i].nombre}</th>
      <td>${productos[i].precio}</td>
      <td>${productos[i].cantidad}</td>
      <td>${temp}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${productos[i].id})">
          <i class="fas fa-trash"></i>
          Eliminar
        </button>
      </td>
    </tr>`;
  }
  tbody.innerHTML = html;
}


let carrito = new Carrito();
updatePrecios();
openCart();



//todo Agrupar las ordenes del mismo producto en el mismo lugar del array
//todo Tambien implementar boton eliminar 1 item del producto
// lo anterior tambien sirve para subir desafio complementario cap 6

//todo Implementar actionlistener para los botones
// sirve para desafio cap 9
