let cOrdenes=0;
class Producto {
  #id;
  #nombre;
  #precio;  
  #cantidad; 
  constructor(nombre, precio, cantidad) {
    this.#id = cOrdenes+1;
    this.#nombre = nombre;
    this.#precio = Number(precio);
    this.#cantidad = Number(cantidad);
    cOrdenes++;
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

class Carrito {
  #productos;
  #total;
  constructor() {
    this.#productos = [];
    this.#total = 0;
  }
  addProducto(Producto) {
    this.#productos.push(Producto);
    this.#total += Producto.precio*Producto.cantidad;
    document.getElementById("totall").innerHTML = this.#total;
  }
  getProductos() {
    return this.#productos;
  }
  getTotal() {
    return this.#total;
  }
}

function agregar(form) {
  let nombre = form.nombre.value;
  let precio = form.precio.value;
  let cantidad = form.cantidad.value;
  let producto = new Producto(nombre, precio, cantidad);
  carrito.addProducto(producto);
}


let carrito = new Carrito();
document.getElementById("totall").innerHTML = carrito.getTotal();