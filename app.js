'use strict';

// 1. Declaración de variables, constantes y arrays
let userName = "";
let userEmail = "";
let userPhone = "";
const MAX_COLLABORATORS = 10;
let collaboratorsData = [];

/**
 * Función auxiliar que envuelve al prompt.
 * Si el usuario cancela (retorna null), se pregunta:
 * "¿Deseas cancelar el registro?"
 * Si confirma, se retorna null; si no, se re-pregunta.
 */
function customPrompt(message) {
  while (true) {
    let value = prompt(message);
    if (value === null) {
      if (confirm("¿Deseas cancelar el registro?")) {
        return null;
      } else {
        // Si decide no cancelar, se reintenta el prompt.
        continue;
      }
    }
    return value;
  }
}

/**
 * Función principal que se ejecuta al dar clic en el botón.
 * Llama a otras funciones que piden datos del usuario, colaboradores y almacenan la información.
 * Si en cualquier etapa se cancela el registro, se detiene el proceso.
 */
function init() {
  if (!gatherUserData()) return;       // Si se cancela la recolección de datos, se detiene.
  if (!askForCollaborators()) return;    // Si se cancela en la sección de colaboradores, se detiene.
  storeData();                         // Sólo se almacena si todo fue completado.
}

/**
 * Función 1: Recopila datos del usuario (nombre, email, teléfono) usando customPrompt.
 * Valida que el teléfono tenga 10 dígitos. Si en algún prompt se cancela y se confirma, se detiene el proceso.
 */
function gatherUserData() {
  alert("¡Bienvenido/a al simulador de DataFrom!\nPor favor, completa la siguiente información.");

  // Pedir nombre
  userName = customPrompt("¿Cuál es tu nombre?");
  if (userName === null) {
    alert("Registro cancelado.");
    return false;
  }
  while (userName.trim() === "") {
    alert("El nombre no puede estar vacío. Inténtalo de nuevo.");
    userName = customPrompt("¿Cuál es tu nombre?");
    if (userName === null) {
      alert("Registro cancelado.");
      return false;
    }
  }

  // Pedir correo
  userEmail = customPrompt("¿Cuál es tu correo electrónico?");
  if (userEmail === null) {
    alert("Registro cancelado.");
    return false;
  }
  while (userEmail.trim() === "") {
    alert("El correo electrónico no puede estar vacío. Inténtalo de nuevo.");
    userEmail = customPrompt("¿Cuál es tu correo electrónico?");
    if (userEmail === null) {
      alert("Registro cancelado.");
      return false;
    }
  }

  // Pedir teléfono y validar
  userPhone = customPrompt("¿Cuál es tu número de teléfono? (10 dígitos)");
  if (userPhone === null) {
    alert("Registro cancelado.");
    return false;
  }
  while (!validatePhone(userPhone)) {
    alert("El teléfono debe tener 10 dígitos numéricos. Inténtalo de nuevo.");
    userPhone = customPrompt("¿Cuál es tu número de teléfono? (10 dígitos)");
    if (userPhone === null) {
      alert("Registro cancelado.");
      return false;
    }
  }

  alert(
    "Gracias por tus datos, " + userName + ".\n" +
    "Tu correo: " + userEmail + "\n" +
    "Tu teléfono: " + userPhone
  );
  return true;
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
 * - Si el usuario acepta, se le pregunta cuántos y se solicitan los datos usando customPrompt.
 * - En cada paso se verifica si se pulsa cancelar y se confirma.
 */
function askForCollaborators() {
  let wantsCollaborators = confirm("¿Deseas invitar más colaboradores a la llamada?");
  
  if (wantsCollaborators) {
    let numberOfCollaborators = customPrompt("¿Cuántos colaboradores deseas invitar?");
    if (numberOfCollaborators === null) {
      alert("Registro cancelado.");
      return false;
    }
    while (!validateInteger(numberOfCollaborators)) {
      alert("Por favor ingresa un número entero válido.");
      numberOfCollaborators = customPrompt("¿Cuántos colaboradores deseas invitar?");
      if (numberOfCollaborators === null) {
        alert("Registro cancelado.");
        return false;
      }
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
        let collaboratorName = customPrompt("Ingresa el nombre del colaborador " + i + ":");
        if (collaboratorName === null) {
          alert("Registro cancelado.");
          return false;
        }
        while (collaboratorName.trim() === "") {
          alert("El nombre no puede estar vacío. Inténtalo de nuevo.");
          collaboratorName = customPrompt("Ingresa el nombre del colaborador " + i + ":");
          if (collaboratorName === null) {
            alert("Registro cancelado.");
            return false;
          }
        }

        let collaboratorEmail = customPrompt("Ingresa el correo electrónico del colaborador " + i + ":");
        if (collaboratorEmail === null) {
          alert("Registro cancelado.");
          return false;
        }
        while (collaboratorEmail.trim() === "") {
          alert("El correo electrónico no puede estar vacío. Inténtalo de nuevo.");
          collaboratorEmail = customPrompt("Ingresa el correo electrónico del colaborador " + i + ":");
          if (collaboratorEmail === null) {
            alert("Registro cancelado.");
            return false;
          }
        }

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
  return true;
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
