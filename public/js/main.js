var cartValue = 0

fetch(window.location.origin + '/products')
    .then(response => response.json())
    .then(data => createProductHtml(data))

fetch(window.location.origin + '/products')
    .then(response => response.json())
    .then(data => addToCart(data))

function reload() {
    fetch(window.location.origin + '/products')
        .then(response => response.json())
        .then(data => createProductHtml(data))

    fetch(window.location.origin + '/products')
        .then(response => response.json())
        .then(data => addToCart(data));

}

function createProductHtml(data) {
    var products = document.getElementById('products');
    products.innerHTML = '';
    for (i = 0; i < data.length; i++) {
        var div = document.createElement('div');
        div.className = 'product';
        div.id = i

        //imagem
        var img = document.createElement('img');
        img.src = data[i].link_img;
        img.className = 'product-img';
        div.appendChild(img);

        //nome
        var h1 = document.createElement('h1');
        h1.innerHTML = data[i].name;
        div.appendChild(h1);

        //id
        var pId = document.createElement('p');
        pId.innerHTML = data[i].id;
        div.appendChild(pId);

        //descrição
        var p = document.createElement('p');
        p.innerHTML = data[i].description;
        div.appendChild(p);

        //preço
        var h2 = document.createElement('h2');
        h2.innerHTML = `R$ ${data[i].price}`;
        div.appendChild(h2);

        //button
        var button = document.createElement('button');
        button.className = 'product-button';
        button.type = 'button';
        button.id = i;
        button.innerHTML = 'Adicionar ao carrinho';
        div.appendChild(button);

        products.appendChild(div);
    }
}

function addToCart(data) {
    document.querySelectorAll('.product-button').forEach(item => {
        item.addEventListener("click", function() {
            cartValue = cartValue + data[Number(this.id)].price;

            const cart = document.getElementById('cart');
            const cartProduct = document.getElementById('cartProduct');
            const cartTotal = document.getElementById('cartTotal');

            var nameProduct = document.createElement('p');
            nameProduct.className = 'text-center';
            nameProduct.innerHTML = `Produto: ${data[Number(this.id)].name}`;

            //preço do produto
            var priceProduct = document.createElement('p');
            priceProduct.className = 'text-center';
            priceProduct.innerHTML = `R$ ${data[Number(this.id)].price}`;

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

            //valor total dos produtos
            var totalProduct = document.createElement('p');
            totalProduct.className = 'text-center'
            totalProduct.innerHTML = `R$ ${cartValue}`;
            cartTotal.appendChild(totalProduct);

            cart.appendChild(cartProduct);
            cart.appendChild(cartTotal);

        });
    });
}