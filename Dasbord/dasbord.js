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
} from "../firebase/firebase.js";
const auth = getAuth();
let blogtittle = document.getElementById("input-text");
let blogstext = document.getElementById("textarea");
console.log(blogtittle, textarea);
let uidiv = document.querySelector(".uiset");
let div = document.createElement("div");
let isloggedinuser;
let cureentUsername;
let cureentUserLastname;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // const uid = user.uid;
    isloggedinuser = user.uid;
    // id = uid
    getUserdata(isloggedinuser);
    // displayUi(id)
    //     userData = uid;
    console.log(isloggedinuser);

    //       console.log(blogsdata);
  } else {
    // User is signed out
    // ...
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
    console.log("Document data:", docSnap.data());
    let { email, image, lastname, name, password } = docSnap.data();
    // cureentUserLastname = name,
    // cureentUserLastname =lastname
    let fullname = name + lastname;
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
    console.log("Document data:", docSnap.data());
    let { email, image, lastname, name, password } = docSnap.data();
    displayUi(title, text, email, image, lastname, name, isloggedinuser);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  // onAuthStateChanged(auth, async (user) => {
  //   if (user) {

  //     const uid = user.uid;

  //   } else {
  //   }
  // });
}

// await setDoc(doc(db, "postcontent", uid), {
//   Title: title,
//   TextContent: text,
//   Email: email,
//   Image: image,
//   lastname: lastname,
//   Name: name,
// });
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
    <div class="blog-title"><b>${title}</b> <br><i class="names">${
    name + lastname
  }-${new Date().toLocaleString()}</i>
    <br>
    <span>06-11-2023</span>
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
    <div class="button">Delete</div>
    <!-- Edit button -->
    <div class="button">Edit</div>
  </div>
  </div>
  </div>
 `;

  // await setDoc(doc(db, `${name + lastname}`, isloggedinuser), {
  //   Title: title,
  //   TextContent: text,
  //   Email: email,
  //   Image: image,
  //   lastname: lastname,
  //   Name: name,
  // });
  // Set the data for the document you want to add
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
  ...docData
  });
  console.log("Document written with ID: ye data jb m sareblogs mangvaotw mujh mil jy ", docRef.id);
  

  // Use setDoc to add the document to the collection
  // await setDoc(newDocRef, docData);

  // Use addDoc to automatically generate a document ID
  await addDoc(collection(db, `${name + lastname}`), docData);
  // Add the HTML to the UI
  div.innerHTML += uiset;
  uidiv.appendChild(div);
  //  phele ye data save hoga pher ui
}

async function continueUi(FULLNAME) {
  console.log(FULLNAME);
  const querySnapshot = await getDocs(collection(db, `${FULLNAME}`));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    let { Title, TextContent, Email, Image, lastname, Name ,Timestamp} = doc.data();
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
        <div class="blog-title"><b>${Title}</b> <br><i class="names">${Name} - ${Timestamp}</i>
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
         <div class="button">Delete</div>
         <!-- Edit button -->
         <div class="button">Edit</div>
       </div>
     </div>
     </div>
     `;

    div.innerHTML += uiset;
    uidiv.appendChild(div);
  });
}

// continueUi();

// console.log(blogsdata);
window.blogPost = blogPost;
