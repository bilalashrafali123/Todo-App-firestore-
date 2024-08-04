import {signInWithEmailAndPassword , GoogleAuthProvider , signInWithPopup } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";





const form = document.querySelector('#form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const googleBtn = document.querySelector('#btn')






form.addEventListener('submit' , (event)=>{
  event.preventDefault();
 
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    
    const user = userCredential.user;
    console.log(user);
    window.location = 'home.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
})

const provider = new GoogleAuthProvider();

googleBtn.addEventListener("click", () => {
  console.log("google login");

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      window.location = "home.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

