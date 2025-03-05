import { coursesKeys } from "../components/courseKeyAutocomplete.js";

const addCourseBtn = document.getElementById('add-course')

const materias = Object.keys(coursesKeys);

const materiaInput = document.getElementById("materiaInput");
const materiasList = document.getElementById("materiasList");
const materiasSeleccionadas = document.getElementById("materiasSeleccionadas");

// Llenar el datalist para autocompletar
materias.forEach(materia => {
  let option = document.createElement("option");
  option.value = materia;
  materiasList.appendChild(option);
});

function agregarMateria() {
  const materia = materiaInput.value;
  if (materia && materias.includes(materia)) {
      // Evitar duplicados
      if (!document.getElementById(`check-${materia}`)) {
          let div = document.createElement("div");
          div.innerHTML = `
              <input type="checkbox" id="check-${materia}" name="materias" value="${materia}" checked>
              <label for="check-${materia}">${materia}</label>
          `;
          materiasSeleccionadas.appendChild(div);
      }
      materiaInput.value = ""; // Limpiar input
  } else {
      alert("Selecciona una materia válida de la lista.");
  }
}

addCourseBtn.addEventListener('click', agregarMateria);