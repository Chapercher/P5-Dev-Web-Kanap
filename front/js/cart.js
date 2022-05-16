let cart = []
let cartProducts = JSON.parse(localStorage.getItem('products'))
let sousValue = []
let total = 0
let qty = 0
let values = []

// Parcourir les options / ID stocker dans le localStorage

let cartProductID = localStorage.length
let html = ''

for (let i = 0; i < cartProducts.length; i++) {
	let product = cartProducts[i]
	let id = cartProducts[i].id


	fetch(`http://localhost:3000/api/products/${id}`)
		.then(resp => {
			return resp.json()
		})
		.then(respJSon => {
			let productData = respJSon
			console.log(respJSon)
			cart.push(id)
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

// addeventlistener pour gérer la suppression/ajout d'un produit
			let remove = document.querySelector('.deleteItem')
			remove.addEventListener('click', function (e) {
				e.preventDefault()
				alert('coucou')
			})
			console.log(remove)
		})


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
	if (validFirstName(form.firstName) && validName(form.name) && validAdress(form.adress) && validCity(form.city) && validEmail(form.email)) {
		form.submit();
	}
});

// ***** Validation Prénom
const validFirstName = function (inputFirstName) {
	let firstNameRegExp = new regExp(
		'^[a-zA-Z]+$'
	)
	// Récupération de la balise <P>
	let p = inputFirstName.nextElementSibling

	//On test l'expression régulière
	if (firstNameRegExp.test(inputFirstName.value)) {
		document.getElementById('firstNameErrorMsg').innerHTML = ""
	} else {
		document.getElementById('firstNameErrorMsg').innerHTML = "Prénom invalide"
	}
}
// ***** Validation Nom
const validName = function (inputName) {
	let nameRegExp = new regExp(
		'^[a-zA-Z]+$'
	)
	// Récupération de la balise <P>
	let p = inputName.nextElementSibling

	//On test l'expression régulière
	if (nameRegExp.test(inputName.value)) {
		p.innerHTML = "Nom Valide"
	} else {
		p.innerHTML = "Nom invalide"
	}
}
// ***** Validation Adresse
const validAdress = function (inputAdress) {

	// Récupération de la balise <P>
	let p = inputAdress.nextElementSibling

	//On test l'expression régulière
	if (inputAdress.value) {
		p.innerHTML = "Adresse Valide"
	} else {
		p.innerHTML = "Adresse invalide"
	}
}
// ***** Validation City
const validCity = function (inputCity) {
	let cityRegExp = new regExp(
		'^[a-zA-Z]+$'
	)
	// Récupération de la balise <P>
	let p = inputCity.nextElementSibling

	//On test l'expression régulière
	if (cityRegExp.test(inputCity.value)) {
		p.innerHTML = "Adresse Valide"
	} else {
		p.innerHTML = "Adresse invalide"
	}
}

// ***** Validation Email
const validEmail = function (inputEmail) {
	let emailRegExp = new RegExp(
		'^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
	);
	// Récupération de la balsie <p>
	let p = inputEmail.nextElementSibling

	//On test l'expression régulière
	if (emailRegExp.test(inputEmail.value)) {
		p.innerHTML = "Adresse mail valide"
	} else {
		p.innerHTML = "Adresse mail invalide"
	}
}
