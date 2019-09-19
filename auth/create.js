/* sign up */
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("login-message");
const submitSignUp = document.getElementById("submit-sign-up");

signupButton.onclick = function(event) {
	const promise = firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value);
    
	promise.catch(function(error) {
		message.textContent = error.message;
	});
};



