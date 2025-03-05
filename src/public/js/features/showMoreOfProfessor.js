import { get, ref, db } from '../../firebase.js'

export function showMoreOf(showMoreBtn) {
  const professorId = showMoreBtn.id;

  if (showMoreBtn.classList.contains('inactive')) {
    showMoreBtn.classList.remove('inactive')
    const ratingsListEl = document.getElementById(`ratings-${professorId}`);
    
    get(ref(db, 'ratings/' + professorId)).then((snapshot) => {
      if (snapshot.exists()) {
        const ratings = Object.values(snapshot.val())

        ratingsListEl.innerHTML += `
          <li>
            <div class="pr-16 pb-2 border border-gray-400 pt-2 rounded-lg flex justify-center font-semibold text-white">
              <button class="px-4 py-2 rounded-lg bg-blue-600 hover:cursor-pointer">Calificar profesor</button>
            </div>
          </li>
        `

        for (const id in ratings) {
          appendRating(ratingsListEl, ratings[id]);
        }
      } else {
        ratingsListEl.innerHTML += `
          <li>
            <div class="pr-16 pb-2 border border-gray-400 pt-2 rounded-lg flex justify-center font-semibold text-white">
              <button class="px-4 py-2 rounded-lg bg-blue-600 hover:cursor-pointer">Calificar profesor</button>
            </div>
          </li>
        `
      }
    })
  } else {
    showMoreBtn.classList.add('inactive');
    document.getElementById(`ratings-${professorId}`).innerHTML = '';
  }
}

function appendRating(ratingsResultsBox, ratingInfo) {
  const ratingEl = `  
    <li>
      <div class="pr-16 pb-2 border border-gray-400 pt-2 rounded-lg flex justify-between">
        <div class="flex justify-start pr-2 pl-8 items-start">
        
          <div class="flex flex-col  max-w-92 min-w-92">
            <div class="text-sm">${ratingInfo.comment}</div>
          </div>

          <div class="flex flex-col items-center px-6 ml-6">
            <div class="text-sm">${ratingInfo.ratings.easiness}</div>
            <div class="text-xs">Facilidad</div>
          </div>
          
          <div class="flex flex-col items-center px-6">
            <div class="text-sm">${ratingInfo.ratings.teaching}</div>
            <div class="text-xs">Enseñanza</div>
          </div>
          
          <div class="flex flex-col items-center px-6">
            <div class="text-sm">${ratingInfo.ratings.grading}</div>
            <div class="text-xs">Calif.alumnos</div>
          </div>
          
          <div class="flex flex-col items-center px-6 ml-10">
            <div class="text-lg">${ratingInfo.ratings.overall}</div>
            <div class="text-xs">General</div>
          </div>
        </div>
      </div>
    </li>`
  
  ratingsResultsBox.innerHTML += ratingEl;
}