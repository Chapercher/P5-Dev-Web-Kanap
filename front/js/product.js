
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

let url = `http://localhost:3000/api/products/${productId}`;

fetch(url).then(response => response.json().then((data) => {


		document.getElementById('title').innerHTML=data.name;
		document.getElementById('price').innerHTML=data.price;
		document.getElementsByClassName('item__image').innerHTML=data.imageUrl;
		document.getElementById('description').innerHTML=data.description;

		let colorsNode=document.getElementById('colors');
		for (let color of data.colors){
			console.log(color);
			var addedOption = document.createElement('option');
			addedOption.text = color;
			addedOption.value = color;
			colorsNode.add(addedOption);
		}

	}));



