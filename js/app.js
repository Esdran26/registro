//Variables
const formulario = document.getElementById("formulario");
let inputContraseña = document.getElementById("input-contraseña");
let inputVerificarContraseña = document.getElementById("input-confirmar-contraseña");
const botonRegistrar = document.getElementById("input-submit");
const botonPagina = document.getElementById("a-pagina");
const submitDiv = document.querySelector(".submit");
const botonMostrarContraseña = document.querySelector(".fa-eye-slash");
const botonOcultarContraseña = document.querySelector(".fa-eye");

//Clases
class Validacion {
          agregarMensajeUsuario(mensaje, tipo) {
                    const labelUsuario = document.getElementById("label-usuario");

                    if(tipo === "Error") {
                              labelUsuario.style.fontSize = ".8rem";
                              labelUsuario.style.color = "red";
                              labelUsuario.classList.remove("Correcto");
                              labelUsuario.innerText = `${tipo}, ${mensaje}`;
                    }
                    else {
                              labelUsuario.style.fontSize = "1rem";
                              labelUsuario.style.color = "black";
                              labelUsuario.classList.add("Correcto");
                              labelUsuario.innerText = `${mensaje}`;
                    }
          }
          agregarMensajeEmail(mensaje, tipo) {
                    const labelEmail = document.getElementById("label-email");

                    if(tipo === "Error") {
                              labelEmail.style.fontSize = ".8rem";
                              labelEmail.style.color = "red";
                              labelEmail.classList.remove("Correcto");
                              labelEmail.innerText = `${tipo}, ${mensaje}`;
                    }
                    else {
                              labelEmail.style.fontSize = "1rem";
                              labelEmail.style.color = "black";
                              labelEmail.classList.add("Correcto");
                              labelEmail.innerText = `${mensaje}`;
                    }
          }
          agregarMensajeConstraseña(mensaje, tipo) {
                    const labelContraseña = document.getElementById("label-contraseña");
                    
                    if(tipo === "Error") {
                              labelContraseña.style.fontSize = ".8rem";
                              labelContraseña.style.color = "red";
                              labelContraseña.classList.remove("Correcto");
                              labelContraseña.innerText = `${tipo}, ${mensaje}`;
                    }
                    else {
                              labelContraseña.style.fontSize = "1rem";
                              labelContraseña.style.color = "black";
                              labelContraseña.classList.add("Correcto");
                              labelContraseña.innerText = `${mensaje}`;
                    }
          }
          agregarMensajeVerificarConstraseña(mensaje, tipo) {
                    const labelVerificarContraseña = document.getElementById("label-verificar-contraseña");
                    if(tipo === "Error") {
                              labelVerificarContraseña.style.fontSize = ".8rem";
                              labelVerificarContraseña.style.color = "red";
                              labelVerificarContraseña.classList.remove("Correcto");
                              labelVerificarContraseña.innerText = `${tipo}, ${mensaje}`;
                    }
                    else {
                              labelVerificarContraseña.style.fontSize = "1rem";
                              labelVerificarContraseña.style.color = "black";
                              labelVerificarContraseña.classList.add("Correcto");
                              labelVerificarContraseña.innerText = `${mensaje}`;
                    }
          }
}

//Event Listeners
formulario.addEventListener("submit", validarFormularioUsuario);
inputContraseña.addEventListener("keydown", validarFormularioContraseñaCaracteres);
inputVerificarContraseña.addEventListener("keydown", validarFormularioVefiricarContraseñaCaracteres);
botonMostrarContraseña.addEventListener("click", mostrarContraseña);
botonOcultarContraseña.addEventListener("click", ocultarContraseña);

//Funciones

//Función para vaildar el input de usuarios y resetear los labels de todo el formulario
//Se concatenó las demás funciones que requieren del event listener de submit
function validarFormularioUsuario(e) {
          e.preventDefault();
          let inputUsuario = document.querySelector("#input-usuario").value;

          //Creación del objeto
          const validarCampos = new Validacion();

          //Validando el campo de usuario
          if(inputUsuario === "" ) {
                    validarCampos.agregarMensajeUsuario("el campo de usuario no puede quedar vacío", "Error");
          }
          else if(isNaN(inputUsuario) === false) {
                    validarCampos.agregarMensajeUsuario("el campo de usuario no puede ser un número", "Error");
          }
          else {
                    validarCampos.agregarMensajeUsuario("Usuario: ", "Correcto");
          }

          //Formatear los datos y label
          setTimeout( function() {
                    formulario.reset();
                    validarCampos.agregarMensajeUsuario("Usuario: ", "Correcto");
                    validarCampos.agregarMensajeEmail("Correo Electrónico: ", "Correcto");
                    validarCampos.agregarMensajeConstraseña("Contraseña: ", "Correcto");
                    validarCampos.agregarMensajeVerificarConstraseña("Confirmar Contraseña: ", "Correcto");
          }, 3000);
          
          //Concatenar funciones
          validarFormularioEmail(validarCampos);
          validarFormularioContraseña(validarCampos);
          validarFormularioVerificarContraseña(validarCampos);
          comprobarConstraseñasIguales(validarCampos);

          //Si todos los registros son correctos, llevar a la página principal
          let contador = document.querySelectorAll(".Correcto");
          if(contador.length > 3) {
                    botonRegistrar.style.display = "none";
                    botonPagina.style.display = "grid";
                    let parrafoCompletado = document.createElement("p");
                    parrafoCompletado.textContent = "Se ha registrado correctamente";
                    parrafoCompletado.className = "parrafo-completado";
                    submitDiv.insertBefore(parrafoCompletado, botonPagina);

                    //Quitar el texto de completado luego de cierto tiempo de registro
                    setTimeout(function() {
                              parrafoCompletado.style.display = "none";
                    }, 3500);
                    
          }
}

