let ForgotPassword = document.getElementById("forget");
let email;

ForgotPassword.addEventListener("click", () => {
  email = document.getElementById("email").value;
  let data = { email, 
  role:"USER",
};

  
    fetch("http://localhost:7000/api/v1.0.0/users/forgotPassword", {
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
          Swal.fire({
            text: " Do you want to allow us to access your email to read the code sent?",
            confirmButtonColor: "#068331",
            confirmButtonText:"Ok",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          }).then((result) => {
            if (!result.isDenied) {
              localStorage.setItem("url", data.url);
              window.location.href = "./forgetpassward.html";
            }
          });
        } else {
          Swal.fire({
            text:` ${data.message}`, // تم تصحيح هذا السطر
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
  }
);
