//récupérer les paramètres dans l'url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

//Appel a l'API avec "id" en paramètre de function
let url = `http://localhost:3000/api/products/${productId}`;

fetch(url)
	.then(response => response.json()
	.then((data) => {

	//Appel des options produits (qty/img/name/description)
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
}).catch((err) => console.log(err))
);

//Écouteur d'évènement sur la soumission du panier + enregistrement dans le localStorage
let button = document.querySelector('#addToCart');

function addToCart(id, color, qty, price){
	let cart = {
		id: id,
		color: color,
		qty: qty,
		price: price
	};

	let currentCart = JSON.parse(localStorage.getItem('products'));
	let isNewProduct = true;
	//Pour récupérer les qty
	if (currentCart && currentCart.length > 0) {
		for (let i of currentCart) {
			if (i.id === cart.id && i.color === cart.color) {
				i.qty = parseInt(i.qty) + parseInt(cart.qty);
				isNewProduct = false;
			}
		}
		if (isNewProduct) {
			currentCart.push(cart);
		}
		//loaclaStorage -> stockage de donné sans délai d'expiration
		localStorage.setItem('products', JSON.stringify(currentCart)) //enregistre les items
	} else {
		let newCart = [];
		newCart.push(cart)
		localStorage.setItem('products', JSON.stringify(newCart))
	}
}
//Soumission au panier du choix client
button.addEventListener('click', function () {
	let color = document.getElementById('colors');
	let qty = document.getElementById('quantity');
	let price = document.getElementById('price')
	addToCart(productId, color.options[color.selectedIndex].value, qty.value, price.innerText);
})


