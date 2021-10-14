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

function guardarProducto(e) {
  e.preventDefault();
  //verificar que pase todas las validaciones
  if (validarGeneral()) {
    //tengo que crear el producto
    console.log("aqui creo el producto");
    agregarProducto();
  } else {
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
  //TAREA: RESETEAR  LAS CLASES DEL RESTO DE LOS INPUTS
}

function cargarInicial() {
  //traer los productos del localstorage si existieran sino dejar el arreglo vacio
  listaProductos = JSON.parse(localStorage.getItem("arregloProductos")) || [];


  //si hay productos dentros del arreglo entonces lo muestra en la tabla
  listaProductos.forEach((itemProducto)=>{
//codigo que se ejecuta por cada elemento del arreglo
crearFilas(itemProducto);
  });
  
}

function crearFilas(itemProducto) {
  let tabla = document.querySelector("#tablaProducto");
  console.log(itemProducto)
  tabla.innerHTML += `
<tr>
  <th scope="row">${itemProducto.codigo}</th>
  <td>${itemProducto.nombre}</td>
  <td>${itemProducto.descripcion}</td>
  <td>${itemProducto.cantidad}</td>
  <td>${itemProducto.url}</td>
  <td>
    <button class="btn btn-warning">Editar</button>
    <button class="btn btn-danger">Borrar</button>
  </td>
</tr>
  `
}
