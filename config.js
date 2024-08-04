import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyCUuFKCRYptc0ifB08VA87gv9xTJ7N4TjA",
    authDomain: "signup-and-signin-page-1d72e.firebaseapp.com",
    projectId: "signup-and-signin-page-1d72e",
    storageBucket: "signup-and-signin-page-1d72e.appspot.com",
    messagingSenderId: "852361824747",
    appId: "1:852361824747:web:bd5635993d894c9f5a71ae",
    measurementId: "G-3FXJL2DX7X"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  
