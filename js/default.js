const Serializable = require('jsclass-serializer');
var $ = require( "jquery" );

let chileLocale= Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP'
});
class Producto extends Serializable {
  id;
  nombre;
  precio;  
  cantidad; 
  constructor(id, nombre, precio, cantidad) {
    super();
    this.id = Number(id);
    this.nombre = nombre;
    this.precio = Number(precio);
    this.cantidad = Number(cantidad);

  }
  get id() {
    return this.id;
  }
  get nombre() {
    return this.nombre;
  }
  get precio() {
    return this.precio;
  }
  get cantidad() {
    return this.cantidad;
  }
  set nombre(nombre) {
    this.nombre = nombre;
  }
  set precio(precio) {
    this.precio = Number(precio);
  }
  set cantidad(cantidad) {
    this.cantidad = Number(cantidad);
  }

}

//todo juntar cuando se suman las cantidades
class Carrito extends Serializable {
  productos;
  total;
  constructor() {
    super();
    this.productos = [];
    this.total = 0;
  }
  addProducto(Producto) {
    for(let i = 0; i < this.productos.length; i++) {
      if(this.productos[i].id === Producto.id) {
        this.productos[i].cantidad += Producto.cantidad;
        this.total += Producto.precio*Producto.cantidad;
        updatePrecios();
        return;
      }  
    } 

    this.productos.push(Producto);
    this.total += Producto.precio*Producto.cantidad;
    updatePrecios();
  }
  nCantidades() {
    let cantidades = 0;
    for (let i = 0; i < this.productos.length; i++) {
      cantidades += this.productos[i].cantidad;
    }
    return cantidades;
  }
  getProductos() {
    return this.productos;
  }
  addProductos(productos) {
    for(let i = 0; i < productos.length; i++) {
      console.log(productos[i]);
      this.addProducto(productos[i]);
    }
  }
  getTotal() {
    return chileLocale.format(this.total);
  }
}

function agregar(e) {
  let id= e.target.id.value;
  let nombre= e.target.nombre.value;
  let precio= e.target.precio.value;
  let cantidad= e.target.cantidad.value;
  let producto = new Producto(id, nombre, precio, cantidad);
  

  carrito.addProducto(producto);
  //!PRUEBA SERELIAZABLE
  localStorage.setItem("carrito", Serializable.serialize(carrito)); //!
  openCart();
  e.preventDefault();
}

//todo JSON y Storage!!!
//!EventListener Forms
const formVainilla = $("#formVainilla");
const formChocolate = $("#formChocolate");
const formFrutilla = $("#formFrutilla");

formVainilla.on("submit", agregar);
formChocolate.on("submit", agregar);
formFrutilla.on("submit", agregar);







function updatePrecios(){
  let productos = carrito.getProductos();
  let total = 0;
  for (let i = 0; i < productos.length; i++) {
    total += productos[i].precio*productos[i].cantidad;
  }
  // document.getElementById("cart-total").innerHTML = chileLocale.format(total);
  $("#cart-total").html(chileLocale.format(total));
}


//Al ejecutarse elimina el producto del carrito
function deleteProduct(id) {
  let productos = carrito.getProductos();
  for (let i = 0; i < productos.length; i++) {
    if(productos[i].id === id) {
      carrito.total -= productos[i].precio*productos[i].cantidad;
      carrito.productos.splice(i, 1);
      localStorage.setItem("carrito", Serializable.serialize(carrito));
      updatePrecios();
      openCart();
      return;
    }
  }
}



//Generar HTML de productos en Carrito
// const tbody = document.getElementById("cart-items");
function openCart() {
  let productos = carrito.getProductos();
  // let total = carrito.getTotal();
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
        <button class="btn btn-sm btn-danger" id="${'borrar'+productos[i].id}">
          <i class="fas fa-trash"></i>
          Eliminar
        </button>
      </td>
    </tr>`;
    
  }
  $("#cart-items").html(html); //! jQuery
  //Generar eventos de eliminar producto
  $(".btn-danger").each(function() {
    let targetButtons = $(this);
    targetButtons.on("click", function() {
      deleteProduct(trueId(targetButtons[0].id));
    })
  });
}

//Ya que la funcion deleteProduct no funciona con el id de los botones, se usa esta funcion para devolver el id correcto del boton
function trueId(id) {
  switch (id) {
    case 'borrar1':
      return 1;
    case 'borrar2':
      return 2;
    case 'borrar3':
      return 3;
    default:
      return ;
  }
}




let carrito = new Carrito();
if (localStorage.getItem("carrito")) {
  carrito = Serializable.deserialize(localStorage.getItem("carrito"));
  // console.log(carrito);
} else {
  localStorage.setItem("carrito", Serializable.serialize(carrito));
}


$("#hcupcake").on("click", function() {
  $("#hcupcake").fadeOut(600).fadeIn(600);
})

updatePrecios();
openCart();




//todo implementar boton eliminar todos los productos

