let cart = []
let productID = []
let sousValue = []
let total = 0
let qty = []
let values = []

// Parcourir les options / ID stocker dans le localStorage

let cartProductID = localStorage.length
console.log(localStorage.length)

for (let i = 0; i<cartProductID.length; i++){

}


// Formulaire client

let form = document.querySelector('#login_form')

form.firstName.addEventListener('change', function (){
    validFirstName(this);
})
form.lastName.addEventListener('change', function (){
    validName(this);
})
form.address.addEventListener('change', function (){
    validAdress(this);
})
form.city.addEventListener('change', function (){
    validCity(this);
})
form.email.addEventListener('change', function (){
    validEmail(this);
})

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validFirstName(form.firstName) && validName(form.name) && validAdress(form.adress) && validCity(form.city) &&validEmail(form.email)) {
        form.submit();
    }
});

// ***** Validation Prénom
const validFirstName = function (inputFirstName){
    let firstNameRegExp = new regExp(
        '^[a-zA-Z]+$'
    )
    // Récupération de la balise <P>
    let p = inputFirstName.nextElementSibling

    //On test l'expression régulière
    if (firstNameRegExp.test(inputFirstName.value)){
        p.innerHTML = "Prénom Valide"
    }else{
        p.innerHTML = "Prénom invalide"
    }
}
// ***** Validation Nom
const validName = function (inputName){
    let nameRegExp = new regExp(
        '^[a-zA-Z]+$'
    )
    // Récupération de la balise <P>
    let p = inputName.nextElementSibling

    //On test l'expression régulière
    if (nameRegExp.test(inputName.value)){
        p.innerHTML = "Nom Valide"
    }else{
        p.innerHTML = "Nom invalide"
    }
}
// ***** Validation Adresse
const validAdress = function (inputAdress){

    // Récupération de la balise <P>
    let p = inputAdress.nextElementSibling

    //On test l'expression régulière
    if (inputAdress.value){
        p.innerHTML = "Adresse Valide"
    }else{
        p.innerHTML = "Adresse invalide"
    }
}
// ***** Validation City
const validCity = function (inputCity){
    let cityRegExp = new regExp(
        '^[a-zA-Z]+$'
    )
    // Récupération de la balise <P>
    let p = inputCity.nextElementSibling

    //On test l'expression régulière
    if (cityRegExp.test(inputCity.value)){
        p.innerHTML = "Adresse Valide"
    }else{
        p.innerHTML = "Adresse invalide"
    }
}

// ***** Validation Email
const validationEmail = function (inputEmail){
    let emailRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
    );
    // Récupération de la balsie <p>
    let p = inputEmail.nextElementSibling

    //On test l'expression régulière
    if (emailRegExp.test(inputEmail.value)){
        p.innerHTML = "Adresse mail valide"
    }else{
        p.innerHTML = "Adresse mail invalide"
    }
}
