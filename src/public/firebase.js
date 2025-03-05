// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js'
import { getDatabase, ref, set, get, onValue, push, child, update, query, orderByKey, orderByChild, orderByValue, limitToFirst, limitToLast, startAt, endAt, endBefore, startAfter } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkJSLwTuBo_uuWu2_g2rbeSCOm-m3beL8",
  authDomain: "profesores-tec.firebaseapp.com",
  projectId: "profesores-tec",
  storageBucket: "profesores-tec.firebasestorage.app",
  messagingSenderId: "522085549270",
  appId: "1:522085549270:web:b39008580953140e7d3577",
  databaseURL: "https://profesores-tec-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, getDatabase, ref, set, get, onValue, push, child, startAfter, update, query, orderByChild, orderByKey, orderByValue, limitToFirst, limitToLast, startAt, endAt, endBefore };