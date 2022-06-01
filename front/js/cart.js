let cartProducts = JSON.parse(localStorage.getItem('products'))
let cart = []
let sousValue = []
let values = []
let total = 0
let qty = 0
let html = ''

//function => addEventListener(change)
function updateCartQty(id, color, qty) {

	let currentItem = {
		id: id,
		color: color,
		qty: qty
	};

	let currentCart = JSON.parse(localStorage.getItem('products'));

	//Pour récupérer les qty
	if (currentCart && currentCart.length > 0) { //tableau de product, recupère la qty des prod
		for (let i of currentCart) { //Boucle pour recuperer la clr, donc voir cb le client en a prix
			if (i.id === cart.id && i.color === cart.color) {
				i.qty = parseInt(cart.qty);
			}
		}
		localStorage.setItem('products', JSON.stringify(currentCart)) // enregistre les items
	}
}


// Parcourir les options / ID stocker dans le localStorage
console.log(cartItems)
if (cartItems !== null) {
	for (let i = 0; i < cartItems.length; i++) {
		let product = cartItems[i];
		let id = cartItems[i].id;


		fetch(hostname + `/api/products/${id}`)
			.then(resp => {
				return resp.json();
			})
			.then(respJSon => {
				let productData = respJSon
				cart.push(id);
				html = `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
             <div class="cart__item__img">
               <img src="${productData.imageUrl}" alt="${productData.altTxt}">
             </div>
             <div class="cart__item__content">
               <div class="cart__item__content__description">
                 <h2>${productData.name}</h2>
                 <p>${product.color}</p>
                 <p>${productData.price}</p>
               </div>
               <div class="cart__item__content__settings">
                 <div class="cart__item__content__settings__quantity">
                   <p>Qté : ${product.qty}</p>
                   <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
                 </div>
                 <div class="cart__item__content__settings__delete">
                   <p class="deleteItem">Supprimer</p>
                 </div>
               </div>
             </div>
           </article>`
			document.getElementById('cart__items').innerHTML += html;


			total += parseInt(productData.price) * parseInt(product.qty)
			qty += parseInt(product.qty)
			document.getElementById('totalPrice').innerHTML = total;
			document.getElementById('totalQuantity').innerHTML = qty;

				let qtyItems = document.getElementsByClassName('itemQuantity');
				for (let product of qtyItems) {
					product.addEventListener('change', function (e) {
						let article = e.target.closest('article.cart__item');
						let color = article.dataset.color;
						let id = article.dataset.id;
						let qty = e.target.value;
						updateCartQty(id, color, qty);
					})
				}

// addeventlistener pour gérer la suppression
				let removeItems = document.querySelectorAll('.deleteItem');
				for (let removeItem of removeItems) {
					removeItem.addEventListener('click', function (e) {
						e.preventDefault();
						let article = e.target.closest('article.cart__item');
						let id = article.dataset.id;
						let color = article.dataset.color;
						removeCartItem(id, color);
					});
				}
			}).catch((err) => console.log(err));
	}
}

// Formulaire client

let form = document.querySelector('#login_form')

form.firstName.addEventListener('change', function () {
	validFirstName(this);
})
form.lastName.addEventListener('change', function () {
	validName(this);
})
form.address.addEventListener('change', function () {
	validAdress(this);
})
form.city.addEventListener('change', function () {
	validCity(this);
})
form.email.addEventListener('change', function () {
	validEmail(this);
})

form.addEventListener('submit', function (e) {
	e.preventDefault();
	console.log('Prénom : ', e.target.firstName.value)
	console.log('Nom : ', e.target.lastName.value)
	console.log('Adresse : ', e.target.address.value)
	console.log('Ville : ', e.target.city.value)
	console.log('Email : ', e.target.email.value)
	if (validFirstName(form.firstName) && validName(form.name) && validAdress(form.address) && validCity(form.city) && validEmail(form.email)) {
		let currentCart = JSON.parse(localStorage.getItem('products'));
		let idList = []
		//Pour récupérer les qty
		if (currentCart && currentCart.length > 0) { //tableau de product, recupère la qty des prod
			for (let i of currentCart) {
				idList.push(i.id)
			}
		}
		fetch(hostname + '/api/order', {
			method: 'post',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				contact: {
					firstName: form.firstName,
					lastName: form.name,
					address: form.address,
					city: form.city,
					email: form.email
				},
				product: idList
			}).then(function (response) {
				//save le numero dans le local storage
				return response.json();
			})
			// form.submit();
		})
	}
})

// ***** Validation Prénom
const validFirstName = function (inputFirstName) {
	let firstNameRegExp = new RegExp(
		/^[a-zA-Z\-]+$/
	)
	console.log(firstNameRegExp)
	//On test l'expression régulière
	if (firstNameRegExp.test(inputFirstName.value)) {
		document.getElementById('firstNameErrorMsg').innerHTML = ""
	} else {
		document.getElementById('firstNameErrorMsg').innerHTML = "Est-ce votre vrai prénom ?"
	}
}
// ***** Validation Nom
const validName = function (inputName) {
	let nameRegExp = new RegExp(
		/^[a-zA-Z\-]+$/
	)
	console.log(nameRegExp)
	//On test l'expression régulière
	if (nameRegExp.test(inputName.value)) {
		document.getElementById('lastNameErrorMsg').innerHTML = ""
	} else {
		document.getElementById('lastNameErrorMsg').innerHTML = "Je veux bien être indulgent mais un nom avec des chiffres ... "
	}
}
// ***** Validation Adresse
const validAdress = function (inputAdress) {
	let adressRegExp = new RegExp(
		// /^[0-9]+[a-zA-Z\-]+$/
		/(\d+)?\,?\s?(bis|ter|quater)?\,?\s?(rue|avenue|boulevard|r|av|ave|bd|bvd|square|sente|impasse|cours|esplanade|allée|résidence|parc|rond-point|chemin|côte|place|cité|quai|passage|lôtissement|hameau)?\s([a-zA-Zà-ÿ0-9\s]{2,})+$/gi
	)
	console.log(adressRegExp)
	//On test l'expression régulière
	if (adressRegExp.test(inputAdress.value)) {
		document.getElementById('addressErrorMsg').innerHTML = ""
	} else {
		document.getElementById('addressErrorMsg').innerHTML = "Cette adresse n'existe pas !"
	}
}
// ***** Validation City
const validCity = function (inputCity) {
	let cityRegExp = new RegExp(
		/^[a-zA-Z\-]+$/
	)
	console.log(cityRegExp)
	//On test l'expression régulière
	if (cityRegExp.test(inputCity.value)) {
		document.getElementById('cityErrorMsg').innerHTML = ""
	} else {
		document.getElementById('cityErrorMsg').innerHTML = "Habitez-vous vraiment là-bas ?"
	}
}

// ***** Validation Email
const validEmail = function (inputEmail) {
	let emailRegExp = new RegExp(
		'^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
	);
	console.log(emailRegExp)
	//On test l'expression régulière
	if (emailRegExp.test(inputEmail.value)) {
		document.getElementById('emailErrorMsg').innerHTML = ""
	} else {
		document.getElementById('emailErrorMsg').innerHTML = "Essayez encore, promis vous ne serez pas spammé ! ";
	}
}
