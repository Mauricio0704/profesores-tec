import { loadProfessors } from "./features/professorsDisplayLogic.js";
import { db, get, ref } from "../firebase.js"

export const professorsListEl = document.getElementById('professors-list');
export const professorResultsBox = document.getElementById('professor-result-box');
export const professorInputBox = document.getElementById('professor-input-box');

const snapshot = await get(ref(db, 'professors'));
export const numberOfProfessors = snapshot.size;

loadProfessors();