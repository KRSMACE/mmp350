function createElement(_class, text) {
	const element = document.createElement('div');
	element.classList.add(_class);
	element.textContent = text;
	return element;
}

function createPost(postData, _userData, postId) {
	
	const userData = _userData || { displayName: "Anonymous" };
	
	const post = createElement('post'); // container element
	const text = createElement('text', postData.text);
	const author = createElement('author', 'by ');
	const authorLink = document.createElement('a');
	authorLink.href = 'user.html?uid=' + postData.uid;
	
	authorLink.textContent = userData.displayName;
	author.appendChild(authorLink);
	
	var d = new Date(postData.date);
	const date = createElement('date',(d.getMonth() + 1) + "." +  d.getDate() + "." + d.getFullYear());
	
//	posts.appendChild(post);
	posts.insertBefore(post, posts.firstElementChild);
	
	/* adding user profile image */
	const img = new Image();
	if (userData.imageURL) {
		img.src = userData.imageURL;
	} else {
		img.src = 'images/egg.jpg';
	}
	img.classList.add('profile-image');
	
	/* link to the post - permanent link */
	const postLink = document.createElement('a');
	postLink.href = 'post.html?id=' + postId;
	postLink.textContent = "Permalink";
	
	if (postData.tags) {
		var textHTML = postData.text;
		for (const tag in postData.tags) {
			const re = new RegExp('#'+tag, 'g');
			textHTML = textHTML.replace(re, '<a href="tag.html?tag=' + tag + '">#' + tag + '</a>');
		}
		text.innerHTML = textHTML;
	}
	
	post.appendChild(img);
	post.appendChild(text);
	post.appendChild(author);
	post.appendChild(date);
	post.appendChild(postLink);
    
   
    
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

	
}






