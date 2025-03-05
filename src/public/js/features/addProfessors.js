import { db, get, set, ref, push, child, query, orderByChild, orderByKey, orderByValue, limitToFirst, limitToLast, endAt, startAt, endBefore } from "../../firebase.js"
import { round } from "../utils.js";
import { loadProfessors } from "./professorsDisplayLogic.js";
import { professorsListEl, professorResultsBox } from "../preload.js";

document.getElementById("submit-btn").addEventListener("click", function(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const materiasSeleccionadasArray = [];
  document.querySelectorAll('input[name="materias"]:checked').forEach((checkbox) => {
      materiasSeleccionadasArray.push(checkbox.value);
  });

  if (materiasSeleccionadasArray.length === 0) {
      alert("Selecciona al menos una materia.");
      return;
  }
  const comentario = document.getElementById("comentario").value;
  const facilidad = document.getElementById("facilidad").value;
  const enseñanza = document.getElementById("enseñanza").value;
  const calif = document.getElementById("calif").value;
  const subject = {};
  
  let newProfessorKey = push(child(ref(db), 'professors')).key;

  for (const id in materiasSeleccionadasArray) {
    subject[materiasSeleccionadasArray[id]] = true;
    const updates = {};
    updates[' /courses/' + materiasSeleccionadasArray[id] + '/professors'] =  
    set(ref(db, '/courses/' + materiasSeleccionadasArray[id] + '/professors/' + newProfessorKey), true)
  }

  const newProfessor = {
    "name": nombre,
    "subject": subject,
    "comment": comentario,
    "ratings": {
      "easiness": Number(facilidad),
      "teaching": Number(enseñanza),
      "grading": Number(calif),
      "overall": round((Number(facilidad) + Number(enseñanza) + Number(calif)) / 3, 1)
    }
  }

  set(ref(db, 'professors/' + newProfessorKey), newProfessor);

  document.getElementById("reviewForm").reset();

  document.getElementById('add-professor').classList.add('hidden');
  professorResultsBox.classList.remove('hidden');
  professorsListEl.classList.remove('hidden');
  loadProfessors();
});