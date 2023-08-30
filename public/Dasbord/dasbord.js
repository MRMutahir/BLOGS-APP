import {
  onAuthStateChanged,
  getAuth,
  doc,
  getDoc,
  db,
  setDoc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  signOut,
} from "../firebase/firebase.js";
const auth = getAuth();
let blogtittle = document.getElementById("input-text");
let blogstext = document.getElementById("textarea");
let logoutBtn = document.getElementById("logout-btn");
// console.log(blogtittle, textarea);
let uidiv = document.querySelector(".uiset");
let Blogs = document
  .getElementById("Blogs")
  .addEventListener("click", allBlogs);
let div = document.createElement("div");

// console.log(username);
let isloggedinuser;
// let cureentUsername;
// let cureentUserLastname;
onAuthStateChanged(auth, (user) => {
  if (user) {
    isloggedinuser = user.uid;

    getUserdata(isloggedinuser);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="">Why do I have this issue?</a>',
    });
  }
});
//
// let useerUid;
// console.log(id,"jhfduihsdi");

// console.log(id,"hdshsdhioij");
async function getUserdata(id) {
  const docRef = doc(db, "userData", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    let { email, image, lastname, name, password } = docSnap.data();
    // cureentUserLastname = name,
    // cureentUserLastname =lastname
    let fullname = name + lastname;
    fullname = name + lastname;
    let username = document.querySelector(".username");
    username.innerHTML = fullname;
    continueUi(fullname);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
// console.log(cureentUserLastname,cureentUsername);

async function blogPost() {
  let title = blogtittle.value;
  let text = blogstext.value;
  let blogsdata = {
    BlogTitle: title,
    Blogtext: text,
  };
  const docRef = doc(db, "userData", isloggedinuser);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    let { email, image, lastname, name, password } = docSnap.data();
    // username.innerHTML = name + lastname;
    displayUi(title, text, email, image, lastname, name, isloggedinuser);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  title = "";
  text = "";
}

async function displayUi(title, text, email, image, lastname, name, id) {
  let uiset = ` <div class="outer-div">
 <div class="inner-div">
  <!-- Section -->
  <div class="section">
    <!-- Image -->
    <div class="image">
      <img src="${image}" height="100px" width="100px" alt="" />
    </div>
    <!-- Blog Title -->
    <div class="blog-title"><b  class ="Title">${title}</b> <br><i class="names">${
    name + lastname
  }-${new Date().toLocaleString()}</i>
    <br>
  
  </div>
    <!-- User Name -->
    <!-- <div class="user-name"></div> -->
  </div>
  <div class="para">
 ${text}
  </div>
  <!-- Button container -->
  <div class="button-container">
  <!-- Delete button -->
  <button class="button" onclick="Deletefoo('${name + lastname}','${
    doc.id
  }')" >Delete</button>
  <!-- Edit button -->
  <button class="button" onclick="Editfoo('${name + lastname}','${
    doc.id
  }')">Edit</button>
       </div>
  </div>
  </div>
 `;

  const docData = {
    ID: id,
    Title: title,
    TextContent: text,
    Email: email,
    Image: image,
    lastname: lastname,
    Name: name,
    Timestamp: new Date().toLocaleString(),
  };

  // Generate a unique document ID, if necessary
  // const newDocRef = doc(db, `${name + lastname}/${id}`);
  const docRef = await addDoc(collection(db, "postcontent"), {
    ...docData,
  });
  // console.log(
  //   "Document written with ID: ye data jb m sareblogs mangvaotw mujh mil jy ",
  //   docRef.id
  // );
  // Use addDoc to automatically generate a document ID
  await addDoc(collection(db, `${name + lastname}`), docData);
  // Add the HTML to the UI
  // div.setAttribute("class", "creatediv");
  div.innerHTML += uiset;
  uidiv.appendChild(div);
}

async function continueUi(FULLNAME) {
  // console.log(ubdatedata);
  const querySnapshot = await getDocs(collection(db, `${FULLNAME}`));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    let { Title, TextContent, Email, Image, lastname, Name, Timestamp } =
      doc.data();
    // console.log(Title, TextContent, Email, Image, lastname, Name);
    let uiset = ` <div class="outer-div">
     <div class="inner-div">
       <!-- Section -->
       <div class="section">
         <!-- Image -->
         <div class="image">
           <img src="${Image}" height="100px" width="100px" alt="" />
         </div>
         <!-- Blog Title -->
        <div class="blog-title"><b class ="Title">${Title}</b> <br><i class="names">${Name} - ${Timestamp}</i>
        <br>
  
       </div>
         <!-- User Name -->
         <!-- <div class="user-name"></div> -->
       </div>
       <div class="para">
      ${TextContent}
       </div>
       <!-- Button container -->
       <div class="button-container">
         <!-- Delete button -->
         <button class="button" onclick="Deletefoo('${Name + lastname}','${
      doc.id
    }')" >Delete</button>
         <!-- Edit button -->
         <button class="button" onclick="Editfoo('${Name + lastname}','${
      doc.id
    }')">Edit</button>

       </div>
     </div>
     </div>
     `;

    // div.setAttribute("class", "creatediv");
    div.innerHTML += uiset;
    uidiv.appendChild(div);
  });
}
function allBlogs() {
  // console.log("SALAAM");
  window.location.href = "../index.html";
}
//

