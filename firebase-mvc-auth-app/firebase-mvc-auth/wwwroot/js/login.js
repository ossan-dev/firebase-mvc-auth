// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3SyjJxBmKXAbJdRYJJlJHh9RLl2uELXc",
    authDomain: "fir-demo-9063a.firebaseapp.com",
    projectId: "fir-demo-9063a",
    storageBucket: "fir-demo-9063a.appspot.com",
    messagingSenderId: "598403656898",
    appId: "1:598403656898:web:b2c4442098588776439f5b",
    measurementId: "G-VX9RE3QMTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//firebase.auth().onAuthStateChanged(function (user) {
//    if (user) {
//        // User is signed in.
//        alert('logged in');
//    } else {
//        // No user is signed in.
//        alert('logged out');
//    }
//});

var login = function () {
    const auth = getAuth();

    const username = $("#Email").val();
    const password = $("#Pass").val();

    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const jwt = user.stsTokenManager.accessToken;
            var token = $('input[name=__RequestVerificationToken]').val();
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log("ERROR: " + errorMessage);
        });
}