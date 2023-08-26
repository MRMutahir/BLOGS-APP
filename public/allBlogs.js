import { collection, getDocs, db } from "./firebase/firebase.js";

let Signupbtn = document
  .getElementById("Signup-btn")
  .addEventListener("click", Signup);
let loginbtn = document
  .getElementById("login-btn")
  .addEventListener("click", login);
// console.log(Signupbtn, login);

function login() {
  window.location = "../login/login.html";
}
function Signup() {
  window.location = "../SiginUp/sigin.html";
}

let container = document.getElementById("container");
let div = document.createElement("div");
// console.log(container);
async function SetUi() {
  const querySnapshot = await getDocs(collection(db, "postcontent"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    let { Title, TextContent, Email, Image, lastname, Name, Timestamp } =
      doc.data();

    let divui = `<div class="outer-div">
    <div class="inner-div">
      <!-- Section -->
      <div class="section">
        <!-- Image -->
        <div class="image">
          <img src="${Image}" height="100px" width="100px" alt="" />
        </div>
        <!-- Blog Title -->
        <div class="blog-title">
          <b class="Title">${Title}</b> <br /><i class="names"
            >${Name + lastname} - ${Timestamp}</i
          >
          <br />
        </div>
        <!-- User Name -->
        <!-- <div class="user-name"></div> -->
      </div>
      <div class="para">
       ${TextContent}
      </div>
    </div>
    </div>`;
    div.innerHTML += divui;
    container.appendChild(div);
  });
}
SetUi();
