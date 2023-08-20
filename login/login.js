import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "../firebase/firebase.js";

const auth = getAuth();

let email = document.getElementById("email");
let password = document.getElementById("password");
let btn = document
  .getElementById("btnlogin")
  .addEventListener("click", btnfoologin);
function btnfoologin() {
  let emailValue = email.value;
  let passwordValue = password.value;
  console.log(emailValue, passwordValue);
  signInWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      window.location = "../Dasbord/index.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
      alert("error", errorMessage);
    });
  email.value = "";
  password.value = "";
}