async function Deletefoo(fullname, id) {
  // console.log(fullname);
  // console.log(id);
  await deleteDoc(doc(db, fullname, id));
  window.location.reload();
}
async function Editfoo(fullname, id) {
  // console.log("SALAM ");
  // console.log(fullname, id);
  Swal.fire({
    title: "<strong><b>Update value</b></strong>",
    icon: "info",
    html: ` <label for="fieldToUpdate">Title to Update</label>
     <input type="text" id="fieldToUpdate" name="fieldToUpdate"><br>
     <label for="anotherFieldToUpdate">Para to Update</label>
     <input type="text" id="anotherFieldToUpdate" name="anotherFieldToUpdate"><br>
     <button type="submit" onclick="updatebtn('${fullname}','${id}')">>Update Document</button>`,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    // confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
    // // confirmButtonAriaLabel: "Thumbs up, great!",
    // cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
    cancelButtonAriaLabel: "Thumbs down",
  });
}
async function updatebtn(fullname, id) {
  // console.log("UPDATE");
  // console.log(fullname,id);

  // Get the values from the input fields
  const fieldToUpdateValue = document.getElementById("fieldToUpdate").value;
  const anotherFieldToUpdateValue = document.getElementById(
    "anotherFieldToUpdate"
  ).value;
  // console.log(fieldToUpdateValue);
  // console.log(anotherFieldToUpdateValue);

  if (fieldToUpdateValue == "" || anotherFieldToUpdateValue == "")
    return alert("KXH tw lhik");

  // Reference to the document you want to update
  const documentRef = doc(db, fullname, id);

  // Data you want to update in the document
  const updatedData = {
    Title: fieldToUpdateValue,
    TextContent: anotherFieldToUpdateValue,
  };

  // Update the document
  try {
    await updateDoc(documentRef, updatedData);
    console.log("Document successfully updated!");
    window.location.reload();
  } catch (error) {
    console.error("Error updating document: ", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="">Why do I have this issue?</a>',
    });
  }
}
logoutBtn.addEventListener("click", () => {
  // console.log("Ghhdu");
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("Sign-out successful");
      window.location = "../index.html";
    })
    .catch((error) => {
      // An error happened.
      console.log(" An error happened.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    });
});
// continueUi();

// console.log(blogsdata);
window.updatebtn = updatebtn;
window.Editfoo = Editfoo;
window.Deletefoo = Deletefoo;
window.blogPost = blogPost;
