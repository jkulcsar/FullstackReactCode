// Write a function to retrieve a blob of json
// through an AJAX request. Use the 'fetch' function.

// http://rallycoding.herokuapp.com/api/music_albums
const URL = 'http://rallycoding.herokuapp.com/api/music_albums';

// function fetchAlbums() {
// 	fetch(URL)
// 		.then(res => res.json())
// 		.then(json => console.log(json));
// }

// using async/await in straight-forward mode
// async function fetchAlbums() {
// 	const res = await fetch(URL);
// 	const json = await res.json();
// 	console.log(json);
// }

// using async-await in an arrow function
const fetchAlbums = async () => {
	const res = await fetch(URL);
	const json = await res.json();
	console.log(json);
};

fetchAlbums();
