var jwt = '';

window.addEventListener("load", myInit, false);

function myInit() {
    initializeFirebase();
}

function initializeFirebase() {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyB3SyjJxBmKXAbJdRYJJlJHh9RLl2uELXc",
        authDomain: "fir-demo-9063a.firebaseapp.com",
        projectId: "fir-demo-9063a",
        storageBucket: "fir-demo-9063a.appspot.com",
        messagingSenderId: "598403656898",
        appId: "1:598403656898:web:3d21ead5ca298f62439f5b",
        measurementId: "G-HM965JCM0S"
    };

    firebase.initializeApp(firebaseConfig);
}

function privacy() {
    var url = "https://localhost:5001/Home/Privacy"
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var idToken = '';
            user.getIdToken(true)
                .then((token) => {

                    idToken = token;
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "html",
                        headers: {
                            "Authorization": "Bearer " + idToken
                        },
                        success: function (data) {
                            document.body.innerHTML = data;
                            //window.location = url;
                        }
                    });
                })
        } else {
            windows.location = 'https://localhost:5001/login';
        }
    });


}