//Función para validar el input de correo electrónico
function validarFormularioEmail(validarCampos) {
          let inputEmail = document.getElementById("input-email").value;
          let inputEmailVerificar = inputEmail.indexOf("@");

          //Validando el campo de correo
          if(inputEmail === "") {
                    validarCampos.agregarMensajeEmail("el campo de correo no puede quedar vacío", "Error");
          }
          else if(inputEmailVerificar > 1) {
                    validarCampos.agregarMensajeEmail("Correo Electrónico: ", "Correcto");
          }
          else if(isNaN(inputEmail) === false) {
                    validarCampos.agregarMensajeEmail("el campo de correo no puede ser un número", "Error");
          }
          else if(inputEmailVerificar < 0) {
                    validarCampos.agregarMensajeEmail("el campo de correo debe llevar el @", "Error");
          }
          else {
                    validarCampos.agregarMensajeEmail("en el campo de correo", "Error");
          }
}

//Función para validar el input de contraseña con el event listener de submit
function validarFormularioContraseña(validarCampos) {
          if(inputContraseña.value === "") {
                    validarCampos.agregarMensajeConstraseña("el campo de contraseña no debe quedar vacío", "Error");
          }
}

//Función para validar el input de confirmar contraseña con el event listener de submit
function validarFormularioVerificarContraseña(validarCampos) {
          if(inputVerificarContraseña.value === "") {
                    validarCampos.agregarMensajeVerificarConstraseña("el campo de confirmar contraseña no debe quedar vacío", "Error");
          }
}

//Función para validar si los inputs de tipo contraseña son iguales y son mayores de 6 caracteres
//También se valida que si es menor de 6 caracteres verificar si son iguales o no
function comprobarConstraseñasIguales(validarCampos) {
          if(inputContraseña.value != "" && inputVerificarContraseña.value != "") {
                    if(inputContraseña.value.length < 6 && inputVerificarContraseña.value.length < 6) {
                              if(inputContraseña.value === inputVerificarContraseña.value) {
                                        validarCampos.agregarMensajeVerificarConstraseña("el campo de confirmar contraseña debe ser mayor a 6 caracteres", "Error");
                                        validarCampos.agregarMensajeConstraseña("el campo de contraseña debe ser mayor a 6 caracteres", "Error");
                              }
                              else {
                                        validarCampos.agregarMensajeConstraseña("las contraseños no son iguales y deber ser mayor a 6 caracteres", "Error");
                                        validarCampos.agregarMensajeVerificarConstraseña("las contraseñas no son iguales y deber ser mayor a 6 caracteres", "Error");
                              }
                    }
                    else if(inputContraseña.value.length > 6 && inputVerificarContraseña.value.length > 6) {
                              if(inputContraseña.value === inputVerificarContraseña.value) {
                                        validarCampos.agregarMensajeConstraseña("Contraseña: ", "Correcto");
                                        validarCampos.agregarMensajeVerificarConstraseña("Confirmar Contraseña: ", "Correcto");
                              }
                              else {
                                        validarCampos.agregarMensajeConstraseña("las contraseños no son iguales", "Error");
                                        validarCampos.agregarMensajeVerificarConstraseña("las contraseñas no son iguales", "Error");
                              }
                    }
                    else {
                              validarCampos.agregarMensajeConstraseña("las contraseños no son iguales", "Error");
                              validarCampos.agregarMensajeVerificarConstraseña("las contraseñas no son iguales", "Error");
                    }
          }
}

////Función para validar el input de contraseña con el event listener de keydown
function validarFormularioContraseñaCaracteres() {
          //Objeto
          const validarCamposContraseña = new Validacion();

          //Validar si la contraseña es mayor o menor a 6 caracteres
          if(inputContraseña.value.length < 6 ) {
                    validarCamposContraseña.agregarMensajeConstraseña("el campo de contraseña debe ser mayor a 6 caracteres", "Error");
          }
          else {
                    validarCamposContraseña.agregarMensajeConstraseña("Contraseña: ", "Correcto");
          }
}

//Función para validar el input de confirmar contraseña con el event listener de keydown
function validarFormularioVefiricarContraseñaCaracteres() {
          //Objeto
          const validarCamposVerificarContraseña = new Validacion();

          //Validar si la contraseña es mayor o menor a 6 caracteres
          if(inputVerificarContraseña.value.length < 6 ) {
                    validarCamposVerificarContraseña.agregarMensajeVerificarConstraseña("el campo de confirmar contraseña debe ser mayor a 6 caracteres", "Error");
          }
          else {
                    validarCamposVerificarContraseña.agregarMensajeVerificarConstraseña("Confirmar Contraseña: ", "Correcto");
          }
}

//Función cuando se da click al icono se muestre el campo de constraseña
function mostrarContraseña() {
          botonMostrarContraseña.style.display = "none";
          botonOcultarContraseña.style.display = "block";
          inputContraseña.removeAttribute("type");
          inputVerificarContraseña.removeAttribute("type");
          inputContraseña.setAttribute("type", "text");
          inputVerificarContraseña.setAttribute("type", "text");
}

//Función cuando se da click al icono se muestre el campo de confirmar contraseña
function ocultarContraseña() {
          botonOcultarContraseña.style.display = "none";
          botonMostrarContraseña.style.display = "block";
          inputContraseña.removeAttribute("type");
          inputVerificarContraseña.removeAttribute("type");
          inputContraseña.setAttribute("type", "password");
          inputVerificarContraseña.setAttribute("type", "password");
}