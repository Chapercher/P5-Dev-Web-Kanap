let url = `http://localhost:3000/api/products`;

//
fetch(url)
	.then(response => response.json()
	.then((data) => {
		console.log(data);
		let html = '';
		data.forEach(function (item) {
			html += `<a href="product.html?id=${item._id}">
			<article>
				<img src="${item.imageUrl}" alt="${item.altTxt}">
					<h3 class="productName">${item.name}</h3>
					<p class="productDescription">${item.description}</p>
			</article>
		</a>`;
		}, this);

		document.getElementById('items').innerHTML = html;

	})
).catch(err => console.log(err));


