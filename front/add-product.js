
const form = document.getElementById("add");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("image");
    const pathImage= fileInput.files[0].name;

   
        const productData = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value,
            image: pathImage , 
            category: document.getElementById("category").value,
        };

        const headers = new Headers();
        headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
        headers.append("Content-Type", "application/json");

        try {
            fetch("http://localhost:7000/api/v1.0.0/products", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: headers,
                body: JSON.stringify(productData), // تحويل الكائن إلى JSON
                redirect: "follow",
                referrerPolicy: "no-referrer",
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == "success") {
                    window.location.href = "./dashbord-mgr.html";
                } else {
                    alert(data.message);
                }
            });
        } catch (err) {
            Swal.fire({
                text: $`{err.message}`, 
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
