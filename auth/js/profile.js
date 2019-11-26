const uid = location.search.split('=')[1];
const userRef = firebase.database().ref('users').child(uid);

const profileName = document.getElementById('profile-name');
const bioInput = document.getElementById('bio');
const updateButton = document.getElementById('update-profile');
const genderInput = document.getElementById('gender');
const phoneInput = document.getElementById('phone');
const birthdayInput = document.getElementById('birthday');

userRef.on('value', function(snapshot) {
	const userInfo = snapshot.val();
	profileName.value = userInfo.displayName;
	
	if (userInfo.bio) {
		bioInput.value = userInfo.bio;
    }
    if (userInfo.gender) {
        genderInput.value = userInfo.gender;
    }
    if (userInfo.phone) {
        phoneInput.value = userInfo.phone;
    }
    if  (userInfo.birthday) {
        birthdayInput.value = userInfo.birthday;
    }
});

updateButton.onclick = function() {
	userRef.update({
		displayName: profileName.value,
        bio: bioInput.value,
		gender: genderInput.value,
		phone: phoneInput.value,
		birthday: birthdayInput.value,
		
	});
};

