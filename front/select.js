const submit1 = document.getElementById("myButton");
submit1.addEventListener("click", (event) => {
    event.preventDefault();
    const selectlocation = {
        city: document.getElementById("city").value,
        regon: document.getElementById("regon").value,
        country: document.getElementById("country").value,
    };
    if (!selectlocation.city || !selectlocation.regon || !selectlocation.country) {
        alert("Please fill out all the required fields."); // رسالة تنبيه للمستخدم
        return; // إيقاف التنفيذ إذا كانت هناك حقول فارغة
    }
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    headers.append("Content-Type", "application/json");
    try {
        fetch(`http://localhost:7000/api/v1.0.0/resturants?location[city]=${selectlocation.city}&location[regon]=${selectlocation.regon}&location[country]=${selectlocation.country}&active=true`, {
            method: "GET", // تأكد من أن هذا هو نوع الطلب الصحيح
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: headers,
            redirect: "follow",
            referrerPolicy: "no-referrer",
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'success' && data.doc.length > 0) {
                window.location.href = `./resturant.html?city=${selectlocation.city}&regon=${selectlocation.regon}&country=${selectlocation.country}`;
            } else {
                alert("لا يوجد مطاعم");
            }
        });
    } catch (err) {
        Swal.fire({
            text: `${err.message}`, // إضافة علامات الاقتباس حول err.message
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