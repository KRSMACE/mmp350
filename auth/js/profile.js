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

