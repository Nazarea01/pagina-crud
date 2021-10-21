import { ValidarCodigo } from "./validaciones.js";
import { ValidarCampoRequerido } from "./validaciones.js";
import { validarNumeros } from "./validaciones.js";
import { validarURL } from "./validaciones.js";
import { validarGeneral } from "./validaciones.js";
import { Producto } from "./productoClass.js";

//traer los input/textarea
let codigo = document.querySelector("#codigo");
let cantidad = document.querySelector("#cantidad");
let url = document.querySelector("#url");
let producto = document.querySelector("#producto");
let descripcion = document.querySelector("#descripcion");
let formulario = document.querySelector("#formProducto");

let listaProductos = [];
let productoExistente = false; //si es falce significa que tengo que agregar un nuevo producto
//true significa que tengo que modificar un producto existente
let btnNuevoProducto = document.querySelector("#btnNuevoProducto");

cargarInicial();
//le agregamos el evento

codigo.addEventListener("blur", () => {
  ValidarCodigo(codigo);
});

/* console.log("codigo"); */

cantidad.addEventListener("blur", () => {
  validarNumeros(cantidad);
});

url.addEventListener("blur", () => {
  validarURL(url);
});
producto.addEventListener("blur", () => {
  ValidarCampoRequerido(producto);
});
descripcion.addEventListener("blur", () => {
  ValidarCampoRequerido(descripcion);
});

formulario.addEventListener("submit", guardarProducto);
btnNuevoProducto.addEventListener("click", limpiarFormulario);

function guardarProducto(e) {
  e.preventDefault();
  //verificar que pase todas las validaciones
  if (validarGeneral())
    if (productoExistente === false) {
      //aqui pregunto cual es el estado de mi variable productoExistente
      //tengo que crer el producto
      console.log("aqui creo el producto");
      agregarProducto();
    } else {
      //tengo que modidifcar un producto
      console.log("aqui quiero ,modificar el producto");
      actualizarProducto();
    }
  else {
    //aqui no hacemos nada
    console.log("no deberia hacer nada");
  }
}

function agregarProducto() {
  // crear un objeto Producto
  let productoNuevo = new Producto(
    codigo.value,
    producto.value,
    descripcion.value,
    cantidad.value,
    url.value
  );
  console.log(productoNuevo);
  // cargar el producto del arreglo
  listaProductos.push(productoNuevo);
  console.log(listaProductos);

  //al arrglo de productos lo almaceno en localstore
  localStorage.setItem("arregloProducto", JSON.stringify(listaProductos));

  //limpiar formulario
  limpiarFormulario();
  //cargar el producto nuevo en la fila de la tabla
  crearFilas(productoNuevo);

  //mostrar un mensaje al usuario

  //mostrar el objeto en una tabla
}

function limpiarFormulario() {
  //limpia los value de mis input
  formulario.reset();
  //limpiar los estilos
  codigo.classname = "form-control";
  cantidad.classname = "form-control";
  url.classname = "form-control";
  producto.classname = "form-control";
  descripcion.classname = "form-control";
  //resetear el valor de la variable booleana
  productoExistente = false;
}

function cargarInicial() {
  //traer los productos del localstorage si existieran sino dejar el arreglo vacio
  listaProductos = JSON.parse(localStorage.getItem("arregloProducto")) || [];

  //si hay productos dentros del arreglo entonces lo muestra en la tabla
  listaProductos.forEach((itemProducto) => {
    //codigo que se ejecuta por cada elemento del arreglo
    crearFilas(itemProducto);
  });
}

function crearFilas(itemProducto) {
  let tabla = document.querySelector("#tablaProducto");
  console.log(itemProducto);
  tabla.innerHTML += `
<tr>
  <th scope="row">${itemProducto.codigo}</th>
  <td>${itemProducto.nombre}</td>
  <td>${itemProducto.descripcion}</td>
  <td>${itemProducto.cantidad}</td>
  <td>${itemProducto.url}</td>
  <td>
    <button class="btn btn-warning" onclick="prepararEdicion('${itemProducto.codigo}')">Editar</button>
    <button class="btn btn-danger"  onclick="eliminarProducto('${itemProducto.codigo}')">Borrar</button>
  </td>
</tr>
  `;
}
// window es un objeto global de js,en este caso nos sirve para llegar desde html al js porque el scrip es modulo
window.prepararEdicion = (codigoProducto) => {
  console.log(codigoProducto);
  //BUSCAR EL OBJETO

  let productoBuscando = listaProductos.find((itemProducto) => {
    return itemProducto.codigo == codigoProducto;
  });
  console.log(productoBuscando);
  //MOSTRARLO EN EL FORMULARIO
  codigo.value = productoBuscando.codigo;
  cantidad.value = productoBuscando.cantidad;
  descripcion.value = productoBuscando.descripcion;
  url.value = productoBuscando.url;
  producto.value = productoBuscando.producto;
  //cambio el valor de lavariable productoExistente
  productoExistente = true;
};

function actualizarProducto() {
  //buscar la posicion del elemento a editar dentro del arreglo
  let posicionProducto = listaProductos.findIndex((itemProducto) => {
    return itemProducto.codigo == codigo.value;
  });
  console.log(posicionProducto);
  //modificar los datos de esa posicion del arreglo
  listaProductos[posicionProducto].nombre = producto.value;
  listaProductos[posicionProducto].cantidad = cantidad.value;
  listaProductos[posicionProducto].descripcion = descripcion.value;
  listaProductos[posicionProducto].url = url.value;

  //modificar el localstorage
  localStorage.setItem("arregloProductos", JSON.stringify(listaProductos));
  //volver a dibujar la tabla
  borrarFilas();
}

function borrarFilas() {
  let tabla = document.querySelector("#tablaProducto");
  tabla.innerHTML = "";
  listaProductos.forEach((itemProducto) => {
    crearFilas(itemProducto);
  });
}

window.eliminarProducto = (codigo) => {
  console.log(codigo);
  //aqui borramos el producto dentro del arreglo
  let productosFiltrado = listaProductos.filtrar((itemProducto) => {
    return itemProducto.codigo != codigo;
  });
  console.log(productosFiltrados);
  //actualizar el arreglo listaProducto
  listaProductos = productosFiltrado;
  //actualizar el localStorange
  localStorage.setItem("arregloProductos", JSON.stringify(listaProductos));
  //dibujar la tabla
  borrarFilas();
  listaProductos.forEach((itemProducto) => {
    crearFilas();
  });
};
