let forgot = document.getElementById("rest");
forgot.addEventListener("submit", (event) => {
  event.preventDefault();
  password = document.getElementById("password").value;
  cpassword = document.getElementById("cpassword").value;
  if (cpassword != password) {
    Swal.fire({
      text: `Passwords do not match!`,
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
  } else {
    let data = { password };
    fetch(localStorage.getItem("url"), {
      method: "PATCH",
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
          localStorage.setItem("user", data.user);
          Swal.fire({
            text: "Reset successfully",
            confirmButtonColor: "#068331",
            confirmButtonText: "Ok",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
          setTimeout(() => {
            if (data.user.role === "ADMIN") {
              window.location.href = "./adm.html";
            } else if (data.user.role === "USER") {
              window.location.href = "./index.html";
            }
          }, 500);
        } else {
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
      })
      
  }
});

