
// pour importer l'image, (ça marche po) oscour
	let img = document.createElement('img');
	img.src = "./images/logo.png";
	let block = document.getElementsByClassName('item__img');
	// block.classList.add('item__img'); Il faut que j'add la class
	block.appendChild = img;
	//le log est bon pourtant on a bien l'elt img
	console.log(img)

//récupérer les paramètres dans l'url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

//Appel a l'API avec "id" en paramètre de function
let url = `http://localhost:3000/api/products/${productId}`;

fetch(url).then(response => response.json().then((data) => {

	document.getElementById('title').innerHTML = data.name;
	document.getElementById('price').innerHTML = data.price;
	document.getElementById('description').innerHTML = data.description;
	document.getElementsByClassName('item__image').innerHTML = data.imageUrl;

	let colorsNode = document.getElementById('colors');
	for (let color of data.colors) {
		console.log(color);
		let addOption = document.createElement('option');
		addOption.text = color;
		addOption.value = color;
		colorsNode.add(addOption);
	}
}));

//Écouteur d'évènement sur la soumission du panier
let button = document.querySelector('#addToCart');

button.addEventListener('click', function (){
	console.log(button)
})


