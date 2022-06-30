let cartItems = JSON.parse(localStorage.getItem('products'));
let cart = [];
let total = 0;
let qty = 0;
let html = '';
let hostname = '//localhost:3000';
let orderBtn = document.querySelector('#order');
let form = document.querySelector('#login_form');

//function => addEventListener(change) -- Diviser en trois fonction pour gérer les =/= étapes
function updateCartQty(id, color, qty) {
// Quand on add/remove une qty
	let currentItem = {
		id: id,
		color: color,
		qty: qty
	};

	let cartItems = JSON.parse(localStorage.getItem('products'));

	////Boucle qui compare l'id  et la couleur pour vérifier que c'est le bon produit a qui on affecte le changement de qty
	if (cartItems && cartItems.length > 0) {
		for (let cartItem of cartItems) {
			if (cartItem.id === currentItem.id && cartItem.color === currentItem.color) {
				cartItem.qty = parseInt(currentItem.qty);
			}
		}

		localStorage.setItem('products', JSON.stringify(cartItems)); // enregistre les items
	}
	updateCartTotal();
}

//Pour supprimer un item stocker dans le localStorage
function removeCartItem(id, color) {
	let cartItems = JSON.parse(localStorage.getItem('products'));
	for (let i = 0; i < cartItems.length; i++) {
		if (cartItems[i].id === id && cartItems[i].color === color) {
			document.querySelector('article.cart__item[data-id="' + cartItems[i].id + '"][data-color="' + cartItems[i].color + '"]').remove();
			cartItems.splice(i, 1);
			i--;
		}
	}
	localStorage.setItem('products', JSON.stringify(cartItems)); // enregistre les items
	updateCartTotal();
}

//Pour mettre a jour le prix et la quantité total
function updateCartTotal() {
	let newQty = 0;
	let newTotal = 0;
	let cartItems = JSON.parse(localStorage.getItem('products'));

	for (let product of cartItems) { //Boucle pour recuperer la clr, donc voir cb le client en a prit
		if (product) {
			newTotal += parseInt(product.price) * parseInt(product.qty);
			newQty += parseInt(product.qty);
			document.getElementById('totalPrice').innerHTML = newTotal;
			document.getElementById('totalQuantity').innerHTML = newQty;
		}
	}
}


// Parcourir les options / ID stocker dans le localStorage
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
                   <p class="quantities">Qté : ${product.qty}</p>
                   <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
                 </div>
                 <div class="cart__item__content__settings__delete">
                   <p class="deleteItem">Supprimer</p>
                 </div>
               </div>
             </div>
           </article>`;
				document.getElementById('cart__items').innerHTML += html;


				total += parseInt(productData.price) * parseInt(product.qty);
				qty += parseInt(product.qty);
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
						e.target.previousElementSibling.innerHTML = "Qté : " + qty;
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
						updateCartTotal();
					});
				}
			}).catch((err) => console.log(err));
	}
}

orderBtn.addEventListener('click', function (e) {
	e.preventDefault();
	let errors = document.querySelectorAll('.error')
	for (const error of errors) {
		if (error.innerHTML.length){
			alert(`Une erreur a été rencontré lors de l'envoi du formulaire`);
			return
		}
	}
	let currentCart = JSON.parse(localStorage.getItem('products'));
	let idList = [];
	if (currentCart && currentCart.length > 0) {
		for (let i of currentCart) {
			idList.push(i.id);
		}
	}
	//récuprération des infos formulaire via la method post
	fetch(hostname + '/api/products/order', {
		method: 'post',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ //Transforme les données js du form en chaine de caractère JSON
			contact: {
				firstName: form.firstName.value,
				lastName: form.lastName.value,
				address: form.address.value,
				city: form.city.value,
				email: form.email.value
			},
			products: idList
		})
	}).then(function (response) {
		//save le numero dans le local storage
		return response.json();
	}).then(respJSon => {
		if (respJSon.orderId) {
			localStorage.setItem('orderId', respJSon.orderId);
			//permet de se rendre sur la page confirmation
			window.location = 'confirmation.html'
		}
	}).catch((err) => console.log(err));
});

// Formulaire client


form.firstName.addEventListener('change', function () {
	validFirstName(this);
})
form.lastName.addEventListener('change', function () {
	validLastName(this);
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


// ***** Validation Prénom
const validFirstName = function (inputFirstName) {
	let firstNameRegExp = new RegExp(
		/^[a-zA-Z\-]+$/
	);
	//On test l'expression régulière
	if (firstNameRegExp.test(inputFirstName.value)) {
		document.getElementById('firstNameErrorMsg').innerHTML = "";
	} else {
		document.getElementById('firstNameErrorMsg').innerHTML = "Est-ce votre vrai prénom ?";
	}
}
// ***** Validation Nom
const validLastName = function (inputLastName) {
	let nameRegExp = new RegExp(
		/^[a-zA-Z\-]+$/
	);
	//On test l'expression régulière
	if (nameRegExp.test(inputLastName.value)) {
		document.getElementById('lastNameErrorMsg').innerHTML = "";
	} else {
		document.getElementById('lastNameErrorMsg').innerHTML = "Je veux bien être indulgent mais un nom avec des chiffres ... ";
	}
}
// ***** Validation Adresse
const validAdress = function (inputAdress) {
	let adressRegExp = new RegExp(
		/(\d+)?\,?\s?(bis|ter|quater)?\,?\s?(rue|avenue|boulevard|r|av|ave|bd|bvd|square|sente|impasse|cours|esplanade|allée|résidence|parc|rond-point|chemin|côte|place|cité|quai|passage|lôtissement|hameau)?\s([a-zA-Zà-ÿ0-9\s]{2,})+$/gi
	);
	//On test l'expression régulière
	if (adressRegExp.test(inputAdress.value)) {
		document.getElementById('addressErrorMsg').innerHTML = "";
	} else {
		document.getElementById('addressErrorMsg').innerHTML = "Cette adresse n'existe pas !";
	}
}
// ***** Validation City
const validCity = function (inputCity) {
	let cityRegExp = new RegExp(
		/^[a-zA-Z\-]+$/
	);
	//On test l'expression régulière
	if (cityRegExp.test(inputCity.value)) {
		document.getElementById('cityErrorMsg').innerHTML = "";
	} else {
		document.getElementById('cityErrorMsg').innerHTML = "Habitez-vous vraiment là-bas ?";
	}
};

// ***** Validation Email
const validEmail = function (inputEmail) {
	let emailRegExp = new RegExp(
		'^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
	);
	//On test l'expression régulière
	if (emailRegExp.test(inputEmail.value)) {
		document.getElementById('emailErrorMsg').innerHTML = "";
	} else {
		document.getElementById('emailErrorMsg').innerHTML = "Essayez encore, promis vous ne serez pas spammé ! ";
	}
};
