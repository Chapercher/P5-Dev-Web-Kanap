// récupère l'id de confirmation de commande une fois la vérification des données formulaire
let orderId = localStorage.getItem('orderId');
document.getElementById('orderId').innerHTML = orderId;
