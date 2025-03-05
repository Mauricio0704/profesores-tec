import { query, get, ref, set, orderByChild, orderByKey, orderByValue, limitToFirst, limitToLast, db, startAfter, endBefore } from "../../firebase.js";
import { professorsListEl, numberOfProfessors } from "../preload.js";
import { showMoreOf } from "./showMoreOfProfessor.js";

export const sortingProperties = {
  sortedByBest: true,
  sortedByEasiness: false
}

const professorsPerPage = 5;
let currentPage = 1;

export function searchProfessorsByKey(courseKey) {
  professorsListEl.innerHTML = '';

  get(ref(db, 'courses/' + courseKey)).then((snapshot) => {
    if (snapshot.exists()) {
      if ('professors' in snapshot.val()) {
        const professorsOfCourse = snapshot.val().professors;
      
        showProfessorsById(Object.keys(professorsOfCourse));
      } else {
        professorsListEl.innerHTML = 'No professors';
      }
    };
  });
};

export async function showProfessorsById(professorsIds, orderedByBest = false, orderedByEasiness = false) {
  professorsListEl.innerHTML = '';
  let orderedProfessorsIds;
  orderedProfessorsIds = professorsIds;

  for (const id in orderedProfessorsIds) {
    const snapshot = await get(ref(db, 'professors/' + orderedProfessorsIds[id]));
    const professorInfo = snapshot.val()
    appendProfessor(professorInfo, orderedProfessorsIds[id]);
  }


  professorsListEl.innerHTML += `
    <li>
      <div class="pr-2 pb-4 pt-6">
        <div class="flex pr-2 pl-6 text-sm justify-end items-center">
          <p id="from-to"></p>
          <button id="before-page" class="hover:cursor-pointer ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button id="next-page" class="hover:cursor-pointer ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </li>
    `

  document.querySelectorAll('.show-more').forEach((showMoreBtn) => {
    showMoreBtn.addEventListener('click', function() {
      showMoreOf(showMoreBtn)
    })
  })

  document.getElementById('next-page').addEventListener('click', function() { loadProfessors(currentPage + 1) });
  document.getElementById('before-page').addEventListener('click', function() { loadProfessors(currentPage - 1) });
  document.getElementById("from-to").innerHTML = `${professorsPerPage*(currentPage-1) + 1} - ${Math.min(numberOfProfessors, professorsPerPage*currentPage)} / ${numberOfProfessors}`;
}


function appendProfessor(professorInfo, professorId) {
  let professorScaleImage;
  
  if (Number(professorInfo.ratings.overall) < 3.3) {
    professorScaleImage = "conventional"
  } else if (Number(professorInfo.ratings.overall) < 6.7) {
    professorScaleImage = "solid";
  } else {
    professorScaleImage = "best";
  }
  const professorEl = `
    <li>
      <div class="pr-16 pb-4 border pt-4 rounded-lg flex justify-between">
        <div class="flex justify-start pr-2 pl-8 items-start">
          <div class="w-16 self-center"><img src="./assets/${professorScaleImage}.png" class="w-12"/></div>

          <div class="flex flex-col max-w-76 min-w-76">
            <div class="text-md mr-4">
              ${professorInfo.name}
            </div>
            <div class="text-xs overflow-y-hidden max-h-4">${Object.keys(professorInfo.subject).join(', ')}</div>
          </div>
          
          <div class="flex flex-col items-center px-6 ml-6">
            <div class="text-sm">${professorInfo.ratings.easiness}</div>
            <div class="text-xs">Facilidad</div>
          </div>
          
          <div class="flex flex-col items-center px-6">
            <div class="text-sm">${professorInfo.ratings.teaching}</div>
            <div class="text-xs">Enseñanza</div>
          </div>
          
          <div class="flex flex-col items-center px-6">
            <div class="text-sm">${professorInfo.ratings.grading}</div>
            <div class="text-xs">Calif.alumnos</div>
          </div>
          
          <div class="flex flex-col items-center px-6 ml-10">
            <div class="text-lg">${professorInfo.ratings.overall}</div>
            <div class="text-xs">General</div>
          </div>
        </div>
        <div class="self-center">
          <button class="show-more inactive hover:cursor-pointer" id="${professorId}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>

      <ul id="ratings-${professorId}"></ul>
    </li>
  `
  professorsListEl.innerHTML += professorEl;
};

let previousSmallerOverallResult;
let previousSmallerKey;
let previousBiggerOverallResult;
let previousBiggerKey;

export async function loadProfessors(pageToLoad = 1) {
  if (pageToLoad < 1 || professorsPerPage * (pageToLoad - 1) > numberOfProfessors) {
    return null;
  }

  let array = [];
  const professorsQuery = getQuery(pageToLoad, sortingProperties.sortedByBest, sortingProperties.sortedByEasiness)
  
  let first = true;

  const snapshot = await get(professorsQuery);
  
  snapshot.forEach(childSnapshot => {
    if (first) {
      previousSmallerKey = childSnapshot.key;
      previousSmallerOverallResult = childSnapshot.val().ratings.overall;
      first = false;
    }
    previousBiggerKey = childSnapshot.key;
    previousBiggerOverallResult = childSnapshot.val().ratings.overall;

    array.push(childSnapshot.key)
  });

  showProfessorsById(array.reverse())

  currentPage = pageToLoad
}

function getQuery(pageToLoad, sortedByBest = true, sortedByEasiness = false) {
  let professorsQuery;

  if (sortedByBest) {
    if (pageToLoad == 1) {
      professorsQuery = query(ref(db, 'professors'), orderByChild('/ratings/overall'), limitToLast(professorsPerPage));
    } else if (currentPage < pageToLoad) {
      professorsQuery = query(ref(db, 'professors'), orderByChild('/ratings/overall'), endBefore(previousSmallerOverallResult, previousSmallerKey), limitToLast(professorsPerPage));
    } else {
      professorsQuery = query(ref(db, 'professors'), orderByChild('/ratings/overall'), startAfter(previousBiggerOverallResult, previousBiggerKey), limitToFirst(professorsPerPage)); 
    }
  } else if (sortedByEasiness) {
    if (pageToLoad == 1) {
      professorsQuery = query(ref(db, 'professors'), orderByChild('/ratings/easiness'), limitToLast(professorsPerPage));
    } else if (currentPage < pageToLoad) {
      professorsQuery = query(ref(db, 'professors'), orderByChild('/ratings/easiness'), endBefore(previousSmallerOverallResult, previousSmallerKey), limitToLast(professorsPerPage));
    } else {
      professorsQuery = query(ref(db, 'professors'), orderByChild('/ratings/easiness'), startAfter(previousBiggerOverallResult, previousBiggerKey), limitToFirst(professorsPerPage)); 
    }
  }

  return professorsQuery
}