let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
const initApp = () => {
    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const ResturantId = urlParams.get('id'); // الحصول على ResturantId من عنوان URL
    // استخدام ResturantId لجلب الوجبات الخاصة بالمطعم
    fetch(`http://localhost:7000/api/v1.0.0/products?resturantId=${ResturantId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token} `// استخدام القوسين المائلين (backticks) لتمكين المتغير
        }
    })
    .then(response => response.json())
    .then(data => {
        listProductHTML.innerHTML = ''; // مسح المحتوى الحالي
        if (data.status === 'success' && data.doc.length > 0) {
            data.doc.forEach(product => { // استخدم data.doc للوصول إلى المنتجات
                let newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.dataset.id = product._id;
                newProduct.innerHTML = `
                    <img src="../front/image/${product.image}" alt="">
                    <h2>Name: ${product.title}</h2>
                    <h2>Description: ${product.description}</h2>
                    <div class="price">Price: $${product.price}</div>
                    <button class="addCart">Add To Cart</button>;
                  `
                listProductHTML.appendChild(newProduct);
            });
        }
    })
    .catch(error => console.error('Error fetching products:', error)); // إضافة معالجة الأخطاء
};
// استدعاء الدالة initApp لتشغيل التطبيق
initApp();
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let product = []; 
let cart = [];

iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})
  listProductHTML.addEventListener('click', (event) => {
   let positionClick = event.target;
       if(positionClick.classList.contains('addCart')){
        let  id_product= positionClick.parentElement.dataset.id

     addToCart(id_product);
   }
})
const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
if(cart.length <= 0){
       cart = [{
       product_id: product_id,
           quantity: 1
       }];
    }else if(positionThisProductInCart < 0){
      cart.push({
          product_id: product_id,
           quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
   addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart))}
const addCartToHTML = () => {
   listCartHTML.innerHTML = '';
    let totalQuantity = 0;
   if(cart.length > 0){
       cart.forEach(item => {
           totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = product.findIndex((value) => value.id == item.product_id);
            let info = product[positionProduct];
           listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
            <img ${info.image}" alt="">

               </div>
               <div class="name">
               ${info.title}
                </div>
               <div class="totalPrice">$${info.price * item.quantity}</div>
               <div class="quantity">
                   <span class="minus"><</span>
                 <span>${item.quantity}</span>
                   <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
   if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
       let type = 'minus';
      if(positionClick.classList.contains('plus')){
      type = 'plus';
       }
       changeQuantityCart(product_id, type);
   }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
   if(positionItemInCart >= 0){
       let info = cart[positionItemInCart];
      switch (type) {
      case 'plus':
            cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
               break;
        
            default:
              let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                   cart[positionItemInCart].quantity = changeQuantity;
              }else{
                 cart.splice(positionItemInCart, 1);
               }
               break;
       }
    }
    addCartToHTML();
    addCartToMemory();
}


