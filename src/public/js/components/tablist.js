import { sortingProperties, loadProfessors } from "../features/professorsDisplayLogic.js";

const showByBest = document.getElementById('show-by-best');
const showByEasiness = document.getElementById('show-by-easiness');

const activeClasses = ['border-blue-200', 'bg-blue-100', 'text-gray-700', 'font-semibold']
const inactiveClasses = ['border-gray-200', 'text-gray-400']

showByBest.addEventListener('click', function() {
  showByBest.classList.remove(...inactiveClasses);
  showByBest.classList.add(...activeClasses);

  showByEasiness.classList.remove(...activeClasses);
  showByEasiness.classList.add(...inactiveClasses);

  sortingProperties.sortedByBest = true;
  sortingProperties.sortedByEasiness = false;
  loadProfessors(1, true, false); 
});

showByEasiness.addEventListener('click', function() {
  showByEasiness.classList.remove(...inactiveClasses);
  showByEasiness.classList.add(...activeClasses);

  showByBest.classList.remove(...activeClasses);
  showByBest.classList.add(...inactiveClasses);

  sortingProperties.sortedByBest = false;
  sortingProperties.sortedByEasiness = true;
  loadProfessors(1, false, true)
});