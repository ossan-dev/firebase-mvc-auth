function login() {
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;

    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
            user.getIdToken()
                .then((idToken) => {
                    document.cookie = `access_token=${idToken}; domain=localhost; secure; max-age=1800; SameSite=strict`
                    window.location = '/';
                })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ' ' + errorMessage);
        });
}
