const tbody = document.getElementById("tbody");
fetch(`http://localhost:7000/api/v1.0.0/orders/mgrmine`, {
  method: "GET",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
})
  .then((response) => response.json())
  .then((data) => {
    listOrders = data.doc;
    listOrders.forEach((element) => {
      let newproduct = document.createElement("tr");
      newproduct.innerHTML = 
    `
    
    <td>${element.total}</td>
    <td>${element.address}</td>
    <td>${element.phone}</td>
    <td>${element.createdAt}</td>
    <td>${element.status}</td>
    <td>
    <button data-id="${element._id}"
      class="update-product-btn">Delivering</button>
      </td>
    `;
      tbody.append(newproduct);
    });
  });
  tbody.addEventListener("click", (event) => {
    if (event.target.classList.contains("update-product-btn")) {
        fetch(`http://localhost:7000/api/v1.0.0/orders/${event.target.dataset.id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => response.json())
        .then((data) => {
          if ((data.status = "success")) {
            alert("update success");
            window.location.href = "./order.html";
          } else {
            alert(data.messag);
          }
        });
    }
    });
    