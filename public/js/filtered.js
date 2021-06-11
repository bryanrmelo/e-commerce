//esse arquivo faz praticamente a mesma coisa que o main.js porem retorna os produtos de acordo com um certo id

function getProductByName() {
    const id = document.getElementById('search').value;
    fetch(window.location.origin + `/products/${id}`)
        .then(response => response.json())
        .then(data => createFilteredProducts(data));
    fetch(window.location.origin + `/products/${id}`)
        .then(response => response.json())
        .then(data => addToCartFiltered(data));
}

function createFilteredProducts(data) {
    var products = document.getElementById('products');
    products.innerHTML = '';
    var div = document.createElement('div');
    div.className = 'product';
    div.id = 0;

    var img = document.createElement('img');
    img.src = data[0].link_img;
    img.className = 'product-img';
    div.appendChild(img);

    var h1 = document.createElement('h1');
    h1.innerHTML = data[0].name;
    div.appendChild(h1);

    var pId = document.createElement('p');
    pId.innerHTML = data[0].id;
    div.appendChild(pId);

    var p = document.createElement('p');
    p.innerHTML = data[0].description;
    div.appendChild(p);

    var h2 = document.createElement('h2');
    h2.innerHTML = `R$ ${data[0].price}`;
    div.appendChild(h2);

    var button = document.createElement('button');
    button.className = 'product-button';
    button.type = 'button';
    button.id = 0;
    button.innerHTML = 'Adicionar ao carrinho';
    div.appendChild(button);

    products.appendChild(div);
}

function addToCartFiltered(data) {
    document.querySelectorAll('.product-button').forEach(item => {
        item.addEventListener("click", function() {
            cartValue = cartValue + data[0].price;

            const cart = document.getElementById('cart');
            const cartProduct = document.getElementById('cartProduct');
            const cartTotal = document.getElementById('cartTotal');

            var nameProduct = document.createElement('p');
            nameProduct.className = 'text-center';
            nameProduct.innerHTML = `Produto: ${data[0].name}`;

            var priceProduct = document.createElement('p');
            priceProduct.className = 'text-center';
            priceProduct.innerHTML = `R$ ${data[0].price}`;

            var hr = document.createElement('hr');

            cartProduct.appendChild(hr);
            cartProduct.appendChild(nameProduct);
            cartProduct.appendChild(priceProduct);

            cartTotal.innerHTML = '';

            var hr = document.createElement('hr');
            cartTotal.appendChild(hr);

            var titleTotalProduct = document.createElement('h2');
            titleTotalProduct.className = 'text-center';
            titleTotalProduct.innerHTML = 'Total:';
            cartTotal.appendChild(titleTotalProduct);

            var totalProduct = document.createElement('p');
            totalProduct.className = 'text-center';
            totalProduct.innerHTML = `R$ ${cartValue}`;
            cartTotal.appendChild(totalProduct);

            cart.appendChild(cartProduct);
            cart.appendChild(cartTotal);
        });
    });
}