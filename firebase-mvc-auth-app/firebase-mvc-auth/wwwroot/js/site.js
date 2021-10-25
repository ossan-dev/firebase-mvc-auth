// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

document.getElementById("login").onclick = function () { loginFunction() };

function loginFunction() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDKthYav1dxl-rT6bfoInVGJg4QTkAVrBM",
        authDomain: "test-js-authentication.firebaseapp.com",
        projectId: "test-js-authentication",
        storageBucket: "test-js-authentication.appspot.com",
        messagingSenderId: "912573819501",
        appId: "1:912573819501:web:f427c5e8742c05f3f8ad64"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const auth = getAuth();

    const username = $("#Email").val();
    const password = $("#Pass").val();

    console.log(username);
    console.log(password);

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
