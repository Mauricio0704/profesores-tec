import { db, get, ref } from  "../firebase.js"

export async function getCoursesNames() {
  let coursesNames;
  
  try {
    const snapshot = await get(ref(db, 'courses'));
    coursesNames = snapshot.val();
    
    return coursesNames;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}

export async function getProfessors() {
  let professors;

  try {
    const snaphsot = await get(ref(db, 'professors/'));
    professors = snaphsot.val()

    return professors;
  } catch (error) {
    console.log(error);
  }
}

export async function getCoursesKey() {
  let coursesKeys;

  try {
    const snapshot = await get(ref(db, 'courses'));
    coursesKeys = snapshot.val();
    
    return coursesKeys;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}