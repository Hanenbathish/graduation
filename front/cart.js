let cart = [];
let listCartHTML = document.querySelector('.cart');

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
  cart.forEach(item => {
    const cartItem = document.createElement('div');
   cartItem.classList.add('cart-item');
   cartItem.innerHTML = `
      <div>${item.title}</div>
      <div>Count: ${item.quantity}</div>
        <div>price:  $${item.price}</div>
    `
    listCartHTML.appendChild(cartItem);
});
}
let total = 0;
cart.forEach(item => {
  total += item.price * item.quantity; // جمع السعر مضروبًا في الكمية
});
document.getElementById("total").innerText = total.toFixed(2);

const form = document.getElementById("order");
form.addEventListener("submit", (eve) => {
  eve.preventDefault();
  const data = {
    cart: JSON.parse(localStorage.getItem("cart")),
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    total:total,
    resturantId:localStorage.getItem("restaurantId")
  };
  try {
    
    fetch(`http://localhost:7000/api/v1.0.0/orders`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          localStorage.removeItem("cart");
            window.location.href = "./bank.html";
        } else {
            alert(data.message);
            alert( 'يجب أن تسجل دخولك أولاً' );
            window.location.href = 'cart.html';
          }
      });
  } catch (err) {
    Swal.fire({
      text: `${data.message}`,
      icon: "error",
      showCloseButton: true,
      confirmButtonColor: "#068331",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
});

