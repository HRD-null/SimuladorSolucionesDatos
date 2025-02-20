'use strict';

// 1. Declaración de variables, constantes y arrays
let userName = "";
let userEmail = "";
let userPhone = "";
const MAX_COLLABORATORS = 10;
let collaboratorsData = [];

/**
 * Función principal que se ejecuta al dar clic en el botón.
 * Llama a otras funciones que piden datos del usuario, colaboradores y almacenan la información.
 */
function init() {
  gatherUserData();       // Función 1
  askForCollaborators();  // Función 2
  storeData();            // Función 3
}

/**
 * Función 1: Recopila datos del usuario (nombre, email, teléfono) usando prompt.
 * Valida que el teléfono tenga 10 dígitos. Utiliza alert para retroalimentación.
 */
function gatherUserData() {
  alert("¡Bienvenido/a al simulador de DataFrom!\nPor favor, completa la siguiente información.");

  // Pedir nombre
  userName = prompt("¿Cuál es tu nombre?");
  while (!userName) {
    alert("El nombre no puede estar vacío. Inténtalo de nuevo.");
    userName = prompt("¿Cuál es tu nombre?");
  }

  // Pedir correo
  userEmail = prompt("¿Cuál es tu correo electrónico?");
  while (!userEmail) {
    alert("El correo electrónico no puede estar vacío. Inténtalo de nuevo.");
    userEmail = prompt("¿Cuál es tu correo electrónico?");
  }

  // Pedir teléfono y validar
  userPhone = prompt("¿Cuál es tu número de teléfono? (10 dígitos)");
  while (!validatePhone(userPhone)) {
    alert("El teléfono debe tener 10 dígitos numéricos. Inténtalo de nuevo.");
    userPhone = prompt("¿Cuál es tu número de teléfono? (10 dígitos)");
  }

  alert(
    "Gracias por tus datos, " + userName + ".\n" +
    "Tu correo: " + userEmail + "\n" +
    "Tu teléfono: " + userPhone
  );
}

/**
 * Función auxiliar para validar el teléfono:
 * Verifica que tenga exactamente 10 caracteres y que sean dígitos.
 */
function validatePhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

/**
 * Función 2: Pregunta si se desean invitar colaboradores.
 * - Si sí, pide cuántos.
 * - Valida que sea un número entero.
 * - Si es mayor a 10, se muestra un mensaje especial.
 * - Si es <= 10, se piden los datos de cada colaborador y se almacenan en un array.
 */
function askForCollaborators() {
  let wantsCollaborators = confirm("¿Deseas invitar más colaboradores a la llamada?");
  
  if (wantsCollaborators) {
    let numberOfCollaborators = prompt("¿Cuántos colaboradores deseas invitar?");

    // Validar número entero
    while (!validateInteger(numberOfCollaborators)) {
      alert("Por favor ingresa un número entero válido.");
      numberOfCollaborators = prompt("¿Cuántos colaboradores deseas invitar?");
    }

    numberOfCollaborators = parseInt(numberOfCollaborators);

    if (numberOfCollaborators > MAX_COLLABORATORS) {
      alert(
        "Al ser un volumen alto de colaboradores (" + numberOfCollaborators + 
        "), te recomendamos una sesión presencial.\n" +
        "Te contactaremos con los datos que nos proporcionaste."
      );
    } else {
      // Solicitar datos de cada colaborador
      for (let i = 1; i <= numberOfCollaborators; i++) {
        let collaboratorName = prompt("Ingresa el nombre del colaborador " + i + ":");
        while (!collaboratorName) {
          alert("El nombre no puede estar vacío. Inténtalo de nuevo.");
          collaboratorName = prompt("Ingresa el nombre del colaborador " + i + ":");
        }

        let collaboratorEmail = prompt("Ingresa el correo electrónico del colaborador " + i + ":");
        while (!collaboratorEmail) {
          alert("El correo electrónico no puede estar vacío. Inténtalo de nuevo.");
          collaboratorEmail = prompt("Ingresa el correo electrónico del colaborador " + i + ":");
        }

        // Guardar en el array de colaboradores
        collaboratorsData.push({
          name: collaboratorName,
          email: collaboratorEmail
        });
      }

      alert("¡Gracias! Se han registrado los datos de tus colaboradores.");
    }
  } else {
    alert("Perfecto. No se invitarán colaboradores adicionales.");
  }
}

/**
 * Función auxiliar para validar si un valor es un número entero.
 */
function validateInteger(value) {
  const intRegex = /^-?\d+$/;
  return intRegex.test(value);
}

/**
 * Función 3: Simula el almacenamiento de datos en un archivo .txt.
 * Para fines prácticos, lo mostramos en la consola.
 */
function storeData() {
  console.log("=== Simulación de guardado en archivo .txt ===");
  console.log("Nombre del usuario:", userName);
  console.log("Email del usuario:", userEmail);
  console.log("Teléfono del usuario:", userPhone);
  console.log("Colaboradores:", collaboratorsData);
  console.log("==============================================");

  alert(
    "Tu información ha sido registrada.\n" +
    "¡Gracias por tu interés en DataFrom!"
  );
}

// Escuchamos el clic en el botón para iniciar la simulación
document.getElementById("infoBtn").addEventListener("click", init);
