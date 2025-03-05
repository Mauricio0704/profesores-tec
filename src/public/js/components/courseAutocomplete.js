import { loadProfessors } from "../features/professorsDisplayLogic.js";
import { coursesKeys, displayCourseKeyProfessors } from "./courseKeyAutocomplete.js";
import { removeAccents } from "../utils.js";

const courseResultsBox = document.getElementById('course-result-box');
const courseInputBox = document.getElementById('course-input-box');

courseInputBox.onkeyup = function() {
  let courseResult = [];
  let courseInput = courseInputBox.value;

  if (courseInput.length) {
    courseResult = Object.entries(coursesKeys).filter((course) => {
      return removeAccents(course[1].name).includes(removeAccents(courseInput));
    });
  } else {
    loadProfessors();
  }
  courseDisplay(courseResult)

  if (!courseResult.length) {
    courseResultsBox.innerHTML = '';
  }
}

function courseDisplay(result) {
  const courseContent = result.map((course) => {
    return `<li id=${course[0]} class='course list-none rounded-sm py-3.5 px-2.5 cursor-pointer hover:bg-blue-100'>` + course[1].name + "</li>";
  });

  courseResultsBox.innerHTML = "<ul class='border-t border-gray-300 py-3.5 px-2.5'>" + courseContent.join('') + "</ul>"

  document.querySelectorAll('.course').forEach((course) => {
    course.addEventListener('click', function() {
      courseSelectInput(this);
    })
  })
}

function courseSelectInput(course) {
  courseInputBox.value = course.innerHTML;
  courseResultsBox.innerHTML = '';

  const courseId = course.id;
  displayCourseKeyProfessors(courseId);
}