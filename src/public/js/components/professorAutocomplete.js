import { getProfessors } from "../dbutils.js";
import { showProfessorsById, loadProfessors } from "../features/professorsDisplayLogic.js";
import { removeAccents } from "../utils.js";
import { professorsListEl, professorResultsBox, professorInputBox } from "../preload.js"

const professors = await getProfessors();
export const addProfessorBox = document.getElementById('add-professor');

professorInputBox.onkeyup = function() {
  let professorResult = [];
  let professorInput = professorInputBox.value;

  if (professorInput.length) {
    professorResult = Object.entries(professors).filter((professor) => {
      return removeAccents(professor[1].name).includes(removeAccents(professorInput));
    });
  }

  professorDisplay(professorResult)

  if (!professorResult.length) {
    if (professorInput.length) {
      professorResultsBox.innerHTML = "<ul class='border-t border-gray-300 py-3.5 px-2.5'><li id='adding-professor' class='list-none rounded-sm py-3.5 px-2.5 cursor-pointer hover:bg-blue-100'>Agregar profesor</li></ul>";
      document.getElementById('adding-professor').addEventListener('click', function() {
        addProfessor();
      })
    } else {
      professorResultsBox.innerHTML = '';
      loadProfessors();
    }
  }
}

function professorDisplay(result) {
  const professorContent = result.map((professor) => {
    return `<li id=${professor[0]} class='professor list-none rounded-sm py-3.5 px-2.5 cursor-pointer hover:bg-blue-100'>` + professor[1].name + "</li>";
  });
  
  professorResultsBox.classList.remove('hidden');
  professorsListEl.classList.remove('hidden');
  addProfessorBox.classList.add("hidden");
  professorResultsBox.innerHTML = "<ul class='border-t border-gray-300 py-3.5 px-2.5'>" + professorContent.join('') + "</ul>"

  document.querySelectorAll('.professor').forEach((professor) => {
    professor.addEventListener('click', function() {
      professorSelectInput(this);
    })
  })
}

function professorSelectInput(professor) {
  professorInputBox.value = professor.innerHTML;
  professorResultsBox.innerHTML = '';

  const professorId = professor.id;
  showProfessorsById([professorId]);
}

function addProfessor() {
  professorInputBox.value = "Agregando profesor...";
  professorResultsBox.innerHTML = '';
  professorResultsBox.classList.add('hidden');
  professorsListEl.classList.add('hidden');
  addProfessorBox.classList.remove('hidden');
}