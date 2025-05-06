//get all active
const tbody = document.getElementById("tbody");
fetch("http://localhost:7000/api/v1.0.0/resturants?active=false", {
  method: "GET",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
})
.then((response) => response.json())
  .then((data) => {
    console.log(data);
    listProducts = data.doc;
    listProducts.forEach((element) => {
      let newproduct = document.createElement("tr");
      newproduct.innerHTML =
    `<td>${element.name}</td>
    <td>${element.phone}</td>
    <td>   <img src="/imgs/user-icon.png" alt=" " style="width: 50px; height: 50px; border-radius: 50%;">
    ${element.photo}
    </td>
    <td>${element.location.city}</td>
    <td>${element.location.regon}</td>
    <td>${element.location.country}</td>
    <td>${element.active}</td>
    <td>${element.createdAt}</td>
    <td>
     <button data-id="${element._id}"
      class="delete-product-btn">Delete</button>
      </td>
      <button data-id="${element._id}"
      class="update-product-btn">True</button>
      </td>
      `;
      
      tbody.append(newproduct);
    });
  });
  //get all not active
fetch("http://localhost:7000/api/v1.0.0/resturants?active=true", {
  method: "GET",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
})
.then((response) => response.json())
  .then((data) => {
    console.log(data);
    listProducts = data.doc;
    listProducts.forEach((element) => {
      let newproduct = document.createElement("tr");
      newproduct.innerHTML =
    `<td>${element.name}</td>
    <td>${element.phone}</td>
    <td>${element.photo}</td>
    <td>${element.location.city}</td>
    <td>${element.location.regon}</td>
    <td>${element.location.country}</td>
    <td>${element.active}</td>
    <td>${element.createdAt}</td>
    <td>
     <button data-id="${element._id}"
      class="delete-product-btn">Delete</button>
      </td>`;
      
    
      tbody.append(newproduct);
    });
  });
  tbody.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-product-btn")) {
      event.preventDefault();
      fetch(`http://localhost:7000/api/v1.0.0/resturants/${event.target.dataset.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if ((data.status = "success")) {
          alert("delete success");
          window.location.href = "./adm.html";
        } else {
          alert(data.messag);
        }
      });
  }
});

///////////////update 
tbody.addEventListener("click", (event) => {
  if (event.target.classList.contains("update-product-btn")) {
    event.preventDefault();
    fetch(`http://localhost:7000/api/v1.0.0/resturants/${event.target.dataset.id}/active`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if ((data.status = "success")) {
        alert("update success");
        window.location.href = "./adm.html";
      } else {
        alert(data.messag);
      }
    });
}
});

 



