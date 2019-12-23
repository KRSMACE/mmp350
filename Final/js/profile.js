const uid = location.search.split('=')[1];
const userRef = firebase.database().ref('users').child(uid);

const profileName = document.getElementById('profile-name');
const bioInput = document.getElementById('bio');
const updateButton = document.getElementById('update-profile');
const genderInput = document.getElementById('profile-gender');
const phoneInput = document.getElementById('profile-phone');
const birthdayInput = document.getElementById('profile-birthday');
/*const emailInput = document.getElementById('profile-email');*/

userRef.on('value', function(snapshot) {
	const userInfo = snapshot.val();
	profileName.value = userInfo.displayName;
	
	if (userInfo.bio) {
		bioInput.value = userInfo.bio;
    }
    if (userInfo.displayGender) {
        genderInput.value = userInfo.displayGender;
    }
    if (userInfo.displayPhone) {
        phoneInput.value = userInfo.displayPhone;
    }
    if  (userInfo.displayBirthday) {
        birthdayInput.value = userInfo.displayBirthday;
    }
    /*if (userInfo.displayEmail){
        emailInput.value = userInfo.displayEmail;
    }*/
});

updateButton.onclick = function() {
	userRef.update({
		displayName: profileName.value,
        bio: bioInput.value,
		displayGender: genderInput.value,
		displayPhone: phoneInput.value,
		displayBirthday: birthdayInput.value,
        /*displayEmail: emailInput.value*/
        
		
	});
};

const imageButton = document.getElementById('submit-image');
imageButton.addEventListener('click', function() {
	// get the file
	const file = document.getElementById('image-file').files[0];
	if (file) {
		// upload the file
		const storage = firebase.storage();
		const user = firebase.auth().currentUser;
		const ref = storage.ref('users').child(user.uid).child('profile-image');
		const promise = ref.put(file);
		
		promise.then(function(image) {
			return image.ref.getDownloadURL();
		}).then(function(url) {
			userRef.update({ imageURL: url });
			document.getElementById('profile-image').src = url;
			document.getElementById('add-image').style.display = 'none';
		});
	}
	
});
