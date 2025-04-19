
const form = document.getElementById("login");
console.log(form);

const forgot = document.getElementById("forget");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    role: "USER",
  };
  try {
    fetch("http://localhost:7000/api/v1.0.0/users/login", {
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
          localStorage.setItem("user", JSON.stringify(data.user));
          
           if (data.user.role === "USER") {
            window.location.href = "./index.html";
          } else if (data.user.role === "MANEGER") {
            window.location.href = "./dashbord-mgr.html";
          }
          else if (data.user.role === "ADMIN") {
            window.location.href = "./adm.html";
          }
        } else {
          alert`${data.message}`;
        }
      });
  } catch (err) {
    Swal.fire({
      text: `no `,
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