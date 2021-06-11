const form = document.getElementById('form-create')

fetch(window.location.origin + '/products')
    .then(response => response.json())
    .then(data => createProductHtml(data));

function createProductHtml(data) {
    console.log(data);
    var products = document.getElementById('products');
    products.innerHTML = '';
    for (i = 0; i < data.length; i++) {
        var div = document.createElement('div');
        div.className = 'product';

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

        console.log(div);
        products.appendChild(div);
    }
}

function insertProduct() {
    const productName = form.name.value;
    const description = form.description.value;
    const price = Number(form.price.value);
    const linkImg = form.linkImg.value;
    fetch(window.location.origin + '/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: productName, description: description, price: price, link_img: linkImg }),
        })
        .then(response => {
            if (response.ok) {
                console.warn('Inseri com sucesso.');
                if (response.bodyUsed) {
                    response.json().then(jsonData => console.log(jsonData));
                } else {
                    response.text().then(textData => console.log(textData));
                }
            } else {
                console.error('Aconteceu um erro.');
            }
        });
}

function updateProduct() {
    const id = form.id.value;
    const productName = form.name.value;
    const description = form.description.value;
    const price = Number(form.price.value);
    const linkImg = form.linkImg.value;
    fetch(window.location.origin + `/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: productName, description: description, price: price, link_img: linkImg }),
        })
        .then(response => {
            if (response.ok) {
                console.log(`Usuário ${id} atualizado com sucesso.`);
                if (response.bodyUsed) {
                    response.json().then(jsonData => console.warn(jsonData));
                } else {
                    response.text().then(textData => console.warn(textData));
                }
            } else {
                console.error('Aconteceu um erro.');
            }
        });
}

function deleteProduct() {
    const id = form.id.value;
    fetch(window.location.origin + `/products/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log(`Deletei usuário ${id} com sucesso.`);
                if (response.bodyUsed) {
                    response.json().then(jsonData => console.warn(jsonData));
                } else {
                    response.text().then(textData => console.warn(textData));
                }
            } else {
                console.error('Aconteceu um erro.');
            }
        });
}