// import { getAuth, createUserWithEmailAndPassword,auth} from "../firebase/firebase.js"
import {
  getAuth,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  db,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  storage,
  collection,
  addDoc,
} from "../firebase/firebase.js";

const auth = getAuth();
let useruid;
let sigin_email = document.getElementById("sigin_email");
let sigin_password = document.getElementById("sigin_password");
let f_name = document.getElementById("f_name");
let l_name = document.getElementById("l_name");
let Repeat_password = document.getElementById("Repeat_password");
let loginbtn = document
  .getElementById("login-btn")

  .addEventListener("click", () => {
    window.location = "../login/login.html";
  });

let Signup_btn = document
  .getElementById("Signup-btn")
  .addEventListener("click", btnfoo);
// console.log(
//   f_name,
//   l_name,
//   Repeat_password,
//   sigin_email,
//   sigin_password,
//   Signup_btn
// );
let imageURL = [];
function selectProfile() {
  // Trigger a click event on the hidden input element
  const profileImageInput = document.getElementById("profile-image-input");
  profileImageInput.click();

  // Handle the file selection event (you can display the selected image here)
  profileImageInput.addEventListener("change", function () {
    const selectedFile = profileImageInput.files[0];
    if (selectedFile) {
      console.log(selectedFile);
      console.log(selectedFile.name);
      // selectedFile.name;
      // Display the selected image (e.g., by setting the image source)
      // Example:
      // const profileImageElement = document.getElementById('profile-image');
      // profileImageElement.src = URL.createObjectURL(selectedFile);
      // You can also hide the "Profile picture" element or perform other actions
      try {
        const metadata = {
          contentType: "image/jpeg",
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, "images/" + selectedFile.name);
        const uploadTask = uploadBytesResumable(
          storageRef,
          selectedFile,
          metadata
        );

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("File available at", downloadURL);
                imageURL.push(downloadURL);
                // const docRef = await addDoc(collection(db, "usersimage"), {
                //   image: downloadURL,
                // });
                // console.log("Document written with ID: ", docRef.id);
                //
                // await setDoc(doc(db, "userimage", useruid), {
                //   imageurl: downloadURL,
                // });
              }
            );
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(useruid, "useruid>>>>>");
  });
}
// function selectprofile() {}
window.selectProfile = selectProfile;

function btnfoo() {
  let emailValue = sigin_email.value;
  let passwordValue = sigin_password.value;
  let repeatPassword = Repeat_password.value;

  if (
    !emailValue.indexOf("@") === -1 ||
    passwordValue.length !== 8 ||
    repeatPassword.length !== passwordValue.length ||
    imageURL[0] == ""
  ) {
    return alert("Check your email , paswoord");
  }
  // let imagestring = imageURL.join(",");
  let userdata = {
    image: imageURL[0],
    name: f_name.value,
    lastname: l_name.value,
    email: emailValue,
    password: passwordValue,
    repeatPassword: repeatPassword,
  };
  // console.log("hi");
  // console.log(userdata);

  createUserWithEmailAndPassword(auth, emailValue, passwordValue)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.uid);
      useruid = user.uid;
      await setDoc(doc(db, "userData", user.uid), {
        ...userdata,
      });
      if (passwordValue == repeatPassword) {
        window.location = "../login/login.html";
        // alert("check your repeat password and  profile picture ");
      } else {
        alert("repeat password is not match password");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
  f_name.value = "";
  l_name.value = "";
  emailValue = "";
  passwordValue = "";
  repeatPassword = "";
}
// console.log(passwordValue.length);
console.log(imageURL);
// let a = imageURL.join(",");
// console.log(a);
