// pour importer l'image


//récupérer les paramètres dans l'url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

//Appel a l'API avec "id" en paramètre de function
let url = `http://localhost:3000/api/products/${productId}`;

fetch(url).then(response => response.json().then((data) => {

	//Appel de l'img du canapé
	document.querySelector('.item__img > img').src = data.imageUrl;


	document.getElementById('title').innerHTML = data.name;
	document.getElementById('price').innerHTML = data.price;
	document.getElementById('description').innerHTML = data.description;

	let colorsNode = document.getElementById('colors');
	for (let color of data.colors) {
		console.log(color);
		let addOption = document.createElement('option');
		addOption.text = color;
		addOption.value = color;
		colorsNode.add(addOption);
	}
}));

//Écouteur d'évènement sur la soumission du panier === VOIR COMMENT FAIRE POUR ALLEZ SUR L'AUTRE PAGE
let button = document.querySelector('#addToCart');

function addToCart(id, color, qty){
	let cart = [
		id = id,
		color = color,
		qty = qty
 	];
	//Pour récupérer les qty


	localStorage.setItem('cart', cart)
	console.log(localStorage.getItem('cart'))
}

button.addEventListener('click', function (){
	let color = document.getElementById('colors');
	let qty = document.getElementById('quantity');
	addToCart(productId, color.options[color.selectedIndex].value, qty.value);
})


