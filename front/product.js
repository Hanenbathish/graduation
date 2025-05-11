let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
const iconCart = document.querySelector('.icon-cart');
const iconCartSpan = document.querySelector('.icon-cart span');
const body = document.querySelector('body');
const closeCart = document.querySelector('.close');
let cart = JSON.parse(localStorage.getItem('cart')) || []; 



const initApp = () => {
    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const ResturantId = urlParams.get('id');

    fetch(`http://localhost:7000/api/v1.0.0/products?resturantId=${ResturantId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            listProductHTML.innerHTML = '';
            if (data.status === 'success' && data.doc.length > 0) {
                data.doc.forEach(product => {
                    let newProduct = document.createElement('div');
                    newProduct.classList.add('item');
                    newProduct.dataset.id = product._id;
                    newProduct.innerHTML = `
                    <img src="../front/image/${product.image}" alt="">
                    <h2>Name: ${product.title}</h2>
                    <h2>Description: ${product.description}</h2>
                    <div class="price">Price: $${product.price}</div>
                    <button class="addCart">Add to Cart</button>
               ` ;
                    listProductHTML.appendChild(newProduct);
                });
                // Attach event listeners to "Add to Cart" buttons
             
            }
        })
        .catch(error => console.error('Error fetching products:', error));

    updateCart(); // Initialize cart display
};

const addToCart = (id_product) => {
    const productIndex = cart.findIndex(item => item.id === id_product);
    const productElement = document.querySelector(`.item[data-id="${id_product}"]`);
    const title = productElement.querySelector('h2').innerText;
    const price = parseFloat(productElement.querySelector('.price').innerText.replace('Price: $', ''));

    if (productIndex > -1) {
        cart[productIndex].quantity++;
    } else {
        cart.push({
            id: id_product,
            title: title,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    updateCart();
};

const updateCart = () => {
    listCartHTML.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div>${item.title}</div>
            <div>Price: $${(item.price * item.quantity).toFixed(2)}</div>
            <div>quantity: 
                <button class="decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase" data-id="${item.id}">+</button>
            </div>
        ;`
        listCartHTML.appendChild(cartItem);
    });

    iconCartSpan.innerText = cart.length; // Update number of items in cart
    const totalPriceElement = document.createElement('div');
    totalPriceElement.innerHTML = `<strong>Total Price: $${totalPrice.toFixed(2)}</strong>`;
    listCartHTML.appendChild(totalPriceElement);

    // Add event listeners for increase/decrease buttons
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex > -1) {
                cart[itemIndex].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
                updateCart();
            }
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex > -1) {
                cart[itemIndex].quantity--;
                if (cart[itemIndex].quantity <= 0) {
                    cart.splice(itemIndex, 1); // Remove item from cart
                }
                localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
                updateCart();
            }
        });
    });
};

// Initialize the app
initApp();
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

