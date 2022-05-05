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

function addToCart(id, color, qty) {
	let cart = [
		id = id,
		color = color,
		qty = qty
	];

	let propertyColor = Object.entries(cart) // TRANSFORMER UN TABLEAU EN OBJ (PS: INUTILE)

	//JE NE COMPREND PAS COMMENT JE PEUX FAIRE POUR SET PLUSIEURS PRODUIT DIF UN PEU COMME UN COOKIE ........ JE SUIS PERDU

	//Pour récupérer les qty
	if (localStorage['products']) { //tableau de product, recupère la qty des prod
		let productFound = false; //init a false
		for (let i of localStorage['products']){ //Boucle pour recuperer la clr, donc voir cb le client en a prix
			if(i.color === cart.color){
				// i.qty += cart.qty
				productFound = true;
				break
			}
		}
		if (!productFound){ // si y en a pas il en push 1
			localStorage.setItem(localStorage['products'].push(cart))
			console.log(localStorage['products'].push(cart))
		}
	}else{
		localStorage.setItem('products', cart) //sinon recupère les donné
	}
	console.log(localStorage)

	// localStorage.setItem('cart', cart)
}

button.addEventListener('click', function () {
	let color = document.getElementById('colors');
	let qty = document.getElementById('quantity');
	addToCart(productId, color.options[color.selectedIndex].value, qty.value);
})


