// EVENTOS: onBLUR PERDER EL FOCO

export function ValidarCampoRequerido(input) {
  console.log(input);
  if (input.value.trim().length > 0) {
    console.log("el dato es correcto");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("correrir el dato");
    input.className = "form-control is-invalid";
    return false;
  }
}

export function ValidarCodigo(input) {
  //console.log(input);
  if (input.value.trim() != "" && input.value.trim().length >= 3) {
    //console.log("el dato es correcto");
    input.className = "form-control is-valid";
    return true;
  } else {
    //console.log("correrir el dato");
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarNumeros(input) {
  //creamos la expresion regular
  let patron = /^[0-9]{1,3}$/;
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarURL(input) {
  //crear una expresion regular
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (input.value.trim() != "" && patron.test(input.value.trim())) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarGeneral() {
  //previene que recargue la pagina web

  //console.log("desde la funcion validar general");
  let alerta = document.querySelector("#msjAlerta");
  if (
    ValidarCodigo(codigo) &&
    ValidarCampoRequerido(producto) &&
    ValidarCampoRequerido(descripcion) &&
    validarNumeros(cantidad) &&
    validarURL(url)
  ) {
    console.log("aqui tengo que crear el producto");
    alerta.className = "alert alert-danger mt-4 d-none";
    return true;
  } else {
    console.log("corregir datos");
    //aqui mostrar el alert del html
    alerta.className = "alert alert-danger mt-4 d-none";
    return false;
  }
}
let codigo = document.querySelector("#codigo");
let cantidad = document.querySelector("#cantidad");
let url = document.querySelector("#url");
let producto = document.querySelector("#producto");
let descripcion = document.querySelector("#descripcion");