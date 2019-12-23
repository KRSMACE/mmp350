/* sign up */

const emailInput = document.getElementById("email");
const userInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const message = document.getElementById("login-message");
const submitSignUpButton = document.getElementById("submit-sign-up");
const errorMessage = document.getElementById("error-message");


submitSignUpButton.onclick = function(event) {
	const promise = firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value);
    
    promise.catch(function(error) {
        message.textContent = error.message;
	});
    
    promise.then(function(credential){
        createUser(credential.user.uid);
    });
};

function createUser(uid){
    const db = firebase.database();
    const ref = db.ref('users').child(uid);
    const promise = ref.update({
        displayName: userInput.value
    });
    
    promise.then(function() {
		location.href = "index.html";
	});
    
}



