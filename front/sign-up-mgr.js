let form = document.getElementById("sign-up-mgr");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const fileInput = document.getElementById("photo");
  const file = fileInput.files[0];
  const formData = new FormData();
  
  if (file) {
    formData.append("photo", file);
  }

  let data = {
    name: document.getElementById("name1").value,
    email: document.getElementById("email1").value,
    password: document.getElementById("password1").value,
    resturant: { 
      name: document.getElementById("name-res").value,
      phone: document.getElementById("number1").value,
      photo:document.getElementById("photo").value,
      location: {
        city: document.getElementById('city').value, 
        regon: document.getElementById('regon').value, 
        country: document.getElementById('country').value, 
      },
    },
    role: "MANAGER",
  };
  
  try {
    fetch("http://localhost:7000/api/v1.0.0/users/signup-mgr", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data), 
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("MANAGER", JSON.stringify(data.user));
        window.location.href = "./dashbord-mgr.html";
      } else {
        Swal.fire({
          text: `${data.message}`, // تصحيح هنا
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
  } catch (err) {
    console.log(err);
    console.log("error");
  }
});
