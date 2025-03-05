import { searchProfessorsByKey, loadProfessors } from "../features/professorsDisplayLogic.js";
import { getCoursesKey } from "../dbutils.js";
import { professorsListEl } from "../preload.js";
export const coursesKeys = await getCoursesKey();


const courseKeyResultsBox = document.getElementById('course-key-result-box');
const courseKeyInputBox = document.getElementById('course-key-input-box');


courseKeyInputBox.onkeyup = function() {
  let courseKeyResult = [];
  let courseKeyInput = courseKeyInputBox.value;

  if (courseKeyInput.length) {
    courseKeyResult = Object.keys(coursesKeys).filter((keyword) => {
      return keyword.toLocaleLowerCase().includes(courseKeyInput.toLowerCase());
    });
  } else {
    loadProfessors();
  }
  courseKeyDisplay(courseKeyResult)

  if (!courseKeyResult.length) {
    courseKeyResultsBox.innerHTML = '';
  }
}

function courseKeyDisplay(courseKeyResult) {
  const courseKeyContent = courseKeyResult.map((courseKey) => {
    return "<li class='course-key list-none rounded-sm py-3.5 px-2.5 cursor-pointer hover:bg-blue-100'>" + courseKey + "</li>";
  });

  courseKeyResultsBox.innerHTML = "<ul class='border-t border-gray-300 py-3.5 px-2.5'>" + courseKeyContent.join('') + "</ul>"

  document.querySelectorAll('.course-key').forEach((course) => {
    course.addEventListener('click', function() {
      courseKeySelectInput(this);
    });
  })
}

function courseKeySelectInput(courseKeyContent) {
  courseKeyInputBox.value = courseKeyContent.innerHTML;
  courseKeyResultsBox.innerHTML = '';

  displayCourseKeyProfessors(courseKeyContent.innerHTML);
}

export function displayCourseKeyProfessors(course) {
  professorsListEl.innerHTML = '';

  searchProfessorsByKey(course);
};
